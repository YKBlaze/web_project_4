import "../pages/index.css";
import FormValidator from "../scripts/FormValidator.js";
import { initialCards, closeModal} from "../scripts/utils.js";
import Card from "../scripts/Card.js";
import Popup from "../scripts/Popup.js";
import PopupWithImage from "../scripts/PopupWithImage.js";
import PopupWithForm from "../scripts/PopupWithForm.js";
import Section from "../scripts/Section.js";
import UserInfo from "../scripts/UserInfo.js";


const modalEditButton = document.querySelector(`.profile__edit-button`);
const modalAddButton = document.querySelector(`.profile__add-button`);
const modalAddElement = document.querySelector(`.modal_type_add-card`);
const modalEditElement = document.querySelector(`.modal_type_edit-card`);
const profileName = document.querySelector(`#title`);
const profileAboutMe = document.querySelector(`#about`);
const elementTemplate = document.querySelector(`#element`).content;


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
    createCard(initialCardsUpdated);
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
    createCard(element);
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

function createCard(InitialCards) {
    const card = new Card(InitialCards, elementTemplate, modalImage.open)
    initialCardsRender.addItem(card.render());
}