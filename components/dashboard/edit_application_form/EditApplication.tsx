import { useState, Fragment, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Briefcase, Edit, Edit2, Plus, X } from "react-feather";
import FirstScreen from "./FirstScreen";
import SecondScreen from "./SecondScreen";
import { insertApplication } from "@/handlers/ApplicationHandler";

const EditApplication = ({
  supabase,
  stages,
  job_period_id,
  userProfileId,
  tableLine,
}: any) => {
  const [isOpen, setIsOpen] = useState(false);
  const [secondScreen, setSecondScreen] = useState(false);

  const [values, setValues] = useState({});

  useEffect(() => {
    setValues({
      Company: {
        name: tableLine.company_name,
        logo: tableLine.company_logo
      },
      Url: tableLine.posting_url,
      PayRange: tableLine.pay_range,
      Stage: stages.filter((stage: any) => stage.id === tableLine.stage_id)[0],
      Role: tableLine.role,
      Resume: {},
      CoverLetter: {},
      FurtherDetails: tableLine.further_details,
    });
  }, [stages]);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleClose = () => {
    setIsOpen(false);
    setSecondScreen(false);
  };

  const submitApplication = () => {
    try {
      insertApplication(supabase, values, userProfileId, job_period_id);
    } catch (error) {
      alert("Error submitting application");
      console.log(error);
    } finally {
      handleClose();
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="hover:text-stone-800 transition-colors"
      >
        <Edit size={20} />
      </button>

      <Transition show={isOpen} as={Fragment}>
        <Dialog onClose={handleClose} className="relative z-50">
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
                  <div className="flex justify-between items-start text-stone-700">
                    <div className="p-3.5 border shadow-sm rounded-lg">
                      <Briefcase />
                    </div>
                    <button
                      className="p-2.5 focus:outline-green-700"
                      onClick={handleClose}
                    >
                      <X />
                    </button>
                  </div>
                  <div>
                    <h1 className="font-medium text-lg text-stone-900">
                      Edit Application
                    </h1>
                    <h1 className="text-sm text-stone-600">
                      Edit your application details here.
                    </h1>
                  </div>
                </Dialog.Title>
                {secondScreen ? (
                  <SecondScreen
                    setSecondScreen={setSecondScreen}
                    submitApplication={submitApplication}
                    handleChange={handleChange}
                    values={values}
                  />
                ) : (
                  <FirstScreen
                    setSecondScreen={setSecondScreen}
                    handleChange={handleChange}
                    stages={stages}
                    values={values}
                  />
                )}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default EditApplication;
