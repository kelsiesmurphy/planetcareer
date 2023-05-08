import UrlInput from "./UrlInput";
import StageInput from "./StageInput";

import CompanyInput from "./CompanyInput";

const FirstScreen = ({
  setSecondScreen,
  stages,
  handleChange,
  values,
}: any) => {
  return (
    <div className="flex flex-col gap-4">
      <CompanyInput values="values" handleChange={handleChange} />
      <UrlInput
        label="Posting URL"
        placeholder="www.example.com"
        values="values"
        handleChange={handleChange}
      />
      <div className="flex flex-wrap gap-4">
        <div className="flex-1 flex flex-col gap-1.5">
          <label
            htmlFor="Pay Range"
            className="font-medium text-sm text-stone-700"
          >
            Pay Range
          </label>
          <input
            onChange={handleChange}
            name="PayRange"
            id="Pay Range"
            type="text"
            value={values.PayRange}
            placeholder="e.g. £30k - £35k"
            className="input"
          />
        </div>
        <StageInput
          label="Stage"
          values={values}
          stages={stages}
          handleChange={handleChange}
        />
      </div>
      <div className="flex-1 flex flex-col gap-1.5">
        <label htmlFor="Role" className="font-medium text-sm text-stone-700">
          Role
        </label>
        <input
          onChange={handleChange}
          id="Role"
          type="text"
          name="Role"
          value={values.Role}
          placeholder="e.g. Developer"
          className="input"
        />
      </div>
      <button
        onClick={() => setSecondScreen(true)}
        className="bg-green-700 hover:bg-green-800 py-2.5 mt-3 px-4 rounded-lg text-white transition-colors items-center flex-1 hadow-sm justify-center flex gap-2"
      >
        Next
      </button>
    </div>
  );
};

export default FirstScreen;
