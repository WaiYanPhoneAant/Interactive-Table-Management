document.getElementById("createDivButton").addEventListener("click", createDraggableDiv);

function createDraggableDiv() {
    const container = document.getElementById("container");
    const newDiv = document.createElement("div");
    newDiv.className = "draggable";
    newDiv.textContent = "Drag me!";
    
    // Position the new div at a random location within the container
    newDiv.style.top = `${Math.random() * (container.clientHeight - 100)}px`;
    newDiv.style.left = `${Math.random() * (container.clientWidth - 100)}px`;
    
    container.appendChild(newDiv);
    dragElement(newDiv);
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
    }
}
