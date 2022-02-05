import Popup from "./Popup.js";

export default class PopupWithSubmit extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._submitButtonDefault = this._submitButton.textContent;
    }
     setAction(action) {
         this._submitHandler = action;
     }

     setEventListeners(){
        super.setEventListeners();
         this._popup.addEventListener('submit', (e) => {
            e.preventDefault(); 
            this._submitHandler();
         });   
     }
}