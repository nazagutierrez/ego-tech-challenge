# Frontend challenge (EGO Agency)

## Breve descripción
Este proyecto es una solución al reto técnico de Frontend para EGO Agency. Replica el diseño de Figma y consume la API indicada, con énfasis en una UI limpia y animada.

Link a la demo en producción [https://ego-tech-challenge.vercel.app/](https://ego-tech-challenge.vercel.app/)

## Tecnologías
- React + TypeScript
- Vite
- TailwindCSS
- GSAP (animaciones y efectos de scroll)
- React Router
- Swiper (carrusel)
- Lucide React

## Características
- Consumo de datos desde la API pública del reto (listado y detalle de modelos).
- Diseño responsive.
- Animaciones y efectos con GSAP.
- Skeleton loaders para imágenes y estados de carga.
- Carrusel para mostrar características/destacados de cada modelo.
- Ordenamiento y filtrado por segmento, precio y año.

## Estructura del proyecto
```
src/
├── components/        // Componentes reutilizables, vistas y filtros.
├── pages/             // Páginas principales (ModelDetailPage, ModelsPage).
├── types/             // Interfaces y tipos TypeScript.
├── utils/             // Formateador de precio.
├── App.tsx            // Rutas y layout principal.
├── main.tsx           // Punto de entrada de la aplicación.
└── index.css          // Estilos globales.
```

## Instalación y ejecución
1. Clonar el repositorio
```bash
git clone https://github.com/nazagutierrez/ego-tech-challenge.git
cd ego-tech-challenge
```
2. Instalar dependencias
```bash
pnpm install
```
3. Ejecutar en desarrollo
```bash
pnpm run dev
```
4. Compilar para producción
```bash
pnpm run build
```
