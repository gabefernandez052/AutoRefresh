//global variable
var stopButton = document.getElementById("stopButton");
var refreshButton = document.getElementById("refreshButton");
var timerInterval = document.getElementById("timerInterval");
var myIntervalID;


refreshButton.addEventListener("click", startRefreshing);
stopButton.addEventListener("click", stopRefreshing);

handleStopButton();

function startRefreshing(){
    if(timerInterval.value != ""){
        var activeTab;
        
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            activeTab = tabs[0];
        });

        myIntervalID = setInterval(function() {
            chrome.tabs.sendMessage(activeTab.id, {message: "getDOM"}, function(response) {
                if(response.message){
                    chrome.tabs.sendMessage(activeTab.id, {message: "refresh"});
            
                    //used for debugging
                    console.log("REFRESHING AT " + Date());

                    handleRefreshButton();
                 }
                else{
					chrome.tabs.sendMessage(activeTab.id, {message: "stopRefreshing"});
                    stopRefreshing();                
                }
            })
        },timerInterval.value*1000);
    }
}
//stop refreshing - reset variables
function stopRefreshing(){
	handleStopButton();
	clearInterval(myIntervalID);
    console.log("STOPPED REFRESHING AT " + Date());
}

//color button red and bold
function handleStopButton(){
    refreshButton.style.background = "none";
    refreshButton.style.fontWeight = "normal";

    stopButton.style.background = "#ff4d4d";
    stopButton.style.fontWeight = "bold";

    timerInterval.value = "";
}

//color refresh button and bold
function handleRefreshButton(){
    stopButton.style.background = "none";
    stopButton.style.fontWeight = "normal";

    refreshButton.style.background = "#00ff80";
    refreshButton.style.fontWeight = "bold";
}