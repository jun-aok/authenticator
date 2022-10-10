import { Gender } from "../enum";
import moment from "moment"

export class AuthedEntity {
  constructor(email: string, token: string, profileCompleted: boolean) {
    this._email = email;
    this._token = token;
    this._profileCompleted = profileCompleted;
    this._name = null;
    this._gender = null;
    this._birthDate = null;
  }
  private _email: string;
  get email(): string{
    return this._email;
  }
  private _token: string | null;
  get token(): string | null {
    return this._token;
  }

  private _profileCompleted: boolean;
  get profileCompleted(): boolean {
    return this._profileCompleted;
  }

  private _name: string | null;
  get name(): string | null {
    return this._name
  }
  set name(name: string | null) {
    this._name = name;
  }

  private _gender: Gender | null;
  get gender(): Gender | null {
    return this._gender;
  }
  set gender(gender: Gender | null) {
    this._gender = gender;
  }

  private _birthDate: moment.Moment | null;
  get birthDate(): moment.Moment | null {
    return this._birthDate;
  }
  set birthDate(birthDate: moment.Moment | null) {
    this._birthDate = moment(birthDate)
  }
}