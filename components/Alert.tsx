import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";

const Modal = ({ children, isOpen, setIsOpen }: any) => {

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
              <Dialog.Panel className="mx-auto max-w-2xl flex-1 p-6 rounded-xl shadow-lg space-y-4 bg-white">
                <Dialog.Title className="space-y-4">
                  <h1 className="font-medium text-lg text-stone-900">
                    New Application
                  </h1>
                  <h1 className="text-sm text-stone-600">
                    Add your application details here.
                  </h1>
                </Dialog.Title>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default Modal;
