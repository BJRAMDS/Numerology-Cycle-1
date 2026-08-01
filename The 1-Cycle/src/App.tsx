import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { QUESTIONS, formatEntry } from './keepPresence.js'

type Answer = { key: string; answer: string }

function App() {
  const [count, setCount] = useState(0)
  const [pending, setPending] = useState<Answer[]>([])

  function handleCount() {
    const question = QUESTIONS[count % QUESTIONS.length]
    // Same shape as scripts/dailyPresenceLog.js: log the prompt, capture
    // the answer, echo it back as "A:" — just swapping stdin/stdout for
    // window.prompt() and the browser console.
    console.log(question.prompt)
    const answer = window.prompt(question.prompt) ?? ''
    console.log(`A: ${answer}`)

    const collected = [...pending, { key: question.key, answer }]

    if (collected.length === QUESTIONS.length) {
      // Full Initiated/Decided/Shipped cycle done — compile it into a
      // real entry instead of just discarding the answers. The browser
      // can't write to Cycle-1_KPI_Log.md directly, so this is the
      // useful next step: a ready-to-paste block, logged clearly as such.
      console.log('✅ Entry ready — paste this into Cycle-1_KPI_Log.md (browser can\'t write the file directly):')
      console.log(formatEntry(collected))
      setPending([])
    } else {
      setPending(collected)
    }

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
