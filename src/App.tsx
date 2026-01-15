import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { HeroSection } from './components/sections/HeroSection';
import { Gallery } from './components/gallery/GalleryGrid';
import './styles/globals.css';

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Section */}
        <HeroSection />

        {/* Gallery Section */}
        <section className="py-20 sm:py-24 bg-white">
          <Gallery />
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
