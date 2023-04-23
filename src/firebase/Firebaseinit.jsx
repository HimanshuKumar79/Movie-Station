import { initializeApp } from "firebase/app";
import {createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut} from "firebase/auth";
import { createContext, useContext, useState } from "react";
import {addDoc, collection, deleteDoc, doc, getDocs, getFirestore} from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyBoIZ-awQjUqNzQnOs11xyviXMzf-ROPWg",
  authDomain: "ott-platform-579ab.firebaseapp.com",
  projectId: "ott-platform-579ab",
  storageBucket: "ott-platform-579ab.appspot.com",
  messagingSenderId: "851143550429",
  appId: "1:851143550429:web:8111d71e93152faaf3c234",
  measurementId: "G-YFDW1ZSBE7"
};
const app = initializeApp(firebaseConfig);

export const firebaseAuth=getAuth(app)
const FirebaseContext=createContext()
export const useFirebase=()=>useContext(FirebaseContext)
const db = getFirestore(app)

export const FirebaseProvider=(props)=>{
  const[docid,setDocid]=useState([])
  const signUpwithEmailandPassword= async(email,password,name)=>{
  return (
    await createUserWithEmailAndPassword(firebaseAuth,email,password).then((credentials)=>{
      localStorage.setItem('email', email)
      localStorage.setItem('password', password)
      localStorage.setItem('userName', name)
      localStorage.setItem('uid', credentials.user.uid)
      }))
 }
 const LoginwithEmailAndPassword =async(email,password)=>{
  return  (
    await signInWithEmailAndPassword(firebaseAuth,email,password).then((credentials)=>{
    localStorage.setItem('email', email)
    localStorage.setItem('password', password)
    localStorage.setItem('uid', credentials.user.uid)
    }))
 }

 const Signout=async()=>{
  return await signOut(firebaseAuth)
 }
 const getFavouriteData=async()=>{
  const path=`favourite/${localStorage.getItem("uid")}/liked`
  return await getDocs(collection(db,path)).then((snap)=>{
    return snap;
  })
 }

 const setFavouriteData=async(res)=>{
  const path=`favourite/${localStorage.getItem("uid")}/liked`
  return await addDoc(collection(db,path),res)
 }

 const deleteFavouriteData=(id)=>{
  const path=`favourite/${localStorage.getItem("uid")}/liked/${id}`
    return (
      deleteDoc(doc(db, path))
      )
 }

 return (
  <FirebaseContext.Provider value={{docid,setDocid,signUpwithEmailandPassword,LoginwithEmailAndPassword,Signout,getFavouriteData,setFavouriteData,deleteFavouriteData}}>{props.children}</FirebaseContext.Provider>
);
}
