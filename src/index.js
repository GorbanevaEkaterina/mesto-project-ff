import "./pages/index.css";

const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

const placesList = document.querySelector(".places__list");
const placesListTemplate = document.querySelector("#card-template").content;

function createCard(card, removeCard, showCard, likeCard) {
  const placesCard = placesListTemplate.querySelector(".card").cloneNode(true);
  const buttonDeleteCard = placesCard.querySelector(".card__delete-button");
  const buttonLike = placesCard.querySelectorAll('.card__like-button');
  placesCard.querySelector(".card__title").textContent = card.name;
  const cardImage = placesCard.querySelector(".card__image");
  cardImage.src = card.link;
  cardImage.alt = card.name;
  cardImage.textContent = card.name;
  cardImage.addEventListener('click', showCard);
  buttonLike.forEach(button => {
    button.addEventListener('click', likeCard)});
  buttonDeleteCard.addEventListener("click", removeCard);

  return placesCard;
}

initialCards.forEach(function (card) {
  const placesCard = createCard(card, removeCard,showCard, likeCard );
  placesList.append(placesCard);
});

function removeCard(evt) {
  const targetElem = evt.target;
  const buttonElem = targetElem.closest(".card__delete-button");
  if (buttonElem === null) {
    evt.stopPropagation();
    return;
  }
  const placeItem = targetElem.closest(".places__item");
  placeItem.remove();
}

//popap

const editModal = document.querySelector(".popup_type_edit");
const editName = document.querySelector(".popup__input_type_name");
const editDescription = document.querySelector(".popup__input_type_description");
const nameElement = document.querySelector(".profile__title");
const descriptionElement = document.querySelector(".profile__description");
const editOpen = document.querySelector(".profile__edit-button");
const buttonClose = document.querySelectorAll(".popup__close");

const buttonSave = document.querySelectorAll(".popup__button");
const addModal = document.querySelector(".popup_type_new-card");
const placeNameInput =addModal.querySelector('.popup__input_type_card-name');
const linkInput = addModal.querySelector('.popup__input_type_url');
const addProfile = document.querySelector(".profile__add-button");


const popupTypeImage = document.querySelector('.popup_type_image');
const popupImage = popupTypeImage.querySelector('.popup__image');
const popupCaption = popupTypeImage.querySelector('.popup__caption');



function showCard(evt) {
  popupImage.src = evt.target.src;
  popupImage.alt = evt.target.alt;
  popupCaption.textContent = popupImage.alt;

  openModal(popupTypeImage);
}



function openModal(popap) {
popap.classList.add("popup_is-opened");
document.addEventListener('keydown', keyClose);

};

function closeModal(popap) {
     popap.classList.remove('popup_is-opened');
     document.removeEventListener('keydown', keyClose);
}

function keyClose(evt) {
    if(evt.key === 'Escape') {
        const openPopap = document.querySelector('.popup_is-opened');
    closeModal(openPopap);
        }
}

function overlayClose(evt) {
  const modal = evt.currentTarget;
  if (evt.target === modal || evt.target.classList.contains('popup__close')) {
    closeModal(modal);
  }
}


editOpen.addEventListener('click',  function () {
    openModal(editModal);
    editName.value = nameElement.textContent;
    editDescription.value = descriptionElement.textContent;
  });

  addProfile.addEventListener('click',  function () {
    openModal(addModal);
    editName.value = nameElement.textContent;
    editDescription.value = descriptionElement.textContent;
  });

buttonClose.forEach(button => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closeModal(popup))});

  
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
    }
    const resultCard = createCard(card, removeCard, showCard, likeCard);
    placesList.prepend(resultCard);

    const form = modal.querySelector('.popup__form');
    form.reset();
closeModal(modal);
  }

  buttonSave.forEach(button => {
    button.addEventListener('submit', handleFormSubmit)
    button.addEventListener('submit', cardFormSubmit)
  });

  editModal.addEventListener('submit', handleFormSubmit); 
  addModal.addEventListener('submit', cardFormSubmit); 
  editModal.addEventListener('click', overlayClose);
  addModal.addEventListener('click', overlayClose);
  popupTypeImage.addEventListener('click', overlayClose);
  

  function likeCard(evt) {
    evt.target.classList.toggle('card__like-button_is-active');
  }


 