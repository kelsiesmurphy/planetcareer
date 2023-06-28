import star from "../../assets/star.svg";
import Image from "next/image";

const TestimonialCard = ({ testimonial }: any) => {
  const starSize = 24;

  return (
    <li className="bg-white border border-stone-200 p-4 space-y-3 min-w-[200px] max-w-xs rounded-lg shadow-sm shadow-stone-100">
      <div>
        <p className="font-medium text-stone-700">{testimonial.name}</p>
      </div>
      <div className="text-yellow-500 flex gap-1">
        <Image src={star} width={starSize} height={starSize} alt="Star Icon" />
        <Image src={star} width={starSize} height={starSize} alt="Star Icon" />
        <Image src={star} width={starSize} height={starSize} alt="Star Icon" />
        <Image src={star} width={starSize} height={starSize} alt="Star Icon" />
        <Image src={star} width={starSize} height={starSize} alt="Star Icon" />
      </div>
      <p className="text-stone-600">{testimonial.review}</p>
    </li>
  );
};

export default TestimonialCard;
