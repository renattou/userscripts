// ==UserScript==
// @name        Calculate Average - scrumpoker-online.org
// @match       https://www.scrumpoker-online.org/*
// @grant       none
// @version     1.2
// @author      JasperV <jasper@vanveenhuizen.nl> (Modified by Renato Vargas)
// ==/UserScript==

function wasSetup() {
    return document.getElementsByClassName("average").length > 0;
}

function clear() {
    let pElements = document.getElementsByClassName("average");
    for (let i = 0; i < pElements.length; ++i) {
        pElements[i].remove();
    }
}

function addField(container, name) {
    let p = document.createElement("p");
    p.classList.add("average");
    p.innerHTML = name + ": ";
    p.style.margin = "0 0 8px 0"
    let span = document.createElement("span");
    span.innerHTML = "?";
    p.appendChild(span);
    container.prepend(p);
    return span;
}

function setup() {
    let container = document.getElementsByClassName("results-content")[0];
    ocurrencesSpan = addField(container, "Ocurrences");
    medianSpan = addField(container, "Median");
    averageSpan = addField(container, "Mean");
    peopleSpan = addField(container, "# of People");
}

function averageCalc() {
    let pointsElements = document.getElementsByClassName("mat-column-storyPoints");
    let points = [];
    for (let i = 0; i < pointsElements.length; ++i) {
        let value = parseInt(pointsElements[i].innerText, 10);
        if (typeof value != 'number' || isNaN(value)) continue;
        points.push(value);
    }

    peopleSpan.innerText = count(points);
    averageSpan.innerText = average(points);
    medianSpan.innerText = median(points);
    ocurrencesSpan.innerText = ocurrences(points);
}

function count(values) {
    var count = 0;

    values.forEach(function (item, index) {
        count++;
    });

    return count;
}

function average(values) {
    var total = 0;
    var count = 0;

    values.forEach(function (item, index) {
        total += item;
        count++;
    });

    return total / count;
}

function median(values) {
    if (values.length === 0) return 0;

    values.sort(function (a, b) {
        return a - b;
    });

    var half = Math.floor(values.length / 2);

    if (values.length % 2) return values[half];

    return (values[half - 1] + values[half]) / 2.0;
}

function ocurrences(values) {
    let a = [],
        b = [],
        arr = [...values], // clone array so we don't change the original when using .sort()
        prev;

    arr.sort();
    for (let element of arr) {
        if (element !== prev) {
            a.push(element);
            b.push(1);
        }
        else ++b[b.length - 1];
        prev = element;
    }

    let str = ""
    for (let i = 0; i < count(a); i++) {
        str += b[i] + " x " + a[i];
        if (i < count(a) - 1) str += " | "
    }

    return str;
}

var peopleSpan, averageSpan, medianSpan, ocurrencesSpan;

function updateInfo() {
    if (document.getElementsByClassName("mat-column-storyPoints").length) {
        if (!wasSetup()) setup();
        averageCalc();
    } else if (wasSetup()) {
        clear();
    }

    setTimeout(function () {
        updateInfo();
    }, 100);
};

updateInfo();
