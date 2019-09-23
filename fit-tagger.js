/********************/
/****Lukas Sismis****/
/******2018/19*******/
/********************/

// We will differ between shown post's names which are names of users shown when FIT BIT page is loaded.
// Then we have shown comment's names which are names of users that commented on a posts and they are displayed instantly when FIT BIT page is loaded.
// Loaded post names and loaded comment names are the ones that are loaded after further navigation on FIT BIT page.

// Sends a JSON request to an API end point
// JSON req consists of names extracted from HTML

// var manifest = browser.runtime.getManifest();

var req = new XMLHttpRequest();
req.open("POST", "http://www.stud.fit.vutbr.cz/~xsismi01/fit_ranks/index.php", true);
req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

// When response arrives, ranks are added to names.
req.addEventListener("load", function () {
    console.log("CAU!");
    // console.log(req.response);
    // var postNames = document.getElementsByClassName("h3.dx.dy")
    // for (i = 0; i < postNames.length; i++) {
    //     indata = JSON.parse(req.response);
    //     console.log(indata[postNames[i].getElementsByTagName("a")[0].innerText] + "-" + postNames[i].getElementsByTagName("a")[0].innerText);
    //     postNames[i].getElementsByTagName("a")[0].innerHTML += "<span style=\"background: #BBB; color: white; border-radius: 20px; padding: 0 5px; margin-left: 5px;\">" + indata[postNames[i].getElementsByTagName("a")[0].innerText] + "</span>";
    // }

    // var postName = document.getElementsByClassName("br bs bt bu")
    // for (i = 0; i < postName.length; i++) {
    //     indata = JSON.parse(req.response);
    //     console.log(indata[postName[i].getElementsByTagName("a")[0].innerText] + "-" + postName[i].getElementsByTagName("a")[0].innerText);
    //     postName[i].getElementsByTagName("a")[0].innerHTML += "<span style=\"background: #BBB; color: white; border-radius: 20px; padding: 0 5px; margin-left: 5px;\">" + indata[postName[i].getElementsByTagName("a")[0].innerText] + "</span>";
    // }

    // var rootDiv = document.querySelectorAll("div.g:not(#root)")
    // for (var i = 0; i < rootDiv.length; i++) {
    //     if (rootDiv[i].id.indexOf("ufi_") === -1) 
    //         continue;
    //     var comments = rootDiv[i].querySelectorAll("div")[0].childNodes[3].childNodes
    //     for (var j = 0; j < comments.length; j++) {
    //         indata = JSON.parse(req.response);
    //         var name = comments[j].querySelector("div h3 a")
    //         console.log(indata[name.innerText] + "-" + name.innerText);
    //         name.innerHTML += "<span style=\"background: #BBB; color: white; border-radius: 20px; padding: 0 5px; margin-left: 5px;\">" + indata[name.innerText] + "</span>";
    //     }	
    // }

    // if (document.referrer.indexOf(manifest["fb_group_id"]) !== -1 && // if referrer is FIT group 
    //     document.URL.indexOf(manifest["fb_group_id"]) === -1) { // but it is not on the FIT group page directly
    //     var subcommenterName = document.getElementsByClassName("bl bm")
    //     for (i = 0; i < subcommenterName.length; i++) {
    //         indata = JSON.parse(req.response);
    //         console.log(indata[subcommenterName[i].innerText] + "-" + subcommenterName[i].innerText);
    //         subcommenterName[i].innerHTML += "<span style=\"background: #BBB; color: white; border-radius: 20px; padding: 0 5px; margin-left: 5px;\">" + indata[subcommenterName[i].innerText] + "</span>";
    //     }
    // }
});

console.log("fungujem vobec???????");
//browser.storage.local.set({"Cau" : "mnau"});
var manifest = Object();
manifest["fb_group_id"] = "1127391613999255";
// Creating an object to send to API
var data = Object();
data.names = Array();

// Getting all the names from posts on the main feed.
var postNames = document.getElementsByClassName("h3.dx.dy")
for (i = 0; i < postNames.length; i++) {
    data.names.push(postNames[i].getElementsByTagName("a")[0].innerText);
}

console.log("POSTS MAIN FEED");
// When post is opened in a new window
var postName = document.getElementsByClassName("br bs bt bu")
for (i = 0; i < postName.length; i++) {
    data.names.push(postName[i].getElementsByTagName("a")[0].innerText);
}

console.log("POSTS NEW WINDOW");
// When post has at least one comment 
var rootDiv = document.querySelectorAll("div.g:not(#root)")
for (var i = 0; i < rootDiv.length; i++) {
	if (rootDiv[i].id.indexOf("ufi_") === -1) 
		continue;
	var comments = rootDiv[i].querySelectorAll("div")[0].childNodes[3].childNodes
	for (var j = 0; j < comments.length; j++) {
        var name = comments[j].querySelector("div h3 a").innerText
        data.names.push(name);
	}	
}
console.log("Comments new window");

// When comment has at least one subcomment and we on the comment page 
if (document.referrer.indexOf(manifest["fb_group_id"]) !== -1 && // if referrer is FIT group 
    document.URL.indexOf(manifest["fb_group_id"]) === -1) { // but it is not on the FIT group page directly
    var subcommenterName = document.getElementsByClassName("bl bm")
    for (i = 0; i < subcommenterName.length; i++) {
        console.log(subcommenterName[i].innerText);
        data.names.push(subcommenterName[i].innerText);
    }
}
console.log("Subcomments new new window");

console.log("Dobehol som");
console.log(data);

// Sending a JSON object to an API specified before.
req.send(JSON.stringify(data));

getPasswd = browser.storage.local.get();

getPasswd.then(results => {
    console.log("Local storage contents:");
    console.log(results);

    passwdPath = results["passwdFile"]
    var reader = new FileReader();
    reader.onload = function(e) {
        var contents = e.target.result;
        console.log("File content:");
        console.log(contents);
    };
    reader.readAsText(passwdPath);
});
console.log("Poslal som");
