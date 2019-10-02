/*
Listens for a file being selected, creates a ObjectURL for the chosen file, injects a
content script into the active tab then passes the image URL through a message to the
active tab ID.
*/

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

const inputBtnElement = document.getElementById("inputbtn");
inputBtnElement.addEventListener("click", handleBtnClicked, false);