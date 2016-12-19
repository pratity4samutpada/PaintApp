var paletteColors = ["black", "red", "yellow", "blue", "green", "lightblue"];
var selectedColor = "";


var canvassize = {
    default: "regular",
    title: "canvassize",
    value: [20, 40, 60, 80],
    name: ["xsmall", "small", "regular", "large"]
};


var brushsize = {
    default: "small",
    title: "brushsize",
    value: [0, 1, 2],
    name: ["*", "**", "***"]

};

var brushSize = brushsize.value[0];
var canvasX = canvassize.value[2];
var canvasY = canvasX * .66;

//Should be able to set this as canvasX...
//parseInt((document.getElementById("size").options[document.getElementById("size").selectedIndex]).value);


//Creates the menu with palette and other features.
function generateMenu() {
    var menu = document.createElement("div");
    menu.id = "menu";
    document.body.appendChild(menu);
    generatePalette();
    generateDropdown(canvassize);
    generateDropdown(brushsize);
    generateDisplay();//Display should show the name of the option you are hovering over.

}

//Creates color palette based off array of colors. Colors have event listeners and are assigned a function "select".
// Add a (pre-named) color to the array to increase the options.
function generatePalette() {
    for (var i = 0; i < paletteColors.length; i++) {
        var color = document.createElement("div");
        color.id = paletteColors[i];
        color.style.backgroundColor = paletteColors[i];
        color.classList.add("color");
        color.classList.add("clickable");
        color.addEventListener("click", select);
        document.getElementById("menu").appendChild(color);
    }
}

//Takes an object of a predefined structure for the creation of a dropdown menu.
function generateDropdown(object) {
    var values = object.value;
    var names = object.name;
    var dropdown = document.createElement("select");
    dropdown.id = object.title;
    dropdown.classList.add("dropdown");
    dropdown.addEventListener("change", switchOption);
    document.getElementById("menu").appendChild(dropdown);
    for (var i = 0; i < object.value.length; i++) {
        var option = document.createElement("option");
        option.value = object.value[i];
        option.text = object.name[i];
        if (object.name[i] === object.default) {
            option.selected = "selected";
        }
        dropdown.appendChild(option);
    }

}

function switchOption(e) {
    if (e.target.id === canvassize.title) {
        switchSize(e);
    }
    if (e.target.id === brushsize.title) {
        brushSize = (e.target.value);
    }
}


function switchSize(e) {
    canvasX = e.target.value;
    canvasY = canvasX * .66;
    var canvas = document.getElementById("canvas");
    document.body.removeChild(canvas);
    generateCanvas();
}


function showDisplay(e) {
    document.getElementById("display").innerHTML = id.value;
}

function select(e) {
    selectedColor = e.target.id;
    document.getElementById("display").style.backgroundColor = selectedColor;

}

function changeColor(e) {
    if (e.which == 3) {
        e.target.style.backgroundColor = "white";
    }
    if (e.which == 1) {
        if (selectedColor == "") {
            alert("Pick a color.");
            return;
        }
        if (brushSize == 1) {
            e.target.nextSibling.style.backgroundColor = selectedColor;
        }
        if (brushSize == 2) {
            e.target.nextSibling.style.backgroundColor = selectedColor;//Make this sexier.
            e.target.previousSibling.style.backgroundColor = selectedColor;
        }
        e.target.style.backgroundColor = selectedColor;

    }


}

function generateDisplay() {
    var display = document.createElement("div");
    display.id = "display";
    document.getElementById("menu").appendChild(display);

}

function generateCanvas() {
    var canvasMain = document.createElement("div");
    canvasMain.id = "canvas";
    canvasMain.oncontextmenu = function () {
        return false;
    };
    document.body.appendChild(canvasMain);

    for (var i = 1; i <= canvasY; i++) {
        var row = document.createElement("div");
        row.classList.add("row");
        canvasMain.appendChild(row);

        for (var j = 1; j <= canvasX; j++) {
            var unit = document.createElement("div");
            unit.classList.add("unit");
            unit.classList.add("clickable");
            unit.addEventListener("mouseover", changeColor);
            unit.addEventListener("click", changeColor);
            unit.id = i + "_" + j;
            row.appendChild(unit);


        }
    }
}


function init() {
    generateMenu();
    generateCanvas();

}
