import { faqItems } from "../../content/faqs";
import { contactFormID } from "../../content/typeformIds";
import TypeformButton from "../TypeformButton";

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
        <TypeformButton
          id={contactFormID}
          styling="underline"
          text="say hello"
        />
        .
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
      <p className="max-w-4xl text-stone-600">
        Currently we're in alpha, so you might find a few bugs as you explore
        PlanetCareer. If you want to see the issues we're working on, we have a{" "}
        <a
          className="underline"
          target="_blank"
          href="https://planetcareer.notion.site/Known-Issues-6bf1c442fd764cedbf2f509d3a16157e"
        >
          handy Notion page for known issues.
        </a>
      </p>
    </section>
  );
};

export default Faq;
