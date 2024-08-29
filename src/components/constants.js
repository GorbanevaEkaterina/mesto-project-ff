// контейнер в который добавляю карточки cardСontainer
export const cardСontainer = document.querySelector(".places__list");

// кнопки, которые открывают модальные окна
export const buttonOpenModalEditProfile = document.querySelector(
  ".profile__edit-button"
); // кнопка редактирования профиля

export const buttonOpenModalAddNewCard = document.querySelector(
  ".profile__add-button"
); // кнопка добавления новой карточки

// модальные окна
export const modalEditProfile = document.querySelector(".popup_type_edit"); // модалка редактирования профиля
export const modalAddNewCard = document.querySelector(".popup_type_new-card"); // модалка добавления новой карты

// инпуты модального окна добавления карточки
export const placeNameInput = modalAddNewCard.querySelector(
  ".popup__input_type_place-name"
);
export const linkInput = modalAddNewCard.querySelector(
  ".popup__input_type_url"
);

//модальное окно увеличение картинки и его содержимое
export const modalTypeImage = document.querySelector(".popup_type_image");
export const imageModalContent = modalTypeImage.querySelector(
  ".popup__content_content_image"
);
export const modalCaption = imageModalContent.querySelector(".popup__caption");
export const modalImage = imageModalContent.querySelector(".popup__image");
// инпуты редактирования профиля имя и занятие в модальном окне
export const editProfileNameInput = document.querySelector(
  ".popup__input_type_name"
);
export const editProfileDescriptionInput = document.querySelector(
  ".popup__input_type_description"
);

//поиск элемента через форму

export const formProfile = document.forms.edit__profile;
export const formNewCard = document.forms.new__place;
export const formNewAvatar = document.forms.new__avatar;

// элемены редактирования профиля
export const nameElement = document.querySelector(".profile__title"); // имя
export const descriptionElement = document.querySelector(
  ".profile__description"
); // занятия

// редактирование аватара
export const editProfileImageForm = document.forms.new__avatar;
export const profileAvatar = document.querySelector(".profile__image");
export const editAvatar = document.querySelector(".popup_type_new_avatar");
export const profileImageInput = formNewAvatar.elements.avatar;
