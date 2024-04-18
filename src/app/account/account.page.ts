import { Component, OnInit,ViewChild,ElementRef  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader,IonTitle, IonToolbar,IonButtons,IonButton,IonBackButton,IonList,IonItemSliding,IonItemOptions,IonItemOption,IonItem, IonIcon, IonAlert } from '@ionic/angular/standalone';
import { UserdetailsComponent } from '../userdetails/userdetails.component';
import { User } from '../model/user';

import { ModalController } from '@ionic/angular/standalone';
import { ModalComponent } from '../modal/modal.component';
import { UserService } from '../services/user.service';
import { addIcons } from 'ionicons';
import { personAddOutline } from 'ionicons/icons';
import { AlertController } from '@ionic/angular';
import { Observable,Subscription } from 'rxjs';


@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
  standalone: true,
  imports: [IonAlert, IonIcon,  IonContent, IonHeader, IonTitle, IonToolbar,IonButtons,IonButton,IonBackButton,IonList,IonItemSliding,IonItemOptions,IonItemOption,IonItem,IonAlert, CommonModule, FormsModule,UserdetailsComponent,ModalComponent]
})
export class AccountPage implements OnInit {
  newusersub:Subscription | null = null;
  selecteduser:User  | undefined = undefined;
  users:User[] = [];  // from service
  
 //get refernce to itemslider to be able to close it.
  @ViewChild(IonItemSliding) userslider!:IonItemSliding;
 

  constructor(private us:UserService,private modalController: ModalController,private alert:AlertController) { 
    addIcons({personAddOutline});
  }


  async ngOnInit() {
 //listen for new/edited users
  this.newusersub = this.us.getUser().subscribe((data)=>{
    if (data.mode=='Add'){
      this.users.push(data.user);
    }
    if (data.mode=='Edit'){
      this.users[data.indexpos] = data.user;
    }
    this.us.set('userlist',this.users);
    this.userslider.closeOpened();
  });

    //get a list of users at start up.
     this.us.getUsers().then(val=>{
      this.users = val;
     });
  }

  ngOnDestroy(){
    //clean up subscription
    this.newusersub?.unsubscribe();
  }

  async addContact(){
    //open a modal to add a new user
    const modal = await this.modalController.create({
      component: ModalComponent,
      componentProps: {mode:'Add' },
      backdropDismiss:false
    });
   
     return modal.present();
  }

  delete(i:number){
    //Delete a User
    this.presentAlert(i);
  }

  async edit(i:number){
    //open a modal to Edit a new user
   this.selecteduser = undefined;
    const editmodal = await this.modalController.create({
      component: ModalComponent,
      componentProps: {
        user:this.users[i], 
        mode:'Edit',
        indexpos:i,
        
        }, backdropDismiss:false,
    });
     return editmodal.present();
  }


  ionViewDidLeave(){
    //Save items just in case the list had not been stored
    this.us.set('userlist',this.users);
  }

  async displayUserInfo(i:number){
    //set input decorator on userdetail component
    this.selecteduser = this.users[i];
  }

  async presentAlert(i:number) {
    const alert = await this.alert.create({
      header: 'Are you sure you would like to delete this contact',
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
      this.userslider.closeOpened();
    })
      
  }
}