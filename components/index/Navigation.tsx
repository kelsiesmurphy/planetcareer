import Logo from "../Logo";

const Navigation = ({ children }: any) => {
  return (
    <nav
      id="top"
      className="bg-white border-b border-stone-100 flex justify-between py-4 px-4 md:px-20 transition-all"
    >
      <div className="flex gap-4 items-center">
        <a href="">
          <Logo />
        </a>
        <a href="#faq" className="hidden md:block text-stone-700 font-semibold">
          FAQ
        </a>
      </div>
      {children}
    </nav>
  );
};

export default Navigation;
