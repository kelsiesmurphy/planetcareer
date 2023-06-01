import { useSession } from "@supabase/auth-helpers-react";
import Head from "next/head";
import Navigation from "@/components/index/Navigation";
import Hero from "@/components/index/Hero";
import Faq from "@/components/index/Faq";
import Footer from "@/components/index/Footer";
import { Sora } from "next/font/google";
import LoginButton from "@/components/index/LoginButton";
import CookieConsent from "@/components/CookieConsent";
import Testimonials from "@/components/index/Testimonials";

const sora = Sora({ subsets: ["latin"] });

export default function Home() {
  const session = useSession();

  return (
    <>
      <Head>
        <title>PlanetCareer | Ethical careers made simple.</title>
        <meta
          name="description"
          content="Keep track of your job search with our application tracker, built to help you secure your dream job. Ethical job board coming soon."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <main className="flex flex-col min-h-screen bg-stone-50">
        <Navigation>
          <LoginButton session={session} />
        </Navigation>
        <Hero font={sora}>
          <LoginButton session={session} />
        </Hero>
        <Testimonials font={sora} />
        <Faq font={sora} />
        <Footer />
      </main>
      <CookieConsent />
    </>
  );
}
