import Image from "next/image";
import { useState } from "react";
import router from "next/router";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";

const LoginScreen = ({ setAuthType, font }: any) => {
  const supabase = useSupabaseClient();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: any) => {
    e.preventDefault();
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });
      if (error) throw error;
    } catch (error: any) {
      alert(error.error_description || error.message);
    } finally {
      setEmail("");
      setPassword("");
      router.push("/dashboard");
    }
  };

  return (
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
            font.className + " text-2xl md:text-3xl font-medium text-stone-900"
          }
        >
          Welcome back!
        </h1>
      </div>
      <div className="space-y-4">
        <div className="flex-1 flex flex-col gap-1.5">
          <label htmlFor="email" className="font-medium text-sm text-stone-700">
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="Enter your email"
            className="input"
            name="email"
          />
        </div>
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
            placeholder="Enter your password"
            className="input"
            name="password"
          />
        </div>
      </div>
      <button onClick={handleLogin} className="btn-primary w-full max-w-none">
        Log in
      </button>
      <div>
        <p className="text-sm text-stone-500 text-center">
          Don&apos;t have an account?{" "}
          <button
            className="font-medium px-1 cursor-pointer outline-green-700 text-green-700"
            onClick={() => setAuthType("Sign up")}
          >
            Sign up
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginScreen;
