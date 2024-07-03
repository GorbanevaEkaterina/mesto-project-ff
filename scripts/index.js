// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу
const placesList = document.querySelector(".places__list");
const placesListTemplate = document.querySelector("#card-template").content;

initialCards.forEach(function (element) {
  const placesCard = placesListTemplate.querySelector(".card").cloneNode(true);
  placesCard.querySelector(".card__title").textContent = element.name;
  placesCard.querySelector(".card__image").src = element.link;

  placesList.append(placesCard);
});
