export default function ImagePopup(props) {
  const { onPopupClick, data, isOpen, onClose } = props;
  const { name, link } = data;
  return (
    <div
      className={`popup popup_type_preview ${isOpen ? "popup_active" : ""}`}
      onMouseDown={onPopupClick}
    >
      <div className="popup__window popup__window_preview">
        <button
          type="button"
          className="button popup__close-button popup__close-button-preview"
          aria-label="close"
          onClick={onClose}
        />
        <img src={link} alt={name} className="popup__preview-image" />
        <p className="popup__description">{name}</p>
      </div>
    </div>
  );
}
