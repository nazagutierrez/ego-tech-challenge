import { Routes, Route } from "react-router-dom"
import Layout from "./components/Layout"
import ModelsPage from "./pages/ModelsPage"
import ModelDetailPage from "./pages/ModelDetailPage"
import { useLayoutEffect } from "react";
import CustomCursor from "./components/CustomCursor";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import ScrollSmoother from "gsap/ScrollSmoother";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

function App() {
  useLayoutEffect(() => {
    const smoother = ScrollSmoother.create({
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",
      smooth: 1,
      effects: true,
      smoothTouch: 0.1,
    })

    return () => {
      smoother.kill()
    }
  }, [])

  return (
    <>
      <CustomCursor />

      <div id="smooth-wrapper">
        <div id="smooth-content">
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<ModelsPage />} />
              <Route path="/modelo/:id" element={<ModelDetailPage />} />
            </Route>
          </Routes>
        </div>
      </div>
    </>
  )
}

export default App