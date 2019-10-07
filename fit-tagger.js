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
var manifest = Object();
manifest["fb_group_id"] = "1127391613999255";
manifest["fb_group_ids"] = [
    "1127391613999255", //FIT BIT 2016 - 2019
    "1889426788049352", //FIT BIT 2017 - 2020
    "1697217713649334", //FIT BIT 2018 - 2021
    "605850019828728",  //FIT BIT 2019 - 2022
    "1502394016560101", //FIT MIT 2019 - 2021
    "1052721498078979", //FIT BIT 2015 - 2018
    "2002665913382033"  //FIT MIT 2018 - 2020
];

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

var readPasswd = new Promise(function(resolve, reject) {
    logging.log(LogLevel.DEBUG, "READ storage contents:");
    var getPasswd = browser.storage.local.get();

    getPasswd.then(results => {
        logging.log(LogLevel.DEBUG, "Local storage contents:");
        logging.log(LogLevel.DEBUG, results);

        var passwdFile = results["passwdFile"];
        if (passwdFile) {
            var reader = new FileReader();
            reader.onload = function(e) {
                // passwdContent = e.target.result;
                
                resolve(e.target.result);
            };

            reader.readAsText(passwdFile);
        }
        else {
            reject(Error("PASSWD FILE NOT LOADED"));
        }
    });
});

function getRank(passwdContent, name) {
    var surname = this.sanitizeSurname(name);
    var fullName = this.sanitizeName(name);

    logging.log(LogLevel.DEBUG, "Surname: " + surname);
    logging.log(LogLevel.DEBUG, "FullName: " + fullName);

    var surnameRegExp = this.nameToRegExp(surname);
    var fullNameRegExp = this.nameToRegExp(fullName);
    logging.log(LogLevel.DEBUG, "Names regexes done");

    var ranks = Array();
    var fullNameMatches = passwdContent.match(fullNameRegExp);
    if (fullNameMatches) {
        logging.log(LogLevel.DEBUG, "Fullname's matches");
        logging.log(LogLevel.DEBUG, fullNameMatches);

        var rankRegExp = new RegExp(",([^:]+):");
        for (var nameMatch of fullNameMatches) {
            var rankArr = nameMatch.match(rankRegExp)
            
            if (rankArr.length === 2)
                ranks.push(rankArr[1]);
        }
    }
    else {
        var surnameMatches = passwdContent.match(surnameRegExp);
        if (surnameMatches && surnameMatches.length === 1) {
            logging.log(LogLevel.DEBUG, "Surname's matches");
            logging.log(LogLevel.DEBUG, surnameMatches);

            var rankRegExp = new RegExp(",([^:]+):");
            for (var nameMatch of surnameMatches) {
                var rankArr = nameMatch.match(rankRegExp)
                
                if (rankArr.length === 2)
                    ranks.push(rankArr[1]);
            }
        }
    }

    logging.log(LogLevel.DEBUG, "RANKS FOR NAME: " + fullName);
    logging.log(LogLevel.DEBUG, ranks);
    return ranks;
}

function parseName(name) {
    var nameNoAccents = name.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    return nameNoAccents.split(" ");
}

function sanitizeName(name) {
    var nameArr = this.parseName(name);
    logging.log(LogLevel.DEBUG, "Parsed name: ");
    logging.log(LogLevel.DEBUG, nameArr);
    return capitalize(nameArr[nameArr.length - 1]) + " " + capitalize(nameArr[0]);
}

function sanitizeSurname(surname) {
    var nameArr = this.parseName(surname);
    logging.log(LogLevel.DEBUG, "Parsed surname: ");
    logging.log(LogLevel.DEBUG, nameArr);
    return capitalize(nameArr[nameArr.length - 1]);
}

function nameToRegExp(name) {
    var escapedName = RegExp.escape(name);
    return new RegExp("^.*" + escapedName + ".*$", "gm");
}

