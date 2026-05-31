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

QUESTIONS.forEach((question, index) => {
  const item = document.createElement("li");
  item.className = "question-card";
  item.innerHTML = `
    <span class="question-card__number" aria-hidden="true">${index + 1}</span>
    <p class="question-card__text">${question}</p>
  `;
  grid.appendChild(item);
});
