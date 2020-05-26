import React, { useRef, FormEvent } from "react";
import { MatrixResult } from "../Models/DistanceMatrixResults";
import { SendText } from "../Utlis/SendText";

interface ComponentProps {
  distance: MatrixResult;
  duration: MatrixResult;
}

const TextForm: React.FC<ComponentProps> = ({ distance, duration }) => {
  const phoneNumberElement = useRef<HTMLInputElement>(null);
  const textMessageElement = useRef<HTMLTextAreaElement>(null);

  const submitHandler = (event: FormEvent) => {
    event.preventDefault();

    const convertedMessage = `Message from Automated Distance Calculator: 
            Distance to Drive: ${distance.text}
            Duration of Drive: ${duration.text}
            message from driver: ${textMessageElement.current!.value}`;

    SendText(phoneNumberElement.current!.value, convertedMessage);
  };

  return (
    <form onSubmit={submitHandler}>
      <h3>Send Text to Friend: </h3>
      <div>
        <label>Recipient Phone Number: </label>
        <input
          ref={phoneNumberElement}
          type="tel"
          placeholder="Phone Number (No Spaces)"
        />
      </div>
      <div>
        <label>Message: </label>
        <textarea ref={textMessageElement} cols={30} rows={10}></textarea>
      </div>
      <button>Send Text!</button>
    </form>
  );
};

export default TextForm;
