/*
Listens for a file being selected, creates a ObjectURL for the chosen file, injects a
content script into the active tab then passes the image URL through a message to the
active tab ID.
*/

// Listen for a file being selected through the file picker
const inputElement = document.getElementById("input");
inputElement.addEventListener("change", handlePicked, false);

// Get the passwd file if it was chosen from the pick list
function handlePicked() {
    var file = this.files[0];
    if (!file) {
        return;
    }
    savePasswdFile(this.files);
}

function handleBtnClicked() {
    const passwdFile = "Ahoj Janooooooooooo";
    chrome.tabs.executeScript({
            file: "/content_scripts/content.js"
        }, messageContent);

    function messageContent() {
        chrome.tabs.query(
            {active: true, currentWindow: true}, 
            function (tabs) {
                chrome.tabs.sendMessage(tabs[0].id, {passwdFile});
        });
    }

    function reportError(error) {
        console.error(`Could not inject content script: ${error}`);
    }
}

/* 
Insert the content script and send the file to the content script using a message.
*/ 
function savePasswdFile(fileList) {
    const passwdFile = fileList[0];

    chrome.tabs.executeScript({
            file: "/content_scripts/content.js"
        }, messageContent);

    function messageContent() {
        chrome.tabs.query(
            {active: true, currentWindow: true}, 
            function (tabs) {
                chrome.tabs.sendMessage(tabs[0].id, {passwdFile});
        });
    }

    function reportError(error) {
        console.error(`Could not inject content script: ${error}`);
    }
}
  

const inputBtnElement = document.getElementById("inputbtn");
inputBtnElement.addEventListener("click", handleBtnClicked, false);