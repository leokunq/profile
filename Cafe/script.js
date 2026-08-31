const robo = document.getElementById("robo");
let bgImage = document.getElementById("content");
const clickSnd = document.getElementById("click-sound");
const roboDialog = document.getElementById("roboDialog");
const hourGlass = document.getElementById("hourglass");
const userInput = document.getElementById("userInput");
const music = document.getElementById("bg-music");
let clickBtn = document.getElementById("clickBtn");
let orderedItem;
let quantity;
let userName;

music.play();
music.volume = 0.2;

const date = Date();
let menu = [
  {
    name: "latte",
    price: 4.5,
  },
  {
    name: "black coffee",
    price: 3.0,
  },
  {
    name: "mocha",
    price: 4.75,
  },
  {
    name: "americano",
    price: 3.5,
  },
  {
    name: "espresso",
    price: 2.75,
  },
  {
    name: "tea",
    price: 2.5,
  },
  {
    name: "hot chocolate",
    price: 4.0,
  },
  {
    name: "matcha latte",
    price: 4.75,
  },
  {
    name: "cappuccino",
    price: 4.5,
  },

  //THE SPECIAL ITEM
  {
    name: "robo special",
    price: 7.37,
  },
];

let stage = 0;

/* Menu will show on side */
/* welcoming customers & user interaction*/

function getTime() {
  const hours = new Date().getHours();

  if (hours >= 5 && hours < 12) {
    return "Morning...!";
  } else if (hours >= 12 && hours < 18) {
    return "Afternoon...!";
  } else if (hours >= 18 && hours < 23) {
    return "Evening...!";
  } else {
    return "Wow!...late One...";
  }
}

const greet = getTime();
roboDialog.textContent = greet;

clickBtn.style.display = "none";
setTimeout(() => {
  roboDialog.textContent = `Welcome to kunq's cafe...`;

  clickBtn.style.display = "block";
}, 2000);

function userInputHidden() {
  userInput.disabled = true;
  userInput.style.backgroundColor = "transparent";
  userInput.placeholder = "";
}

userInputHidden();
/* interaction */

function userInputSpace() {
  userInput.disabled = false;
  userInput.style.backgroundColor = "var(--secondary-color)";
  userInput.placeholder = "Your Message...";
}

clickBtn.addEventListener("click", () => {
  clickSnd.play();
  clickSnd.volume = 0.3;

  if (stage === 0) {
    roboDialog.textContent = "What you having today?";
    userInputSpace();
    stage = 1;
  } else if (
    stage === 1 &&
    menu.find((item) => item.name === userInput.value.toLowerCase().trim())
  ) {
    orderedItem = userInput.value.toLowerCase().trim();
    userInput.value = "";

    roboDialog.textContent = `How many you like to have?`;
    stage = 2;
  } else if (
    stage === 1 &&
    !menu.find((item) => item.name === userInput.value.toLowerCase().trim())
  ) {
    roboDialog.textContent = "Sorry!...We don't have this item in our menu.";
    userInputHidden();
    userInput.value = "";
    stage = 0;
  } else if (stage === 2) {
    rndm = Math.floor(Math.random() * 500 + 1);

    if (userInput.value.trim() === "") {
      roboDialog.textContent = `So, you want ${rndm} of them?...give me a number.`;

      userInputHidden();
      userInput.value = "";
      stage = 0;
    } else if (isNaN(Number(userInput.value))) {
      roboDialog.textContent = "Mind using a number...like: 1, 2, 5....yeah?";

      userInputHidden();
      userInput.value = "";
      stage = 0;
    } else {
      quantity = Number(userInput.value);

      userInput.value = "";
      userInputHidden();

      roboDialog.textContent = `You ordered ${quantity} ${orderedItem}...`;

      stage = 3;
    }
  } else if (stage === 3) {
    roboDialog.textContent = "Before i prepapre it...";
    stage = 4;
  } else if (stage === 4) {
    userInputSpace();
    roboDialog.textContent = "Can I have you name?";
    userInput.style.display = "initial";
    stage = 5;
  } else if (stage === 5) {
    if (userInput.value.trim() === "") {
      roboDialog.textContent = `So, you dont like the name your parents gave you???...gimme something...even
      a single character.`;
      userInputHidden();
      userInput.value = "";
      stage = 4;
    } else {
      userName = String(userInput.value).toLowerCase().trim();
      userInput.value = "";
      userInputHidden();

      const coffee = menu.find((item) => item.name === orderedItem);

      roboDialog.textContent = `Great ${userName}..We'll have ${orderedItem} ready in few seconds...`;

      hourGlass.style.display = "inline";
      clickBtn.disabled = true;

      setTimeout(() => {
        hourGlass.style.display = "none";
        roboDialog.textContent = `Here you go ${userName}..Your ${orderedItem} and your total will be  $${quantity * coffee.price}`;
        stage = 0;

        clickBtn.disabled = false;
      }, 5000);

      userInput.value = "";
    }
  }
});
