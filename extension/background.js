var port = chrome.runtime.connectNative('com.cip.accessor');

//When the extension receives a message, all opened tabs
//are closed to open the new ones
port.onMessage.addListener(function(data) {
	console.log("Received" + data);
	
	//Import preferences
	localStorage["passwordStorage"] = data["passwordStorage"];
	localStorage["passwordEncryption"] = data["passwordEncryption"];
	
	
	//Clean Open tabs before opening the new ones
	chrome.tabs.query({}, function(tabs){
	    for (var i = 1; i < tabs.length; i++) {
	    	chrome.tabs.remove(tabs[i].id);                         
	    }
	});
	
	chrome.tabs.query({},function(tab){
		chrome.tabs.update(tab[0].id,{"url": data[0].url});
	});
	for(i=1 ; i< data.length ; i++){
		chrome.tabs.create({"url": data["openTabs"][i].url});
	}
  
});
port.onDisconnect.addListener(function() {
  console.log("Disconnected");
});

//Add listeners
chrome.tabs.onCreated.addListener(tabCreated);
function tabCreated(){
	sendOpenTabs();
}

chrome.tabs.onRemoved.addListener(tabRemoved);
function tabRemoved(){
	sendOpenTabs();
}

chrome.tabs.onUpdated.addListener(tabUpdated);
function tabUpdated(){
	sendOpenTabs();
}

chrome.windows.onRemoved.addListener(windowClosed);
function windowClosed(){
	sendOpenTabs();
}


function sendOpenTabs(){
	chrome.tabs.query({}, function(tabs){
		port.postMessage({openTabs: tabs, passwordStorage: localStorage["passwordStorage"],
			passwordEncryption:localStorage["passwordEncryption"]);
		}
	});
}



