import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { Trash2, X } from "react-feather";
import { deleteApplication } from "@/handlers/ApplicationHandler";

const DeleteApplicationButton = ({
  setEditApplicationOpen,
  supabase,
  tableLine,
}: any) => {
  let [isOpen, setIsOpen] = useState(false);

  const handleDeleteApplication = () => {
    try {
      deleteApplication(supabase, tableLine).then(() => {
        console.log("need to immutably update edit on change");
      });
    } catch (error) {
      alert("Error submitting application");
      console.log(error);
    } finally {
      setIsOpen(false);
      setEditApplicationOpen(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="hover:text-red-800 transition-colors"
      >
        <Trash2 size={20} />
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
                      <Trash2 />
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
                      Delete Application
                    </h1>
                    <h1 className="text-sm text-stone-600">
                      Are you sure you would like to delete the application for
                      '{tableLine.company_name}'?
                    </h1>
                  </div>
                </Dialog.Title>
                <div className="flex flex-wrap flex-1 gap-4">
                  <button
                    onClick={() => setIsOpen(false)}
                    className="btn-secondary flex-1 max-w-none"
                  >
                    Cancel
                  </button>
                  <button
                    className="btn-primary flex-1 max-w-none bg-red-700 hover:bg-red-800"
                    onClick={handleDeleteApplication}
                  >
                    Delete
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

export default DeleteApplicationButton;
