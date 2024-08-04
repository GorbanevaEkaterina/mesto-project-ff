import "./pages/index.css";
import initialCards from "./components/сards.js";
import { createCard, removeCard, likeCard } from "./components/card.js";
import {
  openModal,
  closeModal,
  keyClose,
  overlayClose,
} from "./components/modal.js";

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
const buttonClose = document.querySelectorAll(".popup__close");
const buttonSave = document.querySelectorAll(".popup__button");
const addModal = document.querySelector(".popup_type_new-card");
const placeNameInput = addModal.querySelector(".popup__input_type_card-name");
const linkInput = addModal.querySelector(".popup__input_type_url");
const addProfile = document.querySelector(".profile__add-button");
const popupTypeImage = document.querySelector(".popup_type_image");
const popupImage = popupTypeImage.querySelector(".popup__image");
const popupCaption = popupTypeImage.querySelector(".popup__caption");

function showCard(evt) {
  popupImage.src = evt.target.src;
  popupImage.alt = evt.target.alt;
  popupCaption.textContent = popupImage.alt;

  openModal(popupTypeImage);
}

function handleFormSubmit(evt) {
  evt.preventDefault();
  const modal = evt.currentTarget;
  nameElement.textContent = editName.value;
  descriptionElement.textContent = editDescription.value;
  closeModal(modal);
}

function cardFormSubmit(evt) {
  evt.preventDefault();
  const modal = evt.currentTarget;
  const card = {
    name: placeNameInput.value,
    link: linkInput.value,
  };
  const resultCard = createCard(card, removeCard, showCard, likeCard);
  placesList.prepend(resultCard);

  const form = modal.querySelector(".popup__form");
  form.reset();
  closeModal(modal);
}

buttonClose.forEach((button) => {
  const popup = button.closest(".popup");
  button.addEventListener("click", () => closeModal(popup));
});

buttonSave.forEach((button) => {
  button.addEventListener("submit", handleFormSubmit);
  button.addEventListener("submit", cardFormSubmit);
});

editOpen.addEventListener("click", function () {
  openModal(editModal);
  editName.value = nameElement.textContent;
  editDescription.value = descriptionElement.textContent;
});

addProfile.addEventListener("click", function () {
  openModal(addModal);
  editName.value = nameElement.textContent;
  editDescription.value = descriptionElement.textContent;
});

editModal.addEventListener("submit", handleFormSubmit);
addModal.addEventListener("submit", cardFormSubmit);
editModal.addEventListener("click", overlayClose);
addModal.addEventListener("click", overlayClose);
popupTypeImage.addEventListener("click", overlayClose);
