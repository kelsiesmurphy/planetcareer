import { PopupButton } from "@typeform/embed-react";

const TypeformButton = ({ id, styling, text }: any) => {
  return (
    <>
      <PopupButton id={id} className={styling}>
        {text}
      </PopupButton>
    </>
  );
};

export default TypeformButton;
