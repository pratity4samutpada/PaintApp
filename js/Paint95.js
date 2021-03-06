
var paletteColors = ["black", "red", "yellow", "blue", "green", "purple"];
var selectedColor = "";
var eraser = "white";

var canvassize = {
    default: "regular",
    title: "canvassize",
    value: [20, 40, 60, 80],
    name: ["xsmall", "small", "regular", "large"],
    func: function (e) {
        canvasX = e.target.value;
        canvasY = canvasX * .66;
        var canvas = document.getElementById("canvas");
        document.body.removeChild(canvas);
        generateCanvas(canvasY,canvasX,[]);
        bordertype.func(e);
        document.getElementById("bordertype").value = "none";
    }

};

var brushsize = {
        default: "small",
        title: "brushsize",
        value: [0, 1, 2, 3],
        name: ["*", "**", "***", "****"],
        func: function (e) {
            brushSize = (e.target.value)
        }
    }
    ;

var bordertype = {
    default: "none",
    title: "bordertype",
    value: ["none", "solid", "dotted", "dashed"],
    name: ["none", "solid", "dotted", "dashed"],
    func: function (e) {
        var array = document.getElementsByClassName("unit");
        for (var i = 0; i < array.length; i++) {
            array[i].style.borderStyle = e.target.value;
        }
    }
};

var fillClear = {
    default: " ",
    title: "fillClear",
    value: ["eraser","selectedColor","undefined"],
    name: ["clear","fill"," "],
    func: function(e){
            var array = document.getElementsByClassName("unit");
            for (var i = 0; i < array.length; i++) {
                array[i].style.backgroundColor = window[e.target.value];
            }
        document.getElementById(fillClear.title).value = fillClear.default;
        }

};



var brushSize = brushsize.value[0];
var canvasX = canvassize.value[2];
var canvasY = canvasX * .66;




//Creates the menu with palette and other features.
function generateMenu() {
    var menu = document.createElement("div");
    menu.id = "menu";
    document.body.appendChild(menu);
    generatePalette();
    generateDropdown(canvassize);
    generateDropdown(brushsize);
    generateDropdown(bordertype);
    generateDropdown(fillClear);
    generateTextInput();
    generateDisplay();
    generateSaveLoad();

}


function generatePalette() {
    var menu = document.getElementById("menu");
    for (var i = 0; i < paletteColors.length; i++) {
        var color = document.createElement("div");
        color.id = paletteColors[i];
        color.style.backgroundColor = paletteColors[i];
        color.classList.add("color");
        color.classList.add("clickable");
        color.addEventListener("click", select);
        menu.appendChild(color);
    }
    var customColor = document.createElement("INPUT");
    customColor.id = "customColor";
    customColor.setAttribute("type", "color");
    menu.appendChild(customColor);
    var customButton = document.createElement("INPUT");
    customButton.id = "customButton";
    customButton.setAttribute("type","button");
    customButton.value = "set";
    customButton.classList.add("clickable");
    customButton.addEventListener("click", select);
    menu.appendChild(customButton);

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
    window[e.target.id].func(e);
}


function select(e) {
    if(e.target.id == "customButton"){
        selectedColor = document.getElementById("customColor").value;
    }else{
        selectedColor = e.target.id;
    }
    document.getElementById("display").style.backgroundColor = selectedColor;
}

function changeColor(e) {
    if (e.which == 3) {
        if (brushSize > 0) {
            e.target.nextSibling.style.backgroundColor = eraser;
        }
        if (brushSize > 1) {
            e.target.previousSibling.style.backgroundColor = eraser;
        }
        e.target.style.backgroundColor = eraser;
    }
    if (e.which == 1) {
        if (selectedColor == "") {
            alert("Pick a color.");
            return;
        }

        if (brushSize > 0) {
            e.target.nextSibling.style.backgroundColor = selectedColor;
        }
        if (brushSize > 1) {
            e.target.previousSibling.style.backgroundColor = selectedColor;
        }
        if (brushSize > 2) {
            var target = (e.target.id.toString()).split("_");
            var yAxisMinus = parseInt(target[0]-1);
            var yAxisPlus = parseInt(target[0])+1;
            var yAxisId = document.getElementById(yAxisMinus+ "_" + (target[1]));
            var yAxisPlusId = document.getElementById(yAxisPlus+ "_" + (target[1]));
            yAxisId.style.backgroundColor=selectedColor;
            yAxisPlusId.style.backgroundColor=selectedColor;
            yAxisId.previousSibling.style.backgroundColor = selectedColor;
            yAxisId.nextSibling.style.backgroundColor = selectedColor;
            yAxisPlusId.previousSibling.style.backgroundColor = selectedColor;
            yAxisPlusId.nextSibling.style.backgroundColor = selectedColor;

        }e.target.style.backgroundColor = selectedColor;


    }
}

