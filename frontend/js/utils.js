export function showPopup(message) {
    const popup = document.createElement("div");
    popup.classList.add("popup");

    const popupMessage = document.createElement("p");
    popupMessage.innerText = message;

    const closeButton = document.createElement("button");
    closeButton.innerText = "×";
    closeButton.classList.add("close-btn");
    closeButton.addEventListener("click", () => {
        popup.classList.remove("show");
        setTimeout(() => popup.remove(), 300);
    });

    popup.appendChild(popupMessage);
    popup.appendChild(closeButton);

    // Append the popup **outside** the container but keep it positioned correctly
    const container = document.querySelector(".container");
    if (container) {
        container.parentNode.insertBefore(popup, container.nextSibling);
    } else {
        document.body.appendChild(popup);
    }

    setTimeout(() => {
        popup.classList.add("show");
    }, 100);

    setTimeout(() => {
        popup.classList.remove("show");
        setTimeout(() => popup.remove(), 300);
    }, 5000); // Auto remove after 5 seconds
}

export function showResult(message, isSpam) {
    const resultDiv = document.getElementById("result");
    resultDiv.innerText = message;
    
    // Set class based on prediction
    if (isSpam) {
        resultDiv.className = "result spam"; // Spam background
    } else {
        resultDiv.className = "result non-spam"; // Non-spam background
    }

    resultDiv.style.display = "block";
}

