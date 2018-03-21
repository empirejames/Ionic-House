import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPage } from '../pages/login/login';
import { Push, PushObject, PushOptions } from '@ionic-native/push';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = LoginPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private push: Push) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      this.pushSetup();
    });
  }
  pushSetup(){
    const options: PushOptions = {
      android: {
        senderID:'106517323064'

      },
      ios: {
          alert: 'true',
          badge: true,
          sound: 'false'
      }
   };
   
   const pushObject: PushObject = this.push.init(options);
   
   
   pushObject.on('notification').subscribe((notification: any) => {
    pushObject.finish()
    .then(e => {
      var str = JSON.stringify(notification);
      var res = JSON.parse(str);
      alert(res[0]);
      console.log('Received a notification', res);
      console.log('Received a notification', notification);
    })
    .catch(e => { console.log("ERROR NOTIFICATION",e); })
    
   })
   
   pushObject.on('registration').subscribe((registration: any) => console.log('Device registered', registration));
   
   pushObject.on('error').subscribe(error => console.error('Error with Push plugin', error));

  }
}

