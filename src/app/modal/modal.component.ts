import { Component, OnInit } from '@angular/core';
import {NavParams } from '@ionic/angular';
import { FormsModule} from '@angular/forms';
import { ModalController } from '@ionic/angular/standalone';
import { IonContent, IonHeader, IonTitle, IonToolbar,IonButtons,IonButton,IonBackButton,IonList,IonInput,IonItem, IonFooter,IonLabel} from '@ionic/angular/standalone';
import { User } from '../model/user';


@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  standalone:true,
  imports:[IonContent, IonHeader, IonTitle, IonToolbar,IonButtons,IonButton,IonBackButton,IonList,IonInput,IonItem,IonFooter,IonLabel,FormsModule ],
})
export class ModalComponent  implements OnInit {
  public firstname:string ="";
  public lastname:string ="";
  public email:string ="";
  public editaddbtn:string = "Add";

  constructor(private navParams:NavParams,private modalController:ModalController) { }

  ngOnInit() {
   // this.firstname = this.navParams.get('firstname');
    this.firstname = this.navParams.get('firstname');
      this.lastname = this.navParams.get('lastname');
      this.email = this.navParams.get('email');
      //console.log(this.firstname);
      if ( this.firstname !=undefined  ){
        this.editaddbtn = 'Edit';
      }else{
        this.editaddbtn = 'Add';
    }
  }
  closemodal(){
    let newuser = new User(this.firstname,this.lastname,this.email)
    console.log(newuser);
    this.modalController.dismiss(newuser);
  }
}
