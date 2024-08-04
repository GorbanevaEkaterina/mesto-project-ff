export { openModal, closeModal, overlayClose };

function openModal(popap) {
  popap.classList.add("popup_is-opened");
  document.addEventListener("keydown", keyClose);
}

function closeModal(popap) {
  popap.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", keyClose);
}

function keyClose(evt) {
  if (evt.key === "Escape") {
    const openPopap = document.querySelector(".popup_is-opened");
    closeModal(openPopap);
  }
}

function overlayClose(evt) {
  const modal = evt.currentTarget;
  if (evt.target === modal || evt.target.classList.contains("popup__close")) {
    closeModal(modal);
  }
}
