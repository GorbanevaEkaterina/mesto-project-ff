export { createCard, removeCard, likeCard };

const placesListTemplate = document.querySelector("#card-template").content;

function createCard(card, removeCard, showCard, likeCard) {
  const placesCard = placesListTemplate.querySelector(".card").cloneNode(true);
  const buttonDeleteCard = placesCard.querySelector(".card__delete-button");
  const buttonLike = placesCard.querySelector(".card__like-button");
  placesCard.querySelector(".card__title").textContent = card.name;
  const cardImage = placesCard.querySelector(".card__image");
  cardImage.src = card.link;
  cardImage.alt = card.name;
  cardImage.addEventListener("click", showCard);
  buttonLike.addEventListener("click", likeCard);
  buttonDeleteCard.addEventListener("click", () => removeCard(placesCard));

  return placesCard;
}

function removeCard(cardElement) {
  cardElement.remove();
}

function likeCard(evt) {
  evt.target.classList.toggle("card__like-button_is-active");
}
