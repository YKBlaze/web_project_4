export default class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);
        this._submitButton = this._popup.querySelector('.modal__save');
        this._overlay = document.querySelector(`.page__overlay`);
        this.close.bind(this);
    }
    open(){
        this._overlay.addEventListener('keyup', this._handleEscapeClose);
        document.addEventListener('mousedown', this._handleOverlay);
        this._popup.classList.add(`modal_opened`);
        this._overlay.classList.remove('page__overlay_disabled');
    }
    close(){
        this._overlay.removeEventListener('keyup', this._handleEscapeClose);
        document.removeEventListener('mousedown', this._handleOverlay);
        this._popup.classList.remove(`modal_opened`);
        this._overlay.classList.add('page__overlay_disabled');
    }
    setEventListeners(){
        this._popup.addEventListener('click', (evt) => {
            
            if(evt.target.parentElement.classList.contains('modal__close')){
                this.close();
            }
        }); 
        
    }
    _handleOverlay = (evt) => {
        if(evt.target.classList.contains(`page__wrapper`) || evt.target.classList.contains(`page`)) {
            this.close();
        }
    } 
    _handleEscapeClose = (evt) => {
        if(evt.key === "Escape"){
            this.close();
        }
    }
    loading(){
        if (this._submitButton) {
        this._submitButton.disabled = true;
        this._submitButton.textContent = "Saving..."
        }
    }
    loaded(){
        if (this._submitButton) {
        this._submitButton.disabled = false;
        this._submitButton.textContent = `${this._submitButtonDefault}`;
        }
    }
}