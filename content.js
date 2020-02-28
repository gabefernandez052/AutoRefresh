chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if(request.message === "getDOM"){
    var response;
    if(document.getElementById("ctl00_ContentPlaceHolder1_rgOffers_ctl00").rows[0].innerText === "No records to display."){
      response = true;
    }
	else{
		response = false;
	}
    sendResponse({message: response});
  }
  else if(request.message === "refresh"){
    window.location.reload(true);
  }
  else if(request.message === "stopRefreshing"){
		document.getElementById("ctl00_ContentPlaceHolder1_rgOffers_ctl00").className = "rgRow rgSelectedRow rgActiveRow";
	    document.getElementById("ctl00_ContentPlaceHolder1_btn72hr").removeAttribute("disabled");
  }
});