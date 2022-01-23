const pageOverlay = document.querySelector(`.page__overlay`);
export default class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);
        this.close.bind(this);
    }
    open(){
        document.addEventListener('keyup', this._handleEscapeClose);
        this._popup.classList.add(`modal_opened`);
        pageOverlay.classList.remove('page__overlay_disabled');
    }
    close(){
        document.addEventListener('keyup', this._handleEscapeClose);
        this._popup.classList.remove(`modal_opened`);
        pageOverlay.classList.add('page__overlay_disabled');
    }
    setEventListeners(){
        this._popup.addEventListener('click', (evt) => {
            if(evt.target.classList.contains('modal__image') || evt.target.classList.contains('modal__close')){
                this.close();
            }
        }); 
    }
    
    _handleEscapeClose = (evt) => {
        if(evt.key === "Escape"){
            this.close();
        }
    }
}