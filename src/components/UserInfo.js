export default class UserInfo {
    constructor({ name, job, avatar, id}){
        this._name = document.querySelector(name);
        this._job = document.querySelector(job);
        this._avatarElement = document.querySelector(avatar);
        this._avatar = avatar;
        this._id = id;
    }
    getUserInfo(){
        return { 
            name: this._name.textContent,
            job: this._job.textContent,
            avatar: this._avatar,
            id: this.id
        }
    }
    setUserInfo({ name, job, avatar, id}){
        this._name.textContent = name;
        this._job.textContent = job;
        this._avatarElement.src = avatar;
        this._avatar = avatar;
        this._id = id;
    }
}