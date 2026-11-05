const steps = [
  { title: 'Create your account', desc: 'Sign up to unlock all features and start your first mindmap.' },
  { title: 'Pick your level', desc: 'Start from JLPT N5 and follow the path, or jump to the level you are at.' },
  { title: 'Open the mindmap', desc: 'Explore the visual connections between kanji. Click any node to inspect it.' },
  { title: 'Study with flashcards', desc: 'Flip cards to link kanji and meaning. Keep it light — no heavy copying needed.' },
  { title: 'Practice daily', desc: 'Do exercises and repeat reviews to move from "learn before forget" to retention.' },
]

export default function Guide() {
  return (
    <div className="container section">
      <h1>Guide</h1>
      <p className="lead">How to get started with Kanji60s.</p>
      <div className="grid grid-3">
        {steps.map((s, i) => (
          <div className="card" key={s.title}>
            <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--accent)' }}>STEP {i + 1}</div>
            <h3>{s.title}</h3>
            <p style={{ color: 'var(--muted)' }}>{s.desc}</p>
          </div>
        ))}
      </div>
      <div className="card" style={{ marginTop: 30 }}>
        <h2 style={{ marginTop: 0 }}>Daily routine suggestion</h2>
        <p style={{ color: 'var(--muted)' }}>About 30 minutes a day: browse or update your mindmap, review a few flashcards, then run your exercises.</p>
      </div>
    </div>
  )
}
