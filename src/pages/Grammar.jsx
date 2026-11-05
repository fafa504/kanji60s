import grammar from '../data/grammar'

export default function Grammar() {
  const categories = [...new Set(grammar.map(g => g.category))]
  return (
    <div className="container section">
      <h1>Grammar</h1>
      <p className="lead">Key grammar points organized by level.</p>
      {categories.map(cat => (
        <div key={cat} style={{ marginBottom: 36 }}>
          <h2 style={{ fontSize: 24 }}>{cat}</h2>
          <div className="grid grid-3">
            {grammar.filter(g => g.category === cat).map(g => (
              <div className="card" key={g.id}>
                <span className="badge">{g.level}</span>
                <h3 style={{ marginTop: 10 }}>{g.name}</h3>
                <p style={{ color: 'var(--muted)', fontSize: 14 }}>{g.description}</p>
                <p style={{ fontFamily: 'Noto Sans JP, serif' }}>{g.example}</p>
                <p style={{ color: 'var(--muted)', fontSize: 14, marginBottom: 0 }}>{g.translation}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
