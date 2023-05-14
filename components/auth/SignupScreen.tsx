import { useState } from "react";
import Image from "next/image";
import router from "next/router";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { createSignUp } from "@/handlers/AuthHandler";
import Alert from "../Alert";

const SignupScreen = ({ setAuthType, font }: any) => {
  const supabase = useSupabaseClient();

  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState({});

  const handleSignup = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      createSignUp(supabase, firstName, email, password).then((res) => {
        console.log(res);
        if (res.data.user !== null) {
          res.data.user.id && router.push("/dashboard");
        }
        if (res.error.message) {
          console.log(res);
          setAlertMessage(res.error.message);
          setAlertOpen(true);
        }
        // if (res.error.message === "Password should be at least 6 characters") {
        //   console.log(res);
        //   setAlertOpen(true);
        // }
      });
    } catch (error: any) {
      console.log(error.error_description || error.message);
    } finally {
      setFirstName("");
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
            Create an account
          </h1>
        </div>
        <div className="space-y-4">
          <div className="flex-1 flex flex-col gap-1.5">
            <label
              htmlFor="fname"
              className="font-medium text-sm text-stone-700"
            >
              First Name
            </label>
            <input
              id="fname"
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="Enter your first name"
              className="input"
              name="fname"
            />
          </div>
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Create a password"
              className="input"
              name="password"
            />
            <p className="text-stone-500 text-sm">
              Must be at least 6 characters.
            </p>
          </div>
        </div>
        <button
          onClick={handleSignup}
          className="btn-primary w-full max-w-none"
          disabled={
            email === "" ||
            !email.includes("@") ||
            password === "" ||
            firstName === "" ||
            password.length <= 6
          }
        >
          Get started
        </button>
        <div>
          <p className="text-sm text-stone-500 text-center">
            Already have an account?{" "}
            <button
              className="font-medium px-1 cursor-pointer outline-green-700 text-green-700"
              onClick={() => setAuthType("Log in")}
            >
              Log in
            </button>
          </p>
        </div>
      </div>
      <Alert
        title="Signup error"
        message={alertMessage}
        isOpen={alertOpen}
        setIsOpen={setAlertOpen}
      />
    </>
  );
};

export default SignupScreen;
