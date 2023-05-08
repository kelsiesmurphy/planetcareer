import { useEffect, useState } from "react";
import Image from "next/image";
import { Globe, Paperclip } from "react-feather";
import Dropdown from "./StageDropdown";
import { updateApplicationStage } from "@/handlers/ApplicationHandler";
import EditApplication from "./edit_application_form/EditApplication";

const TableLine = ({
  stages,
  tableLineItem,
  supabase,
  userProfileId,
  jobApplicationId,
}: any) => {
  const [tableLine, setTableLine] = useState(tableLineItem);
  const [currentStage, setCurrentStage] = useState({});

  useEffect(() => {
    setCurrentStage(
      stages.filter((stage: any) => stage.id === tableLine.stage_id)[0]
    );
  }, [stages]);

  const handleChangeStage = async (stage: any) => {
    updateApplicationStage(supabase, tableLine, stage).then(
      (updatedApplication) => {
        const dupTableLine = { ...tableLine };
        dupTableLine.stage_id = updatedApplication[0].stage_id;
        setTableLine(dupTableLine);
        setCurrentStage(
          stages.filter((stage: any) => stage.id === dupTableLine.stage_id)[0]
        );
      }
    );
  };

  return (
    <tr
      className="flex flex-1 justify-between items-center gap-1 border-b py-3 odd:bg-stone-50"
    >
      <td className="flex flex-1 min-w-[180px] md:max-w-[190px] items-center gap-3 px-4 text-sm text-stone-500">
        {tableLine.company_logo && (
          <Image
            width="40"
            height="40"
            unoptimized
            alt={tableLine.company_name + "company logo"}
            src={tableLine.company_logo}
            className="rounded-full"
          />
        )}
        <p className="text-slate-900 font-medium">{tableLine.company_name}</p>
      </td>
      <td className="flex min-w-[154px] items-center gap-3 px-4 text-sm text-stone-500">
        <Dropdown
          currentStage={currentStage}
          stages={stages}
          handleChangeStage={handleChangeStage}
        />
      </td>
      <td className="hidden md:flex min-w-[162px] items-center gap-3 px-4 text-sm text-stone-500">
        {tableLine.role ? tableLine.role : "N/A"}
      </td>
      <td className="hidden sm:flex min-w-[100px] items-center gap-3 px-4 text-sm text-stone-500">
        {tableLine.pay_range ? tableLine.pay_range : "Not given"}
      </td>
      <td className="hidden xl:flex flex-1 max-w-[270px] flex-wrap items-center gap-3 px-4 text-sm text-stone-500">
        <div className="rounded-full flex gap-2 items-center py-1 px-3 font-medium bg-green-100 text-green-700">
          <Paperclip size={12} />
          Resume
        </div>
        {tableLine.cover_letter && (
          <div className="rounded-full flex gap-2 items-center py-1 px-3 font-medium bg-blue-100 text-blue-700">
            <Paperclip size={12} />
            Cover Letter
          </div>
        )}
      </td>
      <td className="hidden sm:flex flex-1 max-w-[60px] items-center gap-3 px-4 text-sm text-stone-500">
        <Globe className="text-stone-400 hover:text-stone-700 transition-colors cursor-pointer" />
      </td>
      <td className="hidden lg:flex flex-1 max-w-[112px] items-center gap-3 px-4 text-sm text-stone-500">
        {tableLine.applied_date
          ? new Date(tableLine.applied_date).toLocaleDateString("en-GB")
          : "N/A"}
      </td>
      <td className="hidden lg:flex flex-1 items-center gap-3 px-4 text-sm text-stone-500">
        {tableLine.further_details}
      </td>
      <td className="flex w-16 justify-center items-center px-4 text-stone-500">
        <EditApplication
          tableLine={tableLine}
          supabase={supabase}
          stages={stages}
          job_period_id={jobApplicationId}
          userProfileId={userProfileId}
        />
      </td>
    </tr>
  );
};

export default TableLine;
