function startQuiz(mode) {
    // Save the selected mode to localStorage
    localStorage.setItem("quizMode", mode);
    // Redirect to the quiz page
    window.location.href = "quiz.html";
}
