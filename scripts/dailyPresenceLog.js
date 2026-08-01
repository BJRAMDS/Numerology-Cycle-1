#!/usr/bin/env node
/**
 * Keep Presence — Daily Entry Logger
 *
 * Prompts for the three Keep Presence fields (Initiated / Decided / Shipped),
 * echoes each answer as it's captured, and appends a timestamped entry to
 * Cycle-1_KPI_Log.md under the "Daily Entries" section.
 *
 * Run: node scripts/dailyPresenceLog.js
 */

const readline = require('readline');
const fs = require('fs');
const path = require('path');

const LOG_PATH = path.join(__dirname, '..', 'Cycle-1_KPI_Log.md');

const QUESTIONS = [
  {
    key: 'initiated',
    prompt: 'Q: What did you start today without being asked?',
  },
  {
    key: 'decided',
    prompt: 'Q: What call did you make today, no committee?',
  },
  {
    key: 'shipped',
    prompt: 'Q: What moved from idea to real today?',
  },
];

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function formatEntry(answers) {
  const timestamp = new Date().toISOString();
  const lines = answers.map(
    ({ key, answer }) => `- **${capitalize(key)}:** ${answer.trim() || '_(skipped)_'}`
  );
  return ['', `### ${timestamp}`, ...lines, ''].join('\n');
}

function appendEntry(answers) {
  const entry = formatEntry(answers);
  fs.appendFileSync(LOG_PATH, entry);
  console.log(`\n✅ Logged to ${path.relative(process.cwd(), LOG_PATH)}`);
}

function run() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const answers = [];

  function askNext(index) {
    if (index >= QUESTIONS.length) {
      rl.close();
      appendEntry(answers);
      return;
    }

    const { key, prompt } = QUESTIONS[index];
    console.log(prompt);
    rl.question('> ', (raw) => {
      // Echo what was captured as "A:" — keeps the Q/A pairing visible in
      // the terminal scrollback, not just written silently to the file.
      console.log(`A: ${raw}`);
      answers.push({ key, answer: raw });
      askNext(index + 1);
    });
  }

  askNext(0);
}

if (require.main === module) {
  run();
}

module.exports = { run, formatEntry, QUESTIONS };
