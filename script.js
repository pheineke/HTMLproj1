var isDragging = false;
var mouseOffset = { x: 0, y: 0 };

window.onload = function() {
	var titleBars = document.querySelectorAll(".title-bar");
	titleBars.forEach(function(titleBar) {
		titleBar.addEventListener("mousedown", onMouseDown);
	});
	document.addEventListener("mousemove", onMouseMove);
	document.addEventListener("mouseup", onMouseUp);
	
	var closeButtons = document.querySelectorAll(".close-button");
	closeButtons.forEach(function(closeButton) {
		closeButton.addEventListener("click", onCloseButtonClick);
	});
	
	var buttons = document.querySelectorAll(".button");
	buttons.forEach(function(button) {
		button.addEventListener("click", onButtonClick);
	});
};

function onMouseDown(event) {
	isDragging = true;
	mouseOffset.x = event.clientX - parseInt(window.getComputedStyle(event.target.parentNode).left);
	mouseOffset.y = event.clientY - parseInt(window.getComputedStyle(event.target.parentNode).top);
}

function onMouseMove(event) {
	if (isDragging) {
		var x = event.clientX - mouseOffset.x;
		var y = event.clientY - mouseOffset.y;

		event.target.parentNode.style.left = x + "px";
		event.target.parentNode.style.top = y + "px";
	}
}

function onMouseUp(event) {
	isDragging = false;
}

function onCloseButtonClick(event) {
	event.target.parentNode.parentNode.style.display = "none";
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
	
	popup.style.position = "absolute";
	popup.style.bottom = "10px";
	popup.style.left = "50%";
	popup.style.transform = "translateX(-50%)";
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
