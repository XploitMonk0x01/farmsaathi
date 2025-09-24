import { Header } from '@/components/layout/header';
import { Hero } from '@/app/(home)/hero';
import { Schemes } from '@/app/(home)/schemes';
import { SuccessStories } from '@/app/(home)/success-stories';
import { Footer } from '@/components/layout/footer';
import { Credibility } from '@/app/(home)/credibility';
import { PlatformOverview } from '@/app/(home)/overview';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Hero />
        <Credibility />
        <PlatformOverview />
        <Schemes />
        <SuccessStories />
      </main>
      <Footer />
    </div>
  );
}
