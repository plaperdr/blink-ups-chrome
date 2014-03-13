// Saves options to localStorage.
function save_options() {
  var textField = document.getElementById("hiddenFolder");
  var dataPath = textField.value;
  console.log("dataPath : "+dataPath);
  localStorage["dataPath"] = dataPath;
  
  var checkbox = document.getElementById("passwordStorage");
  var passwordStorage = checkbox.checked;
  console.log("passwordStorage : "+passwordStorage);
  localStorage["passwordStorage"] = passwordStorage;

  // Update status to let user know options were saved.
  var status = document.getElementById("status");
  status.innerHTML = "Options Saved.";
  setTimeout(function() {
    status.innerHTML = "";
  }, 750);
}

// Restores select box state to saved value from localStorage.
function restore_options() {
  var dataPath = localStorage["dataPath"];
  var passwordStorage = localStorage["passwordStorage"];
  console.log("dataPath : "+dataPath+"\npasswordStorage : "+passwordStorage);
  if (dataPath != null) {
	  var textField = document.getElementById("dataPath");
	  textField.value = dataPath;
  }
  
  if (passwordStorage != null){
	  var checkbox = document.getElementById("passwordStorage");
	  checkbox.checked = passwordStorage;
  }
}

//Simulate click
function getFolder(){
    document.getElementById('hiddenFolder').click();
    document.getElementById('dataPath').value=document.getElementById('hiddenFolder').value
}

document.addEventListener('DOMContentLoaded', restore_options);
document.querySelector('#save').addEventListener('click', save_options);
document.querySelector('#folder').addEventListener('click', getFolder);
