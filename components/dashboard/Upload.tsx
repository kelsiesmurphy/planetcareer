import React, { useEffect, useState } from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { Database } from "../../utils/database.types";
import { File, Plus, Trash2, UploadCloud } from "react-feather";
import Image from "next/image";
type UserProfile = Database["public"]["Tables"]["user_profile"]["Row"];

export default function Avatar({
  uid,
  url,
  onUpload,
}: {
  uid: string;
  url: UserProfile["profile_img"];
  onUpload: (url: string) => void;
}) {
  const supabase = useSupabaseClient<Database>();
  const [avatarUrl, setAvatarUrl] = useState<UserProfile["profile_img"]>(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (url) downloadImage(url);
  }, [url]);

  async function downloadImage(path: string) {
    try {
      const { data, error } = await supabase.storage
        .from("avatars")
        .download(path);
      if (error) {
        throw error;
      }
      const url = URL.createObjectURL(data);
      setAvatarUrl(url);
    } catch (error) {
      console.log("Error downloading image: ", error);
    }
  }

  const uploadAvatar: React.ChangeEventHandler<HTMLInputElement> = async (
    event
  ) => {
    try {
      setUploading(true);

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error("You must select an image to upload.");
      }

      const file = event.target.files[0];
      const fileExt = file.name.split(".").pop();
      const fileName = `${uid}.${fileExt}`;
      const filePath = `${fileName}`;

      let { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(filePath, file, { upsert: true });

      if (uploadError) {
        throw uploadError;
      }

      onUpload(filePath);
    } catch (error) {
      alert("Error uploading avatar!");
      console.log(error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <>
      <label
        className="primary flex w-32 aspect-square rounded-full cursor-pointer"
        htmlFor="single"
      >
        {avatarUrl ? (
          <div className="relative">
            <Image
              src={avatarUrl}
              alt="Profile Image"
              width="0"
              height="0"
              className="w-32 aspect-square rounded-full opacity-70"
            />
            <div className="w-32 absolute top-0 aspect-square rounded-full input hover:bg-stone-100 transition-colors duration-200 flex flex-col gap-1 justify-center items-center">
            <div className="p-1 text-stone-600">
              <UploadCloud size={24} />
            </div>
          </div>
          </div>
        ) : (
          <div className="w-32 aspect-square rounded-full input hover:bg-stone-100 transition-colors duration-200 flex flex-col gap-1 justify-center items-center">
            <div className="p-1">
              <UploadCloud size={20} />
            </div>
            <p className="font-medium text-center text-sm text-stone-800">Upload Profile Image</p>
          </div>
        )}
      </label>
      <input
        style={{
          visibility: "hidden",
          position: "absolute",
          cursor: "pointer",
        }}
        type="file"
        id="single"
        accept="image/*"
        onChange={uploadAvatar}
        disabled={uploading}
      />
    </>
  );
}
