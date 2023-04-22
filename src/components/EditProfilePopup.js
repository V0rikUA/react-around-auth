import React, { useEffect } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";
import useFrom from "../hooks/useForm";
import PopupWithForm from "./PopupWithForm";

function EditProfilePopup(props) {
  const { isOpen, onClose, onUpdateProfile, buttonText, onPopupClick } = props;

  const currentUser = React.useContext(CurrentUserContext);
  const { values, handleChange, setValues } = useFrom({});

  useEffect(() => {
    if (currentUser.name && currentUser.about) {
      setValues({ name: currentUser.name, about: currentUser.about });
    }
  }, [currentUser, isOpen]);

  function handleSubmit(event) {
    event.preventDefault();
    onUpdateProfile(values.name, values.about);
  }

  return (
    <PopupWithForm
      onSubmit={(e) => {
        handleSubmit(e);
      }}
      name="profile"
      title="Edit profile "
      isOpen={isOpen}
      onClose={onClose}
      onPopupClick={onPopupClick}
      buttonText={buttonText}
    >
      <fieldset className="form__set form__set-profile">
        <label className="form__field">
          <input
            value={values.name || ""}
            type="text"
            className="form__input form__input_type_name"
            name="name"
            placeholder="Your Name"
            id="name-input"
            required
            minLength="2"
            maxLength="40"
            onChange={handleChange}
          />
          <span className="form__placeholder name-input-error"></span>
        </label>
        <label className="form__field">
          <input
            value={values.about || ""}
            type="text"
            className="form__input form__input_type_title"
            name="about"
            placeholder="About"
            id="about-input"
            required
            minLength="2"
            maxLength="400"
            onChange={handleChange}
          />
          <span className="form__placeholder about-input-error"></span>
        </label>
      </fieldset>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
