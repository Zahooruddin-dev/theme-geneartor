let selectedColor = '0047AB'; 
const selectedColorBox = document.getElementById('selected-color');
const colorInput = document.getElementById('color-input');
selectedColorBox.style.backgroundColor = `#${selectedColor}`;
colorInput.addEventListener('input', (event) => {
	selectedColor = event.target.value.substring(1); // Remove "#"
	selectedColorBox.style.backgroundColor = `#${selectedColor}`;
	getColorScheme(); // Update the color scheme
});
// Function to get color scheme from thecolorapi.com
function getColorScheme() {
	const schemeType = document.getElementById('scheme-type').value;
	const url = `https://www.thecolorapi.com/scheme?hex=${selectedColor}&mode=${schemeType}&count=5`;
	fetch(url)
		.then((response) => response.json())
		.then((data) => {
			const colors = data.colors;
			let html = '';

			colors.forEach((color) => {
				const hex = color.hex.value;
				html += `
                    <div class="color-item">
                        <div class="color-preview" style="background-color: ${hex};"></div>
                        <div class="color-name">${hex}</div>
                    </div>
                `;
			});

			document.getElementById('color-scheme').innerHTML = html;
		})
		.catch((error) => {
			console.error('Error fetching color scheme:', error);
			alert('Failed to fetch color scheme. Please try again.');
		});
}

// Function to copy the scheme to clipboard
function copySchemeToClipboard() {
	const colorItems = document.querySelectorAll('.color-name');
	const hexValues = Array.from(colorItems)
		.map((item) => item.textContent)
		.join(', ');
	const textArea = document.createElement('textarea');
	textArea.value = hexValues;
	document.body.appendChild(textArea);
	textArea.select();
	document.execCommand('copy');
	document.body.removeChild(textArea);

	alert('Color scheme copied to clipboard!');
}

// Initialize with the default color scheme
getColorScheme();
