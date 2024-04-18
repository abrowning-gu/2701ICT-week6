import { Component, OnInit,Input } from '@angular/core';
import {NavParams } from '@ionic/angular';
import { FormsModule} from '@angular/forms';
import { ModalController } from '@ionic/angular/standalone';
import { IonContent, IonHeader, IonTitle, IonToolbar,IonButtons,IonButton,IonBackButton,IonList,IonInput,IonItem, IonFooter,IonLabel} from '@ionic/angular/standalone';
import { User } from '../model/user';
import { UserService } from '../services/user.service';


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
  public editaddbtn:string = "";
  public index:number = -1;
  @Input() user:User  = new User("","","");
  @Input() mode:string = "";
  @Input() indexpos:number = -1;
 
  constructor(private modalController:ModalController,private us:UserService) { }

  ngOnInit() {
   // this.firstname = this.navParams.get('firstname');
   this.firstname = this.user.firstname;
   this.lastname = this.user.lastname;
   this.email = this.user.email;
   this.editaddbtn = this.mode;
   this.index = this.indexpos
   
     
  }
  closemodal(){
    let newuser = new User(this.firstname,this.lastname,this.email)
    this.us.updateUser(newuser,this.editaddbtn,this.index);
    this.modalController.dismiss();
  }
}
