
import { InfomationPage } from './../pages/infomation/infomation';
import { HomePage } from '../pages/home/home';
import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPage } from '../pages/login/login';
import { Push, PushObject, PushOptions } from '@ionic-native/push';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { AuthServiceProvider } from '../providers/auth-service/auth-service';


export interface MenuItem {
    title: string;
    component: any;
    icon: string;
}
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage:any = LoginPage;
  pages: Array<{title: string, component: any}>;
  appMenuItems: Array<MenuItem>;
  userDetails:any;
  constructor(platform: Platform, statusBar: StatusBar,public alertCtrl : AlertController, splashScreen: SplashScreen, private push: Push, private localNotifications: LocalNotifications
  , public auth: AuthServiceProvider) {
    this.pages = [
      { title: 'Homepage', component: InfomationPage },
      { title: 'Settings', component: InfomationPage },
      { title: 'Account', component: InfomationPage }
    ];
    this.appMenuItems = [
      {title: '首頁', component: HomePage, icon: 'home'}
    ];
    const data = JSON.parse(localStorage.getItem('userData'));
    this.userDetails = data.userData;
   
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      this.pushSetup();

    });
  }
  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
logout(){
  this.auth.logout().subscribe(succ => {
    this.nav.setRoot(LoginPage)
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
      this.localNotifications.schedule({
        id:1,
        title: res.title,
        text: res.message,
        at: new Date(new Date().getTime() + 5 * 1000),
        led:"FF0000",
        sound:"../assets/music/slow-spring-board.mp3",
        data:{
         myData: 'Start up application' 
        } 
      });
      console.log('Received a notification', notification);
    })
    .catch(e => { console.log("ERROR NOTIFICATION",e); })
    
   })
   
   pushObject.on('registration').subscribe((registration: any) => console.log('Device registered', registration));
   
   pushObject.on('error').subscribe(error => console.error('Error with Push plugin', error));

  }
}

