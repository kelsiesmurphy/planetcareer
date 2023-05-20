import React, { useEffect, useState } from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { Database } from "../../../utils/database.types";
import { File, Trash2, UploadCloud } from "react-feather";

export default function FileUploadCoverLetter({
  url,
  onUpload,
  fileName,
  userProfileId,
}: {
  url: any;
  onUpload: (url: string, size: number) => void;
  fileName: string;
  userProfileId: string;
}) {
  const supabase = useSupabaseClient<Database>();
  const [fileUrl, setFileUrl] = useState<any>(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (url) downloadFile(url.url);
  }, [url]);

  async function downloadFile(path: string) {
    try {
      const { data, error } = await supabase.storage
        .from("files")
        .download(`${userProfileId}/${path}`);
      if (error) {
        throw error;
      }
      const url = URL.createObjectURL(data);
      setFileUrl(url);
    } catch (error) {
      console.log("Error downloading file: ", error);
    }
  }

  const uploadFile: React.ChangeEventHandler<HTMLInputElement> = async (
    event
  ) => {
    const currentDate = Date.now();
    try {
      setUploading(true);

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error("You must select a file to upload.");
      }

      const file = event.target.files[0];

      let { error: uploadError } = await supabase.storage
        .from("files")
        .upload(`${userProfileId}/${currentDate}-${file.name}`, file, {
          upsert: true,
        });

      if (uploadError) {
        throw uploadError;
      }

      onUpload(`${currentDate}-${file.name}`, file.size);
    } catch (error) {
      alert("Error uploading file!");
      console.log(error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col gap-1.5">
      <label htmlFor={fileName} className="font-medium text-sm text-stone-700">
        {fileName}
      </label>
      <div
        className={`flex flex-col justify-center w-full border rounded-lg transition-colors ${
          fileUrl
            ? "border-green-700 bg-white"
            : "border-stone-300 bg-stone-50 hover:bg-stone-100"
        }`}
      >
        {fileUrl ? (
          <div className="flex gap-3 p-4 items-start">
            <div className="p-1.5 bg-green-100 rounded-full border-4 border-green-50">
              <File className="text-green-700" size={16} />
            </div>
            <div className="flex-1 flex gap-4 items-start justify-between">
              <div>
                <p className="text-stone-900 font-medium text-sm">{url.url}</p>
                <p className="text-stone-500 font-light text-sm">
                  {Math.round(url.size / 1024)} KB
                </p>
              </div>
              <button onClick={() => setFileUrl(null)}>
                <Trash2
                  size={20}
                  className="text-stone-600 hover:text-red-700 transition-colors"
                />
              </button>
            </div>
          </div>
        ) : (
          <label
            htmlFor="dropzone-file-cover-letter"
            className="w-full cursor-pointer"
          >
            <div className="flex p-3 flex-col items-center justify-center gap-1 text-stone-500">
              <div className="p-1">
                <UploadCloud size={20} />
              </div>
              <p className="text-sm ">
                <span className="font-semibold text-green-700">
                  {uploading
                    ? "Uploading ..."
                    : `Click to upload your ${fileName.toLowerCase()}`}
                </span>
              </p>
            </div>
            <input
              id="dropzone-file-cover-letter"
              className="hidden absolute cursor-pointer"
              type="file"
              accept="application/pdf"
              onChange={uploadFile}
              disabled={uploading}
            />
          </label>
        )}
      </div>
    </div>
  );
}
