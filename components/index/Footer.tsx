import Logo from "../Logo";

const Footer = () => {
  return (
    <footer className="pt-16 pb-12 space-y-16 md:text-center px-4 md:px-20">
      <div className="flex flex-col gap-4 md:items-center">
        <Logo />
        <div className="flex flex-col md:flex-row gap-4">
          <a href="#top" className="text-stone-600 font-semibold">
            Overview
          </a>
          <a href="#faq" className="text-stone-600 font-semibold">
            FAQ
          </a>
          <a href="#faq" className="text-stone-600 font-semibold">
            Privacy
          </a>
        </div>
      </div>
      <div className="space-y-6">
        <hr />
        <div className="flex flex-wrap-reverse gap-4 justify-between text-stone-500">
          <p>© 2023 PlanetCareer. All rights reserved.</p>
          <ul className="flex gap-4">
            <li>Terms</li>
            <li>Privacy</li>
            <li>Cookies</li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
