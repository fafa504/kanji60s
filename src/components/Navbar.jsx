import { Link, useLocation } from 'react-router-dom'

const links = [
  { to: '/', label: 'Home' },
  { to: '/kanji', label: 'JLPT Kanji' },
  { to: '/mindmap', label: 'Mindmap' },
  { to: '/flashcard', label: 'Flashcard' },
  { to: '/exercises', label: 'Exercises' },
  { to: '/vocabulary', label: 'Vocabulary' },
  { to: '/grammar', label: 'Grammar' },
  { to: '/products', label: 'Products' },
  { to: '/documents', label: 'Documents' },
  { to: '/guide', label: 'Guide' },
]

export default function Navbar() {
  const loc = useLocation()
  return (
    <nav className="nav">
      <div className="container nav-inner">
        <Link to="/" className="logo">
          <span className="kanji">漢</span> Kanji60s
        </Link>
        <div className="nav-links">
          {links.map(l => (
            <Link key={l.to} to={l.to} style={{ color: loc.pathname === l.to ? 'var(--accent)' : undefined, fontWeight: loc.pathname === l.to ? 700 : 400 }}>
              {l.label}
            </Link>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <Link to="/products" className="btn btn-outline" style={{ padding: '8px 14px', fontSize: 13 }}>Sign in</Link>
        </div>
      </div>
    </nav>
  )
}