import { useState } from "react";
import Head from "next/head";
import LoginScreen from "@/components/auth/LoginScreen";
import Navigation from "@/components/auth/Navigation";
import SignupScreen from "@/components/auth/SignupScreen";
import { Sora } from "next/font/google";

const sora = Sora({ subsets: ["latin"] });

const Login = () => {
  type AuthOptions = "Log in" | "Sign up";

  const [authType, setAuthType] = useState<AuthOptions>("Log in");

  return (
    <>
      <Head>
        <title>{authType} | PlanetCareer</title>
        <meta
          name="description"
          content="Keep track of your job search with our application tracker, built to help you secure your dream job. Ethical job board coming soon."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <main className="flex flex-col min-h-screen bg-stone-50">
        <Navigation />
        <div className="flex-1 flex p-12 md:p-24 px-4 justify-center">
          {authType === "Log in" ? (
            <LoginScreen setAuthType={setAuthType} font={sora}/>
          ) : (
            <SignupScreen setAuthType={setAuthType} font={sora}/>
          )}
        </div>
      </main>
    </>
  );
};

export default Login;
