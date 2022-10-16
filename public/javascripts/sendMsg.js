const search = document.getElementById("text-field");

window.addEventListener("keyup", () => {
  const data = fetch(`/send-message`, {
    method: "POST",
    body: {
      msg: "search.textContent",
    },
  }).then((data) => data.json());
  console.log("I have fetched hehe");
});
