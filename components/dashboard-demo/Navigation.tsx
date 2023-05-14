import Image from "next/image";
import { HelpCircle, X } from "react-feather";
import menuIcon from "../../assets/menu.svg";
import layoutIcon from "../../assets/layout.svg";
import briefcaseIcon from "../../assets/briefcase.svg";
import homeIcon from "../../assets/home-smile.svg";
import settingsIcon from "../../assets/settings.svg";
import { useEffect, useState } from "react";
import Link from "next/link";
import TypeformButton from "../TypeformButton";
import { issueFormID } from "@/content/typeformIds";

const Navigation = ({
  profile_img,
  first_name,
  pageSection,
  setPageSection,
}: {
  profile_img: string;
  first_name: string;
  pageSection: "job-hunt" | "job-board" | "settings";
  setPageSection: (param: "job-hunt" | "job-board" | "settings") => any;
}) => {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [placeholder, setPlaceholder] = useState(
    "https://xddplurlgjvqtjiyodqt.supabase.co/storage/v1/object/public/demo-applications-storage/placeholder.svg?t=2023-04-17T15%3A38%3A25.558Z"
  );

  useEffect(() => {
    fetch(
      `https://ui-avatars.com/api/?name=${first_name}&background=EAECF0&color=475467&bold=true`
    ).then((data) => setPlaceholder(data.url));
  }, [first_name]);

  const goToSection = (section: "job-hunt" | "job-board" | "settings") => {
    setPageSection(section);
    setMobileNavOpen(false);
  };

  return (
    <>
      <div className="flex flex-col gap-4 md:hidden px-4 py-3 bg-white border-b text-stone-500 border-stone-200">
        <div className="flex flex-1 gap-4 justify-between items-center">
          <Link href="/">
            <Image
              alt="PlanetCareer Logo without text"
              width="0"
              height="0"
              className="w-10 aspect-square"
              src="/logomark.svg"
            />
          </Link>
          <div className="p-2" onClick={() => setMobileNavOpen(!mobileNavOpen)}>
            {mobileNavOpen ? (
              <X />
            ) : (
              <Image
                alt="Menu Icon"
                width="0"
                height="0"
                className="w-6"
                src={menuIcon}
              />
            )}
          </div>
        </div>
        {mobileNavOpen && (
          <ul className="flex flex-col gap-2">
            <li
              className={`flex-1 font-medium text-stone-900 flex gap-3 py-3 px-2 rounded-lg hover:bg-stone-50 ${
                pageSection === "job-hunt" && "bg-stone-100"
              }`}
              onClick={() => goToSection("job-hunt")}
            >
              <Image
                alt="Application Tracker Icon"
                width="0"
                height="0"
                className="w-6"
                src={layoutIcon}
              />
              Application Tracker
            </li>
            <li
              className={`flex-1 font-medium text-stone-900 flex gap-3 py-3 px-2 rounded-lg hover:bg-stone-50 ${
                pageSection === "job-board" && "bg-stone-100"
              }`}
              onClick={() => goToSection("job-board")}
            >
              <Image
                alt="Briefcase Icon"
                width="0"
                height="0"
                className="w-6"
                src={briefcaseIcon}
              />
              Job Board
            </li>
            <li
              className={`flex-1 font-medium text-stone-900 flex gap-3 py-3 px-2 rounded-lg hover:bg-stone-50 ${
                pageSection === "settings" && "bg-stone-100"
              }`}
              onClick={() => goToSection("settings")}
            >
              <Image
                alt="Settings Icon"
                width="0"
                height="0"
                className="w-6"
                src={settingsIcon}
              />
              Settings
            </li>
            <li className="flex py-3 px-2 font-medium">
              <TypeformButton
                id={issueFormID}
                styling="btn-secondary flex-1"
                text="Found an issue?"
              />
            </li>
          </ul>
        )}
      </div>

      <div className="hidden md:flex fixed min-h-screen px-4 py-10 bg-white border-r text-stone-500 border-stone-200 w-[80px] flex-col gap-4 justify-between">
        <div className="flex flex-col gap-6 items-center">
          <Link href="/">
            <Image
              alt="PlanetCareer Logo without text"
              width="0"
              height="0"
              className="w-10 aspect-square"
              src="/logomark.svg"
            />
          </Link>
          <div className="space-y-1">
            <button
              className={`p-3 hover:text-stone-800 rounded-lg transition-colors ${
                pageSection === "job-hunt" && "bg-stone-100"
              }`}
              onClick={() => setPageSection("job-hunt")}
            >
              <Image
                alt="Application Tracker Icon"
                width="0"
                height="0"
                className="w-6"
                src={layoutIcon}
              />
            </button>
            <button
              className={`p-3 hover:text-stone-800 rounded-lg transition-colors ${
                pageSection === "job-board" && "bg-stone-100"
              }`}
              onClick={() => setPageSection("job-board")}
            >
              <Image
                alt="Briefcase Icon"
                width="0"
                height="0"
                className="w-6"
                src={briefcaseIcon}
              />
            </button>
          </div>
        </div>
        <div className="flex flex-col gap-2 items-center">
          <div className="relative pb-6">
            <TypeformButton
              id={issueFormID}
              styling="z-10 absolute top-0  w-9 h-9 hover:text-stone-800"
            />
            <HelpCircle size={24} className="z-0" />
          </div>
          <button
            className={`p-3 hover:text-stone-800 rounded-lg transition-colors ${
              pageSection === "settings" && "bg-stone-100"
            }`}
            onClick={() => setPageSection("settings")}
          >
            <Image
              alt="Settings Icon"
              width="0"
              height="0"
              className="w-6"
              src={settingsIcon}
            />
          </button>

          <Image
            src={profile_img}
            alt="Profile Image"
            width="0"
            height="0"
            unoptimized
            className="w-32 aspect-square rounded-full"
          />
        </div>
      </div>
    </>
  );
};

export default Navigation;
