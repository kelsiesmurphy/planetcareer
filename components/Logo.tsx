import Image from "next/image";

const Logo = () => {
  return (
    <Image
      alt="PlanetCareer Logo"
      width="0"
      height="0"
      src="/wordmark.svg"
      className="w-[142px] h-auto"
      priority
    />
  );
};

export default Logo;
