function popupShrinkDown() {
    var popup = document.getElementById("popup");
    var sizePx = popup.style.fontSize;
    var sizeInt = parseInt(sizePx);

    if (sizeInt !== 0 ) {
        sizeInt -= 1;
        popup.style.fontSize = sizeInt + "px"

    } else {
        popup.remove();
        return;
    };
    
    setTimeout(popupShrinkDown, 10);
}

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

    // browser.runtime.sendMessage({passwdFile});
    browser.tabs.executeScript({
            file: "/content_scripts/content.js"
        }).then(messageContent)
        .catch(reportError);

    function messageContent() {
        const gettingActiveTab = browser.tabs.query({active: true, currentWindow: true});
        gettingActiveTab.then((tabs) => {
            browser.tabs.sendMessage(tabs[0].id, {passwdFile});

            var inputDiv = document.getElementById("picker_zone");
            inputDiv.innerHTML += "<span id=\"popup\" class=\"success\" style=\"font-size: 16px;\">Passwd file loaded!</span>";
            
            setTimeout(popupShrinkDown, 3000);
        });
    }

    function reportError(error) {
        console.error(`Could not inject content script: ${error}`);
        var inputDiv = document.getElementById("picker_zone");
        inputDiv.innerHTML += "<span id=\"popup\" class=\"fail\" style=\"font-size: 16px;\">Passwd file was not loaded!</span>";
        
        setTimeout(popupShrinkDown, 3000);
    }
}
