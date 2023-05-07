import { useState, Fragment } from "react";
import { Check, ChevronDown, Search } from "react-feather";
import { Combobox, Transition } from "@headlessui/react";
import Image from "next/image";

const CompanyInput = ({ values, handleChange }: any) => {
  const [query, setQuery] = useState("");
  const [companies, setCompanies] = useState([]);

  interface ICompany {
    name: string;
    domain: string;
    logo: string;
  }

  const getCompanies = async (value: string) => {
    try {
      await fetch(
        `https://autocomplete.clearbit.com/v1/companies/suggest?query=:${value}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${process.env.API_CLEARBIT_AUTOCOMPLETE}`,
          },
        }
      )
        .then((response) => response.json())
        .then((data) => setCompanies(data));
    } catch (err) {
      console.log(err);
    }
  };

  const updateCompanies = (e: { target: { value: any } }) => {
    const value = e.target.value;
    setQuery(value);
    getCompanies(value);
  };

  const changeCompany = (company: any) => {
    const result = {
      target: {
        name: "Company",
        value: company,
      },
    };
    handleChange(result);
  };

  return (
    <>
      <div className="flex-1 flex flex-col gap-1.5">
        <label htmlFor="company" className="font-medium text-sm text-stone-700">
          Company
        </label>
        <div className="shadow-sm border border-stone-300 rounded-lg outline-green-700 transition-all flex gap-2 items-center">
          <div className="p-2.5 pr-0">
            <Search size={20} className="text-stone-600" />
          </div>

          <div className="flex-1">
            <Combobox value={values.Company} onChange={(e) => changeCompany(e)}>
              <div className="relative">
                <div className="flex">
                  <Combobox.Input
                    className="flex-1 py-2.5 pr-3.5 rounded-l-none rounded-r-lg border-none outline-none"
                    placeholder="Search for a company"
                    displayValue={(query: { name: string }) => query.name}
                    onChange={updateCompanies}
                  />
                  <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                    <ChevronDown
                      className="h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                  </Combobox.Button>
                </div>
                <Transition
                  as={Fragment}
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                  afterLeave={() => setQuery("")}
                >
                  <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base z-10 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                    {!Array.isArray(companies) ? (
                      <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                        Nothing found.
                      </div>
                    ) : (
                      companies.map((company: ICompany) => (
                        <Combobox.Option
                          key={company.domain}
                          className={({ active }) =>
                            `relative cursor-pointer select-none py-2 pl-6 transition-colors pr-4 ${
                              active ? "bg-stone-100" : "text-gray-900"
                            }`
                          }
                          value={company}
                        >
                          {({ selected, active }) => (
                            <div className="flex items-center gap-4">
                              <Image
                                src={company.logo}
                                alt={company.name + " logo"}
                                width="0"
                                height="0"
                                unoptimized
                                className="w-8 object-contain aspect-square rounded-full"
                              />
                              <span
                                className={`block truncate ${
                                  selected ? "font-medium" : "font-normal"
                                }`}
                              >
                                {company.name}
                              </span>
                              {selected ? (
                                <span
                                  className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                    active ? "text-stone-800" : "text-stone-500"
                                  }`}
                                >
                                  <Check
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                  />
                                </span>
                              ) : null}
                            </div>
                          )}
                        </Combobox.Option>
                      ))
                    )}
                  </Combobox.Options>
                </Transition>
              </div>
            </Combobox>
          </div>
        </div>
      </div>
    </>
  );
};

export default CompanyInput;
