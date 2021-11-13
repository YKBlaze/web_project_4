function showInputError(formElement, inputElement, settings){
    const errorElement = formElement.querySelector(`#${inputElement.id}.modal__error`);
    inputElement.classList.add(settings.inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add(settings.errorClass);
}

function hideInputError(formElement, inputElement, settings){
    const errorElement = formElement.querySelector(`#${inputElement.id}.modal__error`);
    inputElement.classList.remove(settings.inputErrorClass);
    errorElement.textContent = "";
    errorElement.classList.remove(settings.errorClass);
}

function checkInputValidity(formElement, inputElement, settings) {
    if(inputElement.validity.valid){
       hideInputError(formElement, inputElement, settings);
    } else {
        showInputError(formElement, inputElement, settings);
    }
}
const toggleButtonState = (inputElements, buttonElement, settings) => {
    const hasInvalidInput = inputElements.some(inputElement => !inputElement.validity.valid);
    if (hasInvalidInput){
    buttonElement.classList.add(settings.inactiveButtonClass);
    } else {
    buttonElement.classList.remove(settings.inactiveButtonClass);
    }
}

function setEventListeners(formElement, settings) {
    const inputElements = Array.from(formElement.querySelectorAll(settings.inputSelector));
    const buttonElement = formElement.querySelector(settings.submitButtonSelector);
    inputElements.forEach(inputElement => {
        inputElement.addEventListener('input', () => {
            checkInputValidity(formElement, inputElement, settings);
            toggleButtonState(inputElements, buttonElement, settings);
        })
    })

}

function enableValidation(settings){
    const forms = document.querySelectorAll(settings.formSelector);
    forms.forEach(formElement => {
        formElement.addEventListener('submit', e => {
            e.preventDefault();
        });
        setEventListeners(formElement, settings);
    })
}

enableValidation({
    formSelector: ".modal__form",
    inputSelector: ".modal__input",
    submitButtonSelector: ".modal__save",
    inactiveButtonClass: "modal__save_disabled",
    inputErrorClass: "modal__input_type_error",
    errorClass: "modal__error_visible"
  });