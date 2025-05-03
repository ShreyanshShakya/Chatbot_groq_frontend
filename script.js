const chatBox = document.getElementById("chat-box");
const userInput = document.getElementById("user-input");
const sendButton = document.getElementById("send-button");

// Backend API URL
const API_URL = "https://chatbot-groq-g433.onrender.com/chat";

// Function to add a message to the chat box
function addMessage(content, sender) {
    const messageDiv = document.createElement("div");
    messageDiv.classList.add("message", sender);
    messageDiv.textContent = content;
    chatBox.appendChild(messageDiv);
    chatBox.scrollTop = chatBox.scrollHeight; // Scroll to the bottom
}

// Function to send a message to the backend
async function sendMessage() {
    const message = userInput.value.trim();
    if (!message) return;

    // Add user message to chat box
    addMessage(message, "user");
    userInput.value = "";

    try {
        // Send the message to the backend
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ message }),
        });

        if (!response.ok) {
            throw new Error("Failed to get a response from the server.");
        }

        const data = await response.json();
        const botResponse = data.response || "Sorry, I couldn't understand that.";
        addMessage(botResponse, "bot");
    } catch (error) {
        addMessage("Error: " + error.message, "bot");
    }
}

// Event listener for the send button
sendButton.addEventListener("click", sendMessage);

// Event listener for pressing Enter in the input field
userInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        sendMessage();
    }
});