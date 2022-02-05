export default class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);
        this._submitButton = this._popup.querySelector('.modal__save');
        this._overlay = document.querySelector(`.page__overlay`);
        this.close.bind(this);
    }
    open(){
        document.addEventListener('keyup', this._handleEscapeClose);
        this._popup.classList.add(`modal_opened`);
        this._overlay.classList.remove('page__overlay_disabled');
    }
    close(){
        document.removeEventListener('keyup', this._handleEscapeClose);
        this._popup.classList.remove(`modal_opened`);
        this._overlay.classList.add('page__overlay_disabled');
    }
    setEventListeners(){
        document.addEventListener('click', (evt) => {
            if(evt.target.classList.contains(`page__wrapper`) || evt.target.classList.contains(`page`) || evt.target.parentElement.classList.contains('modal__close')){
                this.close();
            }
        }); 
        
    }
    _handleEscapeClose = (evt) => {
        if(evt.key === "Escape"){
            this.close();
        }
    }
    loading(){
        this._submitButton.disabled = true;
        this._submitButton.textContent = "Checking..."
    }
    loaded(){
        this._submitButton.disabled = false;
        this._submitButton.textContent = `${this._submitButtonDefault}`;
    }
}