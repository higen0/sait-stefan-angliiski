let currentWordIndex = 0;
let correctAnswers = 0;
let isChecking = true;
let quizCompleted = false;
let quizMode = localStorage.getItem("quizMode") || "bg-to-en"; // Default mode

const quizWordElement = document.getElementById("quiz-word");
const inputElement = document.getElementById("translation");
const resultElement = document.getElementById("result");
const actionButton = document.getElementById("action-button");
const counterElement = document.getElementById("counter");

function goToHomepage() {
    window.location.href = 'index.html';
}

// Load the current word based on quiz mode
function loadWord() {
    if (currentWordIndex < words.length) {
        const word = words[currentWordIndex];
        quizWordElement.textContent = quizMode === "bg-to-en" ? word.bulgarian : Array.isArray(word.english) ? word.english[0] : word.english;
        inputElement.value = "";
        resultElement.textContent = "";
        actionButton.textContent = "Провери";
        counterElement.textContent = `${currentWordIndex + 1}/${words.length}`;
        isChecking = true;
    }
}

// Handle button click (check or next)
function handleButtonClick() {
    if (quizCompleted) return;

    if (isChecking) {
        checkTranslation();
    } else {
        nextWord();
    }
}

// Check the user's translation based on quiz mode
function checkTranslation() {
    const userInput = inputElement.value.trim().toLowerCase();
    const word = words[currentWordIndex];
    const correctTranslation = quizMode === "bg-to-en" ? (Array.isArray(word.english) ? word.english : [word.english]) : (Array.isArray(word.bulgarian) ? word.bulgarian : [word.bulgarian]);

    // Store user's input in the word object
    word.userInput = userInput;

    if (correctTranslation.includes(userInput)) {
        resultElement.textContent = "Правилно";
        resultElement.style.color = "green";
        correctAnswers++;
    } else {
        resultElement.textContent = `Грешен отговор`;
        resultElement.style.color = "red";
    }

    actionButton.textContent = currentWordIndex === words.length - 1 ? "Резултати" : "Следваща дума";
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
    quizCompleted = true;
    quizWordElement.textContent = "";
    inputElement.style.display = "none";
    actionButton.style.display = "none";
    counterElement.style.display = "none";

    resultElement.textContent = `${correctAnswers}/${words.length} правилни отговора`;
    resultElement.style.color = "black";

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

    words.forEach((word, index) => {
        const userAnswer = word.userInput || "няма отговор";
        const correctTranslation = quizMode === "bg-to-en" ? word.english : word.bulgarian;
        const answerDiv = document.createElement("div");

        if (Array.isArray(correctTranslation) ? correctTranslation.includes(userAnswer) : correctTranslation === userAnswer) {
            answerDiv.innerHTML = `<span style="color: green;">${userAnswer} ✔️</span>`;
        } else {
            answerDiv.innerHTML = `
                <span style="color: red;">${userAnswer}</span> → 
                <span style="color: green;">${Array.isArray(correctTranslation) ? correctTranslation.join(", ") : correctTranslation}</span>`;
        }

        resultContainer.appendChild(answerDiv);
    });

    document.querySelector(".container").appendChild(resultContainer);

    const newQuizButton = document.createElement("button");
    newQuizButton.textContent = "Повтори думите";
    newQuizButton.classList.add("new-quiz-button");
    newQuizButton.onclick = function () {
        location.reload();
    };

    document.querySelector(".container").appendChild(newQuizButton);
}

// Initialize the quiz
window.onload = loadWord;

// Event listener for "Enter" key
document.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        if (quizCompleted) {
            location.reload();
        } else {
            handleButtonClick();
        }
    }
});
