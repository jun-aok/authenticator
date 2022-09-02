// import { Auther } from '../auther';
// 
// export class User {
//   constructor(email: string, userName: string | null, token: string | null, refreshToken: string | null) {
//     this._email = email;
//     this._userName = userName;
//     this._token = token;
//     this._refreshToken = refreshToken;
//   }
// 
//   private _email: string;
//   get email(): string {
//     return this._email;
//   }
//   private _userName: string | null;
//   get userName(): string | null {
//     return this._userName;
//   }
//   private _token: string | null;
//   get token(): string | null {
//     return this._token;
//   }
//   private _refreshToken: string | null;
//   get refreshToken(): string | null {
//     return this._refreshToken;
//   }
// 
// 
// 
//   //public saveToken(): void {
//   //  if(this.token != null) {
//   //    localStorage.setItem('jwt', this.token);
//   //  }
//   //}
// 
//   //public static getSavedToken = (): String | null => {
//   //  return localStorage.getItem('jwt');
//   //}
// 
//   //static async createByServer(): Promise<User | null> {
//   //}
//   // public static createByLogin = async (email: string, password: string): Promise<User | null> => {　
//   //   return Auther.getAuth().signInWithEmailAndPassword(email, password)
//   //     .then(async (userCredential: firebase.default.auth.UserCredential) => {
//   //       console.log(userCredential);
//   //       return new User(email, userCredential.user?.displayName ?? null, await userCredential.user?.getIdToken() ?? null, userCredential.user?.refreshToken ?? null);
//   //     }).catch((error) => {
//   //       return null;
//   //     });
//   // }
//   // static async createByFirebase() : Promise<User | null> {
//   //   var user: User | null = null;
//   //   const unsubscribed = auth.onAuthStateChanged(async (fUser) => {
//   //     user = fUser == null || fUser.email == null ? null : new User(fUser.email, fUser.displayName, await fUser.getIdToken(), fUser.refreshToken);
//   //   });
//   //   await unsubscribed();
//   //   return user;
//   // }
// 
//   // static async createByLocalStorage() {
// // 
//   // }
// 
//   //static createBySignup(email: string, pass: string): User {　
// 
//   //}
// }