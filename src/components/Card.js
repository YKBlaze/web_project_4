export default class Card {
    constructor(cardData, cardTemplateSelector, onImageClick, handleDeleteCard, userId, handleLikeIcon) {
        this._name = cardData.name;
        this._link = cardData.link;
        this._likes = cardData.likes;
        this._ownerId = cardData.owner._id;
        this._template = cardTemplateSelector;
        this._onImageClick = onImageClick;
        this._handleDeleteCard = handleDeleteCard;
        this._like = handleLikeIcon;
        this._id = cardData._id;
        this._userId = userId;
        this._isLiked = false;
        }
        removeCard() {
            this._element.remove();
            this._element = null;
        }
        likeCard(newLikes) {
            this._likes = newLikes;
            this._element.querySelector('.element__like-count').textContent = this._likes.length;
            this._element.querySelector('.element__like-button').classList.add(`element__like-button_active`);
        }

        dislikeCard(newLikes) {
            this._likes = newLikes;
            this._element.querySelector('.element__like-count').textContent = this._likes.length;
            this._element.querySelector('.element__like-button').classList.remove(`element__like-button_active`);
        }
        _handleImage() {
            this._onImageClick({link: this._link, text: this._name})
        }

        _addEventListeners() {
            this._element.querySelector('.element__like-button').addEventListener('click', () => this._like(this._id));
            this._element.querySelector('.element__delete-button').addEventListener('click',() => this._handleDeleteCard(this._id));
            this._element.querySelector('.element__image-button').addEventListener('click', () => this._handleImage(this._element));
        }

        render() {
            
            this._element = this._template.cloneNode(true);
            this._element =  this._element.querySelector('.element');
            this._element.querySelector('.element__image').src = this._link;
            this._element.querySelector('.element__image').alt = `Image of ${this._link}`;
            this._element.querySelector('.element__title').textContent = this._name;    
            if(this._ownerId !== this._userId){
                this._element.querySelector('.element__delete-button').style.display = 'none';
            }       
            this._element.querySelector('.element__like-count').textContent = this._likes.length;
            if(this.isLiked()){
                this._element.querySelector('.element__like-button').classList.add(`element__like-button_active`);
            } 
            this._addEventListeners();
            return this._element;
        }

        isLiked(){
            this._isLiked = this._likes.some((person) => person._id === this._userId);
            return this._isLiked;
        }
    }