function generateDisplay() {
    var display = document.createElement("div");
    display.id = "display";
    document.getElementById("menu").appendChild(display);

}
function generateTextInput(){
    var input = document.createElement("INPUT");
    input.id = "url";
    input.setAttribute("type","text");
    input.placeholder = "image url";
    document.getElementById("menu").appendChild(input);
    var button = document.createElement("INPUT");
    button.id ="submiturl";
    button.setAttribute("type","button");
    button.value = "reset";
    button.addEventListener("click",setCanvasImg);
    document.getElementById("menu").appendChild(button);
}

function setCanvasImg(){
    var url = document.getElementById("url").value;
    if (url=="" || url.length <10 ){alert("Enter an image URL before resetting!")
        return;}
    document.getElementById("canvas").style.backgroundImage = "url("+url+")";
    var array = document.getElementsByClassName("unit");
    for (var i = 0; i < array.length; i++) {
        array[i].style.backgroundColor = "transparent";
    }
}

function generateCanvas(y,x,array) {
    var canvasMain = document.createElement("div");
    canvasMain.id = "canvas";
    canvasMain.oncontextmenu = function () {
        return false;
    };
    document.body.appendChild(canvasMain);

    for (var i = 1; i <= y; i++) {
        var row = document.createElement("div");
        row.classList.add("row");
        canvasMain.appendChild(row);

        for (var j = 1; j <= x; j++) {
            var unit = document.createElement("div");
            unit.classList.add("unit");
            unit.classList.add("clickable");
            if (array.length>0){
                unit.style.backgroundColor=array[((x*(i-1))+ (j))];
            }else{unit.style.backgroundColor = "white";}
            unit.addEventListener("mouseover", changeColor);
            unit.addEventListener("click", changeColor);
            unit.id = i + "_" + j;
            row.appendChild(unit);

        }
    }
}


function generateSaveLoad(){
    var sbutton = document.createElement("INPUT");
    sbutton.id ="save";
    sbutton.setAttribute("type","button");
    sbutton.value = "save";
    sbutton.addEventListener("click",saveImage);
    document.getElementById("menu").appendChild(sbutton);
    var lbutton = document.createElement("INPUT");
    lbutton.id ="load";
    lbutton.setAttribute("type","button");
    lbutton.value = "load";
    lbutton.addEventListener("click",loadImage);
    document.getElementById("menu").appendChild(lbutton);
}



function saveImage(){
    var toSave = {size:document.getElementById('canvassize').value};
    var array = document.getElementsByClassName("unit");
    for(var i = 0; i < array.length; i++){
      toSave[array[i].id] = array[i].style.backgroundColor;
    }
    if(document.getElementById('canvas').style.backgroundImage !=""){
        toSave['url'] = document.getElementById("url").value;
    }
    var newSave = prompt("Save image as...");
    localStorage.setItem(newSave,JSON.stringify(toSave));
}

function loadImage(){
    var loadWhich = prompt("Load which image?");
    var saved = JSON.parse(localStorage.getItem(loadWhich));
    var xAxis = saved.size;
    document.getElementById('canvassize').value = xAxis;
    var colorValues = new Array;
    for(var c in saved) {
        colorValues.push(saved[c]);
    }
    var canvas = document.getElementById("canvas");
    document.body.removeChild(canvas);
    generateCanvas((xAxis*.66),xAxis,colorValues);
    if(saved.url){
    document.getElementById('canvas').style.backgroundImage = "url("+saved.url+")"};
}


function init() {
    generateMenu();
    generateCanvas(canvasY,canvasX,[]);

}
