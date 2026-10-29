
const workouts = {
  bodyweight: {
    title: "Bina Equipment",
    tag: "HOME WORKOUT",
    exercises: [
      ["01", "Squats", "3 sets × 10 reps"],
      ["02", "Push-ups", "3 sets × 6 reps"],
      ["03", "Lunges", "3 sets × 8 each side"],
      ["04", "Glute Bridge", "3 sets × 10 reps"],
      ["05", "Plank", "3 sets × 20 seconds"],
      ["06", "Mountain Climbers", "3 sets × 20 reps"],
      ["07", "Wall Push-ups", "3 sets × 10 reps"],
      ["08", "Calf Raises", "3 sets × 12 reps"],
      ["09", "Bird Dog", "2 sets × 8 each side"],
      ["10", "Jumping Jacks", "2 sets × 15 reps"]
    ]
  },
  dumbbell: {
    title: "Dumbbell Workout",
    tag: "DUMBBELL",
    exercises: [
      ["01", "Biceps Curl", "2 sets × 10 reps"],
      ["02", "Shoulder Press", "2 sets × 8 reps"],
      ["03", "Dumbbell Row", "2 sets × 10 reps"]
    ]
  }
};

const exerciseInfo = {
  "Squats": ["Pair kandhon jitne kholkar rakho, hips peeche le jao aur phir khade ho jao.", 45],
  "Push-ups": ["Body seedhi rakho, haathon se push karo. Zarurat ho to wall push-ups se shuru karo.", 60],
  "Lunges": ["Ek pair aage rakho, dono ghutne aaram se modho aur phir khade ho jao.", 45],
  "Glute Bridge": ["Peeth ke bal leto, ghutne modo aur hips ko aaram se upar uthao.", 45],
  "Plank": ["Kohniyon aur pairon ke sahare body seedhi rakho. Saans normal rakho.", 45],
  "Mountain Climbers": ["Haathon ko zameen par rakhkar ghutne ek-ek karke aage lao.", 45],
  "Wall Push-ups": ["Deewar par haath rakho, body ko paas lao aur phir push karo.", 45],
  "Calf Raises": ["Seedhe khade hokar heels upar uthao, phir dheere neeche lao.", 30],
  "Bird Dog": ["Haathon aur ghutnon par aakar opposite arm aur leg seedhe karo.", 30],
  "Jumping Jacks": ["Pairon ko bahar-andar le jao aur haathon ko control ke saath uthao.", 45],
  "Biceps Curl": ["Halka dumbbell pakadkar kohni modho aur dheere neeche lao.", 45],
  "Shoulder Press": ["Halke dumbbells ko kandhon se control ke saath upar uthao.", 45],
  "Dumbbell Row": ["Peeth seedhi rakhkar dumbbell ko kohni se peeche kheecho.", 45]
};

let timerId = null;
let secondsLeft = 0;
let currentSet = 1;
let totalSets = 3;
let reps = 10;
let restSeconds = 45;
let isResting = false;
let isRunning = false;
let currentName = "";

const style = document.createElement("style");
style.textContent = `
#workout-modal{position:fixed;inset:0;background:#090d12ed;z-index:99999;overflow:auto;padding:16px;color:white;font-family:Arial}
#workout-card{max-width:520px;margin:20px auto;background:#171e26;padding:22px;border-radius:18px}
#workout-card button{padding:12px 16px;margin:5px;border:0;border-radius:9px;background:#b7ff3c;color:#111;font-weight:bold;cursor:pointer}
#workout-card .secondary{background:#303a45;color:white}
#workout-card a{color:#b7ff3c}
#workout-progress{height:10px;background:#303a45;border-radius:10px;overflow:hidden}
#workout-bar{height:100%;width:0;background:#b7ff3c}
#workout-clock{font-size:42px;font-weight:bold;margin:15px 0}
.workout-exercise{cursor:pointer}
`;
document.head.appendChild(style);

const modal = document.createElement("div");
modal.id = "workout-modal";
modal.hidden = true;
modal.innerHTML = `
<div id="workout-card">
<button id="workout-close" class="secondary">✕ Close</button>
<p>YOUR WORKOUT TRACKER</p>
<h2 id="workout-name"></h2>
<p id="workout-instruction"></p>
<p id="workout-count"></p>
<div id="workout-progress"><div id="workout-bar"></div></div>
<div id="workout-clock">00:00</div>
<p id="workout-status">Ready when you are!</p>
<button id="workout-start">Start Workout</button>
<button id="workout-pause" class="secondary">Pause</button>
<button id="workout-complete" class="secondary">Complete Set ✓</button>
<button id="workout-rest" class="secondary">Start Rest</button>
<p><a id="workout-photo" target="_blank" rel="noopener">Photo Demo</a> ·
<a id="workout-video" target="_blank" rel="noopener">Video Demo</a></p>
<p id="workout-saved"></p>
</div>`;
document.body.appendChild(modal);

