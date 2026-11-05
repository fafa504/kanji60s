import tiers from '../data/products'
import { Link } from 'react-router-dom'

export default function Products() {
  const perks = [
    { ok: true, text: '2,136 kanji' },
    { ok: true, text: 'Kanji mindmap N4 + N5' },
    { ok: true, text: 'Kanji flashcards' },
    { ok: true, text: 'Kanji exercises' },
    { ok: true, text: 'Vocabulary N5-N1' },
    { ok: true, text: 'Grammar N5-N1' },
    { ok: true, text: 'Vocabulary + grammar exercises' },
    { ok: true, text: 'Updated content' },
  ]
  const freeNote = [
    { ok: true, text: '2,136 kanji' },
    { ok: true, text: 'Kanji mindmap N4 + N5' },
    { ok: true, text: 'Kanji flashcards' },
    { ok: true, text: 'Kanji exercises' },
    { ok: false, text: 'Vocabulary flashcards' },
    { ok: false, text: 'Grammar flashcards' },
    { ok: false, text: 'Updated content' },
  ]

  return (
    <div className="container section">
      <h1>Products</h1>
      <p className="lead">Choose the plan that matches your goals. All plans include the core method.</p>

      <div className="pricing">
        {tiers.map(t => (
          <div key={t.name} className={`price-card ${t.featured ? 'featured' : ''}`}>
            {t.badge && <div style={{ position: 'absolute', top: -12, left: 20, background: 'var(--accent)', color: '#fff', padding: '4px 12px', borderRadius: 20, fontSize: 12, fontWeight: 700 }}>{t.badge}</div>}
            <h3>{t.name}</h3>
            <div style={{ color: 'var(--muted)', fontSize: 14 }}>{t.fit}</div>
            <div className="price">{t.price}<span style={{ fontSize: 16, color: 'var(--muted)', textDecoration: 'line-through', marginLeft: 8 }}>{t.old}</span></div>
            <ul>
              {t.features.map(f => (
                <li key={f.text} style={{ color: f.ok ? 'var(--text)' : 'var(--muted)' }}>{f.ok ? '✅' : '❌'} {f.text}</li>
              ))}
            </ul>
            <Link to="/products" className={`btn ${t.featured ? 'btn-primary' : 'btn-outline'}`} style={{ width: '100%', textAlign: 'center' }}>Buy this plan</Link>
          </div>
        ))}
      </div>

      <div className="grid grid-2" style={{ marginTop: 60 }}>
        <div className="card">
          <h2 style={{ fontSize: 26 }}>Free</h2>
          <div className="price" style={{ fontSize: 30 }}>$0</div>
          <ul>
            {freeNote.map(f => (
              <li key={f.text} style={{ color: f.ok ? 'var(--text)' : 'var(--muted)' }}>{f.ok ? '✅' : '❌'} {f.text}</li>
            ))}
          </ul>
          <button className="btn btn-outline">Start free</button>
        </div>
        <div className="card">
          <h2 style={{ fontSize: 26 }}>All plans</h2>
          <div className="price" style={{ fontSize: 30 }}>$149<span style={{ fontSize: 14, color: 'var(--muted)' }}>/yr</span></div>
          <ul>
            {perks.map(f => (
              <li key={f.text} style={{ color: f.ok ? 'var(--text)' : 'var(--muted)' }}>{f.ok ? '✅' : '❌'} {f.text}</li>
            ))}
          </ul>
          <Link to="/products" className="btn btn-primary">Go to yearly plan</Link>
        </div>
      </div>
    </div>
  )
}
