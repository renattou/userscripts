// ==UserScript==
// @name        Calculate Average - scrumpoker-online.org
// @match       https://www.scrumpoker-online.org/*
// @grant       none
// @version     1.1
// @author      JasperV <jasper@vanveenhuizen.nl> (Modified by Renato Vargas)
// ==/UserScript==

function initAverageCalc() {
    let p1 = document.createElement("p")
    p1.innerHTML = "number of people: "
    let peopleSpan = document.createElement("span")
    peopleSpan.innerHTML = "?"
    p1.appendChild(peopleSpan)

    let p2 = document.createElement("p")
    p2.innerHTML = "mean: "
    let averageSpan = document.createElement("span")
    averageSpan.innerHTML = "?"
    p2.appendChild(averageSpan)

    let p3 = document.createElement("p")
    p3.innerHTML = "median: "
    let medianSpan = document.createElement("span")
    medianSpan.innerHTML = "?"
    p3.appendChild(medianSpan)

    let p4 = document.createElement("p")
    p4.innerHTML = "ocurrences: "
    let ocurrencesSpan = document.createElement("span")
    ocurrencesSpan.innerHTML = "?"
    p4.appendChild(ocurrencesSpan)

    let results = document.getElementsByClassName("results-content")[0]
    results.prepend(p1)
    results.prepend(p2)
    results.prepend(p3)
    results.prepend(p4)

    let button = document.createElement("button")
    button.innerHTML = "Calculate Average"

    button.addEventListener("click", function()
    {
        let elements = document.getElementsByClassName("mat-column-storyPoints")
        let points = []
        for (let i = 0; i < elements.length; ++i)
        {
            let value = parseInt(elements[i].innerText, 10)
            if (typeof value != 'number' || isNaN(value)) {
                continue
            }
            points.push(value)
        }
        peopleSpan.innerText = count(points)
        averageSpan.innerText = average(points)
        medianSpan.innerText = median(points)
        ocurrencesSpan.innerText = ocurrences(points)
    })

    document.getElementsByClassName("results-buttons")[0].appendChild(button)
}

function count(values) {
    var count = 0;

    values.forEach(function(item, index) {
        count++;
    });

    return count;
}

function average(values) {
    var total = 0;
    var count = 0;

    values.forEach(function(item, index) {
        total += item;
        count++;
    });

    return total / count;
}

function median(values){
  if (values.length ===0) return 0;

  values.sort(function(a,b) {
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

function waitForElement() {
    let results = document.getElementsByClassName("results-content")[0]
    if (typeof results !== "undefined") {
        initAverageCalc()
    }
    else {
        setTimeout(waitForElement, 250)
    }
}
waitForElement()
