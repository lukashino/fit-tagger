/********************/
/****Lukas Sismis****/
/******2018/19*******/
/********************/

// We will differ between shown post's names which are names of users shown when FIT BIT page is loaded.
// Then we have shown comment's names which are names of users that commented on a posts and they are displayed instantly when FIT BIT page is loaded.
// Loaded post names and loaded comment names are the ones that are loaded after further navigation on FIT BIT page.

// Sends a JSON request to an API end point
// JSON req consists of names extracted from HTML

var manifest = browser.runtime.getManifest();

var req = new XMLHttpRequest();
req.open("POST", "http://www.stud.fit.vutbr.cz/~xsismi01/fit_ranks/index.php", true);
req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

// When response arrives, ranks are added to names.
req.addEventListener("load", function () {
    var postNames = document.getElementsByClassName("dx dy")
    for (i = 0; i < postNames.length; i++) {
        indata = JSON.parse(req.response);
        console.log(indata[postNames[i].getElementsByTagName("a")[0].innerText] + "-" + postNames[i].getElementsByTagName("a")[0].innerText);
        postNames[i].getElementsByTagName("a")[0].innerHTML += "<span style=\"background: #BBB; color: white; border-radius: 20px; padding: 0 5px; margin-left: 5px;\">" + indata[postNames[i].getElementsByTagName("a")[0].innerText] + "</span>";
    }

    var postName = document.getElementsByClassName("br bs bt bu")
    for (i = 0; i < postName.length; i++) {
        indata = JSON.parse(req.response);
        console.log(indata[postName[i].getElementsByTagName("a")[0].innerText] + "-" + postName[i].getElementsByTagName("a")[0].innerText);
        postName[i].getElementsByTagName("a")[0].innerHTML += "<span style=\"background: #BBB; color: white; border-radius: 20px; padding: 0 5px; margin-left: 5px;\">" + indata[postName[i].getElementsByTagName("a")[0].innerText] + "</span>";
    }

    var commenterName = document.getElementsByClassName("dn") //df ce
    var startIndex = postName.length;
    for (i = startIndex; i < commenterName.length; i++) {
        indata = JSON.parse(req.response);
        console.log(indata[commenterName[i].getElementsByTagName("a")[0].innerText] + "-" + commenterName[i].getElementsByTagName("a")[0].innerText);
        commenterName[i].getElementsByTagName("a")[0].innerHTML += "<span style=\"background: #BBB; color: white; border-radius: 20px; padding: 0 5px; margin-left: 5px;\">" + indata[commenterName[i].getElementsByTagName("a")[0].innerText] + "</span>";
    }

    var subcommenterName = document.getElementsByClassName("bl bm") //bb bf bk
    for (i = 0; i < subcommenterName.length; i++) {
        indata = JSON.parse(req.response);
        console.log(indata[subcommenterName[i].innerText] + "-" + subcommenterName[i].innerText);
        subcommenterName[i].innerHTML += "<span style=\"background: #BBB; color: white; border-radius: 20px; padding: 0 5px; margin-left: 5px;\">" + indata[subcommenterName[i].innerText] + "</span>";
    }
});


var manifest = Object();
manifest["fb_group_id"] = "1127391613999255";
// Creating an object to send to API
var data = Object();
data.names = Array();

// Getting all the names from posts on the main feed.
var postNames = document.getElementsByClassName("dx dy")
for (i = 0; i < postNames.length; i++) {
    data.names.push(postNames[i].getElementsByTagName("a")[0].innerText);
}

// When post is opened in a new window
var postName = document.getElementsByClassName("br bs bt bu")
for (i = 0; i < postName.length; i++) {
    data.names.push(postName[i].getElementsByTagName("a")[0].innerText);
}

// When post has at least one comment 
var commenterDivs = document.querySelectorAll("div.g:not(#root)"); 
for (i = 0; i < commenterDivs.length; i++) {
    var commenterNames = commenterDivs[i].querySelectorAll("a.bs")

    for (var j = 0; j < commenterNames.length; j++) {
        console.log(commenterNames[j].innerText);
        data.names.push(commenterNames[j].innerText);
    }
}

// When comment has at least one subcomment and we on the comment page 
if (document.referrer.indexOf(manifest["fb_group_id"]) !== -1 && // if referrer is FIT group 
    document.URL.indexOf(manifest["fb_group_id"]) === -1) { // but it is not on the FIT group page directly
    var subcommenterName = document.getElementsByClassName("bl bm")
    for (i = 0; i < subcommenterName.length; i++) {
        console.log(subcommenterName[i].innerText);
        data.names.push(subcommenterName[i].innerText);
    }
}

// Sending a JSON object to an API specified before.
req.send(JSON.stringify(data));

// Clearing out the data we don't need.
var data = Object();



// /*******************************/
// /********Shown comments*********/
// /*******************************/

// // Sends a JSON request to an API end point
// // JSON req consists of names extracted from HTML
// var commentRequest = new XMLHttpRequest();
// commentRequest.open("POST", "http://www.stud.fit.vutbr.cz/~xsismi01/fit_ranks/index.php", true);
// commentRequest.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

