import { useEffect, useState } from "react";
import { getAllStages } from "@/handlers/StageHandler";
import TableLine from "./TableLine";
import AddApplication from "./new_application_form/AddApplication";
import LoadingSkeleton from "./LoadingSkeleton";

const Table = ({ supabase }: any) => {
  const [stages, setStages] = useState<any>([]);
  const [tableLines, setTableLines] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getStages = async () => {
    getAllStages(supabase).then((stages) => {
      setStages(stages);
    });
  };

  async function getApplications() {
    try {
      const { data, error, status } = await supabase
        .from("application_demo")
        .select("*");
      setTableLines(data);
      setIsLoading(false);
      if (error && status !== 406) {
        throw error;
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getApplications();
    getStages();
  }, []);

  return (
    <div className="flex flex-col border-y border-slate-300 pb-8 bg-white shadow-sm md:rounded-xl md:border-x">
      <div className="flex justify-between items-center gap-6 py-5 px-4">
        <div className="flex gap-4">
          <h3 className="text-lg font-medium text-slate-900">
            Job Applications
          </h3>
        </div>
        <AddApplication stages={stages} />
      </div>
      <table>
        <thead className="text-left">
          <tr className="flex flex-1 justify-between items-center gap-1 border-y py-3">
            <th className="flex-1 min-w-[140px] md:max-w-[190px] px-4">
              <h4 className="text-xs font-medium text-stone-600">Company</h4>
            </th>
            <th className="min-w-[154px] px-4">
              <h4 className="text-xs font-medium text-stone-600">Stage</h4>
            </th>
            <th className="hidden w-[162px] px-4 lg:flex">
              <h4 className="text-xs font-medium text-stone-600">Role</h4>
            </th>
            <th className="hidden w-[100px] px-4 sm:flex">
              <h4 className="text-xs font-medium text-stone-600">Salary</h4>
            </th>
            <th className="hidden flex-1 max-w-[270px] px-4 xl:flex">
              <h4 className="text-xs font-medium text-stone-600">Documents</h4>
            </th>
            <th className="hidden flex-1 max-w-[60px] px-4 sm:flex justify-center">
              <h4 className="text-xs font-medium text-stone-600">URL</h4>
            </th>
            <th className="hidden flex-1 max-w-[112px] px-4 lg:flex">
              <h4 className="text-xs font-medium text-stone-600">
                Date Applied
              </h4>
            </th>
            <th className="hidden flex-1 px-4 xl:flex max-w-xs">
              <h4 className="text-xs font-medium text-stone-600">
                Further Details
              </h4>
            </th>
            <th className="hidden md:flex w-24 justify-center items-center px-4 text-stone-500"></th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <>
              <LoadingSkeleton />
              <LoadingSkeleton />
              <LoadingSkeleton />
              <LoadingSkeleton />
              <LoadingSkeleton />
              <LoadingSkeleton />
              <LoadingSkeleton />
              <LoadingSkeleton />
            </>
          ) : (
            tableLines.map((tableLineItem: any, index: number) => {
              return (
                <TableLine
                  key={index}
                  stages={stages}
                  tableLineItem={tableLineItem}
                  supabase={supabase}
                  index={index}
                  tableLines={tableLines}
                  setTableLines={setTableLines}
                />
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
