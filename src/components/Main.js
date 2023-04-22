import { useContext } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";
import Card from "./Card";

function Main(props) {
  const {
    onEditAvatarClick,
    onEditProfileClick,
    onAddPlaceClick,
    cards,
    onCardClick,
    onCardLike,
    onCardDelete,
  } = props;
  const currentUser = useContext(CurrentUserContext);
  return (
    <main className="content">
      <section className="profile">
        <div
          className="profile__avatar"
          id="profileAvatar"
          onClick={onEditAvatarClick}
          style={{ backgroundImage: `url(${currentUser.avatar})` }}
        ></div>
        <div className="profile__info">
          <div className="profile__name-wrapper">
            <h1 className="profile__name">{currentUser.name}</h1>
            <button
              type="button"
              className="button profile__button-edit"
              arialabel="edit"
              onClick={onEditProfileClick}
            ></button>
          </div>
          <p className="profile__profession">{currentUser.about}</p>
        </div>
        <button
          type="button"
          className="button profile__button-add-contetnt"
          arialabel="add"
          onClick={onAddPlaceClick}
        ></button>
      </section>

      <section className="gallery">
        <ul className="gallery-list">
          {cards.map((card) => (
            <Card
              key={card._id}
              card={card}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
