let count = 0; // Initialize counter

// Function to fetch new advice and update UI
function generateAdvice() {
    const adviceApi = 'https://api.adviceslip.com/advice'; // Advice API URL
    const target = document.getElementById('advice'); // Element to display advice
    const countDisplay = document.getElementById('count'); // Element to display count

    // Fetch data from the Advice API
    fetch(adviceApi)
        .then(response => response.json())
        .then(data => {
            const adviceQuote = data.slip.advice; // Extracting advice from API response
            target.innerHTML = `"${adviceQuote}"`; // Display the advice

            // Generate a random number for the count
            const randomNumber = Math.floor(Math.random() * 100) + 1;

            // Update the count display
            countDisplay.innerHTML = ` Quote Number: ${randomNumber}`;

            // Generate the image dynamically
            generateImage(adviceQuote);
        })
        .catch(error => {
            // Error handling
            target.innerHTML = 'Error fetching advice! Please try again';
            console.log('Error', error);
        });
}

// Function to generate an image of the advice
function generateImage(adviceQuote) {
    const canvas = document.getElementById('quoteCanvas');
    const ctx = canvas.getContext('2d');

    // Set canvas background color
    ctx.fillStyle = '#202631'; // Dark background color
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Set text style
    ctx.font = '20px Arial';
    ctx.fillStyle = '#ffffff'; // White text color
    ctx.textAlign = 'center';

    // Draw advice text
    const maxWidth = canvas.width - 40; // Leave padding
    const lines = wrapText(ctx, adviceQuote, maxWidth);
    lines.forEach((line, index) => {
        ctx.fillText(line, canvas.width / 2, 100 + index * 30); // Adjust line spacing
    });

    // Optional branding
    ctx.font = '14px Arial';
    ctx.fillText('Built by Divine 🎲', canvas.width / 2, canvas.height - 20);

    // Create a download link for the image
    const link = document.getElementById('downloadImage');
    link.href = canvas.toDataURL('image/png'); // Convert canvas to image URL
    link.style.display = 'block'; // Show the download button
    link.innerHTML = 'Download Quote as an Image'; // Update button text
}

// Helper function to wrap text for the canvas
function wrapText(ctx, text, maxWidth) {
    const words = text.split(' ');
    const lines = [];
    let currentLine = words[0];

    for (let i = 1; i < words.length; i++) {
        const testLine = currentLine + ' ' + words[i];
        const metrics = ctx.measureText(testLine);
        const testWidth = metrics.width;

        if (testWidth > maxWidth) {
            lines.push(currentLine);
            currentLine = words[i];
        } else {
            currentLine = testLine;
        }
    }
    lines.push(currentLine);
    return lines;
}
