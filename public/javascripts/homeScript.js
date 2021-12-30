function sloganEffect() {
  const texts = ["Summoners", "Champions", "Builds"];
  let count = 0;
  let textsIndex = 0;

  let currentText = "";
  let letter = "";
  function type() {
    if (count === texts.length) {
      count = 0;
    }
    currentText = texts[count];
    letter = currentText.slice(0, ++textsIndex);
    document.querySelector(".typing").textContent = letter;
    if (letter.length === currentText.length) {
      count++;
      textsIndex = 0;
    }
    setTimeout(type, 400);
  }
  type();
}

function closeServerChange() {
  const serverDiv = document.querySelector(".server-change");
  const close = document.querySelector(".close-regions");
  const region = document.querySelector(".region");

  region.addEventListener("click", () => {
    serverDiv.style.display = "block";
    region.style.display = "none";
  });

  close.addEventListener("click", () => {
    serverDiv.style.display = "none";
    region.style.display = "block";
  });
}

(function main() {
  sloganEffect();
  closeServerChange();
})();
