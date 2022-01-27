import Popup from "./Popup.js";
export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._imageElement = this._popup.querySelector('.modal__image');
        this._imageCaption = this._popup.querySelector('.modal__footer');
    }
    open = ({ link, text }) => {
        this._imageElement.src = link;
        this._imageElement.alt = `Image of ${link}`;
        this._imageCaption.textContent = text;
        super.open();
    }
}