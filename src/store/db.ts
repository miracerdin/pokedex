// import firebase from "firebase/app";
// import "firebase/firestore";

// // Get a Firestore instance
// export const db = firebase
//   .initializeApp({ projectId: "MY PROJECT ID" })
//   .firestore();

// // Export types that exists in Firestore
// // This is not always necessary, but it's used in other examples
// const { Timestamp, GeoPoint } = firebase.firestore;
// export { Timestamp, GeoPoint };

// // if using Firebase JS SDK < 5.8.0
// db.settings({ timestampsInSnapshots: true });

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
} from "firebase/auth";
import router from "@/router";

const firebaseConfig = {
  apiKey: "AIzaSyDEEwW6ZeIhfOn9sx00hI82H-eFw78Fi0c",
  authDomain: "vue-project-7c065.firebaseapp.com",
  projectId: "vue-project-7c065",
  storageBucket: "vue-project-7c065.appspot.com",
  messagingSenderId: "129196171049",
  appId: "1:129196171049:web:0a46cdb158101163e16138",
  //   apiKey: process.env.VUE_APP_ApiKey,
  //   authDomain: process.env.VUE_APP_AuthDomain,
  //   projectId: process.env.VUE_APP_ProjectId,
  //   storageBucket: process.env.VUE_APP_StorageBucket,
  //   messagingSenderId: process.env.VUE_APP_MessagingSenderId,
  //   appId: process.env.VUE_APP_AppId,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
console.log("env file deneme", app.options.apiKey);
export const auth = getAuth(app);
export const db = getDatabase(app);

export const createUser = async (
  email: string,
  password: string,
  displayName: string
) => {
  //? yeni bir kullanıcı oluşturmak için kullanılan firebase metodu
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    //? kullanıcı profilini güncellemek için kullanılan firebase metodu
    // console.log(userCredential);
    console.log(auth.currentUser);
    // await updateProfile(auth.currentUser, {
    //   displayName: displayName,
    //   photoURL: "https://picsum.photos/200/300",
    // });
  } catch (error) {
    console.log(error);
  }
};

export const signIn = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    router.push({ name: "home" });
  } catch (error) {
    alert("Something went wrong");
  }
};
export const logOut = () => {
  signOut(auth);
  router.push({ name: "LoginView" });
};

export const userObserver = (
  setCurrentUser: (user: object | boolean) => void
) => {
  //? Kullanıcının signin olup olmadığını takip eden ve kullanıcı değiştiğinde yeni kullanıcıyı response olarak dönen firebase metodu

  onAuthStateChanged(auth, (user) => {
    if (user) {
      setCurrentUser(user);
    } else {
      setCurrentUser(false);
    }
  });
};
