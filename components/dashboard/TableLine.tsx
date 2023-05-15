import { useEffect, useState } from "react";
import { Globe, Paperclip } from "react-feather";
import { updateApplicationStage } from "@/handlers/ApplicationHandler";
import Dropdown from "./StageDropdown";
import EditApplication from "./edit_application_form/EditApplication";
import DeleteApplicationButton from "./DeleteApplicationButton";

const TableLine = ({
  stages,
  tableLineItem,
  supabase,
  userProfileId,
  tableLines,
  setTableLines,
  jobApplicationId,
}: any) => {
  const [tableLine, setTableLine] = useState(tableLineItem);
  const [currentStage, setCurrentStage] = useState({});
  const [placeholder, setPlaceholder] = useState("");

  const placeholderColours = [
    {
      bgColour: "#fee2e2",
      textColour: "#991b1b",
    },
    {
      bgColour: "#ffedd5",
      textColour: "#9a3412",
    },
  ];

  useEffect(() => {
    setCurrentStage(
      stages.filter((stage: any) => stage.id === tableLine.stage_id)[0]
    );
  }, [stages]);

  useEffect(() => {
    if (tableLine) {
      fetch(
        `https://ui-avatars.com/api/?name=${tableLine.company_name}&background=EAECF0&color=475467&bold=true`
      ).then((data) => setPlaceholder(data.url));
    }
  }, [tableLine]);

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

  const setEditApplicationOpen = (bool: boolean) => {
    return bool;
  };

  return (
    <tr className="flex flex-1 justify-between items-center gap-1 border-b py-3 odd:bg-stone-50">
      <td className="flex flex-1 min-w-[140px] md:max-w-[190px] items-center gap-3 px-4 text-sm text-stone-500">
        <EditApplication
          tableLine={tableLine}
          supabase={supabase}
          stages={stages}
          job_period_id={jobApplicationId}
          userProfileId={userProfileId}
          tableLines={tableLines}
          setTableLines={setTableLines}
          isText={true}
          placeholder={placeholder}
        />
      </td>
      <td className="flex min-w-[154px] items-center gap-3 px-4 text-sm text-stone-500">
        <Dropdown
          currentStage={currentStage}
          stages={stages}
          handleChangeStage={handleChangeStage}
        />
      </td>
      <td className="hidden lg:flex w-[162px] break-all items-center gap-3 px-4 text-sm text-stone-500">
        {tableLine.role ? tableLine.role : "N/A"}
      </td>
      <td className="hidden sm:flex w-[100px] break-all items-center gap-3 px-4 text-sm text-stone-500">
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
        <a href={`//${tableLine.posting_url}`} target="_blank">
          <Globe className="text-stone-400 hover:text-stone-700 transition-colors" />
        </a>
      </td>
      <td className="hidden lg:flex flex-1 max-w-[112px] items-center gap-3 px-4 text-sm text-stone-500">
        {tableLine.applied_date
          ? new Date(tableLine.applied_date).toLocaleDateString("en-GB")
          : "N/A"}
      </td>
      <td className="hidden xl:flex flex-1 break-all max-w-xs items-center gap-3 px-4 text-sm text-stone-500">
        {tableLine.further_details}
      </td>
      <td className="hidden md:flex w-24 justify-center items-center gap-4 px-4 text-stone-500">
        <EditApplication
          tableLine={tableLine}
          supabase={supabase}
          stages={stages}
          job_period_id={jobApplicationId}
          userProfileId={userProfileId}
          tableLines={tableLines}
          setTableLines={setTableLines}
          isText={false}
        />
        <DeleteApplicationButton
          setEditApplicationOpen={() => setEditApplicationOpen(false)}
          tableLine={tableLine}
          supabase={supabase}
          tableLines={tableLines}
          setTableLines={setTableLines}
        />
      </td>
    </tr>
  );
};

export default TableLine;
