import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import Home from './pages/Home.jsx'
import Kanji from './pages/Kanji.jsx'
import Mindmap from './pages/Mindmap.jsx'
import Flashcard from './pages/Flashcard.jsx'
import Exercises from './pages/Exercises.jsx'
import Vocabulary from './pages/Vocabulary.jsx'
import Grammar from './pages/Grammar.jsx'
import Products from './pages/Products.jsx'
import Documents from './pages/Documents.jsx'
import Guide from './pages/Guide.jsx'

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/kanji" element={<Kanji />} />
        <Route path="/mindmap" element={<Mindmap />} />
        <Route path="/flashcard" element={<Flashcard />} />
        <Route path="/exercises" element={<Exercises />} />
        <Route path="/vocabulary" element={<Vocabulary />} />
        <Route path="/grammar" element={<Grammar />} />
        <Route path="/products" element={<Products />} />
        <Route path="/documents" element={<Documents />} />
        <Route path="/guide" element={<Guide />} />
      </Routes>
    </Layout>
  )
}