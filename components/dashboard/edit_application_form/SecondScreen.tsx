import { ArrowUpRight } from "react-feather";
import FileUpload from "./Upload";

const SecondScreen = ({
  setSecondScreen,
  submitEditedApplication,
  handleChange,
  values,
}: any) => {
  const handleChangeResume = (url: any, size: any) => {
    const result = {
      target: {
        name: "Resume",
        value: {
          url: url,
          size: size,
        },
      },
    };
    handleChange(result);
  };

  const handleChangeCoverLetter = (url: any, size: any) => {
    const result = {
      target: {
        name: "CoverLetter",
        value: {
          url: url,
          size: size,
        },
      },
    };
    handleChange(result);
  };

  return (
    <div className="flex flex-col gap-4">
      <FileUpload
        fileName="Resume"
        url={values.Resume}
        onUpload={(url, size) => {
          handleChangeResume(url, size);
        }}
      />
      <FileUpload
        fileName="Cover Letter"
        url={values.CoverLetter}
        onUpload={(url, size) => {
          handleChangeCoverLetter(url, size);
        }}
      />
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
          className="btn-primary flex-1 max-w-none"
          onClick={submitEditedApplication}
        >
          Update Application <ArrowUpRight />
        </button>
      </div>
    </div>
  );
};

export default SecondScreen;
