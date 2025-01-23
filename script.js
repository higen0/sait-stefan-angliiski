const words = [
    { bulgarian: "леля", english: "aunt" },
    { bulgarian: "чичо", english: "uncle" },
    { bulgarian: "братовчед", english: "cousin" },
    { bulgarian: "почивка", english: "holiday" },
    { bulgarian: "летище", english: "airport" },
    { bulgarian: "Африка", english: "Africa" },
    { bulgarian: "Англия", english: "England" },
    { bulgarian: "сос", english: "sauce" },
    { bulgarian: "срамежлив", english: "shy" },
    { bulgarian: "изморен", english: "tired" },
    { bulgarian: "гладен", english: "hungry" },
    { bulgarian: "шорти", english: "shorts" },
    { bulgarian: "риза", english: "shirt" },
    { bulgarian: "карта", english: "map" },
    { bulgarian: "камера", english: "camera" },
    { bulgarian: "слънчеви очила", english: "sunglasses" },
    { bulgarian: "бански", english: "swimsuit" },
    { bulgarian: "усмивка", english: "smile" },
    { bulgarian: "паспорт", english: "passport" },
    { bulgarian: "билет", english: "ticket" },
    { bulgarian: "пари", english: "money" },
    { bulgarian: "куфар", english: "suitcase" },
    { bulgarian: "математика", english: "Maths" },
    { bulgarian: "англииски", english: "English" },
    { bulgarian: "история", english: "History" },
    { bulgarian: "изкуство", english: "Art" },
    { bulgarian: "динозавър", english: "dinosaur" },
    { bulgarian: "физическо възпитание", english: "P.E." },
    { bulgarian: "сутрин", english: "morning" },
    { bulgarian: "следобед", english: "afternoon" },
    { bulgarian: "вечер", english: "evening" },
];

let currentWordIndex = 0;
let correctAnswers = 0;
let isChecking = true;
let quizCompleted = false;

const bulgarianWordElement = document.getElementById("bulgarian-word");
const inputElement = document.getElementById("translation");
const resultElement = document.getElementById("result");
const actionButton = document.getElementById("action-button");
const counterElement = document.getElementById("counter");

// Load the current word
function loadWord() {
    if (currentWordIndex < words.length) {
        bulgarianWordElement.textContent = words[currentWordIndex].bulgarian;
        inputElement.value = "";
        resultElement.textContent = "";
        actionButton.textContent = "Провери";
        counterElement.textContent = `${currentWordIndex + 1}/${words.length}`;
        isChecking = true;
    }
}

// Handle button click (check or next)
function handleButtonClick() {
    if (quizCompleted) return; // Prevent any action if quiz is completed

    if (isChecking) {
        checkTranslation();
    } else {
        nextWord();
    }
}

// Check the user's translation
function checkTranslation() {
    const userInput = inputElement.value.trim().toLowerCase();
    const correctTranslation = words[currentWordIndex].english;

    // Save the user's input
    words[currentWordIndex].userInput = userInput;

    if (userInput === correctTranslation) {
        resultElement.textContent = "Правилно";
        resultElement.style.color = "green";
        correctAnswers++;
    } else {
        resultElement.textContent = "Грешен отговор";
        resultElement.style.color = "red";
    }

    // Change button text
    actionButton.textContent =
        currentWordIndex === words.length - 1 ? "Проверка" : "Следваща дума";
    isChecking = false;
}

// Load the next word or show results
function nextWord() {
    currentWordIndex++;
    if (currentWordIndex < words.length) {
        loadWord();
    } else {
        showResults();
    }
}

// Show the final results
function showResults() {
    quizCompleted = true; // Mark the quiz as completed
    bulgarianWordElement.textContent = "";
    inputElement.style.display = "none";
    actionButton.style.display = "none";
    counterElement.style.display = "none";

    // Display final score
    resultElement.textContent = `${correctAnswers}/${words.length} правилни отговора`;
    resultElement.style.color = "black";

    // Create a scrollable container for the list of results
    const resultContainer = document.createElement("div");
    resultContainer.style.marginTop = "40px";
    resultContainer.style.fontSize = "40px";
    resultContainer.style.textAlign = "center";
    resultContainer.style.maxHeight = "70vh";
    resultContainer.style.overflowY = "auto";
    resultContainer.style.border = "2px solid #ccc";
    resultContainer.style.padding = "10px";
    resultContainer.style.borderRadius = "8px";
    resultContainer.style.backgroundColor = "white";

    // Add incorrect and correct answers to the container
    words.forEach((word, index) => {
        const userAnswer = word.userInput || "няма отговор";
        const answerDiv = document.createElement("div");

        if (userAnswer === word.english) {
            answerDiv.innerHTML = `<span style="color: green;">${word.english} ✔️</span>`;
        } else {
            answerDiv.innerHTML = `
                <span style="color: red;">${userAnswer}</span> → 
                <span style="color: green;">${word.english}</span>`;
        }

        resultContainer.appendChild(answerDiv);
    });

    // Add the container below the score
    document.querySelector(".container").appendChild(resultContainer);

    // Add "New Quiz" button
    const newQuizButton = document.createElement("button");
    newQuizButton.textContent = "Повтори думите";
    newQuizButton.classList.add("new-quiz-button");

    // Reload the page when clicked
    newQuizButton.onclick = function () {
        location.reload();
    };

    // Append the "New Quiz" button below the results
    document.querySelector(".container").appendChild(newQuizButton);
}

// Initialize the quiz
window.onload = loadWord;

// Event listener for "Enter" key
document.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        if (quizCompleted) {
            // If quiz is completed, reload the page on Enter
            location.reload();
        } else {
            // Otherwise, handle the button click
            handleButtonClick();
        }
    }
});
