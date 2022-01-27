export default class Card {
    constructor(cardData, cardTemplateSelector, onImageClick) {
        this._name = cardData.name;
        this._link = cardData.link;
        this._template = cardTemplateSelector;
        this._onImageClick = onImageClick;
        
        }
        _like(evt) {
            const eventTarget = evt.target;
            eventTarget.classList.toggle(`element__like-button_active`);
        }
        _handleDelete(evt) {
            evt.target.closest(`.element`).remove();
        }
        _handleImage() {
            this._onImageClick({link: this._link, text: this._name})
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