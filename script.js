// ===============================
// LIVE CHECKING
// ===============================

const inputs = document.querySelectorAll(".gap");
const progressBar = document.getElementById("progress-bar");
const scoreOutput = document.getElementById("score-output");

inputs.forEach(input => {
  input.addEventListener("input", () => {
    const correct = input.dataset.answer.trim().toLowerCase();
    const user = input.value.trim().toLowerCase();

    // Instant marking
    if (user === correct) {
      input.classList.add("correct");
      input.classList.remove("incorrect");
    } else {
      input.classList.remove("correct");
      input.classList.remove("incorrect");
    }

    updateProgress();
  });
});

// ===============================
// UPDATE PROGRESS BAR
// ===============================

function updateProgress() {
  const total = inputs.length;
  const correct = document.querySelectorAll(".gap.correct").length;
  const percent = (correct / total) * 100;

  progressBar.style.width = percent + "%";
}

// ===============================
// CHECK ALL BUTTON
// ===============================

document.getElementById("check-all").addEventListener("click", () => {
  let score = 0;

  inputs.forEach(input => {
    const correct = input.dataset.answer.trim().toLowerCase();
    const user = input.value.trim().toLowerCase();

    if (user === correct) {
      input.classList.add("correct");
      input.classList.remove("incorrect");
      score++;
    } else {
      input.classList.add("incorrect");
      input.classList.remove("correct");
    }
  });

  scoreOutput.textContent = `Score: ${score} / ${inputs.length}`;

  updateProgress();
});

// ===============================
// SHOW ANSWERS BUTTON
// ===============================

document.getElementById("show-answers").addEventListener("click", () => {
  inputs.forEach(input => {
    input.value = input.dataset.answer;
    input.classList.add("correct");
    input.classList.remove("incorrect");
    input.disabled = true;
  });

  scoreOutput.textContent = "All answers revealed.";
  updateProgress();
});

