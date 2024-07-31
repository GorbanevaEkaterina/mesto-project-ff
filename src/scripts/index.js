const placesList = document.querySelector(".places__list");
const placesListTemplate = document.querySelector("#card-template").content;

function createCard(card, { removeCard }) {
  const placesCard = placesListTemplate.querySelector(".card").cloneNode(true);
  const buttonDeleteCard = placesCard.querySelector(".card__delete-button");

  placesCard.querySelector(".card__title").textContent = card.name;
  const cardImage = placesCard.querySelector(".card__image");
  cardImage.src = card.link;
  cardImage.alt = card.name;

  buttonDeleteCard.addEventListener("click", removeCard);

  return placesCard;
}

initialCards.forEach(function (card) {
  const placesCard = createCard(card, { removeCard });
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
