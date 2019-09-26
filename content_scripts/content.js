(function() {
  console.log("CAAAAAAAAAAAAAAAAAAUfilepicker");
  /*
  Check and set a global guard variable.
  If this content script is injected into the same page again,
  it will do nothing next time.
  */
  if (window.hasRun) {
    return;
  }
  window.hasRun = true;

  /*
  Add the image to the web page by:
  * Removing every node in the document.body
  * Inserting the selected image
  */
  function savePasswdPath(request, sender, sendResponse) {
    console.log("I have received something");
    console.log(request);

    browser.storage.local.set({"passwdFile" : request.passwdFile});
  }

  /*
  Assign savePasswdPath() as a listener for messages from the extension.
  */
  browser.runtime.onMessage.addListener(savePasswdPath);

})();