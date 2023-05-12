import { useState, useEffect } from "react";
import {
  useUser,
  useSupabaseClient,
  Session,
} from "@supabase/auth-helpers-react";
import { Database } from "../../utils/database.types";
import Avatar from "./Upload";
import router from "next/router";
type UserProfile = Database["public"]["Tables"]["user_profile"]["Row"];

const Account = ({ session }: any) => {
  const supabase = useSupabaseClient<Database>();
  const user = useUser();
  const [loading, setLoading] = useState(true);
  const [first_name, setFirstName] = useState<UserProfile["first_name"]>(null);
  const [profile_img, setProfileImg] =
    useState<UserProfile["profile_img"]>(null);

  useEffect(() => {
    getProfile();
  }, [session]);

  async function getProfile() {
    try {
      setLoading(true);
      if (!user) throw new Error("No user");

      let { data, error, status } = await supabase
        .from("user_profile")
        .select(`first_name, profile_img`)
        .eq("id", user.id)
        .single();

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setFirstName(data.first_name);
        setProfileImg(data.profile_img);
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
      alert("Profile updated!");
    } catch (error) {
      alert("Error updating the data!");
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  const handleSignOut = () => {
    supabase.auth.signOut().then(() => router.push("/"));
  };

  // if (user) {
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
      <hr />
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
      </div>
      <hr />
      <div className="flex flex-wrap max-w-4xl gap-2">
        <label
          htmlFor="email"
          className="flex-1 min-w-[200px] max-w-xs font-medium text-sm text-stone-700"
        >
          Email
        </label>
        <input
          id="email"
          type="text"
          value={session.user.email}
          className="input min-w-[200px] flex-1"
          disabled
        />
      </div>

      <div className="flex pt-12 flex-wrap justify-end gap-4">
        <button className="btn-secondary w-full" onClick={handleSignOut}>
          Sign Out
        </button>
        <button
          className="btn-primary w-full"
          onClick={() => updateProfile({ first_name, profile_img })}
          disabled={loading}
        >
          {loading ? "Loading ..." : "Update"}
        </button>
      </div>
    </div>
  );
  // } else {
  //   return <p>Error: User not found.</p>;
  // }
};

export default Account;
