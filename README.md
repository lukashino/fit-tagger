# fit-tagger
An open-source web browser extension for students of Faculty of Information Technology at Brno University of Technology which provides an automatic tagging of students according to implemented criteria.

### Supported browser
Firefox  
Chrome

### Trying it out in firefox
1) you need to head to [about:debugging](about:debugging)
2) click on "Load temporary add-on"
3) select file manifest.json from the folder

### Installing in Firefox
1) Head to [download page](http://www.stud.fit.vutbr.cz/~xsismi01/fit_ranks/download) and download .xpi file.
2) In Firefox open menu 
3) Click Add-ons
4) Click on cog wheel next to "Manage your extension" and click on "Install Add-on From File..."
5) Select the .xpi file

### Installing in Chrome
1) Clone/Download the github repository
2) Head to [chrome://extensions/](chrome://extensions/)
3) Toggle developer mode in the upper right corner
4) Click "Load unpacked"
5) Select the root directory of downloaded repository

**NOTE** It is needed to download passwd file from /etc/passwd on Merlin or Eva and afterwards load it to the extension via "Load passwd" button. Please do this action on mbasic.facebook.com page since loading the file will not work on the browser's addon config page.

You now have installed the fit-tagger.
