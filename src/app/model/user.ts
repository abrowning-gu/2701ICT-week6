export class User {
    firstname:string ="";
    lastname:string="";
    email:string="";
    avatar:string[]=[];
    
    constructor(_firstname:string,_lastname:string,_email:string,_avatar:string[]){
        this.firstname = _firstname;
        this.lastname = _lastname;
        this.email = _email;
        this.avatar = _avatar;
       
    }
}
