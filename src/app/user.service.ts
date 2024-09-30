import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { userDetailsCls } from './Classes/userclass';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private jwtToken: string | null = null;
  setUserName(userName: string) {
    sessionStorage.setItem('userName', userName);
  }

  setToken(token: string) {
    this.jwtToken = token;
    sessionStorage.setItem('jwtToken', token);
  }
  getToken() {
    return this.jwtToken || sessionStorage.getItem('jwtToken');
  }
  getUserName() {
    return sessionStorage.getItem('userName');
  }

  decodeToken() {
    const token = this.getToken();
    if (token) {
      return jwtDecode(token);
    }
    return null;
  }
  private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  url = "https://localhost:7219/api/LogInDetails/";

  constructor(
    private router: Router,
    private http: HttpClient
  )
    {
      const currentUser = localStorage.getItem('currentUser');
      if (currentUser) {
        this.loggedIn.next(true);
      }
  }

  login(useCls: userDetailsCls) {
    return this.http.post<any>(this.url + "LoginTypeData", useCls)
      .pipe(
        map(response => {
          console.log('API Response:', response);  // Log the API response

          if (response && response.status === "Success") {
            console.log(response);
            // Store the token in localStorage
            localStorage.setItem('token',JSON.stringify(response.token)); // Note: response.Token should be response.token
            localStorage.setItem('currentUser', JSON.stringify(response));
            this.loggedIn.next(true);
            this.router.navigate(['/home']);
            return response;
          } else {
            throw new Error(response.dbMsg || 'Login failed');
          }
        })
      );
  }
  signup(user: userDetailsCls): Observable<any> {
    return this.http.post<any>("https://localhost:7219/api/signup/SignupDetails", user)
      .pipe(
        map(response => {
          if (response && response.status === "success") {
            return response;
          } else {
            throw new Error(response.dbMsg || 'Signup failed');
          }
        })
      );
  }


  logout() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
    sessionStorage.clear();
    this.loggedIn.next(false);
    this.router.navigate(['/login']);

  }
}

  // private userDataSource = new BehaviorSubject({ userName: '', password: '' });
  // currentUserData = this.userDataSource.asObservable();

  // private apiUrl = 'https://localhost:7219/api/LogInDetails/LoginTypeData'; // Update with your API URL

  // constructor(private http: HttpClient) {}

  // changeData(newUserData: { userName: string; password: string }) {
  //   this.userDataSource.next(newUserData);
  // }

  // login(data: { userName: string; password: string }): Observable<any> {
  //   const loginPayload = {
  //     mode: 'Insert', // or 'Update' based on your logic
  //     userName: data.userName,
  //     password: data.password
  //   };
  //   return this.http.post(this.apiUrl, loginPayload).pipe(
  //     map((response: any) => {
  //       this.changeData(data);
  //       return response;
  //     })
  //   );
  // }

