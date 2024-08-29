import "./pages/index.css";
import { createCard, removeCard, likeCard } from "./components/card.js";
import { openModal, closeModal, overlayClose } from "./components/modal.js";
import {
  enableValidation,
  clearValidation,
  validationConfig,
} from "./components/validation.js";
import {
  getUser,
  updateUser,
  getInitialCards,
  addCard,
  updateAvatar,
  deleteCard,
} from "./components/api.js";

import {
  cardСontainer,
  buttonOpenModalEditProfile,
  buttonOpenModalAddNewCard,
  modalEditProfile,
  modalAddNewCard,
  placeNameInput,
  linkInput,
  modalTypeImage,
  modalCaption,
  modalImage,
  editProfileNameInput,
  editProfileDescriptionInput,
  formProfile,
  formNewCard,
  formNewAvatar,
  nameElement,
  descriptionElement,
  editProfileImageForm,
  profileAvatar,
  editAvatar,
  profileImageInput,
} from "./components/constants.js";

const changeSubmitTextOnLoad = (checkStatus, itemButton) => {
  if (checkStatus) {
    itemButton.textContent = "Сохранение...";
  } else {
    itemButton.textContent = "Сохранить";
  }
};

enableValidation(validationConfig);

const editProfile = () => {
  openModal(modalEditProfile);
  editProfileNameInput.value = nameElement.textContent;
  editProfileDescriptionInput.value = descriptionElement.textContent;
  clearValidation(modalEditProfile, validationConfig);
};

const handleFormSubmitEditProfile = (evt) => {
  evt.preventDefault();
  const submitButton = formProfile.querySelector(".popup__button");
  changeSubmitTextOnLoad(true, submitButton);
  const title = editProfileNameInput.value;
  const description = editProfileDescriptionInput.value;
  updateUser(title, description)
    .then(() => {
      nameElement.textContent = title;
      descriptionElement.textContent = description;
      closeModal(modalEditProfile);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      changeSubmitTextOnLoad(false, submitButton);
    });
};

buttonOpenModalEditProfile.addEventListener("click", editProfile);
formProfile.addEventListener("submit", handleFormSubmitEditProfile);

const editProfileImage = () => {
  clearValidation(editAvatar, validationConfig);
  openModal(editAvatar);
};

const handleFormSubmitEditProfileImage = (evt) => {
  const dataProfileAvatar = profileImageInput.value;
  const submitButton = editProfileImageForm.querySelector(".popup__button");
  updateAvatar(dataProfileAvatar)
    .then((avatar) => {
      profileAvatar.style.backgroundImage = `url(${avatar.avatar})`;
      closeModal(editAvatar);
      formNewAvatar.reset();
    })
    .catch((error) => {
      console.error(`Ошибка при изменении аватара: ${error}`);
    })
    .finally(() => {
      changeSubmitTextOnLoad(false, submitButton);
    });
  closeModal(editAvatar);
};

profileAvatar.addEventListener("click", editProfileImage);
editProfileImageForm.addEventListener(
  "submit",
  handleFormSubmitEditProfileImage
);

const addNewCard = () => {
  clearValidation(modalAddNewCard, validationConfig);
  openModal(modalAddNewCard);
};

const handleFormSubmitNewCard = (evt) => {
  evt.preventDefault();
  const submitButton = formNewCard.querySelector(".popup__button");
  changeSubmitTextOnLoad(true, submitButton);
  const name = placeNameInput.value;
  const link = linkInput.value;
  addCard(name, link)
    .then((data) => {
      cardСontainer.prepend(
        createCard(data, removeCard, likeCard, openImageCard, data.owner._id)
      );
      closeModal(modalAddNewCard);
      evt.target.reset();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      changeSubmitTextOnLoad(false, submitButton);
    });
};

buttonOpenModalAddNewCard.addEventListener("click", addNewCard);
formNewCard.addEventListener("submit", handleFormSubmitNewCard);

const openImageCard = (evt) => {
  openModal(modalTypeImage);
  modalCaption.textContent = evt.name;
  modalImage.src = evt.link;
  modalImage.alt = evt.name;
};

const renderCard = (item, userId) => {
  const cardElement = createCard(
    item,
    removeCard,
    likeCard,
    openImageCard,
    userId
  );
  cardСontainer.append(cardElement);
};

Promise.all([getUser(), getInitialCards()])
  .then(([dataUser, dataCards]) => {
    let userId = dataUser._id;
    nameElement.textContent = dataUser.name;
    descriptionElement.textContent = dataUser.about;
    profileAvatar.style.backgroundImage = `url(${dataUser.avatar})`;

    dataCards.forEach((item) => {
      renderCard(item, userId);
    });
  })
  .catch((err) => {
    console.log(err);
  });

modalEditProfile.addEventListener("click", overlayClose);
modalAddNewCard.addEventListener("click", overlayClose);
editAvatar.addEventListener("click", overlayClose);
modalTypeImage.addEventListener("click", overlayClose);
