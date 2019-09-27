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

var passwdContent = "";

/*
Add the passwd file to the script by:
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

const LogLevel = {
    "ERROR" : 0,
    "WARNING" : 1,
    "INFO" : 2,
    "DEBUG" : 3
}

class Logging {
    constructor(loglevel) {
        this._logLevel = loglevel;
    }

    log(loglevel, message) {
        if (loglevel <= this._logLevel) 
            console.log(message)
    }
}

const capitalize = (s) => {
    if (typeof s !== 'string') return ''
    return s[0].toUpperCase() + s.slice(1).toLowerCase()
}

RegExp.escape= function(s) {
    return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
};

const logging = new Logging(LogLevel.DEBUG);


class PasswdManager {
    constructor() {
        console.log("CReAAAAAAAAATING NEW PASSWD MANAGER");
        //this._passwdContents = "";
    }

    async readPasswd() {
        logging.log(LogLevel.WARNING, "READ storage contents:");
        var getPasswd = browser.storage.local.get();

        this._passwdContents = "TERAZ SOM TOTO NAHRAL DO PASSWD CONTETNS"
        
        getPasswd.then(results => {
            logging.log(LogLevel.WARNING, "Local storage contents:");
            logging.log(LogLevel.WARNING, results);

            logging.log(LogLevel.WARNING, "PASSWD FILE BEFORE");
            var passwdFile = results["passwdFile"];
            logging.log(LogLevel.WARNING, passwdFile);
            logging.log(LogLevel.WARNING, "PASSWD FILE AFTER");
            if (passwdFile) {
                var reader = new FileReader();
                reader.onload = function(e) {
                    this._passwdContents = e.target.result;
                    passwdContent = e.target.result;
                    
                    // this._passwdContents = (' ' + e.target.result).slice(1);
                    logging.log(LogLevel.DEBUG, "File content:");
                    logging.log(LogLevel.DEBUG, this._passwdContents);
                    console.log("OLIVEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEER");
                };

                reader.readAsText(passwdFile);
            }
            else {
                logging.log(LogLevel.WARNING, "PASSWD FILE NOT LOADED")
            }

            console.log("PO PASSWD FILE NACITANI");
        });
    }

    async getRank(name) {
        console.log("SOM VGET RANKU");
        console.log(this);
        var kek = await this.readPasswd();
        console.log("Po read passwd");
        console.log(this);


        var surname = this.sanitizeSurname(name);
        var fullName = this.sanitizeName(name);

        logging.log(LogLevel.INFO, "SurName: " + surname);
        logging.log(LogLevel.INFO, "FullName: " + fullName);

        var surnameRegExp = this.nameToRegExp(surname);
        var fullNameRegExp = this.nameToRegExp(fullName);
        logging.log(LogLevel.INFO, "Names regexes done");

        var ranks = Array();
        var fullNameMatches = passwdContent.match(fullNameRegExp);
        logging.log(LogLevel.INFO, "Matches matched");
        logging.log(LogLevel.INFO, fullNameMatches);
        logging.log(LogLevel.INFO, "Passwd contents getRank");
        logging.log(LogLevel.INFO, this._passwdContents);
        var rankRegExp = new RegExp(",([^:]+):");
        for (var nameMatch of fullNameMatches) {
            var rankArr = nameMatch.match(rankRegExp)
            
            if (rankArr.length === 2)
                ranks.push(rankArr[1]);
        }

        logging.log(LogLevel.INFO, "RANKS FOR NAME: " + fullName);
        logging.log(LogLevel.INFO, ranks);
        return ranks;
    }

    parseName(name) {
        var nameNoAccents = name.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        return nameNoAccents.split(" ");
    }

    sanitizeName(name) {
        var nameArr = this.parseName(name);
        logging.log(LogLevel.INFO, "Parsed name: ");
        logging.log(LogLevel.INFO, nameArr);
        return capitalize(nameArr[nameArr.length - 1]) + " " + capitalize(nameArr[0]);
    }

    sanitizeSurname(surname) {
        var nameArr = this.parseName(surname);
        logging.log(LogLevel.INFO, "Parsed surname: ");
        logging.log(LogLevel.INFO, nameArr);
        return capitalize(nameArr[nameArr.length - 1]);
    }

    nameToRegExp(name) {
        var escapedName = RegExp.escape(name);
        return new RegExp("^.*" + escapedName + ".*$", "gm");
    }
}


var passwdManager = new PasswdManager();
passwdManager.readPasswd();

function hladaj() {
    logging.log(LogLevel.DEBUG, passwdManager.getRank("Lukáš Šišmiš"));

    var req = new XMLHttpRequest();
    req.open("POST", "http://www.stud.fit.vutbr.cz/~xsismi01/fit_ranks/index.php", true);
    req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

    // When response arrives, ranks are added to names.
    req.addEventListener("load", function () {
        logging.log(LogLevel.INFO, "CasdAU!");
        logging.log(LogLevel.INFO, req.response);
        logging.log(LogLevel.INFO, "dsadCAU!");
        logging.log(LogLevel.INFO, "CasdaAU!");
        logging.log(LogLevel.INFO, "asdadsaCAU!");
        // var postNames = document.getElementsByClassName("h3.dx.dy")
        // for (i = 0; i < postNames.length; i++) {
        //     indata = JSON.parse(req.response);
        //     logging.log(LogLevel.INFO, indata[postNames[i].getElementsByTagName("a")[0].innerText] + "-" + postNames[i].getElementsByTagName("a")[0].innerText);
        //     postNames[i].getElementsByTagName("a")[0].innerHTML += "<span style=\"background: #BBB; color: white; border-radius: 20px; padding: 0 5px; margin-left: 5px;\">" + indata[postNames[i].getElementsByTagName("a")[0].innerText] + "</span>";
        // }

        // var postName = document.getElementsByClassName("br bs bt bu")
        // for (i = 0; i < postName.length; i++) {
        //     indata = JSON.parse(req.response);
        //     logging.log(LogLevel.INFO, indata[postName[i].getElementsByTagName("a")[0].innerText] + "-" + postName[i].getElementsByTagName("a")[0].innerText);
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
        //         logging.log(LogLevel.INFO, indata[name.innerText] + "-" + name.innerText);
        //         name.innerHTML += "<span style=\"background: #BBB; color: white; border-radius: 20px; padding: 0 5px; margin-left: 5px;\">" + indata[name.innerText] + "</span>";
        //     }	
        // }

        // if (document.referrer.indexOf(manifest["fb_group_id"]) !== -1 && // if referrer is FIT group 
        //     document.URL.indexOf(manifest["fb_group_id"]) === -1) { // but it is not on the FIT group page directly
        //     var subcommenterName = document.getElementsByClassName("bl bm")
        //     for (i = 0; i < subcommenterName.length; i++) {
        //         indata = JSON.parse(req.response);
        //         logging.log(LogLevel.INFO, indata[subcommenterName[i].innerText] + "-" + subcommenterName[i].innerText);
        //         subcommenterName[i].innerHTML += "<span style=\"background: #BBB; color: white; border-radius: 20px; padding: 0 5px; margin-left: 5px;\">" + indata[subcommenterName[i].innerText] + "</span>";
        //     }
        // }
    });

    var manifest = Object();
    manifest["fb_group_id"] = "1127391613999255";
    // Creating an object to send to API
    var data = Object();
    data.names = Array();

    // Getting all the names from posts on the main feed.
    var postNames = document.querySelectorAll("h3.dx.dy")
    for (i = 0; i < postNames.length; i++) {
        // data.names.push(postNames[i].getElementsByTagName("a")[0].innerText);
        var name = postNames[i].getElementsByTagName("a")[0].innerText;
        var rank = passwdManager.getRank(name).join(", ");
        console.log(name + "has rank: " + rank);
        postNames[i].getElementsByTagName("a")[0].innerHTML += "<span style=\"background: #BBB; color: white; border-radius: 20px; padding: 0 5px; margin-left: 5px;\">" + rank + "</span>";
    }

    logging.log(LogLevel.INFO, "POSTS MAIN FEED");
    // When post is opened in a new window
    var postName = document.getElementsByClassName("br bs bt bu")
    for (i = 0; i < postName.length; i++) {
        data.names.push(postName[i].getElementsByTagName("a")[0].innerText);
    }

    logging.log(LogLevel.INFO, "POSTS NEW WINDOW");
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
    logging.log(LogLevel.INFO, "Comments new window");

    // When comment has at least one subcomment and we on the comment page 
    if (document.referrer.indexOf(manifest["fb_group_id"]) !== -1 && // if referrer is FIT group 
        document.URL.indexOf(manifest["fb_group_id"]) === -1) { // but it is not on the FIT group page directly
        var subcommenterName = document.getElementsByClassName("bl bm")
        for (i = 0; i < subcommenterName.length; i++) {
            logging.log(LogLevel.INFO, subcommenterName[i].innerText);
            data.names.push(subcommenterName[i].innerText);
        }
    }
    logging.log(LogLevel.INFO, "Subcomments new new window");

    logging.log(LogLevel.INFO, "Data");
    logging.log(LogLevel.INFO, data);

    // Sending a JSON object to an API specified before.
    req.send(JSON.stringify(data));


    logging.log(LogLevel.INFO, "Poslal som");


    // logging.log(LogLevel.DEBUG, passwdManager.getRank("Oliver Chmelický"));

}

setTimeout(hladaj, 3000);
