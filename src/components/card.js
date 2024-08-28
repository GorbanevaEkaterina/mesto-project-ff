import { putlikeCard, disLikeCard, deleteCard } from "./api.js";
export { createCard, removeCard, likeCard };

const createCard = (
  data,
  deleteCardItem,
  likeCardItem,
  handleImageClick,
  idData
) => {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate
    .querySelector(".places__item")
    .cloneNode(true);
  const removeCardButton = cardElement.querySelector(".card__delete-button");
  const likeButton = cardElement.querySelector(".card__like-button");
  const likeCount = cardElement.querySelector(".card__like-counter");
  const titleCardItem = cardElement.querySelector(".card__title");
  const imageCardItem = cardElement.querySelector(".card__image");

  titleCardItem.textContent = data.name;
  imageCardItem.src = data.link;
  imageCardItem.alt = data.name;
  imageCardItem.addEventListener("click", () => {
    handleImageClick(data);
  });

  if (idData === data.owner._id) {
    removeCardButton.classList.add("card__delete-button_visible");
  }

  removeCardButton.addEventListener("click", () => {
    deleteCardItem(cardElement, data._id);
  });

  likeButton.addEventListener("click", () => {
    likeCardItem(likeButton, data._id, likeCount);
  });

  if (data.likes.some((item) => item._id === idData)) {
    likeButton.classList.add("card__like-button_is-active");
  }

  likeCount.textContent = data.likes.length;

  return cardElement;
};

const removeCard = (data, idData) => {
  data.remove();
  deleteCard(idData);
};

const likeCard = (likeButton, idData, likeCounter) => {
  if (!likeButton.classList.contains("card__like-button_is-active")) {
    putlikeCard(idData)
      .then((data) => {
        likeCounter.textContent = data.likes.length;
        likeButton.classList.add("card__like-button_is-active");
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    disLikeCard(idData)
      .then((data) => {
        likeCounter.textContent = data.likes.length;
        likeButton.classList.remove("card__like-button_is-active");
      })
      .catch((err) => {
        console.log(err);
      });
  }
};
