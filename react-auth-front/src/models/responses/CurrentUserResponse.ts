export class CurrentUserResponse {
  constructor(email: string, name: string, completed: boolean) {
    this._email = email;
    this._name = name;
    this._completed = completed;
  }
  private _email: string;
  get email(): string {
    return this._email;
  }
  private _name: string;
  get name(): string {
    return this._name;
  }
  private _completed: boolean;
  get completed(): boolean {
    return this._completed;
  }
}