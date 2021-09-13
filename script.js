const modalEditButton = document.querySelector(`.profile__edit-button`);
const modal = document.querySelector(`.modal`);
const modalCloseButton = document.querySelector(`.modal__close`);
const modalSaveButton = document.querySelector(`.modal__save`);
const userName = document.querySelector(`.profile__name`);
const aboutMe = document.querySelector(`.profile__about-me`);
const modalUserName = document.querySelector(`.modal__name`);
const modalAboutMe = document.querySelector(`.modal__about-me`);


modalEditButton.addEventListener('click', function displayModal(evt) {
    modalUserName.value = userName.innerText;
    modalAboutMe.value = aboutMe.innerText;
    modal.classList.remove('modal_disabled');
});

modalCloseButton.addEventListener('click', function hideModal(evt) {
    modal.classList.add('modal_disabled');
});
modalSaveButton.addEventListener('click', function saveModal(evt) {
    if (modalUserName.value.length < 23 && modalAboutMe.value.length < 40) {
        userName.innerText = modalUserName.value;
        aboutMe.innerText = modalAboutMe.value;
        modal.classList.add('modal_disabled');
    }
    else {
        return;
    }
});
