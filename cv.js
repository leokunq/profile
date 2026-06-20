const nickname = ["leo.", "037.", "intj.", "affi.", "A Guy.", "Sarv."];
const title = document.querySelector(".name");
const form = document.getElementById("contact-form");

form.addEventListener("submit", function (event) {
  event.preventDefault();

  let params = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    message: document.getElementById("message").value,
  };

  emailjs
    .send("leokunq", "template_mtz9p2e", params)
    .then(() => {
      form.reset();
    })
    .catch((error) => {
      console.error(error);
      alert("Failed to send message.");
    });
});
document.body.classList.toggle(
  "dark-mode",
  localStorage.getItem("theme") === "dark",
);
title.addEventListener("click", () => {
  title.textContent = nickname[Math.floor(Math.random() * nickname.length)];

  document.body.classList.toggle("dark-mode");

  localStorage.setItem(
    "theme",
    document.body.classList.contains("dark-mode") ? "dark" : "light",
  );
});
