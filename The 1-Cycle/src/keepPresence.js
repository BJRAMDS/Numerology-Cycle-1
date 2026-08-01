// Plain JS module (not .ts/.tsx) — proves the project can import .js
// files going forward, not just TypeScript. Keep this in sync with
// scripts/dailyPresenceLog.js (the Node CLI version) if the questions
// or entry format ever change; this is the browser-safe counterpart —
// no fs/readline, ESM exports only.

export const QUESTIONS = [
  { key: 'initiated', prompt: 'Q: What did you start today without being asked?' },
  { key: 'decided', prompt: 'Q: What call did you make today, no committee?' },
  { key: 'shipped', prompt: 'Q: What moved from idea to real today?' },
];

export function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// Same output shape as formatEntry() in scripts/dailyPresenceLog.js, so
// what lands in the console can be pasted straight into the
// "Daily Entries" section of Cycle-1_KPI_Log.md.
export function formatEntry(answers) {
  const timestamp = new Date().toISOString();
  const lines = answers.map(
    ({ key, answer }) => `- **${capitalize(key)}:** ${answer.trim() || '_(skipped)_'}`
  );
  return ['', `### ${timestamp}`, ...lines, ''].join('\n');
}
