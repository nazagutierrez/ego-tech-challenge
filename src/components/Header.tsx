import { Link, useLocation } from "react-router-dom"
import { HiMenu, HiX } from "react-icons/hi"
import { useState } from "react"

export default function Header() {
  const location = useLocation()
  const isDetailPage = location.pathname.includes("/modelo/")
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <header className="border-b border-border">
        <div className="mx-auto px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex h-full items-center gap-8">
              <Link to="/" >
                <img src="/logo-ego.png" alt="EGO" className="w-full h-full" />
              </Link>

              <nav className="hidden self-end md:flex gap-8">
                <Link
                  to="/"
                  className={`text-sm px-8 pb-4.5 font-medium border-b-3 transition-colors ${
                    !isDetailPage
                      ? "text-foreground border-accent"
                      : "text-muted-foreground border-transparent hover:text-foreground"
                  }`}
                >
                  Modelos
                </Link>

                <button
                  className={`text-sm px-8 pb-4.5 font-medium border-b-3 transition-colors ${
                    isDetailPage
                      ? "text-foreground border-accent"
                      : "text-muted-foreground border-transparent hover:text-foreground"
                  }`}
                >
                  Ficha de modelo
                </button>
              </nav>
            </div>

            <button
              onClick={() => setIsOpen(true)}
              className="flex items-center gap-2 text-foreground cursor-pointer group"
            >
              <span className="hidden md:inline text-sm font-medium">Menú</span>
              <HiMenu className="w-6 h-6 group-hover:text-accent transition-all duration-200" />
            </button>
          </div>
        </div>
      </header>

      <div
        onClick={() => setIsOpen(false)}
        className={`fixed inset-0 bg-black/40 z-40 transition-opacity ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      />

      <aside
        className={`fixed top-0 right-0 h-full w-full md:w-[420px] bg-white z-50
          transform transition-transform duration-300 ease-out
          ${isOpen ? "translate-x-0" : "translate-x-full"}
        `}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between md:justify-end p-6 border-b-2 border-muted-hover sm:border-0">
            <Link to="/" className="md:hidden">
              <img src="/logo-ego.png" alt="EGO" className="w-full h-full" />
            </Link>

            <button className="hover:text-accent transition-all duration-200" onClick={() => setIsOpen(false)}>
              <HiX className="w-7 h-7 cursor-pointer" />
            </button>
          </div>

          <nav className="bg-[#EFEEEF] flex flex-1 text-lg text-end flex-col overflow-y-auto">
            <div className="flex bg-white flex-col gap-5 p-6">
              <Link
                to="/"
                onClick={() => setIsOpen(false)}
              >
                Modelos
              </Link>
              <a href="#">Servicios y accesorios</a>
              <a href="#">Financiación</a>
              <a href="#">Reviews y Comunidad</a>
              <div className="w-full bg-muted-hover h-0.5"></div>
              <a href="#">Toyota Mobility Service</a>
              <a href="#">Toyota Gazoo Racing</a>
              <a href="#">Toyota Híbridos</a>
              <div className="w-full bg-muted-hover h-0.5"></div>
              <a href="#">Cconcesionarios</a>
              <a href="#">Test Drive</a>
              <a href="#">Contacto</a>
            </div>
            <div className="bg-[#EFEEEF] p-6 flex flex-col gap-4">
              <a href="#">Actividades</a>
              <a href="#">Servicios al Cliente</a>
              <a href="#">Ventas Especiales</a>
              <a href="#">Innovación</a>
              <a href="#">Prensa</a>
              <a href="#">Acerca de...</a>
            </div>
          </nav>
        </div>
      </aside>
    </>
  )
}
