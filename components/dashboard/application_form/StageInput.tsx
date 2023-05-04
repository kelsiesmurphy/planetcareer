import Dropdown from "../StageDropdown"

const StageInput = ({label, values, handleChange}:any) => {

  return (
    <div className="flex-1 flex flex-col gap-1.5">
      <label htmlFor={label} className="font-medium text-sm text-stone-700">
        {label}
      </label>
      <div className="input py-2 px-3.5">
        <Dropdown values={values} handleChangeStage={handleChange} />
      </div>
    </div>
  )
}

export default StageInput