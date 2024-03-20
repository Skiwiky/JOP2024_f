import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { LoginService } from 'src/app/services/login/login.service';
import { UserCreation } from 'src/app/model/UserCreation';
import { LoginRequest } from 'src/app/model/LoginRequest';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/services/storage/storage.service';
import { User } from 'src/app/model/User';

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
  newFirstName: string;
  newLastName: string;
  newBirthDate: Date;

  private user: User = new User;
  
  loginForm: FormGroup;
  registerForm: FormGroup;
  isLoginFormVisible: boolean = true;

  showAlert: boolean = false;
  alertMessage: string = '';
  alertType: string = 'success';

  constructor(private fb: FormBuilder,
    private loginService: LoginService, 
    private router:Router,
    private storageService: StorageService) {

    this.username = '';
    this.password = '';
    this.newUsername = '';
    this.newPassword = '';
    this.newFirstName = '';
    this.newLastName = '';
    this.newBirthDate = new Date();

    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });

    this.registerForm = this.fb.group({
      newFirstName: ['', [Validators.required]],
      newLastName: ['', [Validators.required]],
      newUsername: ['', [Validators.required, Validators.email]],
      newPassword: ['', [Validators.required]],
      newBirthDate: ['', [Validators.required, this.ageValidator(18)]]
    });
   }

  signin() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      const loginRequest= new LoginRequest(email, password);
      this.loginService.signin(loginRequest)
        .subscribe({
          next: (response) => {
            console.log('Connexion réussie', response);
            /*this.storageService.setItem('authToken', response.token);
            this.storageService.setItem('user', JSON.stringify(response.user));
            this.storageService.setItem('idUser', response.user.id);*/
            this.router.navigate(['/profil']); 
          },
          error: (error) => {
            console.error('Erreur lors de la connexion', error);
            
          }
          
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
      this.loginService.signup(newUser)
      .subscribe({
        next: (response) => {
          // Si la création du compte est réussie
          this.alertMessage = 'Compte créé avec succès. Vous pouvez vous connecter maintenant.';
          this.alertType = 'success';
          this.showAlert = true;
          this.isLoginFormVisible = true; 
          console.log(this.loginService.isLoggedIn())
        },
        error: (error) => {
          // En cas d'erreur
          this.alertMessage = 'Erreur lors de la création du compte. Veuillez réessayer.';
          this.alertType = 'danger';
          this.showAlert = true;
          this.isLoginFormVisible = false;
        }
      });
    }
  }

  ageValidator(minAge: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) {
        return null; // ne valide pas si vide
      }
      const today = new Date();
      const birthDate = new Date(control.value);
      let age = today.getFullYear() - birthDate.getFullYear();
      const m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      return age >= minAge ? null : { 'minAge': { value: control.value } };
    };
  }

  toggleForm() {
    this.isLoginFormVisible = !this.isLoginFormVisible;
  }
}
