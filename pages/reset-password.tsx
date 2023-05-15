import { useState } from "react";
import Head from "next/head";
import router from "next/router";
import Image from "next/image";
import Navigation from "@/components/auth/Navigation";
import { Sora } from "next/font/google";
import { changePassword } from "@/handlers/AuthHandler";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

const sora = Sora({ subsets: ["latin"] });

const ResetPassword = () => {
  const supabase = useSupabaseClient();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handlePasswordChange = () => {
    changePassword(supabase, password).then(() => {
      alert("Password has been changed!");
      router.push("/");
    });
  };

  return (
    <>
      <Head>
        <title>Reset Password | PlanetCareer</title>
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
          <div className="flex-1 max-w-[360px] space-y-8">
            <div className="flex flex-col items-center text-center space-y-4">
              <Image
                alt="PlanetCareer Logomark"
                width="0"
                height="0"
                className="w-10 aspect-square"
                src="/logomark.svg"
              />
              <h1
                className={
                  sora.className +
                  " text-2xl md:text-3xl font-medium text-stone-900"
                }
              >
                Reset your password
              </h1>
            </div>
            <div className="space-y-4">
              <div className="flex-1 flex flex-col gap-1.5">
                <label
                  htmlFor="password"
                  className="font-medium text-sm text-stone-700"
                >
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  className="input"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  name="password"
                />
              </div>
              <div className="flex-1 flex flex-col gap-1.5">
                <label
                  htmlFor="ConfirmPassword"
                  className="font-medium text-sm text-stone-700"
                >
                  Confirm Password
                </label>
                <input
                  id="ConfirmPassword"
                  type="password"
                  placeholder="••••••••"
                  className="input"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  value={confirmPassword}
                  name="ConfirmPassword"
                />
              </div>
            </div>
            <button
              onClick={handlePasswordChange}
              className="btn-primary w-full max-w-none"
              disabled={
                password === "" ||
                confirmPassword === "" ||
                password !== confirmPassword
              }
            >
              Reset Password
            </button>
          </div>
        </div>
      </main>
    </>
  );
};

export default ResetPassword;
