export { createCard, removeCard, likeCard };

const placesListTemplate = document.querySelector("#card-template").content;

function createCard(card, removeCard, showCard, likeCard) {
  const placesCard = placesListTemplate.querySelector(".card").cloneNode(true);
  const buttonDeleteCard = placesCard.querySelector(".card__delete-button");
  const buttonLike = placesCard.querySelectorAll(".card__like-button");
  placesCard.querySelector(".card__title").textContent = card.name;
  const cardImage = placesCard.querySelector(".card__image");
  cardImage.src = card.link;
  cardImage.alt = card.name;
  cardImage.textContent = card.name;
  cardImage.addEventListener("click", showCard);
  buttonLike.forEach((button) => {
    button.addEventListener("click", likeCard);
  });
  buttonDeleteCard.addEventListener("click", removeCard);

  return placesCard;
}

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

function likeCard(evt) {
  evt.target.classList.toggle("card__like-button_is-active");
}
