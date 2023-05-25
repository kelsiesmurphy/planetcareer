import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { X } from "react-feather";
import { createJobApplicationPeriod } from "@/handlers/JobApplicationPeriodHandler";
import { updateUserApplicationPeriod } from "@/handlers/AuthHandler";
import { updateJobApplicationPeriodEndDate } from "@/handlers/JobApplicationPeriodHandler";
import trophy from "../../assets/trophy.svg";
import Image from "next/image";
import confetti from "canvas-confetti";
import Router from "next/router";

const GotAJobButton = ({ supabase, userProfile, setUserProfile }: any) => {
  let [isOpen, setIsOpen] = useState(false);
  const [confirmInput, setConfirmInput] = useState("");

  const handleConfetti = () => {
    confetti({
      particleCount: 200,
      spread: 80,
    });
  };

  const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

  const handleGotAJob = async () => {
    try {
      updateJobApplicationPeriodEndDate(
        supabase,
        userProfile.current_application_period_id
      );
      createJobApplicationPeriod(supabase, userProfile).then((periodId) => {
        updateUserApplicationPeriod(supabase, userProfile.id, periodId).then(
          (updatedUserProfile) => {
            setUserProfile(updatedUserProfile);
          }
        );
      });
      handleConfetti();
      setIsOpen(false);
      await delay(3000);
      Router.reload();
    } catch (error) {
      alert("Error submitting application");
      console.log(error);
    }
  };

  return (
    <>
      <button onClick={() => setIsOpen(true)} className="btn-secondary">
        <Image src={trophy} alt="" width="0" height="0" className="w-5" />{" "}
        <p className="hidden md:block">I got a job!</p>
      </button>

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
                <Dialog.Title className="space-y-4">
                  <div className="flex justify-between items-start text-stone-700">
                    <div className="p-3.5 border shadow-sm rounded-lg">
                      <Image
                        src={trophy}
                        alt=""
                        width="0"
                        height="0"
                        className="w-5"
                      />
                    </div>
                    <button
                      className="p-2.5 focus:outline-green-700"
                      onClick={() => setIsOpen(false)}
                    >
                      <X />
                    </button>
                  </div>
                  <div className="space-y-1">
                    <h1 className="font-medium text-lg text-stone-900">
                      Start a new application list?
                    </h1>
                    <p className="text-sm text-stone-600">
                      If you've got a job, you won't be needing this list
                      anymore! Type 'CONFIRM' below to clear your list of
                      applications, and it will be ready for you if you decide
                      to use it again in the future!
                    </p>
                  </div>
                  <input
                    className="input w-full"
                    onChange={(e) => setConfirmInput(e.target.value)}
                    value={confirmInput}
                    name="confirmInput"
                    placeholder="CONFIRM"
                  />
                </Dialog.Title>
                <div className="flex flex-wrap flex-1 gap-4">
                  <button
                    onClick={() => setIsOpen(false)}
                    className="btn-secondary flex-1 max-w-none"
                  >
                    Cancel
                  </button>
                  <button
                    className="btn-primary flex-1 max-w-none"
                    onClick={() => handleGotAJob()}
                    disabled={confirmInput !== "CONFIRM"}
                  >
                    Confirm
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default GotAJobButton;
