import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  genders: string[] = ['male', 'female'];
  signUpForm!: FormGroup;
  forbiddenNames: string[] = ['Chris', 'Anna'];

constructor() {

}

  ngOnInit(): void {
    this.signUpForm = new FormGroup({
      'userData': new FormGroup({
        'username': new FormControl(null, [Validators.required,this.forbiddenNamesFn.bind(this)]),
        'email': new FormControl(null, [Validators.required, Validators.email], this.forbiddenEmailFn),
      }),
      'gender': new FormControl('male'),
      'hobbies': new FormArray([])
    });

    // this.signUpForm.get('userData.username').statusChanges.subscribe((status: FormControlStatus) => {
    //   console.log(status);
    // })
    // this.signUpForm.valueChanges.subscribe((value) => {
    //   console.log(value);
    // })
    
  }

  onSubmit(): void {
   console.log({...this.signUpForm});
   this.signUpForm.reset({
    'gender': 'male'
   });
   
  }

  onAddHobby(): void {
    const hobbyControl = new FormControl(null, Validators.required);
    (<FormArray>this.signUpForm.get('hobbies')).push(hobbyControl);
  }

  getHobbyControls() {
    return (<FormArray>this.signUpForm.get('hobbies')).controls;
  }

  forbiddenNamesFn(control: FormControl): {[s: string]: boolean} | null {
    if (this.forbiddenNames.indexOf(control.value) !== -1) {
      return {'nameIsForbidden': true};
    }
    return null;
  }

  forbiddenEmailFn(control: FormControl): Promise<any> | Observable<any>{
    const promise = new Promise<any>((resolve, reject) => {
      window.setTimeout(() => {
        if (control.value === 'test@test.com') {
          resolve({'emailIsForbidden': true})
        } else {
          resolve(null);
        }
      }, 1500)
    });
    /* 
    const promise = new Promise<any>((resolve, reject) => {
      window.setTimeout(() => {
        if (control.value === 'Test') {
          resolve({ 'nameIsForbidden': true });
        } else {
          resolve(null);
        }
      }, 1500);
    });
    */

    return promise;
  }
  onLogFormErrors() {
    console.log(this.signUpForm.get('userData.email').errors['emailIsForbidden']);
    
  }

}
