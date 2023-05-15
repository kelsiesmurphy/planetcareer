import { useState } from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { loginUser } from "@/handlers/AuthHandler";
import router from "next/router";
import Image from "next/image";
import ForgotPasswordModal from "./ForgotPasswordModal";
import Alert from "../Alert";

const LoginScreen = ({ setAuthType, font }: any) => {
  const supabase = useSupabaseClient();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [forgotPasswordOpen, setForgotPasswordOpen] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);

  const handleLogin = async (e: any) => {
    e.preventDefault();
    try {
      loginUser(supabase, email, password).then((res) => {
        if (res.data.user !== null) {
          res.data.user.id && router.push("/dashboard");
        } else {
          setAlertOpen(true);
        }
      });
    } catch (error: any) {
      console.log(error.error_description || error.message);
    } finally {
      setEmail("");
      setPassword("");
    }
  };

  return (
    <>
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
              font.className +
              " text-2xl md:text-3xl font-medium text-stone-900"
            }
          >
            Welcome back!
          </h1>
        </div>
        <div className="space-y-4">
          <div className="flex-1 flex flex-col gap-1.5">
            <label
              htmlFor="email"
              className="font-medium text-sm text-stone-700"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
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
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              name="password"
            />
          </div>
        </div>
        <button
          onClick={handleLogin}
          className="btn-primary w-full max-w-none"
          disabled={email === "" || !email.includes("@") || password === ""}
        >
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
        <ForgotPasswordModal
          supabase={supabase}
          isOpen={forgotPasswordOpen}
          setIsOpen={setForgotPasswordOpen}
        >
          <button
            onClick={() => setForgotPasswordOpen(true)}
            className="font-medium text-green-700 hover:text-green-700 py-2 text-sm w-full outline-green-700"
          >
            Forgot password
          </button>
        </ForgotPasswordModal>
      </div>
      <Alert
        title="Incorrect Login"
        message="Your email or password was incorrect."
        isOpen={alertOpen}
        setIsOpen={setAlertOpen}
      />
    </>
  );
};

export default LoginScreen;
