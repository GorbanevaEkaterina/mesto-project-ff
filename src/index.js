import "./pages/index.css";
import initialCards from "./components/сards.js";
import { createCard, removeCard, likeCard } from "./components/card.js";
import { openModal, closeModal, overlayClose } from "./components/modal.js";
import {
  enableValidation,
  clearValidation,
  validationConfig,
} from "./components/validation.js";
import {getInitialUser, updateInitialUser, getInitialCards, postInitialCards} from "./components/api.js";

const placesList = document.querySelector(".places__list");


const editModal = document.querySelector(".popup_type_edit");
const editName = document.querySelector(".popup__input_type_name");
const editDescription = document.querySelector(
  ".popup__input_type_description"
);
const nameElement = document.querySelector(".profile__title");
const descriptionElement = document.querySelector(".profile__description");
const editOpen = document.querySelector(".profile__edit-button");
const addModal = document.querySelector(".popup_type_new-card");
const placeNameInput = addModal.querySelector(".popup__input_type_card-name");
const linkInput = addModal.querySelector(".popup__input_type_url");
const addProfile = document.querySelector(".profile__add-button");
const popupTypeImage = document.querySelector(".popup_type_image");
const popupImage = popupTypeImage.querySelector(".popup__image");
const popupCaption = popupTypeImage.querySelector(".popup__caption");
const form = document.querySelector(".popup__form");
const formProfile = document.forms.edit__profile;
const formNewCard = document.forms.new__place;

function showCard(evt) {
  popupImage.src = evt.target.src;
  popupImage.alt = evt.target.alt;
  popupCaption.textContent = popupImage.alt;
  openModal(popupTypeImage);
}

function editModalSubmit(evt) {
  evt.preventDefault();
  updateInitialUser({ name: editName.value, about: editDescription.value })
    .then((res) => {
      nameElement.textContent = res.name;
      descriptionElement.textContent = res.about;
      closeModal(editModal);
    })
    .catch((err) => {
      console.log(err);
    })
  
  clearValidation(editModal, validationConfig);
  closeModal(editModal);
}
// добавляю карточки
function addCards(card, removeCard) {
  const resultCard = createCard(card, removeCard, showCard, likeCard);
  placesList.prepend(resultCard);
}

function cardFormSubmit(evt) {
  evt.preventDefault();
  postInitialCards({ name: placeNameInput.value, link: linkInput.value })
  .then((card) => {
    addCards({
      name: card.name,
      link: card.link,
      cardId: card._id,
      cardOwnerId: card.owner._id,
      myId: card.owner._id,
      likes: card.likes
    }, removeCard);
    formNewCard.reset();
    closeModal(addModal);
  })
  .catch((err) => {
    console.log(err);
  });
  
}

Promise.all([getInitialCards()])
.then(([cardsArray]) => {
  cardsArray.reverse().forEach(card => addCards(
    {
      name: card.name,
      link: card.link,
      cardId: card._id,
      cardOwnerId: card.owner._id,
      // myId: myUserData._id,
      likes: card.likes
    }, removeCard))

})
.catch(err => { console.log(err) });

editOpen.addEventListener("click", function () {
  clearValidation(editModal, validationConfig);
  openModal(editModal);
});

addProfile.addEventListener("click", function () {
  clearValidation(addModal, validationConfig);
  openModal(addModal);
  editName.value = nameElement.textContent;
  editDescription.value = descriptionElement.textContent;
});

formProfile.addEventListener("submit", editModalSubmit);
formNewCard.addEventListener("submit", cardFormSubmit);
editModal.addEventListener("click", overlayClose);
addModal.addEventListener("click", overlayClose);
popupTypeImage.addEventListener("click", overlayClose);

// валидация форм

enableValidation(validationConfig);


