// ==UserScript==
// @name         NHK Furigana Toggle
// @version      1.0
// @description  Creates two buttons on NHK easy to allow toggle display of all furigana or just places and names
// @author       Michael Schiffer
// @include         http://www3.nhk.or.jp/news/easy/*
// ==/UserScript==

window.onload = function() {

    // Creating a new table to hold our buttons
    var tableHtml = "<table style=\"height: 65px; overflow: hidden; position: fixed ! important; right: 19pt; top: 25%; width: 34px; z-index: 1;\" border=\"0\" cellpadding=\"0\" cellspacing=\"5\"><tbody><tr><td><button id=\"btnFuriganaToggle\">Toggle Furigana</button></td></tr><tr><td><button id=\"btnPlacesNamesToggle\">Toggle Places and Names</button></td></tr></tbody></table>";
    document.body.innerHTML = document.body.innerHTML + tableHtml;
 
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

    // Function to toggle furigana only for places and names
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

   
   

    // Get our new buttons
    var btnFuriganaToggle = document.getElementById('btnFuriganaToggle');
    var btnPlacesNamesToggle = document.getElementById('btnPlacesNamesToggle');


    // Do this when we click btnFurigana
    btnFuriganaToggle.addEventListener('click', function () {
        toggleFurigana();
    }, false);

    // Do this when we click btnPlacesNamesToggle
    btnPlacesNamesToggle.addEventListener('click', function () {
        togglePlacesNames();
    }, false);

    // All furigana elements are in an <rt> tag on NHK easy
    // this makes it very simple to single it out and turn them off.
    furigana = document.getElementsByTagName("rt");

    // All places and names are also easily identified.
    // They can all be found inside of a span with class "colorL"
    colorL = document.body.getElementsByClassName('colorL');
};