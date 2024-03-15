export class UserCreation {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  birthDate: Date;
  
  constructor(
    firstName: string,
    lastName: string,
    username: string,
    password: string,
    birthDate: Date,
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.username = username;
    this.password = password;
    this.birthDate = birthDate;
  }
}