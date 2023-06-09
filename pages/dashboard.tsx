import { useEffect, useState } from "react";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { Sora } from "next/font/google";
import Head from "next/head";
import Navigation from "@/components/dashboard/Navigation";
import Table from "@/components/dashboard/Table";
import Account from "@/components/dashboard/Account";
import ComingSoon from "@/components/dashboard/job_board/ComingSoon";
import Router from "next/router";
import { signOut } from "@/handlers/AuthHandler";
import GotAJobButton from "@/components/dashboard/GotAJobButton";

const sora = Sora({ subsets: ["latin"] });

export default function Dashboard() {
  const session: any = useSession();
  const supabase = useSupabaseClient();

  const [userProfile, setUserProfile] = useState<any>({});
  const [pageSection, setPageSection] = useState<
    "job-hunt" | "job-board" | "settings"
  >("job-hunt");

  const getUserProfile = async () => {
    const { data } = await supabase.from("user_profile").select();
    setUserProfile(data?.[0]);
  };

  useEffect(() => {
    if (session) {
      getUserProfile();
    }
  }, [session]);

  if (userProfile) {
    return (
      <>
        <Head>
          <title>
            {userProfile.first_name}&apos;s Dashboard | PlanetCareer
          </title>
          <meta
            name="Dashboard"
            content="Keep track of your job search with our application tracker, built to help you secure your dream job. Ethical job board coming soon."
          />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.svg" />
        </Head>
        <main className="flex flex-col bg-stone-50 items-stretch min-h-screen">
          <Navigation
            profile_img={userProfile.profile_img}
            first_name={userProfile.first_name}
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
                  Welcome back, {userProfile.first_name}
                </h1>
                <GotAJobButton
                  supabase={supabase}
                  userProfile={userProfile}
                  setUserProfile={setUserProfile}
                />
              </div>
              <Table supabase={supabase} userProfile={userProfile} />
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
              <Account session={session} supabase={supabase} />
            </div>
          )}
        </main>
      </>
    );
  } else {
    return (
      <h1>
        Error: Cannot access this page unless you are logged in. If you are
        encountering issues, please ensure you are{" "}
        <button
          className="text-green-800"
          onClick={() => signOut(supabase, Router)}
        >
          signed out
        </button>{" "}
        correctly
      </h1>
    );
  }
}
