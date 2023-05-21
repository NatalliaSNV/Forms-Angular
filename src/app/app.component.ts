import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { MyValidator } from './my.validator';

interface Capitals{
    ru: string,
    ua: string,
    by: string
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  form!: FormGroup;

  ngOnInit(): void {
      this.form = new FormGroup({
        email: new FormControl('', [Validators.email, Validators.required, MyValidator.restrictedEmails]),
        password: new FormControl('', [Validators.minLength(6), Validators.required]),
        address: new FormGroup({
            country: new FormControl('by'),
            city: new FormControl('', Validators.required)
        }),
        skills: new FormArray([])
      });

      this.form.get('email')?.valueChanges.subscribe((val) => {console.log('value:', val);
      })
  }

  submit() {
    if (this.form.valid) {
        console.log('form: ', this.form);
        console.log('form value:', this.form.value);

        this.form.reset();  
    }
  }

  setCapital() {
    const cityMap: Capitals = {
        ru: 'Russia',
        ua: 'Kiev',
        by: 'Minsk'
    };
    const cityKey:keyof Capitals = this.form.get('address')?.get('country')?.value;
    const city: string = cityMap[cityKey];
    console.log('cityKey:', cityKey);

    this.form.patchValue({
        address: { city: city}
    });
    
  }

  setSkill() {
    const control = new FormControl('', Validators.required);
    (this.form.get('skills') as FormArray).push(control);
  }

  
}
