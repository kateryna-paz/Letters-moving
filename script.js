let button = document.getElementById("btn");
let input = document.getElementById("text");
let div = document.querySelector("div");

// Змінна, що вказує, чи відбувається обробка подій mousedown
let isMouseDown = false;

// Змінна, що вказує, чи зажато початкове натискання ctrl
let isCtrlPressed = false;

// Обробник події кліку на body для відстеження зажаття клавіші ctrl
document.body.addEventListener("keydown", function (e) {
  if (e.key === "Control") {
    isCtrlPressed = true;
  }
});

// Обробник події кліку на body для відстеження відпускання клавіші ctrl
document.body.addEventListener("keyup", function (e) {
  if (e.key === "Control") {
    isCtrlPressed = false;
  }
});
function showText(e) {
  removeEmptyDivs();

  const text = input.value;

  const paragraph = document.createElement("div");
  document.body.appendChild(paragraph);

  for (let i = 0; i < text.length; i++) {
    let span = document.createElement("span");
    span.textContent = text[i];
    paragraph.appendChild(span);

    span.addEventListener("mousedown", (e) => {
      e.preventDefault();
      span.style.color = "blue";
      span.style.position = "absolute";
      span.style.zIndex = "10";

      moveAt(e);

      document.body.appendChild(span);

      function moveAt(e) {
        span.style.left = e.pageX - span.offsetWidth / 2 + "px";
        span.style.top = e.pageY - span.offsetHeight / 2 + "px";
      }

      document.addEventListener("mousemove", moveAt);

      span.addEventListener("mouseup", () => {
        span.style.color = "";
        document.removeEventListener("mousemove", moveAt);
        span.removeEventListener("mouseup", moveAt);
      });
    });
  }
}

function removeEmptyDivs() {
  const divs = document.querySelectorAll("div");

  for (const div of divs) {
    if (!div.hasChildNodes()) {
      div.parentNode.removeChild(div);
    }
  }
}
