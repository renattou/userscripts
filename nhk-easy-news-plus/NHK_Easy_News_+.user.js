// ==UserScript==
// @name        NHK News Easy +
// @author      Renato Vargas
// @namespace   https://github.com/engrato/NHK-Easy-News-Plus
// @description Adds additional control interface for the NHK News Web Easy website.
// @include     http://www3.nhk.or.jp/news/easy/*
// @downloadURL https://github.com/engrato/NHK-Easy-News-Plus/raw/master/NHK_Easy_News_%2B.user.js
// @version     1.1
// @grant       none
// ==/UserScript==

// Execute function after page is loaded.
$(document).ready(addUserInterface());

function addUserInterface() {
    // Creating a new table to hold our buttons
    var tableHtml = "<table style=\"height: 65px; overflow: hidden; position: fixed ! important; right: 19pt; top: 25%; width: 34px; z-index: 1;\" border=\"0\" cellpadding=\"0\" cellspacing=\"5\"><tbody><tr><td><button id=\"btnFuriganaToggle\">Toggle Furigana</button></td></tr><tr><td><button id=\"btnPlacesNamesToggle\">Toggle Places Names</button></td></tr><tr><td><button id=\"btnPeopleNamesToggle\">Toggle People Names</button></td></tr><tr><td><button id=\"btnCompanyNamesToggle\">Toggle Company Names</button></td></tr></tbody></table>";
    document.body.innerHTML = document.body.innerHTML + tableHtml;
    
    // Get our new buttons
    var btnFuriganaToggle = document.getElementById('btnFuriganaToggle');
    var btnPlacesNamesToggle = document.getElementById('btnPlacesNamesToggle');
    var btnPeopleNamesToggle = document.getElementById('btnPeopleNamesToggle');
    var btnCompanyNamesToggle = document.getElementById('btnCompanyNamesToggle');
    
    // Do this when we click btnFurigana
    btnFuriganaToggle.addEventListener('click', function () {
        toggleFurigana();
    }, false);

    // Do this when we click btnPlacesNamesToggle
    btnPlacesNamesToggle.addEventListener('click', function () {
        togglePlacesNames();
    }, false);
    
    // Do this when we click btnPeopleNamesToggle
    btnPeopleNamesToggle.addEventListener('click', function () {
        togglePeopleNames();
    }, false);
    
    // Do this when we click btnCompanyNamesToggle
    btnCompanyNamesToggle.addEventListener('click', function () {
        toggleCompanyNames();
    }, false);

    // Get all furigana elements with tag "rt".
    furigana = document.getElementsByTagName("rt");

    // Get all place names with class "colorL".
    colorL = document.body.getElementsByClassName('colorL');
    
    // Get all people names with class "colorN".
    colorN = document.body.getElementsByClassName('colorN');
    
    // Get all company names with class "colorC".
    colorC = document.body.getElementsByClassName('colorC');
}

// Function to toggle all furigana
function toggleFurigana() {
    // Loop through our nodelist of rt
    for (var i in furigana) {
        // If it isn't being displayed, turn it off
        if (furigana[i].style.display !== 'none') {
            furigana[i].style.display = 'none';
            // Otherwise, turn it on (duh)
        } else {
            furigana[i].style.display = '';
        }
    }
}

// Function to toggle furigana only for places names
function togglePlacesNames() {
    for (var x in colorL) {
        if (colorL[x] !== undefined) {
            for (var y in colorL[x].childNodes) {
                if (colorL[x].childNodes[y].nodeName === "RUBY") {
                    for (var z in colorL[x].childNodes[y].childNodes) {
                        if (colorL[x].childNodes[y].childNodes[z].nodeName === "RT") {
                            rt = colorL[x].childNodes[y].childNodes[z];
                            if (rt.style.display !== "none") {
                                rt.style.display = "none";
                            } else {
                                rt.style.display = "";
                            }
                        }
                    }
                }
            }
        }
    }
}

// Function to toggle furigana only for people names
function togglePeopleNames() {
    for (var x in colorN) {
        if (colorN[x] !== undefined) {
            for (var y in colorN[x].childNodes) {
                if (colorN[x].childNodes[y].nodeName === "RUBY") {
                    for (var z in colorN[x].childNodes[y].childNodes) {
                        if (colorN[x].childNodes[y].childNodes[z].nodeName === "RT") {
                            rt = colorN[x].childNodes[y].childNodes[z];
                            if (rt.style.display !== "none") {
                                rt.style.display = "none";
                            } else {
                                rt.style.display = "";
                            }
                        }
                    }
                }
            }
        }
    }
}

// Function to toggle furigana only for company names
function toggleCompanyNames() {
    for (var x in colorC) {
        if (colorC[x] !== undefined) {
            for (var y in colorC[x].childNodes) {
                if (colorC[x].childNodes[y].nodeName === "RUBY") {
                    for (var z in colorC[x].childNodes[y].childNodes) {
                        if (colorC[x].childNodes[y].childNodes[z].nodeName === "RT") {
                            rt = colorC[x].childNodes[y].childNodes[z];
                            if (rt.style.display !== "none") {
                                rt.style.display = "none";
                            } else {
                                rt.style.display = "";
                            }
                        }
                    }
                }
            }
        }
    }
}
