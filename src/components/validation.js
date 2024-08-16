export { showInputError, hideInputError, checkInputValidity, setEventListeners,enableValidation, hasInvalidInput, toggleButtonState, clearValidation};
const showInputError = (formSelector, inputSelector, errorMessage) => {
    const errorElement = formSelector.querySelector(`.${inputSelector.id}-error`);
    inputSelector.classList.add('popup__input_type_error');
    errorElement.textContent = errorMessage;
    errorElement.classList.add('popup__input-error_active');
  };
  
  const hideInputError = (formSelector, inputSelector) => {
    const errorElement = formSelector.querySelector(`.${inputSelector.id}-error`);
    inputSelector.classList.remove('popup__input_type_error');
    errorElement.classList.remove('popup__input-error_active');
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
    const inputList = Array.from(formSelector.querySelectorAll('.popup__input'));
    const submitButtonSelector = formSelector.querySelector('.popup__button');
    toggleButtonState(inputList, submitButtonSelector);
      inputList.forEach((inputSelector) => {
        inputSelector.addEventListener('input', function () {
          checkInputValidity(formSelector, inputSelector);
          toggleButtonState(inputList, submitButtonSelector);
        });
      });
    };
  
  const enableValidation = () => {
    const formList = Array.from(document.querySelectorAll('.popup__form'));
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
    submitButtonSelector.classList.add('popup__button_disabled');
  
  } else {
    submitButtonSelector.disabled = false;
    submitButtonSelector.classList.remove('popup__button_disabled');
  }
  }

 
  const clearValidation = ( formSelector, validationConfig ) => {
    validationConfig.submitButtonSelector.classList.add('popup__button_disabled');
    hideInputError(formSelector);
 }
  