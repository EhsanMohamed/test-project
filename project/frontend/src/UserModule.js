

class User {

    constructor(name, email, img) {
        this.name = name;
        this.email = email;
        this.img = img;
    }


    getname() {
        return this.name;
    }
    setname(newname) {
        this.name = newname;
    }
    getemail() {
        return this.email;
    }
    setemail(newemail) {
        this.email = newemail;
    }
    getimg() {
        return this.img;
    }
    setimg(newimg) {
        this.img = newimg;
    }

} 
export default User;