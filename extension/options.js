// Saves options to localStorage.
function save_options() {
  var encryptionCheckbox = document.getElementById("passwordEncryption");
  var passwordEncryption = encryptionCheckbox.checked;
  localStorage["passwordEncryption"] = passwordEncryption;
  
  var storageCheckbox = document.getElementById("passwordStorage");
  var passwordStorage = storageCheckbox.checked;
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
  var passwordEncryption = localStorage["passwordEncryption"];
  var passwordStorage = localStorage["passwordStorage"];
  if (passwordEncryption != null) {
	  var encryptionCheckbox = document.getElementById("passwordEncryption");
	  encryptionCheckbox.checked = passwordEncryption;
  }
  
  if (passwordStorage != null){
	  var storageCheckbox = document.getElementById("passwordStorage");
	  storageCheckbox.checked = passwordStorage;
  }
}

document.addEventListener('DOMContentLoaded', restore_options);
document.querySelector('#save').addEventListener('click', save_options);
