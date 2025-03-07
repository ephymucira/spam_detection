import { showPopup,showResult } from './utils.js';

document.getElementById("emailForm").addEventListener("submit", async function(event) {
    event.preventDefault();
    const emailContent = document.getElementById("emailInput").value.trim();
    if (emailContent === "") {
        showPopup("Please enter email content.");
        return;
    }
    showPopup("Analyzing...");

    try {
        const response = await fetch("http://127.0.0.1:5000/predict", { // Set your API URL
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email: emailContent })
        });

        const data = await response.json();
        if (response.ok) {
            const isSpam = data.prediction.toLowerCase() === "spam";
            showResult(`Prediction: ${data.prediction}`, isSpam);
        } else {
            throw new Error(data.error || "Something went wrong");
        }
 // Show the result in a popup
    } catch (error) {
        showPopup("Error processing request.");
    }
});

