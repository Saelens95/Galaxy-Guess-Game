$(document).ready(function () {
    $('.tlt').textillate({
      autoStart: true,
      in: {
        effect: 'fadeInUP',
        delayScale: 1,
        delay: 60,
        sync: false
      },
      out: {
        effect: 'fadeOutLeft',
        sync: false
      },

      loop: true,

    });
})

function startGame() {
    const splashMusic = document.getElementById('splashMusic');
    splashMusic.volume = 0.4;
    splashMusic.play();

    const buttonSound = document.getElementById('buttonSound');
    buttonSound.volume = 0.5;
    buttonSound.play();

    // Replace button with text
    const startContainer = document.getElementById('start-container');
    startContainer.innerHTML = '<span class="start-text"> Loading...</span>';

    // Show loading and game after a delay
    setTimeout(() => {
        document.getElementById('splash-screen').style.display = 'none';
        document.getElementById('game').style.display = 'block';
        
     setTimeout(shuffleAndDisplay, 100); // Call the function to start the game
    }, 1000); // Adjust the delay as needed
}

// Set up the event listener for the start button
document.addEventListener("DOMContentLoaded", function () {
    const startButton = document.getElementById('startButton');

    // Add the click event listener to the start button
    startButton.addEventListener('click', startGame);
});

document.addEventListener("DOMContentLoaded", function () {
    const particleField = document.getElementById('particleField');
    if (!particleField) return; // Safeguard

    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.setProperty('--x', `${Math.random() * 200 - 100}px`);
        particle.style.setProperty('--y', `${Math.random() * 200 - 100}px`);
        particle.style.animation = `particleFloat ${1 + Math.random() * 2}s infinite`;
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        particleField.appendChild(particle);
    }
});

let score = 0;
let lives = 3;
let clickable = true;


const counterEl = document.getElementById("counter");
const lifeEls = document.querySelectorAll(".life");

function increaseScore(points) {
  score += points;
  counterEl.textContent = `Score: ${score}`;
}

function loseLife() {
  if (lives > 0) {
    lives--;
    lifeEls[lives].classList.remove("full");
    lifeEls[lives].classList.add("empty");
  }

  if (lives === 0) {
    gameOver(); // Define this based on your game
  }
}


