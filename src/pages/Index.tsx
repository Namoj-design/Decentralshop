
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import FeaturedProducts from '@/components/FeaturedProducts';
import Benefits from '@/components/Benefits';
import SustainabilityLeaderboard from '@/components/SustainabilityLeaderboard';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <Hero />
        <SustainabilityLeaderboard />
        <FeaturedProducts />
        <Benefits />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
