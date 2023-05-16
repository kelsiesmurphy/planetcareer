import { useState, useEffect } from "react";
import { useUser } from "@supabase/auth-helpers-react";
import { Database } from "../../utils/database.types";
import Avatar from "./Upload";
import router from "next/router";
import { signOut } from "@/handlers/AuthHandler";
import { Switch } from "@headlessui/react";
type UserProfile = Database["public"]["Tables"]["user_profile"]["Row"];
import {
  getPlunkContact,
  subscribePlunkContact,
  unsubscribePlunkContact,
} from "@/handlers/PlunkEmailHandler";
import { LogOut } from "react-feather";

const Account = ({ session, supabase }: any) => {
  const user = useUser();
  const [loading, setLoading] = useState(true);
  const [userProfile, setUserProfile] = useState<any>(null);
  const [first_name, setFirstName] = useState<UserProfile["first_name"]>(null);
  const [profile_img, setProfileImg] =
    useState<UserProfile["profile_img"]>(null);
  const [plunkSubscribed, setPlunkSubscribed] = useState(true);

  useEffect(() => {
    getProfile();
  }, [session]);

  useEffect(() => {
    if (userProfile) {
      getPlunkData(userProfile.plunk_id);
    }
  }, [userProfile]);

  const getPlunkData = async (plunkId: string) => {
    getPlunkContact(plunkId)
      .then((res) => res.json())
      .then((data) => setPlunkSubscribed(data.subscribed));
  };

  async function getProfile() {
    try {
      setLoading(true);
      if (!user) throw new Error("No user");

      let { data, error, status } = await supabase
        .from("user_profile")
        .select("*")
        .eq("id", user.id)
        .single();

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setFirstName(data.first_name);
        setProfileImg(data.profile_img);
        setUserProfile(data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  async function updateProfile({
    first_name,
    profile_img,
  }: {
    first_name: UserProfile["first_name"];
    profile_img: UserProfile["profile_img"];
  }) {
    try {
      setLoading(true);
      if (!user) throw new Error("No user");

      const updates = {
        id: user.id,
        first_name,
        profile_img,
        updated_at: new Date().toISOString(),
      };

      let { error } = await supabase.from("user_profile").upsert(updates);
      if (error) throw error;
      alert(`First name and profile image have been updated!`);
    } catch (error) {
      alert("Error updating the data!");
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  const handleSubscribedToggle = () => {
    const plunkId = userProfile.plunk_id;
    if (plunkSubscribed === true) {
      unsubscribePlunkContact(plunkId).then(() => getPlunkData(plunkId));
    } else {
      subscribePlunkContact(plunkId).then(() => getPlunkData(plunkId));
    }
  };

  if (user) {
    return (
      <div className="space-y-6 p-4">
        <div className="flex flex-wrap max-w-4xl gap-2">
          <p className="flex-1 max-w-xs min-w-[100px] font-medium text-sm text-stone-700">
            Profile Image
          </p>
          <Avatar
            uid={user!.id}
            url={profile_img}
            onUpload={(url) => {
              setProfileImg(url);
              updateProfile({ first_name, profile_img: url });
            }}
          />
        </div>
        <div className="flex flex-wrap max-w-4xl gap-2">
          <label
            htmlFor="first_name"
            className="flex-1 max-w-xs min-w-[200px] font-medium text-sm text-stone-700"
          >
            First Name
          </label>
          <input
            id="first_name"
            type="text"
            value={first_name || ""}
            onChange={(e) => setFirstName(e.target.value)}
            className="input min-w-[200px] flex-1"
          />
          <button
            className="btn-primary"
            onClick={() => updateProfile({ first_name, profile_img })}
            disabled={loading}
          >
            {loading ? "Loading ..." : "Update"}
          </button>
        </div>
        <hr />
        <div className="flex flex-wrap max-w-4xl gap-2">
          <label
            htmlFor="email"
            className="flex-1 min-w-[200px] max-w-xs font-medium text-sm text-stone-700"
          >
            Email
            <p className="text-xs font-normal text-stone-500">
              To update your email address please contact{" "}
              <a href="mailto:support@planetcareer.co.uk" className="underline">
                support@planetcareer.co.uk
              </a>
            </p>
          </label>
          <input
            id="email"
            type="text"
            value={session.user.email}
            className="input min-w-[200px] flex-1"
            disabled
          />
        </div>
        <hr />
        <div className="flex flex-wrap max-w-4xl gap-2">
          <label
            htmlFor="email"
            className="flex-1 min-w-[200px] max-w-xs font-medium text-sm text-stone-700"
          >
            Email Notifications
          </label>
          <Switch
            checked={plunkSubscribed}
            onChange={handleSubscribedToggle}
            className={`${plunkSubscribed ? "bg-green-700" : "bg-stone-400"}
          relative inline-flex h-[36px] w-[72px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
          >
            <span className="sr-only">Use setting</span>
            <span
              aria-hidden="true"
              className={`${plunkSubscribed ? "translate-x-9" : "translate-x-0"}
            pointer-events-none inline-block h-[32px] w-[32px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
            />
          </Switch>
        </div>

        <div className="flex pt-12 flex-wrap justify-end gap-4">
          <button
            className="btn-secondary w-full gap-4"
            onClick={() => signOut(supabase, router)}
          >
            <LogOut size={20} />
            Sign Out
          </button>
        </div>
      </div>
    );
  } else {
    return <p>Error: User not found.</p>;
  }
};

export default Account;
