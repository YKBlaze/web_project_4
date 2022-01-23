const pageOverlay = document.querySelector(`.page__overlay`);
import Popup from "./Popup.js";
export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
    }
    open = ({ link, text }) => {
        const imageElement = this._popup.querySelector('.modal__image');
        const imageCaption = this._popup.querySelector('.modal__footer');
        imageElement.src = link;
        imageElement.alt = `Image of ${link}`;
        imageCaption.textContent = text;

        this._popup.classList.add(`modal_opened`);
        pageOverlay.classList.remove('page__overlay_disabled');
        document.addEventListener('keyup', this._handleEscapeClose);
    }
}