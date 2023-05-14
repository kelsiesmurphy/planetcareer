import { ArrowUpRight } from "react-feather";
import FileUpload from "./Upload";
import { useUser } from "@supabase/auth-helpers-react";

const SecondScreen = ({ setSecondScreen, handleChange, values, setIsOpen }: any) => {
  return (
    <div className="flex flex-col gap-4">
      <FileUpload fileName="Resume" url={values.Resume} />
      <FileUpload fileName="Cover Letter" url={values.CoverLetter} />
      <div className="flex-1 flex flex-col gap-1.5">
        <label
          htmlFor="further-details"
          className="font-medium text-sm text-stone-700"
        >
          Further Details
        </label>
        <textarea
          id="further-details"
          rows={3}
          name="FurtherDetails"
          onChange={handleChange}
          value={values.FurtherDetails}
          placeholder="Add additional details relating to this role..."
          className="input min-h-[100px]"
        ></textarea>
      </div>
      <div className="flex flex-wrap flex-1 gap-4">
        <button
          onClick={() => setSecondScreen(false)}
          className="btn-secondary flex-1 max-w-none"
        >
          Back to details
        </button>
        <button
          onClick={() => setIsOpen(false)}
          className="btn-primary flex-1 max-w-none"
        >
          Update Application <ArrowUpRight />
        </button>
      </div>
    </div>
  );
};

export default SecondScreen;
