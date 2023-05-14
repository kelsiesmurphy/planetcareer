import { useState } from "react";

const UrlInput = ({ label, placeholder, handleChange, values }: any) => {
  const [postingUrl, setPostingUrl] = useState(values.Url);

  const changeInput = (url: any) => {
    const result = {
      target: {
        name: "Url",
        value: url,
      },
    };
    setPostingUrl(url);
    handleChange(result);
  };

  function pasteUrl(e: { target: { value: string } }) {
    changeInput(e.target.value);
  }

  return (
    <div className="flex-1 flex flex-col gap-1.5">
      <label htmlFor={label} className="font-medium text-sm text-stone-700">
        {label}
      </label>
      <div className="shadow-sm border border-stone-300 rounded-lg outline-green-700 transition-all flex">
        <div className="py-2.5 pl-3.5 pr-3 border-r border-stone-300">
          <p className="text-stone-600">https://</p>
        </div>
        <input
          id={label}
          type="text"
          value={postingUrl.replace(/^https?:\/\//, "")}
          onChange={pasteUrl}
          placeholder={placeholder}
          className="flex-1 py-2.5 px-3.5 rounded-l-none rounded-r-lg border-none outline-green-700"
        />
      </div>
    </div>
  );
};

export default UrlInput;
