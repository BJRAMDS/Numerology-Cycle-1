// 🔢 NumerologicalNetCycle.js
// 📅 Runtime Numerology Core Logic
// 🔁 Supports: phaseClock, taskChecklist, logPhaseSummary

function phaseClock(hour = new Date().getHours()) {
  const phases = ["Foundation", "Structure", "Discipline", "Completion"];
  const index = Math.floor(hour / 6) % 4;
  const currentPhase = phases[index];
  console.log(`🕒 System Hour: ${hour}`);
  console.log(`📐 Phase Detected: ${currentPhase}`);
  return currentPhase;
}

function taskChecklist(date, numerology, tasks, identity = "anonymous") {
  return {
    date,
    numerology,
    identity,
    phases: ["Foundation", "Structure", "Discipline", "Completion"],
    tasks,
    status: tasks.map(t => ({ task: t, complete: false })),
    markComplete(taskName) {
      this.status = this.status.map(entry =>
        entry.task === taskName ? { ...entry, complete: true } : entry
      );
    },
    summary() {
      const done = this.status.filter(t => t.complete).length;
      return `${done}/${this.status.length} tasks complete for ${identity} on ${date}`;
    }
  };
}

function logPhaseSummary() {
  const phase = phaseClock();
  const definitions = {
    "Foundation": "Lay symbolic groundwork. Anchor intent.",
    "Structure": "Define systems. Apply boundaries. Encode logic.",
    "Discipline": "Execute consistently. Optimize routine. Stay focused.",
    "Completion": "Finalize tasks. Reflect. Store symbolic output."
  };
  console.log(`🧱 Phase Summary (${phase}) → ${definitions[phase]}`);
}

module.exports = {
  phaseClock,
  taskChecklist,
  logPhaseSummary
};