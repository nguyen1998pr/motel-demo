import { useEffect, useState } from "react";
// import { getCurrentScene } from "../../libs/react-pannellum";

const PostContactForm = async (values, successCallback, errorCallback) => {
  // do stuff
  // if successful
  if (true) successCallback();
  else errorCallback();
};

const initialFormValues = {
  sceneName: "",
  formSubmitted: false,
  success: false,
};

export const useFormControls = (props) => {
  const [values, setValues] = useState(initialFormValues);
  const [errors, setErrors] = useState({});
  //   const currentScene: string = getCurrentScene()?.toString();

  useEffect(() => {
    setValues(initialFormValues);
    setErrors({});
  }, [props.open]);

  const validate = (fieldValues = values) => {
    let temp = { ...errors };

    if ("sceneName" in fieldValues) {
      temp.sceneName = fieldValues.sceneName ? "" : "This field is required.";
      //   if (fieldValues.sceneName) {
      //     temp.sceneName =
      //       fieldValues.sceneName.toString() !== currentScene
      //         ? ""
      //         : "Can not delete this scene";
      //   }
    }

    setErrors({
      ...temp,
    });
  };

  const handleInputValue = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
    validate({ [name]: value });
  };

  const handleSuccess = () => {
    setValues({
      ...initialFormValues,
      formSubmitted: true,
      success: true,
    });
  };

  const handleError = () => {
    setValues({
      ...initialFormValues,
      formSubmitted: true,
      success: false,
    });
  };

  const formIsValid = (fieldValues = values) => {
    const isValid =
      fieldValues.sceneName && Object.values(errors).every((x) => x === "");

    return isValid;
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const isValid =
      Object.values(errors).every((x) => x === "") && formIsValid();
    if (isValid) {
      await PostContactForm(values, handleSuccess, handleError);
    }
  };

  return {
    values,
    errors,
    handleInputValue,
    handleFormSubmit,
    formIsValid,
  };
};
