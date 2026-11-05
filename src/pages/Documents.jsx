import { useState } from 'react'

const documents = [
  {
    id: 'terms',
    title: 'Terms of Use',
    updated: 'January 2026',
    sections: [
      { heading: '1. Acceptance of terms', body: 'By accessing or using Kanji60s, you agree to be bound by these Terms of Use and all applicable laws and regulations.' },
      { heading: '2. Description of service', body: 'Kanji60s provides educational content including kanji mindmaps, flashcards and exercises designed to help learners memorize Japanese kanji.' },
      { heading: '3. Acceptable use', body: 'You agree not to misuse the service, attempt to disrupt it, or use it for any unlawful purpose.' },
      { heading: '4. Intellectual property', body: 'All content, design and materials on the site remain the property of J-V DESIGN LLC unless otherwise noted.' },
      { heading: '5. Limitation of liability', body: 'The service is provided for educational purposes. Results depend on individual effort, study time and consistency.' },
    ],
  },
  {
    id: 'privacy',
    title: 'Privacy Policy',
    updated: 'January 2026',
    sections: [
      { heading: '1. Information we collect', body: 'We may collect information you provide directly, such as account details when you purchase or register a plan.' },
      { heading: '2. How we use information', body: 'We use information to provide the service, improve content, and communicate about your plan.' },
      { heading: '3. Cookies', body: 'We use cookies and similar technologies to keep you signed in and remember preferences.' },
      { heading: '4. Contact', body: 'Questions about privacy can be sent to the J-V DESIGN LLC team.' },
    ],
  },
]

export default function Documents() {
  const [tab, setTab] = useState('terms')
  const doc = documents.find(d => d.id === tab) || documents[0]
  return (
    <div className="container section">
      <h1>Documents</h1>
      <p className="lead">Legal and policy documents.</p>
      <div className="filters">
        {documents.map(d => (
          <button key={d.id} className={`btn ${tab === d.id ? 'btn-primary' : 'btn-outline'}`} style={{ border: tab === d.id ? 'none' : undefined }} onClick={() => setTab(d.id)}>
            {d.title}
          </button>
        ))}
      </div>
      <div className="card" style={{ maxWidth: 860 }}>
        <h2>{doc.title}</h2>
        <p style={{ color: 'var(--muted)' }}>Last updated: {doc.updated}</p>
        {doc.sections.map(s => (
          <div key={s.heading} style={{ marginBottom: 18 }}>
            <h3 style={{ fontSize: 18 }}>{s.heading}</h3>
            <p style={{ color: 'var(--muted)', marginBottom: 0 }}>{s.body}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