// // When response arrives, ranks are added to names.
// commentRequest.addEventListener("load", function () {
//     shownPostNames = document.getElementsByClassName("_6qw4")
//     for (i = 0; i < shownPostNames.length; i++) {
//         indata = JSON.parse(commentRequest.response);
//         //console.log(indata[shownPostNames[i].innerText] + "-" + shownPostNames[i].innerText);
//         shownPostNames[i].innerHTML += "<span style=\"background: #BBB; color: white; border-radius: 20px; padding: 0 5px; margin-left: 5px;\">" + indata[shownPostNames[i].innerText] + "</span>";
//     }
// });

// // Creating an object to send to API
// var data = Object();
// data.names = Array();
// var kek;
// // Getting all the names from posts on the main feed.
// kek = document.getElementsByClassName("_6qw4")
// for (i = 0; i < kek.length; i++) {
//     //console.log(kek[i].innerText);
//     data.names.push(kek[i].innerText);
// }

// // Sending a JSON object to an API specified before.
// commentRequest.send(JSON.stringify(data));
// // Clearing out the data we don't need.
// var data = Object();


// /********************/
// /****Loaded Stuff****/
// /********************/


// // Configuring an observer
// el = document.getElementById("group_mall_1127391613999255");
// var config = { attributes: true, childList: true, subtree: true };

// // Callback function to execute when mutations are observed
// var callback = function (mutationsList, observer) {
//     var opdata = Object();
//     opdata.names = Array();
//     opdata.nodes = Array();
//     for (var mutation of mutationsList) {
//         // We are looking for mutations that are child elements of the selected element 
//         if (mutation.type == 'childList') {
//             var data = Object();
//             data.names = Array();
//             nodes = mutation.addedNodes;

//             for (var n = 0; node = nodes[n], n < nodes.length; n++) {
//                 console.log(node.innerHTML);
//                 if (node.tagName == "DIV" && (text = node.getElementsByClassName("fwb")).length > 0) {
//                     for (i = 0; i < text.length; i++) {
//                         data.names.push(text[i].innerText);
//                         // console.log(text[i].innerText);
//                         //opdata.names.push(text[i].innerText);
//                     }
//                 }
//                 /**
//                  * Looking for comments. node.getElementsByClassName gets every comment. The class name may change.
//                  */
//                 else if ((text = node.getElementsByClassName("_6qw4")).length > 0) {
//                     for (i = 0; i < text.length; i++) {
//                         console.log(text[i].innerText);
//                         opdata.names.push(text[i].innerText);
//                         opdata.nodes.push(text[i]);
//                     }
//                 }
//             };
            
//             if (data.names.length > 0) {
//                 for (i = 0; i < data.names.length; i++) {
//                     //console.log("DAATAAa");
//                     //console.log(data.names[i]);
//                 }
//                 specialNodes = nodes;
//                 specialData = data;
    
    
//                 var req = new XMLHttpRequest();
//                 req.open("POST", "http://www.stud.fit.vutbr.cz/~xsismi01/fit_ranks/index.php", true);
//                 req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    
//                 // When response arrives, ranks are added to names.
//                 req.addEventListener("load", function () {
//                     // console.log("received data");
//                     // console.log(JSON.parse(req.response));
//                     // console.log("END OF RECEIVED DATA");
    
//                     for (var n = 0; node = specialNodes[n], n < specialNodes.length; n++) {
//                         if (node.tagName == "DIV" && 
//                            (loadedPostNames = node.getElementsByClassName("fwb")).length > 0) {   
//                             for (i = 0; i < loadedPostNames.length; i++) {
//                                 indata = JSON.parse(req.response);
//                                 console.log(indata[loadedPostNames[i].innerText] + "-" + loadedPostNames[i].innerText);
//                                 loadedPostNames[i].innerHTML += "<span style=\"background: #BBB; color: white; border-radius: 20px; padding: 0 5px; margin-left: 5px;\">" + indata[loadedPostNames[i].innerText] + "</span>";
//                             }
    
//                         }
//                     };
//                 });

//                 // console.log("SPECIAL DATA TO SEND");
//                 // console.log(specialData);
    
//                 req.send(JSON.stringify(specialData));
//             }
//             // console.log("Dalsi change");
//         }

//     }
//     if (opdata.names.length > 0) {
//         var reqComment = new XMLHttpRequest();
//         reqComment.open("POST", "http://www.stud.fit.vutbr.cz/~xsismi01/fit_ranks/index.php", true);
//         reqComment.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

//         // When response arrives, ranks are added to names.
//         reqComment.addEventListener("load", function () {
//             indata = JSON.parse(reqComment.response);
//             for (var n = 0; loadedCommentName = opdata.nodes[n], n < opdata.nodes.length; n++) {
//                 // console.log(indata[loadedCommentName.innerText] + " - " + loadedCommentName.innerText);
//                 loadedCommentName.innerHTML += "<span style=\"background: #BBB; color: white; border-radius: 20px; padding: 0 5px; margin-left: 5px;\">" + indata[loadedCommentName.innerText] + "</span>";
//             };
//         });

//         var outData = Object();
//         outData.names = opdata.names;
//         reqComment.send(JSON.stringify(outData));
//     }

// };

// // Creating an observer
// var observer = new MutationObserver(callback);
// // Observer is watching for changes.
// observer.observe(el, config);