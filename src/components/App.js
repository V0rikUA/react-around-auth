import React, { useEffect, useState } from "react";
import EditAvatarPopup from "./EditAvatarPopup";
import Footer from "./Footer";
import Header from "./Header";
import Main from "./Main";
import api from "../utils/api";
import CurrentUserContext from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import ImagePopup from "./ImagePopup";
import AddPlacePopup from "./AddPlacePopup";

function App() {
  //                      Hooks
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState({});
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  /*                    Handlers         */
  function handleEditAvatarClick(event) {
    event.preventDefault();
    setIsEditAvatarPopupOpen(true);
  }
  function handleEditProfileClick(event) {
    event.preventDefault();
    setIsEditProfilePopupOpen(true);
  }
  function handleAddPlaceClick(event) {
    event.preventDefault();
    setIsAddPlacePopupOpen(true);
  }
  function closeAllPopup() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsImagePopupOpen(false);
  }

  function onPopupClick(event) {
    if (event.target === event.currentTarget) {
      closeAllPopup();
    }
  }

  function onUpdateAvatar(avatarUrl) {
    setIsLoading(true);
    api
      .editAvatar(avatarUrl)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopup();
      })
      .catch(console.log)
      .finally(() => {
        setIsLoading(false);
      });
  }

  function onCardClick(card) {
    setSelectedCard({ name: card.name, link: card.link });
    setIsImagePopupOpen(true);
  }

  function onCardLike(card, isLiked) {
    !isLiked
      ? api
          .addLike(card._id)
          .then((card) => {
            setCards((cards) =>
              cards.map((currentCard) => {
                if (currentCard._id === card._id) {
                  return { ...currentCard, likes: card.likes };
                }
                return currentCard;
              })
            );
          })
          .catch(console.log)
      : api
          .removeLike(card._id)
          .then((card) => {
            setCards((cards) =>
              cards.map((currentCard) => {
                if (currentCard._id === card._id) {
                  return { ...currentCard, likes: card.likes };
                }
                return currentCard;
              })
            );
          })
          .catch(console.log);
  }

  function onCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        const filteredCards = cards.filter(
          (filterCard) => filterCard._id !== card._id
        );
        setCards(filteredCards);
      })
      .catch(console.log);
  }

  function onUpdateProfile(name, about) {
    setIsLoading(true);
    api
      .editProfile(name, about)
      .then((user) => {
        setCurrentUser(user);
        closeAllPopup();
      })
      .catch(console.log)
      .finally(() => {
        setIsLoading(false);
      });
  }

  function onAddNewPlace(name, link) {
    setIsLoading(true);
    api
      .addCard(name, link)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopup();
      })
      .catch(console.log)
      .finally(() => {
        setIsLoading(false);
      });
  }

  useEffect(() => {
    /*
        TODO:
        animation while getting cards from server
    */

    Promise.all([api.getUserInfo(), api.getInitCard()])
      .then(([userData, cards]) => {
        setCurrentUser(userData);
        setCards(cards);
      })
      .catch(console.log);
  }, []);

  return (
    <div className="root">
      <CurrentUserContext.Provider value={currentUser}>
        {/* <AutorizationWindow
          isLoggedIn = {loggedIn}
          handleAuthorization = {handleAuthorization}
          handleLoggIn = {handleLoggIn}
          /> */}
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopup}
          onUpdateAvatar={onUpdateAvatar}
          buttonText={isLoading ? "Saving..." : "Change"}
          onPopupClick={onPopupClick}
        />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopup}
          onUpdateProfile={onUpdateProfile}
          buttonText={isLoading ? "Saving..." : "Save"}
          onPopupClick={onPopupClick}
        />
        <ImagePopup
          onPopupClick={onPopupClick}
          data={selectedCard}
          isOpen={isImagePopupOpen}
          onClose={closeAllPopup}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopup}
          onPopupClick={onPopupClick}
          buttonText={isLoading ? "Saving..." : "Create"}
          onAddNewPlace={onAddNewPlace}
        />
        <Header />
        <Main
          onEditAvatarClick={handleEditAvatarClick}
          onEditProfileClick={handleEditProfileClick}
          onAddPlaceClick={handleAddPlaceClick}
          onCardClick={onCardClick}
          onCardDelete={onCardDelete}
          onCardLike={onCardLike}
          cards={cards}
        />
        <Footer />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
