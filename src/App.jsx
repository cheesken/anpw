import Background from './Components/Background';
import Navbar from './Components/Navbar';
import Home from './Pages/Home';
import Experience from './Pages/Experience';
import Projects from './Pages/Projects';
import Education from './Pages/Education';
import Contact from './Pages/Contact';

// Main App Component
export default function App() {
  // default export - can be imported with any name
  // function - standard function declaration (alternative to arrow function)
  return (
    <>
      {/* Navbar - navigation component (self-closing, no children) */}
      <Navbar />
      {/* Scroll Container with snap behavior */}
      <div className="h-screen overflow-y-scroll snap-y snap-mandatory">
        {/* Background - custom component that wraps children
          Everything inside gets passed as children prop */}
        {/* Home Section - Full Screen Snap Point */}
        <section className="h-screen snap-start snap-always" id="home">
          {/* Home - home page component (self-closing, no children) */}
          <Background>
            <Home />
          </Background>
        </section>
        <section className="h-screen snap-start snap-always" id="experiences">
          <Experience />
        </section>
        <section className="h-screen snap-start snap-always" id="projects">
          <Projects />
        </section>
        <section className="h-screen snap-start snap-always" id="education">
          <Education />
        </section>
        <section className="h-screen snap-start snap-always" id="contact">
          <Contact />
        </section>
      </div>
    </>
  );
  // Component structure: Background contains Navbar and Home
  // Background provides the animated paint-in-water effect
  // Navbar appears fixed at top
  // Home shows the main content card
}
