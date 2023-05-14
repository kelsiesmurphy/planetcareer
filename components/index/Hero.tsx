import { ArrowUpRight } from "react-feather";
import Link from "next/link";
import IframeDemo from "./IframeDemo";

const Hero = ({ font, children }: any) => {
  return (
    <section
      id="hero"
      className="py-24 flex flex-col items-center gap-12 text-center px-4 md:px-20"
    >
      <div className="flex flex-col gap-4 items-center">
        <h1
          className={
            font.className + " text-4xl md:text-6xl font-medium text-stone-900"
          }
        >
          Ethical careers for a better world.
        </h1>
        <p className="text-xl text-stone-600 max-w-3xl">
          Keep track of your job search with our application tracker, built to
          help you secure your dream job. Ethical job board coming soon.
        </p>
      </div>
      <div className="flex gap-4">
        <Link href="/dashboard-demo" className="btn-secondary"><ArrowUpRight /> View Demo</Link>
        {children}
      </div>
      <IframeDemo />
    </section>
  );
};

export default Hero;
