import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { forgotPassword } from "@/handlers/AuthHandler";

const ForgotPasswordModal = ({
  supabase,
  children,
  isOpen,
  setIsOpen,
}: any) => {
  const [email, setEmail] = useState("");

  const handleForgotPassword = () => {
    try {
      forgotPassword(supabase, email);
      setIsOpen(false);
    } catch (error) {
      alert("Error submitting form");
      console.log(error);
    } finally {
      setEmail("");
    }
  };

  return (
    <>
      {children}

      <Transition show={isOpen} as={Fragment}>
        <Dialog onClose={() => setIsOpen(false)} className="relative z-50">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            {/* The backdrop, rendered as a fixed sibling to the panel container */}
            <div
              className="fixed inset-0 bg-stone-700/30 backdrop-blur-md"
              aria-hidden="true"
            />
          </Transition.Child>

          {/* Full-screen container to center the panel */}
          <div className="fixed inset-0 flex items-center justify-center p-4">
            {/* The actual dialog panel  */}
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="mx-auto max-w-sm flex-1 p-6 rounded-xl shadow-lg space-y-4 bg-white">
                <Dialog.Title className="flex flex-col gap-4">
                  <div>
                    <h1 className="font-medium text-lg text-stone-900">
                      Recover password
                    </h1>
                    <p className="text-sm text-stone-600">
                      It happens! We'll send a password reset link to your
                      email.
                    </p>
                  </div>
                  <div className="flex-1 flex flex-col gap-1.5">
                    <label
                      htmlFor="Email"
                      className="font-medium text-sm text-stone-700"
                    >
                      Your Email
                    </label>
                    <input
                      onChange={(e) => setEmail(e.target.value)}
                      id="Email"
                      type="email"
                      name="Email"
                      value={email}
                      placeholder="johndoe@example.com"
                      className="input"
                      required
                    />
                  </div>
                  <button
                    className="btn-primary flex-1 max-w-none"
                    onClick={handleForgotPassword}
                    disabled={email === "" || !email.includes("@")}
                  >
                    Email me a recovery link
                  </button>
                </Dialog.Title>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default ForgotPasswordModal;
