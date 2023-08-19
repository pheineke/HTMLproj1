var isDragging = false;
var mouseOffset = { x: 0, y: 0 };

window.onload = function() {
	var titleBar = document.getElementById("title-bar");
	titleBar.addEventListener("mousedown", onMouseDown);
	document.addEventListener("mousemove", onMouseMove);
	document.addEventListener("mouseup", onMouseUp);
	
	var closeButton = document.querySelector(".close-button");
	closeButton.addEventListener("click", onCloseButtonClick);
	
	var button = document.createElement("button");
	button.className = "button";
	button.textContent = "Hintergrund";
	button.addEventListener("click", onButtonClick);
	document.body.appendChild(button);
};

function onMouseDown(event) {
	isDragging = true;
	mouseOffset.x = event.clientX - parseInt(window.getComputedStyle(document.getElementById("window")).left);
	mouseOffset.y = event.clientY - parseInt(window.getComputedStyle(document.getElementById("window")).top);
}

function onMouseMove(event) {
	if (isDragging) {
		var x = event.clientX - mouseOffset.x;
		var y = event.clientY - mouseOffset.y;

		document.getElementById("window").style.left = x + "px";
		document.getElementById("window").style.top = y + "px";
	}
}

function onMouseUp(event) {
	isDragging = false;
}

function onCloseButtonClick(event) {
	document.getElementById("window").style.display = "none";
}

function onButtonClick(event) {
	var popup = document.createElement("div");
	popup.className = "popup";
	
	var label = document.createElement("label");
	label.textContent = "Hintergrundfarbe:";
	popup.appendChild(label);
	
	var input = document.createElement("input");
	input.type = "text";
	input.value = "#000000";
	input.maxLength = "7";
	popup.appendChild(input);
	
	var buttonOk = document.createElement("button");
	buttonOk.textContent = "OK";
	buttonOk.addEventListener("click", onPopupOkButtonClick);
	popup.appendChild(buttonOk);
	
	var buttonCancel = document.createElement("button");
	buttonCancel.textContent = "Abbrechen";
	buttonCancel.addEventListener("click", onPopupCancelButtonClick);
	popup.appendChild(buttonCancel);
	
	document.body.appendChild(popup);
}

function onPopupOkButtonClick(event) {
	var input = document.querySelector(".popup input");
	var color = input.value.trim();
	
	if (color.match(/^#[0-9a-fA-F]{6}$/)) {
		document.body.style.backgroundColor = color;
	}
	
	document.querySelector(".popup").remove();
}

function onPopupCancelButtonClick(event) {
	document.querySelector(".popup").remove();
}
