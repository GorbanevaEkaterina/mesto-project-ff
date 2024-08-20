export { enableValidation};

export const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
}


const showInputError = (formSelector, inputSelector, errorMessage) => {
  const errorElement = formSelector.querySelector(`.${inputSelector.id}-error`);
  inputSelector.classList.add(validationConfig.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(validationConfig.errorClass);
};

const hideInputError = (formSelector, inputSelector) => {
  const errorElement = formSelector.querySelector(`.${inputSelector.id}-error`);
  inputSelector.classList.remove(validationConfig.inputErrorClass);
  errorElement.classList.remove(validationConfig.errorClass);
  errorElement.textContent = '';
};

const checkInputValidity = (formSelector, inputSelector) => {
  if (inputSelector.validity.patternMismatch) {
  inputSelector.setCustomValidity(inputSelector.dataset.errorMessage);
} else {
  inputSelector.setCustomValidity("");
}

if (!inputSelector.validity.valid) {
  showInputError(formSelector, inputSelector, inputSelector.validationMessage);
} else {
  hideInputError(formSelector, inputSelector);
}
};

const setEventListeners = (formSelector) => {
  const inputList = Array.from(formSelector.querySelectorAll(validationConfig.inputSelector));
  const submitButtonSelector = formSelector.querySelector(validationConfig.submitButtonSelector);
  toggleButtonState(inputList, submitButtonSelector);
    inputList.forEach((inputSelector) => {
      inputSelector.addEventListener('input', function () {
        checkInputValidity(formSelector, inputSelector);
        toggleButtonState(inputList, submitButtonSelector);
      });
    });
  };

const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll(validationConfig.formSelector));
  formList.forEach((formSelector) => {
    formSelector.addEventListener('submit', function (evt) {
       evt.preventDefault();
       
    });
    const fieldsetList = Array.from(formSelector.querySelectorAll('.form__set'));
  
    fieldsetList.forEach((fieldset) => {
   setEventListeners(fieldset);
   });
 });
     
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputSelector) => {
return !inputSelector.validity.valid;
  })

}

const toggleButtonState = (inputList, submitButtonSelector) => {
if(hasInvalidInput(inputList)) {
  submitButtonSelector.disabled = true;
  submitButtonSelector.classList.add(validationConfig.inactiveButtonClass);

} else {
  submitButtonSelector.disabled = false;
  submitButtonSelector.classList.remove(validationConfig.inactiveButtonClass);
}
}

  export function clearValidation(formSelector, validationConfig) {
    const inputSelector = Array.from(
      formSelector.querySelectorAll(validationConfig.inputSelector)
    );
    inputSelector.forEach((inputSelector) => {
      const errorElement = formSelector.querySelector(`.${inputSelector.id}-error`);
      inputSelector.classList.remove(validationConfig.inputErrorClass);
      errorElement.textContent = "";
      errorElement.classList.remove(validationConfig.errorClass);
    });
  
    const submitButton = formSelector.querySelector(
      validationConfig.submitButtonSelector
    );
    submitButton.classList.add(validationConfig.inactiveButtonClass);
    submitButton.disabled = true;
  }
  