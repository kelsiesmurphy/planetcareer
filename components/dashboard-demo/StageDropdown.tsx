import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";

export default function Dropdown({
  currentStage,
  stages,
  handleChangeStage,
}: any) {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button
          className={`rounded-full outline-green-700 text-sm flex gap-2 items-center py-1 px-3 font-medium ${
            currentStage.title === "Saved"
              ? "bg-stone-200 text-stone-700"
              : currentStage.title === "Interviewing"
              ? "bg-green-100 text-green-700"
              : currentStage.title === "Applied"
              ? "bg-amber-100 text-amber-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {currentStage.title === "Interviewing" && (
            <div className="w-[6px] aspect-square rounded-full bg-green-600" />
          )}
          {currentStage ? currentStage.title : "N/A"}
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 md:left-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            {stages.map((stage: any, index: number) => (
              <Menu.Item key={index}>
                {({ active }) => (
                  <div
                    onClick={() => handleChangeStage(stage)}
                    className={`block px-4 py-2 text-sm transition-colors ${
                      active && "bg-stone-100"
                    }`}
                  >
                    <Menu.Button
                      className={`rounded-full flex gap-2 items-center py-1 px-3 font-medium ${
                        stage.title === "Saved"
                          ? "bg-stone-200 text-stone-700"
                          : stage.title === "Interviewing"
                          ? "bg-green-100 text-green-700"
                          : stage.title === "Applied"
                          ? "bg-amber-100 text-amber-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {stage.title === "Interviewing" && (
                        <div className="w-[6px] aspect-square rounded-full bg-green-600" />
                      )}
                      {stage ? stage.title : "N/A"}
                    </Menu.Button>
                  </div>
                )}
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
