import React, { useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {
  const { isOpen, onClose, onUpdateAvatar, buttonText, onPopupClick } = props;
  const avatarUrlInput = React.useRef();

  //reset input field when popup is closed
  useEffect(() => {
    resetField();
  }, [isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar(avatarUrlInput.current.value);
    onClose();
  }

  function resetField() {
    avatarUrlInput.current.value = "";
  }

  return (
    <PopupWithForm
      onSubmit={handleSubmit}
      name="change-avatar"
      title="Change profile picture"
      isOpen={isOpen}
      onClose={onClose}
      buttonText={buttonText}
      onPopupClick={onPopupClick}
    >
      <fieldset className="form__set form__set-avatar">
        <label className="form__field">
          <input
            ref={avatarUrlInput}
            type="url"
            className="form__input"
            name="avatar"
            placeholder="Avatar URL"
            id="avatar-input"
          />
          <span className="form__input-error avatar-input-error">
            Plese enter valid link
          </span>
        </label>
      </fieldset>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
