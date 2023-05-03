import Link from "next/link";
import { faqItems } from "../../content/faqs";

const Faq = ({ font }: any) => {
  return (
    <section id="faq" className="py-20 space-y-8 m-auto px-4 md:px-20">
      <h2
        className={
          font.className + " text-3xl md:text-4xl font-medium text-stone-900"
        }
      >
        FAQs
      </h2>
      <p className="text-stone-600 text-lg md:text-xl max-w-3xl">
        If you have questions, check below. Can&apos;t find the answer
        you&apos;re looking for? Reach out and{" "}
        <Link href="contact" className="underline">say hello</Link>.
      </p>
      <ul className="flex flex-wrap justify-between gap-8 max-w-7xl">
        {faqItems.map((faq, index) => {
          return (
            <li key={index} className="space-y-2 max-w-sm">
              <h3 className="text-lg font-medium text-stone-900">
                {faq.title}
              </h3>
              <p className="text-stone-600">{faq.description}</p>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default Faq;