function stopTimer() {
  if (timerId) clearInterval(timerId);
  timerId = null;
  isRunning = false;
}

function displayTime() {
  const m = Math.floor(secondsLeft / 60);
  const s = secondsLeft % 60;
  document.getElementById("workout-clock").textContent =
    String(m).padStart(2, "0") + ":" + String(s).padStart(2, "0");
}

function runTimer() {
  if (isRunning) return;
  isRunning = true;
  timerId = setInterval(() => {
    secondsLeft--;
    displayTime();
    if (secondsLeft <= 0) {
      stopTimer();
      document.getElementById("workout-status").textContent =
        isResting ? "Rest complete! Start your next set." : "Time is up!";
      if (isResting) isResting = false;
    }
  }, 1000);
}

function openTracker(name, detail) {
  stopTimer();
  currentName = name;
  currentSet = 1;
  totalSets = 3;
  reps = 10;
  restSeconds = (exerciseInfo[name] || ["", 45])[1];
  isResting = false;
  secondsLeft = 0;

  document.getElementById("workout-name").textContent = name;
  document.getElementById("workout-instruction").textContent =
    (exerciseInfo[name] || ["Move slowly and stop if you feel pain.", 45])[0];
  document.getElementById("workout-count").textContent =
    "Set " + currentSet + " of " + totalSets + " · " + detail;
  document.getElementById("workout-status").textContent = "Ready to begin.";
  document.getElementById("workout-saved").textContent = "";
  document.getElementById("workout-bar").style.width = "0%";
  document.getElementById("workout-photo").href =
    "https://www.google.com/search?tbm=isch&q=" + encodeURIComponent(name + " exercise");
  document.getElementById("workout-video").href =
    "https://www.youtube.com/results?search_query=" + encodeURIComponent(name + " exercise tutorial");

  displayTime();
  modal.hidden = false;
}

document.getElementById("workout-close").onclick = () => {
  stopTimer();
  modal.hidden = true;
};

document.getElementById("workout-start").onclick = () => {
  if (secondsLeft <= 0) {
    secondsLeft = 30;
    isResting = false;
  }
  document.getElementById("workout-status").textContent =
    isResting ? "Resting..." : "Workout timer running...";
  runTimer();
};

document.getElementById("workout-pause").onclick = () => {
  stopTimer();
  document.getElementById("workout-status").textContent = "Paused.";
};

document.getElementById("workout-rest").onclick = () => {
  stopTimer();
  isResting = true;
  secondsLeft = restSeconds;
  displayTime();
  document.getElementById("workout-status").textContent = "Rest time. Relax and breathe.";
  runTimer();
};

document.getElementById("workout-complete").onclick = () => {
  stopTimer();
  if (currentSet >= totalSets) {
    document.getElementById("workout-status").textContent = "Workout complete! Great job.";
    document.getElementById("workout-bar").style.width = "100%";
    document.getElementById("workout-saved").textContent =
      "Completed: " + currentName;
    try {
      localStorage.setItem("lastWorkout", currentName + " - completed");
    } catch (e) {}
    return;
  }

  currentSet++;
  document.getElementById("workout-count").textContent =
    "Set " + currentSet + " of " + totalSets;
  document.getElementById("workout-bar").style.width =
    ((currentSet - 1) / totalSets * 100) + "%";
  document.getElementById("workout-status").textContent =
    "Set marked complete. Start your rest timer.";
  secondsLeft = 0;
  displayTime();
};

document.querySelectorAll(".choice-card").forEach(card => {
  card.addEventListener("click", () => {
    const key = card.dataset.workout ||
      (card.textContent.toLowerCase().includes("dumbbell") ? "dumbbell" : "bodyweight");
    const workout = workouts[key];
    if (!workout) return;

    const panel = document.getElementById("exercise-list");
    if (!panel) return;

    panel.innerHTML = "";
    document.getElementById("panel-title").textContent = workout.title;
    document.getElementById("panel-tag").textContent = workout.tag;

    workout.exercises.forEach(([number, name, detail]) => {
      const item = document.createElement("div");
      item.className = "exercise workout-exercise";
      item.tabIndex = 0;
      item.innerHTML = `<span>${number}</span> <strong></strong><p></p><button type="button">Open Tracker</button>`;
      item.querySelector("strong").textContent = name;
      item.querySelector("p").textContent = detail;
      item.addEventListener("click", () => openTracker(name, detail));
      item.addEventListener("keydown", e => {
        if (e.key === "Enter") openTracker(name, detail);
      });
      panel.appendChild(item);
    });

    const exercisePanel = document.getElementById("exercise-panel");
    if (exercisePanel) {
      exercisePanel.hidden = false;
      exercisePanel.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});

const closePanel = document.getElementById("close-panel");
if (closePanel) {
  closePanel.addEventListener("click", () => {
    const panel = document.getElementById("exercise-panel");
    if (panel) panel.hidden = true;
  });
}
