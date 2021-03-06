import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , Loading, AlertController} from 'ionic-angular';
import {Storage} from '@ionic/storage';
import { AuthServiceProvider } from './../../providers/auth-service/auth-service';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';

/**
 * Generated class for the AnnoucePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-annouce',
  templateUrl: 'annouce.html',
})
export class AnnoucePage {
  annouceCredentials = {"id":"", "title":"", "content":"", "created":"", "user_id":""};
  responseData : any;
  statusLogin : any;
  displayData = [];
  updateResponse : any;
  loading: Loading;
  userDetails : any;
  info: string = "read";
  todo : FormGroup;
  public fromto: any;

  constructor(private storage: Storage, public navCtrl: NavController, public navParams: NavParams, public authService: AuthServiceProvider, public alertCtrl: AlertController
  ,private formBuilder: FormBuilder) {
    this.fromto = this.navParams.data;
    this.todo = this.formBuilder.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AnnoucePage');
    const data = JSON.parse(localStorage.getItem('userData'));
    this.userDetails = data;
    this.loadingAnnouce();
  }

  loadingAnnouce(){
    this.authService.getData(this.annouceCredentials, '').then((result)=>{
      this.responseData = result;
      this.statusLogin = JSON.stringify(this.responseData);
      this.displayData = JSON.parse(this.statusLogin);
      console.log(result);
    },(err)=>{
      this.showError(err);
      //Connect fail
    });
  }
  submitForm(value: any):void{
    var myData =
      { 
        title: value.title,
        content: value.content,
        //user_id: this.userDetails.username
        user_id: "16"
      };
      this.authService.post(myData, 'announce').then((result)=>{
      this.responseData = result;
      this.statusLogin = JSON.stringify(this.responseData);
      this.displayData = JSON.parse(this.statusLogin);
      this.updateResponse = this.displayData;
      //console.log(this.updateResponse.message);
       this.showSuccess(this.updateResponse.message);
      this.loadingAnnouce();
    },(err)=>{
      this.showError(err);
      console.log(err);
      //Connect fail
    });
    //console.log(value.title);
    //console.log(value.content);
  }

  searchBy(item) {
    if (this.fromto === 'from') {
      this.storage.set('pickup', item.name);
    }

    if (this.fromto === 'to') {
      this.storage.set('dropOff', item.name);
    }
    // this.nav.push(SearchCarsPage);
    this.navCtrl.pop();
  }
  showError(text) {
    let alert = this.alertCtrl.create({
      title: '錯誤',
      subTitle: text,
      buttons: ['OK']
    });
    alert.present();
  }
  showSuccess(text) {
    let alert = this.alertCtrl.create({
      title: '成功',
      subTitle: text,
      buttons: ['OK']
    });
    alert.present();
  }
}