function hladaj(passwdContentParam) {
    var passwdContent = passwdContentParam;

    // Getting all the names from posts on the main feed.
    var postNames = document.querySelectorAll("td.v.bo div h3.bu")
    if (postNames.length === 0) {
        postNames = document.querySelectorAll("td.u.bn div h3.bt");
    }
    
    for (i = 0; i < postNames.length; i++) {
        var name = postNames[i].getElementsByTagName("a")[0].innerText;
        var ranks = getRank(passwdContent, name);
        if (ranks.length > 0) {
            var rank = ranks.join(", ");
            logging.log(LogLevel.INFO, name + " has rank: " + rank);
            postNames[i].getElementsByTagName("a")[0].innerHTML += "<span style=\"background: #BBB; color: white; border-radius: 20px; padding: 0 5px; margin-left: 5px;\">" + rank + "</span>";
        }
    }
    logging.log(LogLevel.DEBUG, "POSTS MAIN FEED");

    // When post is opened in a new window
    var postName = document.getElementsByClassName("br bs bt bu")
    if (postName.length === 0) {
        postName = document.getElementsByClassName("bu bv bw bx");
    }
    for (i = 0; i < postName.length; i++) {
        var name = postName[i].getElementsByTagName("a")[0].innerText;
        var ranks = getRank(passwdContent, name);
        if (ranks.length > 0) {
            var rank = ranks.join(", ");
            logging.log(LogLevel.INFO, name + " has rank: " + rank);
            postName[i].getElementsByTagName("a")[0].innerHTML += "<span style=\"background: #BBB; color: white; border-radius: 20px; padding: 0 5px; margin-left: 5px;\">" + rank + "</span>";
        }
    }
    logging.log(LogLevel.DEBUG, "POSTS NEW WINDOW");

    // When post has at least one comment 
    var rootDiv = document.querySelectorAll("div.g:not(#root)")
    if (rootDiv) {
        for (var i = 0; i < rootDiv.length; i++) {
            if (rootDiv[i].id.indexOf("ufi_") === -1) 
                continue;

            var comments = null;
            try {
                comments = rootDiv[i].querySelectorAll("div")[0].childNodes[3].childNodes                
            }
            catch (error) {
                logging.log(LogLevel.ERROR, error);
            }
            
            for (var j = 0; j < comments.length; j++) {
                var nameElem = comments[j].querySelector("div h3 a");
                if (!nameElem) // if null
                    continue;
    
                var name = nameElem.innerText;
                var ranks = getRank(passwdContent, name);
                if (ranks.length > 0) {
                    var rank = ranks.join(", ");
                    logging.log(LogLevel.INFO, name + " has rank: " + rank);
                    comments[j].querySelector("div h3 a").innerHTML += "<span style=\"background: #BBB; color: white; border-radius: 20px; padding: 0 5px; margin-left: 5px;\">" + rank + "</span>";
                }
            }	
        }
        logging.log(LogLevel.DEBUG, "Comments new window");
    }

    // When comment has at least one subcomment and we on the comment page 
    var isSubcommentSection = false;
    for (var fbGroupId of manifest["fb_group_ids"]) {
        var isRefererFITGroup = document.referrer.indexOf(fbGroupId) !== -1; // if referrer is FIT group 
        var isVisitingFITGroup = document.URL.indexOf(fbGroupId) === -1; // but it is not on the FIT group page directly

        if (isRefererFITGroup && isVisitingFITGroup)
            isSubcommentSection = true;
    }

    if (isSubcommentSection) {
        var subcommenterName = document.getElementsByClassName("bl bm")
        for (i = 0; i < subcommenterName.length; i++) {
            var name = subcommenterName[i].innerText;
            var ranks = getRank(passwdContent, name);
            if (ranks.length > 0) {
                var rank = ranks.join(", ");
                logging.log(LogLevel.INFO, name + " has rank: " + rank);
                subcommenterName[i].innerHTML += "<span style=\"background: #BBB; color: white; border-radius: 20px; padding: 0 5px; margin-left: 5px;\">" + rank + "</span>";
            }
        }
    }
    logging.log(LogLevel.DEBUG, "Subcomments new new window");
}

readPasswd.then(function(result){
    hladaj(result);
}, function(error){
    logging.log(LogLevel.INFO, error);
});

