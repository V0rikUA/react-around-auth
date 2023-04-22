import { useEffect } from "react";
import useFrom from "../hooks/useForm";
import PopupWithForm from "./PopupWithForm";

export default function AddNewPlacePopup(props) {
  const { isOpen, onClose, onPopupClick, buttonText, onAddNewPlace } = props;

  const { values, handleChange, setValues } = useFrom({});
  useEffect(() => {
    setValues({ title: "", link: "" });
  }, [isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    onAddNewPlace(values.title, values.link);
  }

  return (
    <PopupWithForm
      name="new-gallery-item"
      title="New place "
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      onPopupClick={onPopupClick}
      buttonText={buttonText}
    >
      <fieldset className="form__set form__set-gallery">
        <label className="form__field">
          <input
            value={values.title || ""}
            onChange={handleChange}
            type="text"
            className="form__input form__input_type_new-gallery-item-title"
            name="title"
            placeholder="Title"
            id="newItemTitle-input"
            required
            minLength="1"
            maxLength="30"
          />
          <span className="form__input-error newItemTitle-input-error"></span>
        </label>
        <label className="form__field">
          <input
            value={values.link || ""}
            onChange={handleChange}
            type="url"
            className="form__input form__input_type_new-gallery-item-img-link"
            name="link"
            placeholder="Image URL"
            id="newItemImageLink-input"
            required
            minLength="1"
          />
          <span className="form__input-error newItemImageLink-input-error"></span>
        </label>
      </fieldset>
    </PopupWithForm>
  );
}
