const sky = document.querySelector(".sky");
const svg = document.querySelector(".lines");
const popup = document.getElementById("popup");
const popupText = document.getElementById("popup-text");
let locked = false;

// Optional: Sound
const sound = new Audio("whisper.mp3");

// Love messages
const loveMessages = [
  "You're my favorite chapter in this story called life.",
  "Every moment with you is a star in my heart’s sky.",
  "You make my universe feel complete.",
  "Love is not just a word—it's you.",
  "You're the heartbeat in my silence.",
  "I’d choose you in every lifetime.",
  "With you, time stops and love begins.",
  "You shine brighter than any constellation.",
  "You are my safest place, my home star.",
  "Our love is written in the stars.",
  "Falling for you was written in my stars.",
  "Even galaxies envy our love."
];

// Heart shape generator
const generateHeartCoordinates = (numPoints) => {
  const stars = [];
  for (let i = 0; i < numPoints; i++) {
    const t = (Math.PI * 2 * i) / numPoints;
    const x = 16 * Math.pow(Math.sin(t), 3);
    const y =
      13 * Math.cos(t) -
      5 * Math.cos(2 * t) -
      2 * Math.cos(3 * t) -
      Math.cos(4 * t);

    // Scale and center
    stars.push({
      x: x * 15 + window.innerWidth / 2,
      y: -y * 15 + window.innerHeight / 2,
      message: loveMessages[i % loveMessages.length]
    });
  }
  return stars;
};

const stars = generateHeartCoordinates(12); // adjust number for more/less stars

// Create stars
stars.forEach((star, index) => {
  const el = document.createElement("div");
  el.classList.add("star");
  el.style.left = `${star.x}px`;
  el.style.top = `${star.y}px`;

  el.addEventListener("mouseenter", () => {
    if (!locked) {
      popup.classList.remove("hidden");
      popupText.textContent = star.message;
      sound.play();
    }
  });

  el.addEventListener("mouseleave", () => {
    if (!locked) {
      popup.classList.add("hidden");
    }
  });

  el.addEventListener("click", () => {
    locked = !locked;
    popup.classList.toggle("hidden", !locked);
    popupText.textContent = star.message;
    sound.play();
  });

  sky.appendChild(el);
});

// Draw lines between stars in order
for (let i = 0; i < stars.length - 1; i++) {
  const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
  line.setAttribute("x1", stars[i].x + 3);
  line.setAttribute("y1", stars[i].y + 3);
  line.setAttribute("x2", stars[i + 1].x + 3);
  line.setAttribute("y2", stars[i + 1].y + 3);
  line.setAttribute("stroke", "white");
  line.setAttribute("stroke-opacity", "0.3");
  line.setAttribute("stroke-width", "1");
  svg.appendChild(line);
}
