export default class UserInfo {
    constructor({ name, job, avatar, id }){
        this._name = document.querySelector(name);
        this._job = document.querySelector(job);
        this._avatar = document.querySelector(avatar);
        this._id = id;
    }
    getUserInfo(){
        return { 
            name: this._name.textContent,
            job: this._job.textContent,
            avatar: this._avatar.textContent,
            id: this._id
        }
    }
    setUserInfo({ title, about, avatar}){
        this._name.textContent = title;
        this._job.textContent = about;
        this._avatar.src = avatar;
    }
}