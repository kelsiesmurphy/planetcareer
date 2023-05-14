import Image from "next/image";

const Account = () => {
  const firstName = "Jessica";
  const profileImage =
    "https://xddplurlgjvqtjiyodqt.supabase.co/storage/v1/object/public/demo-applications-storage/demo-user-profile.png";

  return (
    <div className="space-y-6 p-4">
      <div className="flex flex-wrap max-w-4xl gap-2">
        <p className="flex-1 max-w-xs min-w-[100px] font-medium text-sm text-stone-700">
          Profile Image
        </p>
        <Image
          src={profileImage}
          alt="Profile Image"
          width="0"
          height="0"
          unoptimized
          className="w-32 aspect-square rounded-full"
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
          readOnly
          value={firstName || ""}
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
          value="jessica@example.com"
          className="input min-w-[200px] flex-1"
          disabled
        />
      </div>

      <div className="flex pt-12 flex-wrap justify-end gap-4">
        <button className="btn-secondary w-full">Sign Out</button>
        <button className="btn-primary w-full">Update</button>
      </div>
    </div>
  );
};

export default Account;
