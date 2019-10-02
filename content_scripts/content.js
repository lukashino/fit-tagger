(function() {
  /*
  Check and set a global guard variable.
  If this content script is injected into the same page again,
  it will do nothing next time.
  */
  if (window.hasRun) {
    return;
  }
  window.hasRun = true;

  function savePasswdPath(request, sender, sendResponse) {
    console.log("I have received something");
    console.log(request);

    if (request.passwdFile) {
      var fileChooser = document.createElement("input");
      fileChooser.type = 'file';

      fileChooser.addEventListener('change', function (evt) {
        var passwdFile = evt.target.files[0];
        console.log("saving passwd");
        console.log(passwdFile);

        if(passwdFile) {
          var reader = new FileReader();
          reader.onload = function(e) {
            chrome.storage.local.set({"passwdFile" : e.target.result}, function() {
              console.log("Passwd file saved.");
            });
          }
          reader.readAsText(passwdFile);
        }
      });

      document.body.appendChild(fileChooser);
      fileChooser.click();
    }
  }

  /*
  Assign savePasswdPath() as a listener for messages from the extension.
  */
  chrome.runtime.onMessage.addListener(savePasswdPath);

})();