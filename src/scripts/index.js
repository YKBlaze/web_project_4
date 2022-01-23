import "../pages/index.css";
import FormValidator from "./FormValidator.js";
import { openModal, closeModal} from "./utils.js";
import Card from "./Card.js";
import Popup from "./Popup.js";
import PopupWithImage from "./PopupWithImage.js";
import PopupWithForm from "./PopupWithForm.js";
import Section from "./Section.js";
import UserInfo from "./UserInfo.js";


const initialCards = [{
    name: "Yosemite Valley",
    link: "https://code.s3.yandex.net/web-code/yosemite.jpg",
    alt:  "Yosemite Valley"
},
{
    name: "Lake Louise",
    link: "https://code.s3.yandex.net/web-code/lake-louise.jpg",
    alt:  "Lake Louise"
},
{
    name: "Bald Mountains",
    link: "https://code.s3.yandex.net/web-code/bald-mountains.jpg",
    alt:  "Bald Mountains"
},
{
    name: "Latemar",
    link: "https://code.s3.yandex.net/web-code/latemar.jpg",
    alt:  "Latemar"
},
{
    name: "Vanoise National Park",
    link: "https://code.s3.yandex.net/web-code/vanoise.jpg",
    alt:  "Vanoise National Park"
},
{
    name: "Lago di Braies",
    link: "https://code.s3.yandex.net/web-code/lago.jpg",
    alt:  "Lago di Braies"
}
];

const modalEditButton = document.querySelector(`.profile__edit-button`);
const modalAddButton = document.querySelector(`.profile__add-button`);
const modalAddElement = document.querySelector(`.modal_type_add-card`);
const modalEditElement = document.querySelector(`.modal_type_edit-card`);
const profileName = document.querySelector(`#title`);
const profileAboutMe = document.querySelector(`#about`);
const elementTemplate = document.querySelector(`#element`).content;
const closeButtons = document.querySelectorAll(`.modal__close`);


const modalImage = new PopupWithImage('.modal_type_image-card');
modalImage.setEventListeners();

const modalAdd = new PopupWithForm(`.modal_type_add-card`, (data) => {
    const initialCardsUpdated = {
        name: "",
        link: "",
        alt: ""
    };
    initialCardsUpdated.name = data.title;
    initialCardsUpdated.link = data['image-link'];
    initialCardsUpdated.alt = `Photo of ${data['image-link']}`;
    const card = new Card(initialCardsUpdated, elementTemplate, modalImage.open)
    initialCardsRender.addItem(card.render());
    modalAdd.close();
});
modalAdd.setEventListeners();

const modalEdit = new PopupWithForm(`.modal_type_edit-card`, (data) => {
    userData.setUserInfo(data);
    modalEdit.close();
});

modalEdit.setEventListeners();

const userData = new UserInfo({
    name: '.profile__name', job: '.profile__about-me'
});

const initialCardsRender = new Section({items: initialCards, renderer: (element)=>{
    const card = new Card(element, elementTemplate, modalImage.open);
    initialCardsRender.addItem(card.render());
}}, ".elements");
initialCardsRender.renderItems();



modalEditButton.addEventListener('click', () => {
    const data = userData.getUserInfo();
    profileName.value = data.name;
    profileAboutMe.value = data.job;
    modalEdit.open();
    editCard.resetValidation();
  });

modalAddButton.addEventListener('click', () =>{
    modalAdd.open();
    addCard.resetValidation();
});
closeButtons.forEach(button => { 
    button.addEventListener('click', () => {
       const myModal = button.closest('.modal');
       closeModal(myModal);
})});


const formSettings = {
    inputSelector: ".modal__input",
    submitButtonSelector: ".modal__save",
    inactiveButtonClass: "modal__save_disabled",
    inputErrorClass: "modal__input_type_error",
    errorClass: "modal__error_visible"
  }

const editCard = new FormValidator(formSettings, modalEditElement);
editCard.enableValidation();
const addCard = new FormValidator(formSettings, modalAddElement);
addCard.enableValidation();