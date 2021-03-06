import { useEffect, useState } from "react";
import { getAllScenes } from "../../libs/react-pannellum/dist";

const PostContactForm = async (values, successCallback, errorCallback) => {
  // do stuff
  // if successful
  if (true) successCallback();
  else errorCallback();
};

const initialFormValues = {
  sceneID: "",
  imageSource: "",
  sceneName: "",
  author: "",
  formSubmitted: false,
  success: false,
};

export const useFormControls = (props) => {
  const [values, setValues] = useState(initialFormValues);
  const [errors, setErrors] = useState({});
  const keyArray = getAllScenes()
    ? getAllScenes().map((value, index) => {
        return Object.keys(value)[0];
      })
    : [];

  useEffect(() => {
    setValues(initialFormValues);
    setErrors({});
  }, [props.open]);

  const validate = (fieldValues = values) => {
    let temp = { ...errors };

    if ("sceneID" in fieldValues) {
      temp.sceneID = fieldValues.sceneID ? "" : "This field is required.";
      if (fieldValues.sceneID) {
        temp.sceneID =
          keyArray?.findIndex((value) => value === fieldValues.sceneID) < 0
            ? ""
            : "This Scene ID already exists";
      }
    }

    // if ("imageSource" in fieldValues) {
    //   temp.imageSource = fieldValues.imageSource
    //     ? ""
    //     : "This field is required.";
    //   // if (fieldValues.imageSource) {
    //   //   temp.imageSource =
    //   //     /(http[s]*:\/\/)([a-z\-_0-9\/.]+)\.([a-z.]{2,3})\/([a-z0-9\-_\/._~:?#\[\]@!$&'()*+,;=%]*)([a-z0-9]+\.)(jpg|jpeg|png)/i.test(
    //   //       fieldValues.imageSource
    //   //     )
    //   //       ? ""
    //   //       : "Image Link is not valid";
    //   // }
    // }

    if ("sceneName" in fieldValues)
      temp.sceneName = fieldValues.sceneName ? "" : "This field is required.";

    if ("author" in fieldValues)
      temp.author = fieldValues.author ? "" : "This field is required.";

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
      fieldValues.sceneID &&
      fieldValues.sceneName &&
      // fieldValues.imageSource &&
      fieldValues.author &&
      Object.values(errors).every((x) => x === "");

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
