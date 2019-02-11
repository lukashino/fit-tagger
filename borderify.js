/********************/
/****Lukas Sismis****/
/******2018/19*******/
/********************/

// We will differ between shown post's names which are names of users shown when FIT BIT page is loaded.
// Then we have shown comment's names which are names of users that commented on a posts and they are displayed instantly when FIT BIT page is loaded.
// Loaded post names and loaded comment names are the ones that are loaded after further navigation on FIT BIT page.

// Sends a JSON request to an API end point
// JSON req consists of names extracted from HTML
var req = new XMLHttpRequest();
req.open("POST", "http://www.stud.fit.vutbr.cz/~xsismi01/fit_ranks/index.php", true);
req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

// When response arrives, ranks are added to names.
req.addEventListener("load", function () {
    shownPostNames = document.getElementsByClassName("fwb")
    for (i = 0; i < shownPostNames.length; i++) {
        indata = JSON.parse(req.response);
        //console.log(indata[shownPostNames[i].innerText] + "-" + shownPostNames[i].innerText);
        shownPostNames[i].innerHTML += "<span style=\"background: #BBB; color: white; border-radius: 20px; padding: 0 5px; margin-left: 5px;\">" + indata[shownPostNames[i].innerText] + "</span>";
    }
});

// Creating an object to send to API
var data = Object();
data.names = Array();
var kek;
// Getting all the names from posts on the main feed.
kek = document.getElementsByClassName("fwb")
for (i = 0; i < kek.length; i++) {
    //console.log(kek[i].innerText);
    data.names.push(kek[i].innerText);
}

//console.log(JSON.stringify(data));
// Sending a JSON object to an API specified before.
req.send(JSON.stringify(data));
// Clearing out the data we don't need.
var data = Object();











/*******************************/
/********Shown comments*********/
/*******************************/

// Sends a JSON request to an API end point
// JSON req consists of names extracted from HTML
var commentRequest = new XMLHttpRequest();
commentRequest.open("POST", "http://www.stud.fit.vutbr.cz/~xsismi01/fit_ranks/index.php", true);
commentRequest.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

// When response arrives, ranks are added to names.
commentRequest.addEventListener("load", function () {
    shownPostNames = document.getElementsByClassName(" UFICommentActorName")
    for (i = 0; i < shownPostNames.length; i++) {
        indata = JSON.parse(commentRequest.response);
        //console.log(indata[shownPostNames[i].innerText] + "-" + shownPostNames[i].innerText);
        shownPostNames[i].innerHTML += "<span style=\"background: #BBB; color: white; border-radius: 20px; padding: 0 5px; margin-left: 5px;\">" + indata[shownPostNames[i].innerText] + "</span>";
    }
});

// Creating an object to send to API
var data = Object();
data.names = Array();
var kek;
// Getting all the names from posts on the main feed.
kek = document.getElementsByClassName(" UFICommentActorName")
for (i = 0; i < kek.length; i++) {
    //console.log(kek[i].innerText);
    data.names.push(kek[i].innerText);
}

//console.log(JSON.stringify(data));
// Sending a JSON object to an API specified before.
commentRequest.send(JSON.stringify(data));
// Clearing out the data we don't need.
var data = Object();




/********************/
/****Loaded Stuff****/
/********************/


// Configuring an observer
el = document.getElementById("group_mall_1127391613999255");
var config = { attributes: true, childList: true, subtree: true };

// Callback function to execute when mutations are observed
var callback = function (mutationsList, observer) {
    var opdata = Object();
    opdata.names = Array();
    opdata.nodes = Array();
    for (var mutation of mutationsList) {
        // We are looking for mutations that are child elements of the selected element 
        if (mutation.type == 'childList') {
            var data = Object();
            data.names = Array();
            nodes = mutation.addedNodes;

            for (var n = 0; node = nodes[n], n < nodes.length; n++) {
                if (node.tagName == "DIV" && (text = node.getElementsByClassName("fwb")).length > 0) {
                    for (i = 0; i < text.length; i++) {
                        data.names.push(text[i].innerText);
                        // console.log(text[i].innerText);
                        //opdata.names.push(text[i].innerText);
                    }
                }
                else if (node.tagName == "DIV" && (text = node.getElementsByClassName(" UFICommentActorName")).length > 0) {
                    for (i = 0; i < text.length; i++) {
                        opdata.names.push(text[i].innerText);
                        opdata.nodes.push(text[i]);
                    }
                }
            };
            
            if (data.names.length > 0) {
                for (i = 0; i < data.names.length; i++) {
                    console.log("DAATAAa");
                    console.log(data.names[i]);
                }
                specialNodes = nodes;
                specialData = data;
    
    
                var req = new XMLHttpRequest();
                req.open("POST", "http://www.stud.fit.vutbr.cz/~xsismi01/fit_ranks/index.php", true);
                req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    
                // When response arrives, ranks are added to names.
                req.addEventListener("load", function () {
                    console.log("received data");
                    console.log(JSON.parse(req.response));
                    console.log("END OF RECEIVED DATA");
    
                    for (var n = 0; node = specialNodes[n], n < specialNodes.length; n++) {
                        if (node.tagName == "DIV" && 
                           (loadedPostNames = node.getElementsByClassName("fwb")).length > 0) {   
                            for (i = 0; i < loadedPostNames.length; i++) {
                                indata = JSON.parse(req.response);
                                console.log(indata[loadedPostNames[i].innerText] + "-" + loadedPostNames[i].innerText);
                                loadedPostNames[i].innerHTML += "<span style=\"background: #BBB; color: white; border-radius: 20px; padding: 0 5px; margin-left: 5px;\">" + indata[loadedPostNames[i].innerText] + "</span>";
                            }
    
                        }
                    };
                });

                console.log("SPECIAL DATA TO SEND");
                console.log(specialData);
    
                req.send(JSON.stringify(specialData));
            }
            console.log("Dalsi change");
        }

    }
    if (opdata.names.length > 0) {
        var reqComment = new XMLHttpRequest();
        reqComment.open("POST", "http://www.stud.fit.vutbr.cz/~xsismi01/fit_ranks/index.php", true);
        reqComment.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

        // When response arrives, ranks are added to names.
        reqComment.addEventListener("load", function () {
            indata = JSON.parse(reqComment.response);
            for (var n = 0; loadedCommentName = opdata.nodes[n], n < opdata.nodes.length; n++) {
                console.log(indata[loadedCommentName.innerText] + " - " + loadedCommentName.innerText);
                loadedCommentName.innerHTML += "<span style=\"background: #BBB; color: white; border-radius: 20px; padding: 0 5px; margin-left: 5px;\">" + indata[loadedCommentName.innerText] + "</span>";
            };
        });

        var outData = Object();
        outData.names = opdata.names;
        reqComment.send(JSON.stringify(outData));
    }

};

// Creating an observer
var observer = new MutationObserver(callback);
// Observer is watching for changes.
observer.observe(el, config);