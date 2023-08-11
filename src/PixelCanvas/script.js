const canvas = document.getElementById("pixel-canvas");
const ctx = canvas.getContext("2d");
const scale = 6; // set the scale factor to 3
let currentColor = "black"; // set the initial color to black

// Resize the canvas and the pixel size
canvas.width *= scale;
canvas.height *= scale;
ctx.scale(scale, scale);

canvas.addEventListener("click", function(event) {
	// Adjust the position of the clicked pixel based on the scale factor
	const x = Math.floor(event.offsetX / scale);
	const y = Math.floor(event.offsetY / scale);
	fetch(`/put-pixel?x=${x}&y=${y}&color=${currentColor}`, {method: "POST"}).then(response => {
		})

	ctx.fillStyle = currentColor; // use the current color
	ctx.fillRect(x, y, 1, 1);
});

// Set the current color when the color selectors are clicked
const blackSelector = document.getElementById("black");
const redSelector = document.getElementById("red");
const blueSelector = document.getElementById("blue");

blackSelector.addEventListener("click", function() {
	currentColor = "black";
});

redSelector.addEventListener("click", function() {
	currentColor = "red";
});

blueSelector.addEventListener("click", function() {
	currentColor = "blue";
});

// Resize the canvas and the color selectors when the window is resized
window.addEventListener("resize", function() {
	resizeCanvas();
});

fetch(`/get-canvas`).
	then(response => response.json()).
	then(seed => {
		for (let i = 0; i <= 120; i++) {
			for (let j = 0; j <= 120; j++) {
				const c = seed[i][j];
				if (c !== null) {
					ctx.fillStyle = c;
					ctx.fillRect(i, j, 1, 1);
				}
			}
		}
});