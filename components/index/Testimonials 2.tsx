import TestimonialCard from "./TestimonialCard";
import { testimonialItems } from "../../content/testimonialItems";

const Testimonials = ({ font }: any) => {
  const arr = [1, 2, 3, 4, 5, 6, 7, 8];

  return (
    <section id="testimonials" className="py-20 space-y-8 px-4 md:px-20">
      <h2
        className={
          font.className +
          " text-center text-3xl md:text-4xl font-medium text-stone-900"
        }
      >
        What our users say
      </h2>
      <ul className="flex gap-4 flex-wrap">
        {testimonialItems.map((testimonial) => {
          return (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          );
        })}
      </ul>
    </section>
  );
};

export default Testimonials;
