function handleBtnClicked() {
    const passwdFile = "Passwd file pick button clicked";
    chrome.tabs.executeScript({
            file: "/content_scripts/content.js"
        }, messageContent);

    function messageContent() {
        chrome.tabs.query(
            {active: true, currentWindow: true}, 
            function (tabs) {
                // Send message to the specified executed script that the button was clicked.
                chrome.tabs.sendMessage(tabs[0].id, {passwdFile});
        });
    }
}

const inputBtnElement = document.getElementById("inputbtn");
inputBtnElement.addEventListener("click", handleBtnClicked, false);