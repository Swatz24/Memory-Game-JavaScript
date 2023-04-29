// DOM Elements
const section = document.querySelector("section");
const winStatus = document.querySelector("h2");
const timer = document.querySelector(".js-timer");
let playerMoves = 0;
const movesElm = document.querySelector(".js-moves");
const secElm = document.querySelector(".js-sec");
const minElm = document.querySelector(".js-min");

let startTime;
//Generate Cards
const getImage = [
  { imgSrc: "./Images/candle.png", name: "Candle" },
  { imgSrc: "./Images/candy_cane_hallowen.png", name: "Candy Cane Halloween" },
  { imgSrc: "./Images/caramel_apple-skull.png", name: "Caramel Apple skull" },
  { imgSrc: "./Images/cat.png", name: "Cat" },
  { imgSrc: "./Images/cauldron-1.png", name: "Cauldron" },
  { imgSrc: "./Images/chocolate_bar.png", name: "Chocolate Bar" },
  { imgSrc: "./Images/lollipop3-skull.png", name: "lollipop skull" },
  { imgSrc: "./Images/pail-full.png", name: "Full pail" },
  { imgSrc: "./Images/pumpkin2-candle-.png", name: "pumpkin candle" },
  { imgSrc: "./Images/pumpkin_light.png", name: "Pumpkin light" },
  { imgSrc: "./Images/pumpkin_skull_full.png", name: "Pumpkin skull full" },
  { imgSrc: "./Images/skull-full.png", name: "Skull Full" },
  { imgSrc: "./Images/user_eye_woman.png", name: "User-eye-woman" },
  { imgSrc: "./Images/skull-toxic.png", name: "skull toxic" },
  { imgSrc: "./Images/zombie-girl.png", name: "Zombie girl" },
  { imgSrc: "./Images/candle.png", name: "Candle" },
  { imgSrc: "./Images/candy_cane_hallowen.png", name: "Candy Cane Halloween" },
  { imgSrc: "./Images/caramel_apple-skull.png", name: "Caramel Apple skull" },
  { imgSrc: "./Images/cat.png", name: "Cat" },
  { imgSrc: "./Images/cauldron-1.png", name: "Cauldron" },
  { imgSrc: "./Images/chocolate_bar.png", name: "Chocolate Bar" },
  { imgSrc: "./Images/lollipop3-skull.png", name: "lollipop skull" },
  { imgSrc: "./Images/pail-full.png", name: "Full pail" },
  { imgSrc: "./Images/pumpkin2-candle-.png", name: "pumpkin candle" },
  { imgSrc: "./Images/pumpkin_light.png", name: "Pumpkin light" },
  { imgSrc: "./Images/pumpkin_skull_full.png", name: "Pumpkin skull full" },
  { imgSrc: "./Images/skull-full.png", name: "Skull Full" },
  { imgSrc: "./Images/user_eye_woman.png", name: "User-eye-woman" },
  { imgSrc: "./Images/skull-toxic.png", name: "skull toxic" },
  { imgSrc: "./Images/zombie-girl.png", name: "Zombie girl" },
];

//Randomize Images
const randomize = () => {
  const gridData = getImage;
  gridData.sort(() => Math.random() - 0.5);
  return gridData;
};

// Create a grid with random images.
const GridGenerator = () => {
  const gridData = randomize();

  //Generate HTML
  gridData.forEach((item) => {
    const grid = document.createElement("div");
    const face = document.createElement("img");
    const back = document.createElement("div");
    //giving them class names
    grid.classList = "grid";
    face.classList = "face";
    back.classList = "back";

    //Attach img src and attribute name
    face.src = item.imgSrc;
    grid.setAttribute("name", item.name);

    //Appending grids to section
    section.appendChild(grid);
    grid.appendChild(face);
    grid.appendChild(back);

    // Event Listener to toggle cards
    grid.addEventListener("click", (e) => {
      // Check if this is the first card clicked
      if (!startTime) {
        startTime = Date.now(); // Store the start time
        setInterval(startTimer, 1000); // Update the timer every second
      }

      grid.classList.toggle("toggleCard");
      checkCards(e);
    });
  });
};

const checkCards = (e) => {
  const clickedCard = e.target;
  clickedCard.classList.add("flipped");
  const flippedCards = document.querySelectorAll(".flipped");
  const toggleCard = document.querySelectorAll(".toggleCard");

  //Find whether the images Match
  if (flippedCards.length === 2) {
    if (
      flippedCards[0].getAttribute("name") ===
      flippedCards[1].getAttribute("name")
    ) {
      console.log("match");
      flippedCards.forEach((grid) => {
        grid.classList.remove("flipped");
        grid.style.pointerEvents = "none";
      });
    } else {
      console.log("Not a match");
      flippedCards.forEach((grid) => {
        grid.classList.remove("flipped");
        setTimeout(() => grid.classList.remove("toggleCard"), 1000);
      });
    }
    playerMoves++;
    movesElm.innerHTML = `Player Moves: ${playerMoves}`;
  }
  //Check winning
  if (toggleCard.length === 30) {
    winStatus.innerHTML = "Congrats! You Won!";
    restart();
  }
};

//Restart function
const restart = () => {
  let gridData = randomize();
  let faces = document.querySelectorAll(".face");
  let cards = document.querySelectorAll(".grid");
  section.style.pointerEvents = "none";
  winStatus.innerHTML = "";
  movesElm.innerHTML = "";
  seconds = 0;
  minutes = 0;
  secElm.innerHTML = "";
  minElm.innerHTML = "";

  gridData.forEach((item, index) => {
    cards[index].classList.remove("toggleCard");

    //randomize
    setTimeout(() => {
      cards[index].style.pointerEvents = "all";
      faces[index].src = item.imgSrc;
      cards[index].setAttribute("name", item.name);
      section.style.pointerEvents = "all";
    }, 1000);
  });
};

// Function to update the timer with elapsed time
let seconds = 0;
let minutes = 0;
const startTimer = () => {
  seconds++;
  if (seconds <= 9) {
    secElm.innerHTML = `Seconds: ${seconds} `;
  }

  if (seconds > 9) {
    secElm.innerHTML = `Seconds: ${seconds}`;
  }

  if (seconds > 59) {
    minutes++;
    minElm.innerHTML = `Minutes: ${minutes}`;
    seconds = 0;
    secElm.innerHTML = `Seconds: ${seconds} `;
  }

  if (minutes > 9) {
    minElm.innerHTML = `Minutes: ${minutes}`;
  }
};

GridGenerator();
