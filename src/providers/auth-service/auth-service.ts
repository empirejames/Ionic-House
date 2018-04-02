import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
let apiLogin = "http://james.hct.tw/index.php/api/v1/login/";
let apiNew = "http://james.hct.tw/index.php/api/v1/announcement/";
let apiGet = "http://james.hct.tw/index.php/api/v1/announcement/id/";
/*
  Generated class for the AuthServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

export class User {
  name: string;
  email: string;

  constructor(name: string, email: string) {
    this.name = name;
    this.email = email;
  }
}


@Injectable()
export class AuthServiceProvider {
  currentUser: User;

  constructor(public http: HttpClient) {
    console.log('Hello AuthServiceProvider Provider');
  }
  public post(credentials, type) {
    return new Promise((resolve, reject) => {
      console.log(credentials);
      let headers = { 'Content-Type': 'application/x-www-form-urlencoded', 'Accept': 'application/json' };
      if (type === ("login")) {
        this.http.post(apiLogin, credentials, { headers: headers }).
          subscribe(res => {
            resolve(res);
          }, (err) => {
            console.log(err);
            reject(err);
          });
      }else if(type ==("announce")){
        this.http.post(apiNew, credentials, { headers: headers }).
        subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
      }

    });
  }

  public put(credentials, type) {
    return new Promise((resolve, reject) => {
      let headers = { 'Content-Type': 'application/x-www-form-urlencoded', 'Accept': 'application/json' };
      this.http.put(apiNew, credentials, { headers: headers }).
        subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }
  public getData(credentials, id) {
    return new Promise((resolve, reject) => {
      let headers = new HttpHeaders();
      this.http.get(apiGet + id).
        subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }



  public login(credentials) {
    if (credentials.email === null || credentials.password === null) {
      return Observable.throw("Please insert credentials");
    } else {
      return Observable.create(observer => {
        // At this point make a request to your backend to make a real check!
        let access = (credentials.password === "pass" && credentials.email === "email");
        this.currentUser = new User('Simon', 'saimon@devdactic.com');
        observer.next(access);
        observer.complete();
      });
    }
  }
  public register(credentials) {
    if (credentials.email === null || credentials.password === null) {
      return Observable.throw("Please insert credentials");
    } else {
      // At this point store the credentials to your backend!
      return Observable.create(observer => {
        observer.next(true);
        observer.complete();
      });
    }
  }

  public getUserInfo(): User {
    return this.currentUser;
  }

  public logout() {
    return Observable.create(observer => {
      this.currentUser = null;
      observer.next(true);
      observer.complete();
    });
  }




}
