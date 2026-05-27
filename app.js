const QUESTIONS = [
  "Which piece of your Canadian Tuxedo are you most proud of tonight — and what's the story behind it?",
  "If your outfit had to represent a Canadian province, which one would it be and why?",
  "What's your most controversial Canadian food opinion — maple syrup on everything, or ketchup where it doesn't belong?",
  "Before tonight, what's the boldest double-denim look you've ever rocked in public?",
  "Tim Hortons order, go! And would you walk there in full denim to get it?",
  "If you had to patch a hole in your jeans with something that isn't denim, what would you choose?",
  "Who at this party would survive the longest in the Canadian wilderness wearing only what they have on?",
  "Which hockey team would you put on a jean-jacket patch — and would you actually sew it on?",
  "Poutine rules: if you had to remove one ingredient forever, which goes — and how do you defend that?",
  "How many times have you said \"sorry\" tonight for accidentally matching denim with someone else?",
  "Cottage, cabin, or chalet — where would you wear your Canadian Tuxedo on the perfect long weekend?",
  "If your Canadian Tuxedo could talk, what's the first thing it would say when you walked in?",
  "Which celebrity's double-denim moment are you channelling tonight — and how close did you get?",
  "What feels more Canadian: a snowstorm in April, or wearing denim head-to-toe in July?",
  "You're hosting next year's Canadian Tuxedo Party — what's the one ice breaker question you'd add to this deck?",
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
