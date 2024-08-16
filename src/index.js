import "./pages/index.css";
import initialCards from "./components/сards.js";
import { createCard, removeCard, likeCard } from "./components/card.js";
import { openModal, closeModal, overlayClose } from "./components/modal.js";
import { showInputError, hideInputError, checkInputValidity, setEventListeners,enableValidation, hasInvalidInput, toggleButtonState, clearValidation} from "./components/validation.js";

const placesList = document.querySelector(".places__list");

initialCards.forEach(function (card) {
  const placesCard = createCard(card, removeCard, showCard, likeCard);
  placesList.append(placesCard);
});

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
  nameElement.textContent = editName.value;
  descriptionElement.textContent = editDescription.value;
  closeModal(editModal);
}

function cardFormSubmit(evt) {
  evt.preventDefault();
  const card = {
    name: placeNameInput.value,
    link: linkInput.value,
  };
  const resultCard = createCard(card, removeCard, showCard, likeCard);
  placesList.prepend(resultCard);
  formNewCard.reset();
  closeModal(addModal);
}

editOpen.addEventListener("click", function () {
  openModal(editModal);
});

addProfile.addEventListener("click", function () {
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
const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input-error',
  errorClass: 'popup__input-error_active'
}

 enableValidation(validationConfig);

clearValidation(addModal, validationConfig);