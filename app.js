const QUESTIONS = [
  "Which piece of your Canadian tuxedo took the most effort to find — and was it worth it?",
  "What's the most \"small-town America\" thing you've ever experienced?",
  "If you had to choose someone at this party to share a late-night diner booth with after this ends, who's making the shortlist and why?",
  "What's a completely random purchase you made that ended up improving your life way more than expected?",
  "If this party suddenly became a competitive event, what would you dominate everyone at?",
  "What's the weirdest compliment you've ever received?",
  "What's the most chaotic group trip or vacation story you've been part of?",
  "What's a completely normal thing that secretly stresses you out?",
  "If you had to give a TED Talk with zero prep right now, what topic could you absolutely crush?",
  "What's the funniest thing you've ever overheard in public?",
  "If someone here challenged you to a two-step, karaoke duet, or denim runway walk-off, which are you accepting first?",
  "What's the dumbest way you've ever injured yourself?",
  "What's the pettiest reason you've ever disliked someone?",
  "What's your most unhinged late-night food order or snack combination?",
  "If you could throw a party with any theme imaginable, what would it be — and why would people never forget it?",
];

const grid = document.getElementById("question-grid");
const randomBtn = document.getElementById("random-btn");
const shuffleBtn = document.getElementById("shuffle-btn");
const spotlight = document.getElementById("spotlight");
const spotlightText = document.getElementById("spotlight-text");
const spotlightNumber = document.getElementById("spotlight-number");

let order = QUESTIONS.map((_, i) => i);
let activeIndex = null;

function shuffleArray(arr) {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function showSpotlight(index) {
  spotlight.hidden = false;
  spotlightText.textContent = QUESTIONS[index];
  spotlightNumber.textContent = `Question ${index + 1} of ${QUESTIONS.length}`;
  spotlight.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

function setActive(index) {
  activeIndex = index;
  document.querySelectorAll(".question-card").forEach((card) => {
    const cardIndex = Number(card.dataset.index);
    card.classList.toggle("question-card--active", cardIndex === index);
    card.setAttribute("aria-pressed", cardIndex === index ? "true" : "false");
  });
  showSpotlight(index);
}

function renderCards(animate = false) {
  grid.innerHTML = "";

  order.forEach((questionIndex, displayOrder) => {
    const card = document.createElement("li");
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "question-card" + (animate ? " question-card--shuffle" : "");
    btn.dataset.index = String(questionIndex);
    btn.setAttribute("aria-pressed", "false");
    if (animate) {
      btn.style.animationDelay = `${displayOrder * 40}ms`;
    }

    btn.innerHTML = `
      <span class="question-card__inner">
        <span class="question-card__number">${questionIndex + 1}</span>
        <p class="question-card__text">${QUESTIONS[questionIndex]}</p>
      </span>
    `;

    btn.addEventListener("click", () => setActive(questionIndex));
    card.appendChild(btn);
    grid.appendChild(card);
  });

  if (activeIndex !== null) {
    setActive(activeIndex);
  }
}

function pickRandom() {
  const index = Math.floor(Math.random() * QUESTIONS.length);
  setActive(index);
}

function shuffleAll() {
  order = shuffleArray(order);
  renderCards(true);
}

randomBtn.addEventListener("click", pickRandom);
shuffleBtn.addEventListener("click", shuffleAll);

renderCards();
