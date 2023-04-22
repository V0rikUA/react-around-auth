import React from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";
import TrashBinImage from "../images/Trash.svg";

function Card(props) {
  const { card, onCardClick, onCardDelete, onCardLike } = props;
  const currentUser = React.useContext(CurrentUserContext);
  const isOwner = currentUser._id === card.owner._id;
  const isLiked = card.likes.some((user) => user._id === currentUser._id);

  const handleLikeClick = () => onCardLike(card, isLiked);
  function handleCardDeleteClick(event) {
    event.preventDefault();
    onCardDelete(card);
  }
  const handleOnCardClick = () => onCardClick(card);

  return (
    <li className="gallery-list__item">
      {isOwner && (
        <button
          type="button"
          className="button gallery-list__delete-button"
          arial-label="delete-button"
          onClick={handleCardDeleteClick}
        >
          <img src={TrashBinImage} alt="an image of trash bin" />
        </button>
      )}
      <img
        src={card.link}
        alt={card.name}
        className="gallery-list__image"
        onClick={handleOnCardClick}
      />
      <div className="gallery-list__description-block">
        <h2 className="gallery-list__image-description">{card.name}</h2>
        <div className="gallery-list__like-container">
          <button
            type="button"
            className={`button gallery-list__like-container_button 
            ${isLiked ? "gallery-list__like-button-active" : ""}`}
            arial-label="like-button"
            onClick={handleLikeClick}
          />
          <span className="gallery-list__like-container_counter">
            {card.likes.length}
          </span>
        </div>
      </div>
    </li>
  );
}

export default Card;
