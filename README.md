# Lichess Dashboard SPA

![React](https://img.shields.io/badge/React-19-blue?logo=react) ![Vite](https://img.shields.io/badge/Vite-^6.2-blueviolet?logo=vite) ![TypeScript](https://img.shields.io/badge/TypeScript-^5.7-blue?logo=typescript) ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-^3.4-38B2AC?logo=tailwind-css) ![Three.js](https://img.shields.io/badge/Three.js-r160+-orange?logo=three.js)

A stylish, interactive Single Page Application (SPA) dashboard built to visualize Lichess.org user statistics. This project features dynamic charts, stat cards, theme switching, and 3D decorative elements.

**(Current Version uses static data - Lichess API integration is planned for the future)**

---

## Preview

*(Consider adding a screenshot or GIF of the dashboard here later)*

![Dashboard Screenshot Placeholder](https://via.placeholder.com/800x450/1e293b/64748b?text=Dashboard+Preview+Coming+Soon)

---

## Features

* **Stat Cards:** Displays key metrics like Highest, Lowest, and Average Ratings (Bullet/Blitz combined) with count-up animations.
* **Rating Charts:** Interactive Line charts showing rating history for Bullet and Blitz modes using Chart.js.
* **Game History Table:** Placeholder table displaying the structure for recent games with pagination (using dummy data).
* **Theme Switching:** Toggle between light and dark themes with smooth transitions. Defaults to system preference and persists choice in local storage.
* **3D Elements:** Decorative, animated low-poly King and Queen chess pieces using Three.js / React Three Fiber.
* **Responsive Design:** Layout adjusts for different screen sizes using Tailwind CSS.
* **Animations:** Subtle entrance and hover animations using Framer Motion. Scroll-triggered animations for content sections.

---

## Tech Stack

* **Framework/Library:** [React](https://react.dev/) (^19)
* **Build Tool:** [Vite](https://vitejs.dev/) (^6.2)
* **Language:** [TypeScript](https://www.typescriptlang.org/) (^5.7)
* **Styling:** [Tailwind CSS](https://tailwindcss.com/) (^3.4)
* **UI Primitives:** [Radix UI](https://www.radix-ui.com/) (Switch, Icons)
* **Charting:** [Chart.js](https://www.chartjs.org/) (^4.4) with [react-chartjs-2](https://react-chartjs-2.js.org/) (^5.3)
* **Animation:**
    * [Framer Motion](https://www.framer.com/motion/) (^12.6)
    * [React CountUp](https://github.com/glennreyes/react-countup) (^6.5)
* **3D Graphics:**
    * [Three.js](https://threejs.org/) (via @react-three/fiber)
    * [@react-three/fiber](https://docs.pmnd.rs/react-three-fiber/getting-started/introduction) (^8.16)
    * [@react-three/drei](https://github.com/pmndrs/drei) (^9.109)

---

## Project Setup & Installation

**Prerequisites:**

* [Node.js](https://nodejs.org/) (LTS version recommended, e.g., v18 or v20+)
* [npm](https://www.npmjs.com/) (usually included with Node.js) or [yarn](https://yarnpkg.com/) / [pnpm](https://pnpm.io/)

**Steps:**

1.  **Clone the repository:**
    ```bash
    git clone <your-repository-url>
    cd lichess-dashboard
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    # or yarn install / pnpm install
    ```

3.  **Place 3D Models:**
    * Ensure you have the `king.glb` and `queen.glb` model files.
    * Place them inside the `public/models/` directory in the project root. (Create the `models` folder if it doesn't exist).

---

## Running the Development Server

To start the application in development mode with hot-reloading:

```bash
npm run dev
