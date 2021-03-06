var bg = chrome.extension.getBackgroundPage();

// Saves options to localStorage.

function save_options() {
  localStorage["seconds"] = document.getElementById("seconds").value;
  bg.defaultTimeDelay = (document.getElementById("seconds").value * 1000);
  
  if (document.getElementById("reload").checked == true) {
    localStorage["reload"] = 'true';
    bg.tabReload = true;
  } else {
    localStorage["reload"] = 'false';
    bg.tabReload = false;
  }
  if (document.getElementById("inactive").checked == true) {
    localStorage["inactive"] = 'true';
    bg.tabInactive = true;
  } else {
    localStorage["inactive"] = 'false';
    bg.tabInactive = false;
  }
  if (document.getElementById("autostart").checked == true) {
    localStorage["autostart"] = 'true';
    bg.tabInactive = true;
  } else {
    localStorage["autostart"] = 'false';
    bg.tabInactive = false;
  }
  localStorage["noRefreshList"] = JSON.stringify(
    document.getElementById('noRefreshList').value.split('\n')
  );
  bg.noRefreshList = document.getElementById('noRefreshList').value.split('\n');

  localStorage["tabIntervalList"] = document.getElementById('tabIntervalList').value;
  bg.updateTabInterval();

  // Update status to let user know options were saved.
  var status = document.getElementById("status");
  var status2 = document.getElementById("status2");
  status.innerHTML = "OPTIONS SAVED";
  status2.innerHTML = "OPTIONS SAVED";
  setTimeout(function () {
    status.innerHTML = "";
    status2.innerHTML = "";
  }, 1000);
}

// Restores saved values from localStorage.

function restore_options() {
  if (localStorage["seconds"]) {
    document.getElementById("seconds").value = localStorage["seconds"];
  } else {
    document.getElementById("seconds").value = "10";
  }
  if (localStorage["reload"]) {
    if (localStorage["reload"] == 'true') {
      document.getElementById("reload").checked = true;
    } else {
      document.getElementById("reload").checked = false;
    }
  } else {
    document.getElementById("reload").checked = true;
  }
  if (localStorage["inactive"]) {
    if (localStorage["inactive"] == 'true') {
      document.getElementById("inactive").checked = true;
    } else {
      document.getElementById("inactive").checked = false;
    }
  } else {
    document.getElementById("inactive").checked = true;
  }
  if (localStorage["autostart"]) {
    if (localStorage["autostart"] == 'true') {
      document.getElementById("autostart").checked = true;
    } else {
      document.getElementById("autostart").checked = false;
    }
  } else {
    document.getElementById("autostart").checked = false;
  }
  if (localStorage["noRefreshList"]) {
    document.getElementById("noRefreshList").value = JSON.parse(localStorage["noRefreshList"]).join("\n");
  } else {
    document.getElementById("noRefreshList").value = "";
  }
  if (localStorage["tabIntervalList"]) {
    document.getElementById("tabIntervalList").value = localStorage["tabIntervalList"];
  } else {
    document.getElementById("tabIntervalList").value = "";
  }
}

// Adding listeners for restoring and saving options
document.addEventListener('DOMContentLoaded', restore_options);
document.querySelector('#save').addEventListener('click', save_options);
document.querySelector('#savetop').addEventListener('click', save_options);