import { Link } from 'react-router-dom'
import tiers from '../data/products'

const steps = [
  {
    title: 'Explore the mindmap',
    desc: 'See how kanji are built from radicals and connected ideas, instead of memorizing isolated characters.',
  },
  {
    title: 'Remember with flashcards',
    desc: 'Flip through spaced-friendly cards that link the kanji to its meaning and readings.',
  },
  {
    title: 'Practice with exercises',
    desc: 'Check yourself with quick quizzes and exercises to move from "learn before forget" to real retention.',
  },
]

const comparison = [
  { bad: 'Copy kanji many times', good: false },
  { bad: 'Learn each character in isolation', good: false },
  { bad: 'Forget when not reviewed constantly', good: false },
  { bad: 'Study becomes stressful', good: false },
]

const methods = [
  { ok: true, text: 'See kanji through a visual mindmap' },
  { ok: true, text: 'Understand meaning through component parts' },
  { ok: true, text: 'Memorize through component-name imagery' },
  { ok: true, text: 'Learn in a lighter, pressure-free way' },
]

const faqs = [
  {
    q: 'How much faster can I learn Kanji?',
    a: 'Kanji60s focuses on remembering through links and visual maps, helping you avoid rote memorization of isolated characters. Real results depend on study time, current level, and consistency.',
  },
  {
    q: 'Do I need to copy kanji a lot?',
    a: 'Not mandatory. You can still practice writing if you want, but the focus of Kanji60s is helping you understand components and memorize kanji before it becomes easier and less stressful.',
  },
  {
    q: 'Can absolute beginners learn too?',
    a: 'Yes. Content is ordered from N5 level so beginners can progress step by step.',
  },
  {
    q: 'How long per day?',
    a: 'You can start with about 30 minutes per day. Consistency matters: review with flashcards and do exercises to retain longer.',
  },
  {
    q: 'Does Kanji60s replace textbooks entirely?',
    a: 'It works best as support for memorizing kanji, vocabulary and grammar. You can combine it with the textbook you are studying to get better results.',
  },
]

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="container">
          <span className="hero-badge">🎌 Learn Kanji easier, remember faster</span>
          <h1>Learn Kanji up to <span style={{ color: 'var(--accent)' }}>3×</span> faster with visual mindmaps</h1>
          <p>
            Kanji60s helps you memorize Kanji through visual mindmaps, seeing the connections between
            characters instead of learning each one in isolation.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/products" className="btn btn-primary">Start learning today</Link>
            <Link to="/mindmap" className="btn btn-outline">See how it works</Link>
          </div>
          <div className="hero-stats">
            <div><strong>2,136</strong><span>JLPT Joyo kanji</span></div>
            <div><strong>Flashcards</strong><span>Built-in review</span></div>
            <div><strong>Exercises</strong><span>Daily drills</span></div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2>Why Kanji60s?</h2>
          <p className="lead">Forget the old ways of learning kanji that made millions give up.</p>
          <div className="grid grid-3">
            <div className="card">
              <div style={{ fontSize: 34 }}>🧠</div>
              <h3>Visual mindmaps</h3>
              <p style={{ color: 'var(--muted)' }}>See the logic behind kanji components and the links between them.</p>
            </div>
            <div className="card">
              <div style={{ fontSize: 34 }}>✍️</div>
              <h3>No painful copying</h3>
              <p style={{ color: 'var(--muted)' }}>Stop spending hours writing characters you forget immediately.</p>
            </div>
            <div className="card">
              <div style={{ fontSize: 34 }}>😌</div>
              <h3>Less pressure</h3>
              <p style={{ color: 'var(--muted)' }}>Learn lightly with connected, meaningful images instead of isolated shapes.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section" style={{ background: 'var(--surface)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
        <div className="container">
          <h2>How it works</h2>
          <p className="lead">Instead of forcing your brain to memorize each character alone, Kanji60s helps you understand the structure.</p>
          <div className="grid grid-3">
            {steps.map((s, i) => (
              <div className="card" key={s.title}>
                <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--accent)', marginBottom: 8 }}>STEP {i + 1}</div>
                <h3>{s.title}</h3>
                <p style={{ color: 'var(--muted)' }}>{s.desc}</p>
              </div>
            ))}
          </div>
          <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', marginTop: 40 }}>
            <div className="card">
              <h3>Traditional way ❌</h3>
              {comparison.map(c => (
                <div key={c.bad} style={{ padding: '6px 0', color: '#e74c3c' }}>❌ {c.bad}</div>
              ))}
            </div>
            <div className="card">
              <h3>With Kanji60s ✅</h3>
              {methods.map(m => (
                <div key={m.text} style={{ padding: '6px 0', color: '#27ae60' }}>✅ {m.text}</div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="card" style={{ textAlign: 'center', padding: 48 }}>
            <h2>Ready to see your kanji clearly?</h2>
            <p className="lead" style={{ margin: '0 auto 26px' }}>
              One character becomes a story: components, images, memories. Start your first mindmap today.
            </p>
            <Link to="/mindmap" className="btn btn-primary">Open the mindmap</Link>
          </div>
        </div>
      </section>

      <section className="section" style={{ background: 'var(--surface)', borderTop: '1px solid var(--border)' }}>
        <div className="container">
          <h2>Simple pricing</h2>
          <p className="lead">Learn Kanji lightly from $19/month. Flexible plans for every level.</p>
          <div className="pricing">
            {tiers.map(t => (
              <div key={t.name} className={`price-card ${t.featured ? 'featured' : ''}`}>
                {t.badge && <div style={{ position: 'absolute', top: -12, left: 20, background: 'var(--accent)', color: '#fff', padding: '4px 12px', borderRadius: 20, fontSize: 12, fontWeight: 700 }}>{t.badge}</div>}
                <h3>{t.name}</h3>
                <div className="fit" style={{ color: 'var(--muted)', fontSize: 14 }}>{t.fit}</div>
                <div className="price">{t.price}<span style={{ fontSize: 16, color: 'var(--muted)', textDecoration: 'line-through', marginLeft: 8 }}>{t.old}</span></div>
                <ul>
                  {t.features.map(f => (
                    <li key={f.text} style={{ color: f.ok ? 'var(--text)' : 'var(--muted)' }}>
                      {f.ok ? '✅' : '❌'} {f.text}
                    </li>
                  ))}
                </ul>
                <Link to="/products" className={`btn ${t.featured ? 'btn-primary' : 'btn-outline'}`} style={{ width: '100%', textAlign: 'center' }}>Choose {t.name}</Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container" style={{ maxWidth: 760 }}>
          <h2>Frequently asked questions</h2>
          <div className="faq">
            {faqs.map(f => (
              <details key={f.q}>
                <summary>{f.q}</summary>
                <p style={{ color: 'var(--muted)', marginBottom: 0 }}>{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
