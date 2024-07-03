// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу
const placesList = document.querySelector(".places__list");
const placesListTemplate = document.querySelector("#card-template").content;

initialCards.forEach(function (card) {
  const placesCard = placesListTemplate.querySelector(".card").cloneNode(true);
  const buttonDeleteCard = placesCard.querySelector(".card__delete-button");

  placesCard.querySelector(".card__title").textContent = card.name;
  placesCard.querySelector(".card__image").src = card.link;

  buttonDeleteCard.addEventListener("click", removeCard);

  placesList.append(placesCard);
});

function removeCard() {
  const placeItem = document.querySelector(".places__item");
  placeItem.remove();
}
