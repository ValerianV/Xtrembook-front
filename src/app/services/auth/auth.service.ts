import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { User } from 'src/app/interfaces/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  host = environment.host;
  userId: number;
  private prenom: string;
  isAuth$ = new BehaviorSubject<boolean>(false);
  isAuth= true;
  constructor(private http: HttpClient, private router: Router) { }

  createUser = (user: User) => {
    return new Promise((resolve, reject) => {

      this.http.post(this.host + "/api/user/signup", user)
        .subscribe((response: User) => {
          resolve(response);
        },
          (error) => {
            reject(error);
          })

    });
  }

  getUserId(){
    return this.userId;
  }
  getPrenom(){
    return this.prenom;
  }
  loginUser(user: User) {
    return new Promise((resolve, reject)=>{
      this.http.post(this.host + "/api/user/login", user).subscribe((response: User)=>{
        console.log(user)
        localStorage.setItem('userName', JSON.stringify(response[0].prenom))
        this.userId = response[0].idU;
        this.prenom = response[0].prenom;
        this.isAuth$.next(true);
        resolve(response)
      },
      (error)=>{
        reject(error);
      })
    })
  }
  
  logout() {
    console
    this.userId = null;
    localStorage.setItem("userName", null);
    this.isAuth$.next(false);
    this.router.navigate(["/article"]);
  }
}
