document.getElementById("createDivButton").addEventListener("click", createDraggableDiv);
document.getElementById("clearAllButton").addEventListener("click", clearAllDivs);

// Load saved positions and create draggable divs
window.onload = function() {
    const container = document.getElementById("container");
    const savedDivs = JSON.parse(localStorage.getItem('draggableDivs')) || [];
    
    savedDivs.forEach((divData, index) => {
        const newDiv = document.createElement("div");
        newDiv.className = `draggable ${divData.shape}`;
        newDiv.textContent = "Drag me!";
        newDiv.style.top = divData.top;
        newDiv.style.left = divData.left;
        newDiv.dataset.id = index; // Assign a unique ID to each div
        
        // Add remove button to the div
        const removeButton = document.createElement("button");
        removeButton.className = "remove-button";
        removeButton.textContent = "X";
        removeButton.onclick = () => removeDiv(newDiv);
        
        newDiv.appendChild(removeButton);
        container.appendChild(newDiv);
        dragElement(newDiv);
    });
}

function createDraggableDiv() {
    const container = document.getElementById("container");
    const shape = document.getElementById("shapeSelector").value;
    const newDiv = document.createElement("div");
    newDiv.className = `draggable ${shape}`;
    newDiv.textContent = "Drag me!";
    newDiv.dataset.id = document.getElementsByClassName("draggable").length; // Assign a unique ID to each div
    
    // Position the new div at a specific location within the container
    newDiv.style.top = '50px';
    newDiv.style.left = '50px';
    
    // Add remove button to the div
    const removeButton = document.createElement("button");
    removeButton.className = "remove-button";
    removeButton.textContent = "X";
    removeButton.onclick = () => removeDiv(newDiv);
    
    newDiv.appendChild(removeButton);
    container.appendChild(newDiv);
    dragElement(newDiv);
    savePositions(); // Save positions after creating a new div
}

// Make the DIV element draggable:
function dragElement(elmnt) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    elmnt.onmousedown = dragMouseDown;

    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        // get the mouse cursor position at startup:
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        // calculate the new cursor position:
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        // set the element's new position:
        elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
        elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    }

    function closeDragElement() {
        // stop moving when mouse button is released:
        document.onmouseup = null;
        document.onmousemove = null;
        savePositions(); // Save positions after dragging
    }
}

function savePositions() {
    const divs = document.getElementsByClassName("draggable");
    const positions = [];
    
    for (let div of divs) {
        positions.push({
            top: div.style.top,
            left: div.style.left,
            shape: div.classList.contains("square") ? "square" :
                   div.classList.contains("circle") ? "circle" :
                   "rectangle"
        });
    }
    
    localStorage.setItem('draggableDivs', JSON.stringify(positions));
}

function clearAllDivs() {
    const container = document.getElementById("container");
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
    localStorage.removeItem('draggableDivs');
}

function removeDiv(div) {
    const container = document.getElementById("container");
    container.removeChild(div);
    savePositions(); // Save positions after removing a div
}
