const form = document.querySelector(".contact-form");
const email = document.getElementById("email");

form.addEventListener("submit", function (event) {
  event.preventDefault();

  let params = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    message: document.getElementById("message").value,
  };

  const error = document.getElementById("error");

  error.textContent = "";

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  let emailAns = emailRegex.test(email.value);

  if (!emailAns) {
    error.textContent = "You sure Your emial is correct?";
    return;
  }

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

const nickname = ["leo.", "037.", "intj.", "affi.", "A Guy.", "Sarv."];
const title = document.querySelector(".name");

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
