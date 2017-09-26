// ==UserScript==
// @name        UtaTen++
// @author      Renato Vargas
// @namespace   https://github.com/renattou/userscripts
// @include     /^https?:\/\/utaten\.com\/lyric\/.*/
// @icon        http://utaten.com/favicon.ico
// @downloadURL hhttps://github.com/renattou/userscripts/raw/master/utaten-plus/UtaTen%2B%2B.user.js
// @version     2.2
// @grant       none
// ==/UserScript==

var size = 24;

$(function() {
    // Remove YouTube button
    var youtube = document.getElementsByClassName('youtubeLink')[0];
    youtube.parentNode.removeChild(youtube);

    // Update ruby elements tags to work with dictionary
    var ruby = document.querySelectorAll('span.ruby');
    var rb = document.querySelectorAll('span.rb');
    var rt = document.querySelectorAll('span.rt');

    for (var i = 0; i < rb.length; i++) {
        rb[i].outerHTML = rb[i].outerHTML.replace(/span/g,"rb");
    }
    for (var i = 0; i < rt.length; i++) {
        rt[i].outerHTML = rt[i].outerHTML.replace(/span/g,"rt");
    }
    for (var i = 0; i < ruby.length; i++) {
        ruby[i].outerHTML = ruby[i].outerHTML.replace(/span/g,"ruby");
    }

    // Update CSS to work on new tags
    var css = document.createElement('style');
    css.type = 'text/css';
    css.innerHTML += 'div.lyricBody ruby rt { color: #999 } ';
    css.innerHTML += 'div.lyricBody ruby rt.rt_hidden { visibility: hidden } ';
    document.body.appendChild(css);

    // Update lyrics font size
    setFontSize(size);
});

window.addEventListener('keydown', function(e) {
    switch (e.keyCode) {
        case 32:
            e.preventDefault();
            // Toggle furigana on space key
            var onButton = document.querySelector('input.rubyButton[value="ON"]');
            var offButton = document.querySelector('input.rubyButton[value="OFF"]');
            if (onButton.hasAttribute("disabled")) {
                offButton.click();
            }
            else {
                onButton.click();
            }
            break;
        case 37:
            e.preventDefault();
            // Decreace size on left arrow key
            setFontSize(size - 1);
            break;
        case 39:
            // Increase size on right arrow key
            e.preventDefault();
            setFontSize(size + 1);
            break;
        default:
            break;
    }
});

function setFontSize(newSize) {
    // Remove old css
    var oldCss = document.querySelector('style.utatenpp');
    if (oldCss) {
        oldCss.parentNode.removeChild(oldCss);
    }

    // Update font sizes
    size = newSize;
    var smallSize = size - 4;
    var largeSize = size + 4;
    var css = document.createElement('style');
    css.classList.add('utatenpp')
    css.type = 'text/css';
    css.innerHTML = 'div.lyricBody div.small { font-size: ' + smallSize + 'px } ';
    css.innerHTML += 'div.lyricBody div.medium { font-size: ' + size + 'px } ';
    css.innerHTML += 'div.lyricBody div.large { font-size: ' + largeSize + 'px } ';
    css.innerHTML += 'div.lyricBody div.small ruby rt { font-size: ' + (10 * (smallSize / 20)) + 'px } ';
    css.innerHTML += 'div.lyricBody div.medium ruby rt { font-size: ' + (10 * (size / 20)) + 'px } ';
    css.innerHTML += 'div.lyricBody div.large ruby rt { font-size: ' + (10 * (largeSize / 20)) + 'px } ';
    document.body.appendChild(css);
}
