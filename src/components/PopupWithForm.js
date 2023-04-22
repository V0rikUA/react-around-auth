function PopupWithForm(props) {
  const {
    name,
    title,
    onSubmit,
    children,
    isOpen,
    onClose,
    onPopupClick,
    buttonText,
  } = props;
  return (
    <div
      className={`popup popup_type_${name} ${isOpen ? "popup_active" : ""}`}
      onMouseDown={onPopupClick}
    >
      <div className="popup__window">
        <button
          type="button"
          className="button popup__close-button"
          aria-label="close"
          onClick={onClose}
        />
        <h2 className="popup__title">{title}</h2>
        <form
          className={`form form_type_${name}`}
          name={`${name}`}
          onSubmit={onSubmit}
        >
          {children}
          <button type="submit" className="button form__submit-button">
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
