import Link from "next/link";
import Logo from "../Logo";

const Navigation = () => {
  return (
    <nav className="bg-white border-b border-stone-100 flex justify-between py-4 px-4 md:px-20 transition-all">
      <div className="flex gap-4 items-center">
        <Link href="/" className="outline-green-700">
          <Logo />
        </Link>
      </div>
    </nav>
  );
};

export default Navigation;
