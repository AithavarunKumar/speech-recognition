let speech = new SpeechSynthesisUtterance();
const container = document.querySelector('.container');

let voices = [];
window.speechSynthesis.onvoiceschanged = () => {
    voices = window.speechSynthesis.getVoices();
    speech.voice = voices[2]; 
};

// Fallback for older browsers
window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new window.SpeechRecognition();
recognition.interimResults = true; // Show results while speaking

let p = document.createElement('p');

recognition.addEventListener('result', (e) => {
    const text = Array.from(e.results)
        .map(result => result[0])
        .map(result => result.transcript)
        .join('');

    p.innerText = text;

    // Create a new div to act as the new text box
    let newTextBox = document.createElement('div');
    newTextBox.classList.add('texts'); // Add the class for styling

    if (e.results[0].isFinal) {
        // Append user input to the new text box
        newTextBox.appendChild(p);
        container.appendChild(newTextBox); // Append the new text box to the main container

        const lowerText = text.toLowerCase(); // Convert text to lowercase for comparison
        let replyText = '';

        if (lowerText.includes('hello siri')||lowerText.includes('hi')) {
            replyText = 'Hi! iam siri, How can I help you';
        } else if (lowerText.includes('how are you')) {
            replyText = 'iam fine what about you';
        } else if (lowerText.includes('what is the date today')) {
            const today = new Date();
            replyText = `Today's date is ${today.toLocaleDateString()}.`;
        } else if (lowerText.includes('open youtube')) {
            replyText = 'Opening your channel!';
            window.open('https://www.youtube.com/watch?v=-k-PgvbktX4'); // Replace with your actual channel URL
        } else if (lowerText.includes('search javascript')) {
            replyText = 'Opening W3Schools JavaScript page!';
            window.open('https://www.w3schools.com/js/DEFAULT.asp'); // Open W3Schools JavaScript page
        } 
        if (replyText) {
            const reply = document.createElement('p');
            reply.classList.add('reply');
            reply.innerText = replyText;
            newTextBox.appendChild(reply);
            speech.text = replyText;
            window.speechSynthesis.speak(speech);
        }

        // Create a new paragraph for future inputs
        p = document.createElement('p');
    }
});

recognition.addEventListener('end', () => {
    recognition.start(); // Automatically restart the speech recognition
});

// Start the speech recognition
recognition.start();
