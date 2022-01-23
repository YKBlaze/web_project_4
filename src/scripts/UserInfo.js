export default class UserInfo {
    constructor({ name, job }){
        this._name = document.querySelector(name);
        this._job = document.querySelector(job);
    }
    getUserInfo(){
        return { 
            name: this._name.textContent,
            job: this._job.textContent
        }
    }
    setUserInfo({ title, about }){
        this._name.textContent = title;
        this._job.textContent = about;
    }
}