export class AuthedEntity {
  constructor(email: string, token: string, profile_completed: boolean) {
    this._email = email;
    this._token = token;
    this._profile_completed = profile_completed;
  }
  private _email: string;
  get email(): string{
    return this._email;
  }
  private _token: string | null;
  get token(): string | null {
    return this._token;
  }

  private _profile_completed: boolean;
  get profile_completed(): boolean {
    return this._profile_completed;
  }
}