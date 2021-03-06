import "./index.css";
import FormValidator from "../components/FormValidator.js";
import { initialCards, formSettings, loading} from "../utils/utils.js";
import Card from "../components/Card.js";
import Popup from "../components/Popup.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import Section from "../components/Section.js";
import PopupWithSubmit from "../components/PopupWithSubmit";
import UserInfo from "../components/UserInfo.js";
import { api } from "../components/Api.js";

let userId;
Promise.all([api.getInitialCards(), api.getUserInfo()])
.then(([cards, userInfo]) => {
    userId = userInfo._id;
    cards.forEach(cardData => {
        createCard(cardData);
    });
    userData.setUserInfo({ name: userInfo.name, job: userInfo.about, avatar: userInfo.avatar, id: userInfo._id });
})
.catch((err) => {
    console.log(err);
  });

const modalEditButton = document.querySelector(`.profile__edit-button`);
const modalProfileEditButton = document.querySelector(`.profile__image`);
const modalAddButton = document.querySelector(`.profile__add-button`);
const modalAddElement = document.querySelector(`.modal_type_add-card`);
const modalEditElement = document.querySelector(`.modal_type_edit-card`);
const modalProfileElement = document.querySelector(`.modal_type_profile-edit`);
const profileName = document.querySelector(`#title`);
const profileAboutMe = document.querySelector(`#about`);
const elementTemplate = document.querySelector(`#element`).content;



const modalImage = new PopupWithImage('.modal_type_image-card');
modalImage.setEventListeners();

const modalAdd = new PopupWithForm(`.modal_type_add-card`, (data) => {
    modalAdd.loading();
    api.createCard({name: data.title, link: data.imagelink})
    .then(res => {
        modalAdd.close();
        createCard(res);
    })
    .catch((err) => {
        console.log(err);
      })
    .finally(() => {
        modalAdd.loaded();
    })
      
});
modalAdd.setEventListeners();

const modalEdit = new PopupWithForm(`.modal_type_edit-card`, (data) => {
    modalEdit.loading();
    
    api.setUserInfo({name: data.title, about: data.about})
    .then(res =>{
        data.avatar = modalProfileEditButton.src;
        data.id = userId;
        userData.setUserInfo({name: data.title, job: data.about, avatar: data.avatar, id: data.id});
        modalEdit.close();
    })
    .catch((err) => {
        console.log(err);
      })
    .finally(() => {
        modalEdit.loaded();
    });
    
});
modalEdit.setEventListeners();

const modalConfirm = new PopupWithSubmit(`.modal_type_confirm`);
modalConfirm.setEventListeners();

const modalProfileEdit= new PopupWithForm(`.modal_type_profile-edit`,(data) => {
    modalProfileEdit.loading();
    api.updateProfile({avatar: data.profilelink})
    .then(res =>{
        const dataGet = userData.getUserInfo();
        dataGet.avatar = data.profilelink;
        dataGet.id = userId;
        userData.setUserInfo(dataGet);
        modalProfileEdit.close();
    })
    .catch((err) => {
        console.log(err);
      })
    .finally(() => {
        modalProfileEdit.loaded();
    });
});
modalProfileEdit.setEventListeners();

const userData = new UserInfo({
    name: '.profile__name', job: '.profile__about-me', avatar: '.profile__image', id: userId
});
const initialCardsRender = new Section({items: initialCards, renderer: (element)=>{
    createCard(element);
}}, ".elements");




modalEditButton.addEventListener('click', () => {
    const data = userData.getUserInfo();
    profileName.value = data.name;
    profileAboutMe.value = data.job;
    modalEdit.open();
    editCardValidator.resetValidation();
  });

modalAddButton.addEventListener('click', () =>{
    modalAdd.open();
    addCardValidator.resetValidation();
});
modalProfileEditButton.addEventListener('click', () =>{
    modalProfileEdit.open();
    profileCardValidator.resetValidation();
})


const editCardValidator = new FormValidator(formSettings, modalEditElement);
editCardValidator.enableValidation();
const addCardValidator = new FormValidator(formSettings, modalAddElement);
addCardValidator.enableValidation();
const profileCardValidator = new FormValidator(formSettings, modalProfileElement);
profileCardValidator.enableValidation();

function createCard(data) {
    const card = new Card(data, elementTemplate, modalImage.open, (id) =>{
        modalConfirm.open();
        modalConfirm.setAction(() => {
            modalConfirm.loading();
            api.deleteCard(id)
            .then(res => {
                card.removeCard();
                modalConfirm.close();
            })
            .catch((err) => {
                console.log(err);
              })
            .finally(() => {    
                modalConfirm.loaded();
            });
        });
    }, userId, (id) =>{
        if (card.isLiked()){
            api.removeLike(id)
            .then(res => {  
                card.dislikeCard(res.likes);
            })
            .catch((err) => {
                console.log(err);
              });
        } else {
            api.likeCard(id)
            .then(res => {  
                card.likeCard(res.likes);
            })
            .catch((err) => {
                console.log(err);
              });
        }
    })
    initialCardsRender.addItem(card.render());
}