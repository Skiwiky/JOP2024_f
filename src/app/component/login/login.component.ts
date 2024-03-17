import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from 'src/app/services/login/login.service';
import { UserCreation } from 'src/app/model/UserCreation';
import { LoginRequest } from 'src/app/model/LoginRequest';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string;
  password: string;
  newUsername: string;
  newPassword: string;
  newFirtName: string;
  newLastName: string;
  newBirthDate: Date;

  loginForm: FormGroup;
  registerForm: FormGroup;
  isLoginFormVisible: boolean = true;

  constructor(private fb: FormBuilder,private loginService: LoginService) {
    this.username = '';
    this.password = '';
    this.newUsername = '';
    this.newPassword = '';
    this.newFirtName = '';
    this.newLastName = '';
    this.newBirthDate = new Date();

    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });

    this.registerForm = this.fb.group({
      newFirtName: ['', [Validators.required]],
      newLastName: ['', [Validators.required]],
      newUsername: ['', [Validators.required, Validators.email]],
      newPassword: ['', [Validators.required]],
      newBirthDate: ['', [Validators.required]]
    });
   }

  signin() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      const loginRequest= new LoginRequest(email, password);
      this.loginService.signin(loginRequest)
        .subscribe(response => {
          // Gérer la réponse de connexion
          this.loginService.setToken(response.token);
          // Exemple d'utilisation avec le token dans une autre requête
        // this.exampleAuthenticatedRequest();
        });
    }
 }

  signup() {
    if (this.registerForm.valid) {
      const newUser = {
        firstName: this.registerForm.get('newFirstName')?.value,
        lastName: this.registerForm.get('newLastName')?.value,
        username: this.registerForm.get('newUsername')?.value,
        password: this.registerForm.get('newPassword')?.value,
        birthDate: this.registerForm.get('newBirthDate')?.value
      };
      console.log(newUser);
      this.loginService.signup(newUser)
      .subscribe(response => {
        //redirection vers la page de la boutique
        
      });
    }
  }

  toggleForm() {
    this.isLoginFormVisible = !this.isLoginFormVisible;
  }
}
