import { Component, OnInit } from '@angular/core';
import { NaucnaCentralaService } from '../naucna-centrala.service';

import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm:FormGroup;

  constructor(public ncService : NaucnaCentralaService, private router: Router) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      username: new FormControl('',[Validators.required]),
      userPassword: new FormControl('',[Validators.required])
    })
  }

  //zameniti sve alerte dijalozima

  login(){
    let username = this.loginForm.value.username;
    let userPassword = this.loginForm.value.userPassword;
    if(username === "" || userPassword === "" ){
      if(username === ""){
        alert("Unesite Vas Username!");
      } 
      else if(userPassword === ""){
        alert("Unesite Vasu lozinku!");
      }
    }else{
      this.ncService.login(username).subscribe(data =>{
        if(data.userPassword === this.loginForm.value.userPassword){
            this.router.navigate(['/pretraga']);
        } 
        else {
            alert("Neispravan username ili lozinka");
        }
      })
    }
  }

  zdravo() {
    this.ncService.hello().subscribe(
      data => {
        alert(data);
      }
    )
  }

  

}
