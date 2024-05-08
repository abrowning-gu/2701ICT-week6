import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader,IonTitle, IonToolbar,IonButtons,IonButton,IonBackButton,IonList,IonItemSliding,IonItemOptions,IonItemOption,IonItem, IonIcon, IonAlert } from '@ionic/angular/standalone';
import { UserdetailsComponent } from '../userdetails/userdetails.component';
import { User } from '../model/user';
import { ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular/standalone';
import { ModalComponent } from '../modal/modal.component';
import { UserService } from '../services/user.service';
import { addIcons } from 'ionicons';
import { personAddOutline } from 'ionicons/icons';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
  standalone: true,
  imports: [IonAlert, IonIcon,  IonContent, IonHeader, IonTitle, IonToolbar,IonButtons,IonButton,IonBackButton,IonList,IonItemSliding,IonItemOptions,IonItemOption,IonItem,IonAlert, CommonModule, FormsModule,UserdetailsComponent,ModalComponent]
})
export class AccountPage implements OnInit {
  selecteduser:User  | undefined = undefined;
  firstname:string = ""; // for modal
  users:User[] = [];  // from service
  lastname:string="";  // for modal
  email:string=""

  //pusers:Promise<any> | null =null;
  //currentuser:User = new User(this.firstname,this.lastname,this.email);
  constructor(private _activatedRoute:ActivatedRoute,private us:UserService,private modalController: ModalController,private alert:AlertController) { 
    addIcons({personAddOutline});
  }

  async ngOnInit() {
  //get a list of users at start up.
  
     this.us.getUsers().then(val=>{
      if( val !== null){
        this.users = val;
      }
     });
  }
  async addContact(){
 //open a modal to add a new user
    const modal = await this.modalController.create({
      component: ModalComponent,
      componentProps: { },
      backdropDismiss:false
    });
   
  
   modal.onDidDismiss()
      .then((retval) => {
       
;        if (retval.data !== undefined){
          //console.log('data back from modal',retval.data);
          let newuser = new User(retval.data.firstname,retval.data.lastname,retval.data.email,retval.data.avatar)
          this.us.addUser(newuser);
         
          
          if (this.users != null) {
            this.users.push(newuser);
          }else{
            this.users = [newuser];          }
         
        }
   });
     return modal.present();
  }
  delete(i:number,userslider:IonItemSliding){
    //Delete a User
    this.presentAlert(i,userslider);
    
    
  }

  async edit(i:number,userslider:IonItemSliding){
    //open a modal to Edit a new user
   this.selecteduser = undefined;
    const editmodal = await this.modalController.create({
      component: ModalComponent,
      componentProps: { 
        firstname: this.users[i].firstname,
        lastname:this.users[i].lastname, 
        email:this.users[i].email,
        avatar:this.users[i].avatar,
        }, backdropDismiss:false,
    });
   
  
    editmodal.onDidDismiss()
      .then((retval) => {
      
        this.users[i].firstname = retval.data.firstname;
        this.users[i].lastname = retval.data.lastname;
        this.users[i].email = retval.data.email;
        this.users[i].avatar = retval.data.avatar;
        this.us.set('userlist',this.users);
        userslider.closeOpened();
   });
     return editmodal.present();
  }

  async ionViewDidEnter(){
   //this.pusers = this.us.getUsers();
     this.us.getUsers().then(val=>{
      this.users = val;
     });
    
  }
  ionViewDidLeave(){
    this.us.set('userlist',this.users);
  }

  async showUser(i:number){
    this.selecteduser = this.users[i];

  }

  async presentAlert(i:number,userslider:IonItemSliding) {
    const alert = await this.alert.create({
      header: 'Are you sure you would like to delete this contact',
     // subHeader: 'A Sub Header Is Optional',
      message: 'Selecting "Yes" will delete this item.',
      buttons: [{text:'Yes',role:'confirm'},{text:'Cancel',role:'cancel'}],
    });

    await alert.present();

    alert.onDidDismiss().then((val)=>{
     
      if (val.role == 'confirm'){
      this.selecteduser = undefined;
      this.users.splice(i,1);
      this.us.set('userlist',this.users);
      }
      userslider.closeOpened();
    })
    
    
  }


}
