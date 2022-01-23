import Popup from "./Popup.js";
export default class PopupWithForm extends Popup {
    constructor(popupSelector, handleSubmitForm) {
        super(popupSelector);
        this._submitHandler = handleSubmitForm;
        this._form = this._popup.querySelector('.modal__form');
    }
    _getInputValues(){
        const inputs = [...this._form.querySelectorAll('.modal__input')];
        const inputValues = {};
        inputs.forEach((input) => {
            inputValues[input.name] = input.value;
        })
        return inputValues;
    }
    setEventListeners(){
        super.setEventListeners();
        this._form.addEventListener('submit', () => this._submitHandler(this._getInputValues()));
    }
    close(){
        super.close();
        this._form.reset();
    }
}