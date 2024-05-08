import { Component, OnInit } from '@angular/core';
import {NavParams } from '@ionic/angular';
import { FormsModule} from '@angular/forms';
import { ModalController } from '@ionic/angular/standalone';
import { IonContent, IonHeader, IonTitle, IonToolbar,IonButtons,IonButton,IonBackButton,IonList,IonItem,IonInput, IonFooter,IonLabel} from '@ionic/angular/standalone';
import { User } from '../model/user';
import { NgFor } from '@angular/common';


@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  standalone:true,
  imports:[NgFor, IonContent, IonHeader, IonTitle, IonToolbar,IonButtons,IonButton,IonBackButton,IonList,IonItem,IonInput,IonFooter,IonLabel,FormsModule ],
})
export class ModalComponent  implements OnInit {
  public firstname:string ="";
  public lastname:string ="";
  public email:string ="";
  public editaddbtn:string = "Add";
  public avatar = new Array<string>();

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
    let newuser = new User(this.firstname,this.lastname,this.email,this.avatar)
    console.log(newuser);
    this.modalController.dismiss(newuser);
  }

  detectFiles(event:any) {
    
      this.avatar = [];
      
      let files = event.target.files;
      if (files) {
        for (let file of files) {
          //console.log(file);
          if(file.type == "image/jpeg" || file.type == "image/png" ){
            let reader = new FileReader();
            reader.readAsDataURL(file);
            reader.addEventListener("load", (e: any)=>{
              this.avatar.push(e.target.result); 
            });
            reader.addEventListener("progress", (e:any)=>{
              alert("loaded " + e.loaded + "total " + e.total);
            });
            
            // reader.onload = (e: any) => {
            //   this.avatar.push(e.target.result); 
            // } 
        }else{
          alert("Illegal data type");
        }
        }
      }
    }
   
}
