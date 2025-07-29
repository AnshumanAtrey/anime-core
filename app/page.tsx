import Hero from '@/app/components/Hero/Hero';
import AnimeList from '@/app/components/AnimeList/AnimeList';
import Subscription from '@/app/components/Subscription/Subscription';
import About from '@/app/components/About/About';
import Contact from '@/app/components/Contact/Contact';
import Footer from '@/app/components/Footer/Footer';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <AnimeList />
      <Subscription />
      <About />
      <Contact />
      <Footer />
    </main>
  );
}