const images = [
    'https://images-assets.nasa.gov/image/PIA04921/PIA04921~orig.jpg', // Andromeda Galaxy 0
    'https://images-assets.nasa.gov/image/PIA17669/PIA17669~orig.jpg', // Sun 1 
    'https://images-assets.nasa.gov/image/PIA00405/PIA00405~orig.jpg', // Earth Moon 2 7
    'https://images-assets.nasa.gov/image/PIA18033/PIA18033~orig.jpg', // Earth 3
    'https://images-assets.nasa.gov/image/PIA04591/PIA04591~orig.jpg', // Mars 4
    'https://images-assets.nasa.gov/image/PIA00343/PIA00343~orig.jpg', // Jupiter 5
    'https://images-assets.nasa.gov/image/PIA02225/PIA02225~orig.jpg', // Saturn 6
    'https://images-assets.nasa.gov/image/PIA18182/PIA18182~orig.jpg', // Uranus 7
    'https://assets.science.nasa.gov/dynamicimage/assets/science/psd/solar/internal_resources/444/PIA01492_modest.jpg?w=577&h=577&fit=clip&crop=faces%2Cfocalpoint', // Neptune 8
    'https://images-assets.nasa.gov/image/behemoth-black-hole-found-in-an-unlikely-place_26209716511_o/behemoth-black-hole-found-in-an-unlikely-place_26209716511_o~orig.jpg', // Black Hole 9
    'https://images-assets.nasa.gov/image/PIA24472/PIA24472~orig.jpg', // Asteroid 10
    'https://images-assets.nasa.gov/image/GSFC_20171208_Archive_e000993/GSFC_20171208_Archive_e000993~orig.jpg', // Supernova 11
    'https://images-assets.nasa.gov/image/PIA11245/PIA11245~orig.jpg', // Mercury 12
    'https://images-assets.nasa.gov/image/PIA00007/PIA00007~orig.jpg', // Venus 13
  ];
  
  const prompts = [
    { text: "Which one is the Andromeda Galaxy?", correctIndex: 0 },
    { text: "Which image shows the Sun?", correctIndex: 1 },
    { text: "Which one is the moon of the Earth?", correctIndex: 2 },
    { text: "Which one is planet Earth?", correctIndex: 3 },
    { text: "Which one is Mars?", correctIndex: 4 },
    { text: "Which one above is Jupiter?", correctIndex: 5 },
    { text: "Which one is Saturn?", correctIndex: 6 },
    { text: "Which one looks like Uranus?", correctIndex: 7 },
    { text: "Which one is Neptune?", correctIndex: 8 },
    { text: "Which one is is a Black Hole?", correctIndex: 9 },
    { text: "Which one is an Asteroid?", correctIndex: 10 },
    { text: "Which one is a Supernova?", correctIndex: 11 },
    { text: "Which one is Mercury?", correctIndex: 12 },
    { text: "Which one is Venus?", correctIndex: 13 }

];
  
  let currentPrompt;
  
  function shuffleAndDisplay() {
    document.getElementById("feedback").textContent = "";
    currentPrompt = prompts[Math.floor(Math.random() * prompts.length)];
    document.getElementById("prompt").textContent = currentPrompt.text;
  
    const container = document.getElementById("imageContainer");
    container.innerHTML = "";
  
    const correctImage = {
      src: images[currentPrompt.correctIndex],
      index: currentPrompt.correctIndex
    };
  
    // Get all other (incorrect) images
    const incorrectImages = images
      .map((src, index) => ({ src, index }))
      .filter(img => img.index !== currentPrompt.correctIndex);
  
    // Pick two random incorrect images using Fisher-Yates shuffle
    const shuffledIncorrects = incorrectImages
      .sort(() => Math.random() - 0.5)
      .slice(0, 2);
  
    // Combine the correct image and the two incorrect ones
    const finalImages = [correctImage, ...shuffledIncorrects]
      .sort(() => Math.random() - 0.5); // Shuffle final 3
  
    finalImages.forEach(({ src, index }) => {
        const clickSound = document.getElementById('clickSound'); // Get the audio element
        clickSound.volume = 0.5;
        const img = document.createElement("img");

        img.src = src;
        img.onclick = () => {
            if (!clickable) return; // prevent double click
            clickable = false;
            clickSound.play();


            const isCorrect = index === currentPrompt.correctIndex;
            const feedbackEl = document.getElementById("feedback");
        
            if (isCorrect) {
            increaseScore(10);
            feedbackEl.textContent = `Awesome job! Score: ${score}`;
            setTimeout(() => {
                clickable = true;
                shuffleAndDisplay();
            }, 1000);
            } else {
            loseLife();
        
            if (lives > 0) {
                feedbackEl.textContent = `Wrong. You lost a life! (${lives} ${lives === 1 ? 'life' : 'lives'} remaining)`;
                setTimeout(() => {
                clickable = true;
                shuffleAndDisplay();
                }, 1000);
            } else {
                feedbackEl.textContent = "Game over!";
                document.getElementById("tryAgainButton").style.display = "block";
            }
        }

    }

        container.appendChild(img);
});

  
  particlesJS("particles-js", {
    particles: {
      number: { value: 1800, density: { enable: true, value_area: 800 } },
      color: { value: "#ffffcc" },
      shape: { type: "circle" },
      opacity: { value: 0.8, random: true },
      size: { value: 2.5, random: true },
      line_linked: { enable: false },
      move: { enable: true, speed: 0.5, direction: "none", random: true, straight: false, out_mode: "out", bounce: false }
    },
    interactivity: {
      detect_on: "canvas",
      events: { onhover: { enable: false }, onclick: { enable: false }, resize: true }
    },
    retina_detect: true
  });
  
}

document.addEventListener("DOMContentLoaded", function () {
    const tryAgainButton = document.getElementById("tryAgainButton");
    tryAgainButton.addEventListener('click', resetGame);
});

function gameOver() {
    const feedbackEl = document.getElementById("feedback");
    feedbackEl.textContent = "Game over!";
   document.getElementById("tryAgainButton").style.display = "block";

   // Disable all image clicks
  const allImages = document.querySelectorAll("#imageContainer img");
  allImages.forEach(img => img.onclick = null);

}

function resetGame() {
    const buttonSound = document.getElementById('buttonSound');
    buttonSound.volume = 0.4;
    buttonSound.play(); // <-- Add this line here

    clickable = true
    document.getElementById("tryAgainButton").style.display = "none";
    lives = 3;
    score = 0;
    counterEl.textContent = `Score: ${score}`;
    lifeEls.forEach(el => {
      el.classList.remove("empty");
      el.classList.add("full");
    });
    shuffleAndDisplay();
}

const title = document.getElementById("description");
    title.addEventListener("mouseenter", () => {
        title.style.animation = "none";
        title.offsetHeight; // trigger reflow
        title.style.animation = "wiggle 0.6s ease";
  });

window.addEventListener("DOMContentLoaded", () => {
    const splashMusic = document.getElementById("splashMusic");
    splashMusic.volume = 0.3; // Set volume between 0.0 and 1.0 (e.g., 0.2 = 20%)
  });