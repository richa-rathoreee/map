import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-all',
  templateUrl: './all.component.html',
  styleUrls: ['./all.component.css']
})
export class AllComponent implements OnInit {
  myForm!: FormGroup;
  constructor(private fb: FormBuilder) {
    console.log(fb);
    console.log(fb.group)
    // console.log(this.myForm)

  }

  ngOnInit() {
    this.myForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', [Validators.required, Validators.minLength(15)]],
    });
  }

  onSubmit(form: FormGroup) {
    console.log(form)
    console.log('Valid?', form.valid); // true or false
    console.log('Name', form.value.name);
    console.log('Email', form.value.email);
    console.log('Message', form.value.message);
    if (!form.valid) {
      console.log("Invalid details");
    }
    else if (!form.value.name || !form.value.email || !form.value.message) {

      console.log("plese fill all detail");

    }
    else {
      console.log("login succsses")
    }

  }

}


