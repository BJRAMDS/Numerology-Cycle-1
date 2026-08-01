import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

// Mirrors the QUESTIONS in scripts/dailyPresenceLog.js — keep these two
// in sync if the Keep Presence questions ever change.
const QUESTIONS = [
  { key: 'initiated', prompt: 'Q: What did you start today without being asked?' },
  { key: 'decided', prompt: 'Q: What call did you make today, no committee?' },
  { key: 'shipped', prompt: 'Q: What moved from idea to real today?' },
]

function App() {
  const [count, setCount] = useState(0)

  function handleCount() {
    const question = QUESTIONS[count % QUESTIONS.length]
    // Same shape as scripts/dailyPresenceLog.js: log the prompt, capture
    // the answer, echo it back as "A:" — just swapping stdin/stdout for
    // window.prompt() and the browser console.
    console.log(question.prompt)
    const answer = window.prompt(question.prompt) ?? ''
    console.log(`A: ${answer}`)

    setCount((c) => c + 1)
  }

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={handleCount}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
