import { Push } from '@ionic-native/push';

import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from './../pages/register/register';
import { AuthServiceProvider } from '../providers/auth-service/auth-service';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { InfomationPage } from './../pages/infomation/infomation';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    InfomationPage,
    RegisterPage
  ],
  imports: [
    BrowserModule,HttpClientModule,HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    InfomationPage,
    RegisterPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Push,
    LocalNotifications,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthServiceProvider
  ]
})
export class AppModule {}
