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

/* 
Insert the content script and send the file to the content script using a message.
*/ 
function savePasswdFile(fileList) {
    const passwdFile = fileList[0];

    browser.tabs.executeScript({
            file: "/content_scripts/content.js"
        }).then(messageContent)
        .catch(reportError);

    function messageContent() {
        const gettingActiveTab = browser.tabs.query({active: true, currentWindow: true});
        gettingActiveTab.then((tabs) => {
            browser.tabs.sendMessage(tabs[0].id, {passwdFile});
        });
    }

    function reportError(error) {
        console.error(`Could not inject content script: ${error}`);
    }
}
  