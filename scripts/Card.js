import { openModal } from "./utils.js";
export default class Card {
    constructor(cardData, cardTemplateSelector) {
        this._name = cardData.name;
        this._link = cardData.link;
        this._template = cardTemplateSelector;
        
        }
        _like(evt) {
            const eventTarget = evt.target;
            eventTarget.classList.toggle(`element__like-button_active`);
        }
        _handleDelete(evt) {
            evt.target.closest(`.element`).remove();
        }
        _handleImage() {
            this._image = document.querySelector(`.modal_type_image-card`);
            this._image.querySelector(`.modal__image`).src = this._link;
            this._image.querySelector(`.modal__image`).alt = this._alt;
            this._image.querySelector(`.modal__footer`).textContent = this._name;
            openModal(this._image);
        }

        _addEventListeners() {
            this._element.querySelector('.element__like-button').addEventListener('click', (evt) => this._like(evt));
            this._element.querySelector('.element__delete-button').addEventListener('click',(evt) => this._handleDelete(evt));
            this._element.querySelector('.element__image-button').addEventListener('click', () => this._handleImage(this._element));
        }

        render() {
            this._element = this._template.cloneNode(true);
            this._element.querySelector('.element__image').src = this._link;
            this._element.querySelector('.element__image').alt = `Image of ${this._link}`;
            this._element.querySelector('.element__title').textContent = this._name;           
            this._addEventListeners();

            return this._element;
        }
    }