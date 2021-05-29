import firebase from 'firebase'
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {
    constructor(private route: Router) {

    }
    token: string;

    signupUser(email: string, password: string) {
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .catch(
                error => console.log(error)
            )
    }


    signInUser(email: string, password: string) {
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(
                () => {
                    this.route.navigate(['../recipes'])
                    firebase.auth().currentUser.getIdToken()
                        .then(
                            (token: string) => this.token = token
                        )
                }
            ).catch(
                error => console.log(error)
            )
    }

    getToken() {
        firebase.auth().currentUser.getIdToken()
            .then(
                (token: string) => this.token = token
            )
        return this.token;
    }
    isAuthenticated() {
        return this.token != null;
    }

    logOut() {
        firebase.auth().signOut
        this.token = null;
    }
}