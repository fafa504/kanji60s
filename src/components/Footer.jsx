import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px,1fr))', gap: 24 }}>
        <div>
          <div style={{ fontSize: 22, fontWeight: 800, marginBottom: 8 }}><span style={{ fontFamily: 'Noto Sans JP, serif', color: '#ff7675' }}>漢</span> Kanji60s</div>
          <p style={{ color: '#bbb', fontSize: 14 }}>Learn Kanji faster with visual mindmaps.</p>
        </div>
        <div>
          <h4>Features</h4>
          <div><Link to="/kanji">Kanji</Link></div>
          <div><Link to="/flashcard">Flashcard</Link></div>
          <div><Link to="/mindmap">Mindmap</Link></div>
        </div>
        <div>
          <h4>Policy</h4>
          <div><Link to="/documents">Terms of Use</Link></div>
          <div><Link to="/documents">Privacy Policy</Link></div>
        </div>
        <div>
          <h4>Company</h4>
          <div style={{ color: '#bbb', fontSize: 13 }}>J-V DESIGN LLC</div>
          <div style={{ color: '#bbb', fontSize: 13 }}>© 2026 Kanji 60s. All Rights Reserved.</div>
        </div>
      </div>
    </footer>
  )
}