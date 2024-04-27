export class UserCreation {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  isAcceptCGU : boolean = false;

  constructor(
    firstName: string,
    lastName: string,
    username: string,
    password: string,
    isAcceptCGU: boolean,
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.username = username;
    this.password = password;
    this.isAcceptCGU = isAcceptCGU;
  }
}