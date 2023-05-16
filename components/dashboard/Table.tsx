import { useEffect, useState } from "react";
import { createJobApplicationPeriod } from "@/handlers/JobApplicationPeriodHandler";
import { getApplicationsByPeriod } from "@/handlers/ApplicationHandler";
import { getAllStages } from "@/handlers/StageHandler";
import TableLine from "./TableLine";
import AddApplication from "./new_application_form/AddApplication";
import LoadingSkeleton from "./LoadingSkeleton";
import TableEmptyState from "./TableEmptyState";

const Table = ({ userProfile, supabase }: any) => {
  const [jobApplicationPeriod, setJobApplicationPeriod] = useState<any>({});
  const [stages, setStages] = useState<any>([]);
  const [tableLines, setTableLines] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getStages = async () => {
    getAllStages(supabase).then((stages) => {
      setStages(stages);
    });
  };

  async function getApplications(jobApplicationPeriod: any) {
    try {
      getApplicationsByPeriod(supabase, jobApplicationPeriod).then(
        (applications) => {
          setTableLines(applications);
          setIsLoading(false);
        }
      );
    } catch (error) {
      console.log(error);
    }
  }

  async function getJobApplicationPeriod(userProfile: any) {
    try {
      if (userProfile.current_application_period_id) {
        createJobApplicationPeriod(supabase, userProfile).then(
          (jobApplicationPeriod) => {
            setJobApplicationPeriod(jobApplicationPeriod[0]);
            getApplications(jobApplicationPeriod[0]);
          }
        );
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getJobApplicationPeriod(userProfile);
    getStages();
  }, [userProfile]);

  return (
    <div className="flex flex-col border-y border-slate-300 pb-8 bg-white shadow-sm md:rounded-xl md:border-x">
      <div className="flex justify-between items-center gap-6 py-5 px-4">
        <div className="flex gap-4">
          <h3 className="text-lg font-medium text-slate-900">
            Job Applications
          </h3>
        </div>
        <AddApplication
          supabase={supabase}
          stages={stages}
          job_period_id={jobApplicationPeriod.id}
          userProfile={userProfile.id}
          getApplications={getApplications}
          tableLines={tableLines}
          setTableLines={setTableLines}
        />
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
          {isLoading === false && tableLines.length === 0 ? (
            <TableEmptyState>
              <AddApplication
                supabase={supabase}
                stages={stages}
                job_period_id={jobApplicationPeriod.id}
                userProfile={userProfile.id}
                getApplications={getApplications}
                tableLines={tableLines}
                setTableLines={setTableLines}
              />
            </TableEmptyState>
          ) : isLoading ? (
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
                  userProfileId={userProfile.id}
                  jobApplicationId={jobApplicationPeriod.id}
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
