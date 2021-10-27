import { useState, useRef } from "react";
import SimpleReactValidator from "simple-react-validator";

const useValidator = (customMessage = {}, customValidator = {}) => {
  const [show, setShow] = useState(false);
  const validator = useRef(
    new SimpleReactValidator({
      messages: customMessage,
      validators: customValidator,
    })
  );

  if (show) {
    validator.current.showMessages();
  }

  return [validator.current, setShow];
};

export default useValidator;
