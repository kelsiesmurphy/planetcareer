import { useState } from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { Sora } from "next/font/google";
import Head from "next/head";
import Navigation from "@/components/dashboard-demo/Navigation";
import Table from "@/components/dashboard-demo/Table";
import Account from "@/components/dashboard-demo/Account";
import ComingSoon from "@/components/dashboard/job_board/ComingSoon";
import GotAJobButton from "@/components/dashboard-demo/GotAJobButton";

const sora = Sora({ subsets: ["latin"] });

export default function Dashboard() {
  const supabase = useSupabaseClient();

  const firstName = "Jessica";
  const profileImage =
    "https://xddplurlgjvqtjiyodqt.supabase.co/storage/v1/object/public/demo-applications-storage/demo-user-profile.png";

  const [pageSection, setPageSection] = useState<
    "job-hunt" | "job-board" | "settings"
  >("job-hunt");

  return (
    <>
      <Head>
        <title>Example Dashboard | PlanetCareer</title>
        <meta
          name="Example Dashboard"
          content="Keep track of your job search with our application tracker, built to help you secure your dream job. Ethical job board coming soon."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <main className="flex flex-col bg-stone-50 items-stretch min-h-screen">
        <Navigation
          profile_img={profileImage}
          first_name={firstName}
          pageSection={pageSection}
          setPageSection={setPageSection}
        />
        {pageSection === "job-hunt" && (
          <div className="flex-1 md:ml-[80px] space-y-12 py-12 md:px-6">
            <div className="flex justify-between items-center px-4 md:px-0">
              <h1
                className={
                  sora.className +
                  " text-2xl md:text-3xl font-medium text-stone-900"
                }
              >
                Welcome back, {firstName}
              </h1>
              <GotAJobButton />
            </div>
            <Table supabase={supabase} />
          </div>
        )}
        {pageSection === "job-board" && (
          <div className="flex-1 md:ml-[80px] space-y-12 py-12 md:px-6">
            <h1
              className={
                sora.className +
                " text-2xl px-6 md:px-0 md:text-3xl font-medium text-stone-900"
              }
            >
              Job Board
            </h1>
            <ComingSoon />
          </div>
        )}
        {pageSection === "settings" && (
          <div className="flex-1 md:ml-[80px] space-y-12 py-12 md:px-6">
            <h1
              className={
                sora.className +
                " text-2xl px-6 md:px-0 md:text-3xl font-medium text-stone-900"
              }
            >
              Settings
            </h1>
            <Account />
          </div>
        )}
      </main>
    </>
  );
}
