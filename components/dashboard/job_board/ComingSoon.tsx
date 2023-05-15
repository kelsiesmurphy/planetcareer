import { contactFormID } from "../../../content/typeformIds";
import TypeformButton from "@/components/TypeformButton";
import ComingSoonImg from "../../../assets/Illustration.svg";
import Image from "next/image";

const ComingSoon = () => {
  return (
    <div className="flex justify-center items-center">
      <div className="space-y-4 flex flex-col items-center max-w-lg p-4 text-center text-stone-600 text-md">
        <Image
          alt="Coming soon illustration"
          width="0"
          height="0"
          className="w-40 md:w-52 mb-6"
          src={ComingSoonImg}
        />
        <h2 className="text-stone-800 text-2xl font-medium">
          Under construction!
        </h2>
        <p>We're currently building this job board!</p>
        <p>
          The goal of this area is to share a list of curated jobs that we here
          at PlanetCareer have found to use ethical and sustainable practices in
          their work.
        </p>
        <p>
          If you've used job boards before and want to help us make an
          incredible one, please share your thoughts below!
        </p>
        <TypeformButton
          id={contactFormID}
          styling="btn-primary"
          text="Share your thoughts!"
        />
      </div>
    </div>
  );
};

export default ComingSoon;
