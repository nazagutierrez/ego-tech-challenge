import { Routes, Route } from "react-router-dom"
import Layout from "./components/Layout"
import ModelsPage from "./pages/ModelsPage"
import ModelDetailPage from "./pages/ModelDetailPage"

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<ModelsPage />} />
        <Route path="/modelo/:id" element={<ModelDetailPage />} />
      </Route>
    </Routes>
  )
}

export default App
