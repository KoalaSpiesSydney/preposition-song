// ===============================
// GAP-FILL + PROGRESS (SAFE IF ELEMENTS MISSING)
// + QR BUTTON (TOP-LEFT) GENERATOR
// ===============================

document.addEventListener("DOMContentLoaded", () => {

  // ---------- Gap-fill setup ----------
  const inputs = document.querySelectorAll(".gap");
  const progressBar = document.getElementById("progress-bar");
  const scoreOutput = document.getElementById("score-output");
  const checkAllBtn = document.getElementById("check-all");
  const showAnswersBtn = document.getElementById("show-answers");

  function updateProgress(){
    if (!progressBar || inputs.length === 0) return;
    const correct = document.querySelectorAll(".gap.correct").length;
    const percent = (correct / inputs.length) * 100;
    progressBar.style.width = percent + "%";
  }

  if (inputs.length){
    inputs.forEach(input => {
      input.addEventListener("input", () => {
        const correct = (input.dataset.answer || "").trim().toLowerCase();
        const user = (input.value || "").trim().toLowerCase();

        if (user && user === correct) {
          input.classList.add("correct");
          input.classList.remove("incorrect");
        } else {
          input.classList.remove("correct");
          input.classList.remove("incorrect");
        }
        updateProgress();
      });
    });
  }

  if (checkAllBtn){
    checkAllBtn.addEventListener("click", () => {
      let score = 0;

      inputs.forEach(input => {
        const correct = (input.dataset.answer || "").trim().toLowerCase();
        const user = (input.value || "").trim().toLowerCase();

        if (user === correct) {
          input.classList.add("correct");
          input.classList.remove("incorrect");
          score++;
        } else {
          input.classList.add("incorrect");
          input.classList.remove("correct");
        }
      });

      if (scoreOutput) scoreOutput.textContent = `Score: ${score} / ${inputs.length}`;
      updateProgress();
    });
  }

  if (showAnswersBtn){
    showAnswersBtn.addEventListener("click", () => {
      inputs.forEach(input => {
        input.value = input.dataset.answer || "";
        input.classList.add("correct");
        input.classList.remove("incorrect");
        input.disabled = true;
      });

      if (scoreOutput) scoreOutput.textContent = "All answers revealed.";
      updateProgress();
    });
  }

  // ---------- QR generator (requires qrcodejs script in HTML) ----------
  // HTML you need:
  // <button type="button" class="qr-btn" id="qrBtn">QR</button>
  // <div class="qr-pop" id="qrPop" hidden><div id="qrBox"></div></div>
  // <script src="https://cdn.jsdelivr.net/npm/qrcodejs@1.0.0/qrcode.min.js"></script>

  const qrBtn = document.getElementById("qrBtn");
  const qrPop = document.getElementById("qrPop");
  const qrBox = document.getElementById("qrBox");
  let qrMade = false;

  if (qrBtn && qrPop && qrBox){
    qrBtn.addEventListener("click", () => {
      qrPop.hidden = !qrPop.hidden;

      if (!qrMade){
        if (typeof QRCode === "function"){
          new QRCode(qrBox, { text: location.href, width: 140, height: 140 });
          qrMade = true;
        } else {
          qrBox.textContent = "QR library missing.";
        }
      }
    });

    // optional: click outside closes popup
    document.addEventListener("click", (e) => {
      if (qrPop.hidden) return;
      const inside = qrPop.contains(e.target) || qrBtn.contains(e.target);
      if (!inside) qrPop.hidden = true;
    });
  }

});

