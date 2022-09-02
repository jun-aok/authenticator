import firebase from 'firebase/compat/app'
import 'firebase/compat/auth';
import { AuthedEntity } from './models/entities/AuthedEntity';

export class Authenticator {
  public static getAuth = (): firebase.auth.Auth => {
    return firebase.auth();
  }
  public static signInFacebook = (): void => {
    firebase
      .auth()
      .signInWithPopup(new firebase.auth.FacebookAuthProvider())
      .then((result) => {
        // 成功時は特に何もしなくもてAuthContextによって勝手にリダイレクトされる
        /** @type {firebase.auth.OAuthCredential} */
        // var credential = result.credential;

        // The signed-in user info.
        // var user = result.user;

        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        // var accessToken = credential.accessToken;

      })
      .catch((error) => {
        // 未検証
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
      });
  }

  public static getToken = (): string | null => localStorage.getItem('jwt');

  public static refreshToken = async () : Promise<string | null> =>  {
    const tokenResult = await Authenticator.getAuth().currentUser?.getIdTokenResult()
    if(tokenResult != null) {
      Authenticator.saveToken(tokenResult.token)
      return tokenResult.token;
    }
    return null;
  }
  public static signUp = (email: string, password: string): Promise<boolean | null> => {
    return Authenticator.getAuth().createUserWithEmailAndPassword(email, password)
      .then(async (userCredential: firebase.auth.UserCredential) => {
        if(!userCredential.user) {
          return false;
        }
        Authenticator.saveToken(await userCredential.user.getIdToken());
        return true;
      }).catch((error) => {
        return false;
      })
  }
  public static signIn = (email: string, password: string): Promise<boolean | null> => {
    return Authenticator.getAuth().signInWithEmailAndPassword(email, password)
    .then(async (userCredential: firebase.auth.UserCredential) => {
      if(!userCredential.user) {
        return false;
      }
      Authenticator.saveToken(await userCredential.user.getIdToken());
      return true;
    }).catch((error) => {
      return false;
    });
  }
    
  static signOut = (): Promise<void> => Authenticator.getAuth().signOut();

  static saveToken = (token: string): void => localStorage.setItem('jwt', token);
}

firebase.initializeApp({
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGE_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_SENDER_ID,
});
// export default firebase;
// export const auth = firebase.auth();

// 現在ログインしているユーザーを取得する
  //public static getCurrentUser = async () : Promise<firebase.User | null> => {
  //  return new Promise((resolve, reject) => {
  //    Auther.getAuth().onAuthStateChanged(async(user) => {
  //      if (user) {
  //        resolve(user);
  //      } else {
  //        reject();
  //      }
  //    });
  //  })
  //}