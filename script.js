
const workouts = {
  bodyweight: {
    tag: "NO EQUIPMENT",
    title: "Bina Equipment",
    exercises: [
      ["01", "Squats", "3 sets × 10–15 reps"],
      ["02", "Push-ups", "3 sets × 6–12 reps"],
      ["03", "Lunges", "3 sets × 8–12 each side"],
      ["04", "Glute Bridge", "3 sets × 10–15 reps"],
      ["05", "Plank", "3 rounds × 20–40 sec"],
      ["06", "Mountain Climbers", "3 rounds × 20–30 sec"]
    ]
  },
  dumbbell: {
    tag: "DUMBBELL WORKOUT",
    title: "Dumbbell ke Saath",
    exercises: [
      ["01", "Dumbbell Goblet Squat", "3 sets × 8–12 reps"],
      ["02", "Dumbbell Row", "3 sets × 8–12 reps"],
      ["03", "Dumbbell Shoulder Press", "3 sets × 8–12 reps"],
      ["04", "Dumbbell Romanian Deadlift", "3 sets × 8–12 reps"],
      ["05", "Dumbbell Biceps Curl", "3 sets × 10–15 reps"],
      ["06", "Dumbbell Floor Press", "3 sets × 8–12 reps"]
    ]
  }
};

const details = {
  "Squats": ["🦵", "Stand with feet about shoulder-width apart. Bend your knees, sit your hips back, then stand up slowly."],
  "Push-ups": ["💪", "Place your hands on the floor and keep your body straight. Lower yourself comfortably, then push back up. Use a wall or sturdy raised surface if needed."],
  "Lunges": ["🚶", "Take a comfortable step forward, bend both knees slightly, then return to standing. Alternate legs and keep your balance."],
  "Glute Bridge": ["🧘", "Lie on your back with knees bent and feet flat. Lift your hips gently, then lower them slowly."],
  "Plank": ["⏱️", "Keep your body in a straight line while supported on your forearms and toes. Stop if you feel pain."],
  "Mountain Climbers": ["🏃", "Start in a stable high-plank position. Bring one knee forward at a time, slowly and with control."],
  "Dumbbell Goblet Squat": ["🏋️", "Hold one dumbbell close to your chest, squat comfortably, then stand up. Use a light weight and good form."],
  "Dumbbell Row": ["🏋️", "With a light dumbbell, lean forward with a straight back and pull your elbow toward your hip. Repeat on each side."],
  "Dumbbell Shoulder Press": ["🏋️", "Hold light dumbbells near shoulder level and press upward only through a comfortable range."],
  "Dumbbell Romanian Deadlift": ["🏋️", "Hold light dumbbells in front of your thighs. Push your hips back while keeping your back neutral, then stand up."],
  "Dumbbell Biceps Curl": ["💪", "Hold light dumbbells at your sides. Bend your elbows to lift them, then lower slowly."],
  "Dumbbell Floor Press": ["🏋️", "Lie on the floor with light dumbbells. Press them upward with control, then lower until your upper arms gently touch the floor."]
};

const icons = {
  "Squats": "🦵",
  "Push-ups": "💪",
  "Lunges": "🚶",
  "Glute Bridge": "🧘",
  "Plank": "⏱️",
  "Mountain Climbers": "🏃"
};

const panel = document.getElementById("exercise-panel");
const title = document.getElementById("panel-title");
const tag = document.getElementById("panel-tag");
const list = document.getElementById("exercise-list");

function showDetails(exercise) {
  const info = details[exercise[1]] || ["🏋️", "Move slowly, use a comfortable range, and stop if you feel pain."];

  let modal = document.getElementById("exercise-detail-modal");
  if (!modal) {
    modal = document.createElement("div");
    modal.id = "exercise-detail-modal";
    modal.style.cssText = "position:fixed;inset:0;z-index:9999;background:#000b;display:flex;align-items:center;justify-content:center;padding:20px;";
    document.body.appendChild(modal);
  }

  modal.innerHTML = `
    <div role="dialog" aria-modal="true" style="background:#17191e;color:#fff;border:1px solid #383b43;border-radius:20px;padding:24px;max-width:420px;width:100%;font-family:Arial,sans-serif;">
      <div style="font-size:48px;margin-bottom:12px;">${info[0]}</div>
      <h2 style="margin:0 0 12px;">${exercise[1]}</h2>
      <p style="color:#aeb4c0;">${exercise[2]}</p>
      <p style="line-height:1.6;">${info[1]}</p>
      <button id="close-exercise-detail" style="padding:12px 20px;border:0;border-radius:10px;background:#b7ff42;color:#111;font-weight:bold;cursor:pointer;">Close</button>
    </div>
  `;

  modal.querySelector("#close-exercise-detail").onclick = () => modal.remove();
  modal.onclick = event => {
    if (event.target === modal) modal.remove();
  };
}

document.querySelectorAll(".choice-card").forEach(card => {
  card.addEventListener("click", () => {
    const data = workouts[card.dataset.type];
    if (!data || !panel || !title || !tag || !list) return;

    tag.textContent = data.tag;
    title.textContent = data.title;

    list.innerHTML = data.exercises.map(e => {
      const icon = icons[e[1]] || "🏋️";
      return `
        <div class="exercise" tabindex="0" role="button" style="cursor:pointer;">
          <div class="exercise-visual"><div class="visual-icon">${icon}</div></div>
          <div class="exercise-num">${e[0]}</div>
          <div><h4>${e[1]}</h4><small>${e[2]}</small></div>
        </div>
      `;
    }).join("");

    list.querySelectorAll(".exercise").forEach((item, index) => {
      item.addEventListener("click", () => showDetails(data.exercises[index]));
      item.addEventListener("keydown", event => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          showDetails(data.exercises[index]);
        }
      });
    });

    panel.classList.remove("hidden");
    panel.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

const closePanel = document.getElementById("close-panel");
if (closePanel && panel) {
  closePanel.addEventListener("click", () => {
    panel.classList.add("hidden");
  });
}
