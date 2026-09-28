const workouts = {
  bodyweight: {
    tag: "NO EQUIPMENT",
    title: "Bina Dumbbell",
    exercises: [
      ["01","Squats","3 sets × 10–15 reps"],
      ["02","Push-ups","3 sets × 6–12 reps"],
      ["03","Lunges","3 sets × 8–12 each side"],
      ["04","Glute Bridge","3 sets × 10–15 reps"],
      ["05","Plank","3 rounds × 20–40 sec"],
      ["06","Mountain Climbers","3 rounds × 20–30 sec"]
    ]
  },
  dumbbell: {
    tag: "DUMBBELL WORKOUT",
    title: "Dumbbell ke Saath",
    exercises: [
      ["01","Dumbbell Goblet Squat","3 sets × 8–12 reps"],
      ["02","Dumbbell Row","3 sets × 8–12 reps"],
      ["03","Dumbbell Shoulder Press","3 sets × 8–12 reps"],
      ["04","Dumbbell Romanian Deadlift","3 sets × 8–12 reps"],
      ["05","Dumbbell Biceps Curl","3 sets × 10–15 reps"],
      ["06","Dumbbell Floor Press","3 sets × 8–12 reps"]
    ]
  }
};

function exerciseIcon(name) {
  const dumbbell = name.toLowerCase().includes("dumbbell");
  const icon = dumbbell ? "🏋️" : "🤸";
  return `<div class="visual-icon">${icon}</div>`;
}

const panel = document.getElementById("exercise-panel");
const title = document.getElementById("panel-title");
const tag = document.getElementById("panel-tag");
const list = document.getElementById("exercise-list");

document.querySelectorAll(".choice-card").forEach(card => {
  card.addEventListener("click", () => {
    const data = workouts[card.dataset.type];
    tag.textContent = data.tag;
    title.textContent = data.title;
    list.innerHTML = data.exercises.map(e => `
      <div class="exercise">
        <div class="exercise-visual">${exerciseIcon(e[1])}</div>
        <div class="exercise-num">${e[0]}</div>
        <div><h4>${e[1]}</h4><small>${e[2]}</small></div>
      </div>
    `).join("");
    panel.classList.remove("hidden");
    panel.scrollIntoView({behavior:"smooth", block:"start"});
  });
});

document.getElementById("close-panel").addEventListener("click", () => {
  panel.classList.add("hidden");
});
