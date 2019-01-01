import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { StudentsService } from '../students.service';

@Component({
  selector: 'app-edit-form',
  templateUrl: './edit-form.component.html',
  styleUrls: ['./edit-form.component.css']
})
export class EditFormComponent implements OnInit {
  @Output() emitter = new EventEmitter();

  fname: string;
  lname: string;
  facNumber: number;
  birthDate: string;

  constructor(private studentsServ: StudentsService) {
  }

  ngOnInit () {

  }

  resetForm(): void {
    this.fname = '';
    this.lname = '';
    this.facNumber = null;
    this.birthDate = '';

    this.emitter.emit();
  }

  addStudent(): void {
    const newStd = {
      fname: this.fname,
      lname: this.lname,
      facNumber: this.facNumber,
      birthDate: this.birthDate
    };

    this.studentsServ.createNewStudent(newStd)
      .subscribe(result => {
        console.log('Create was successfull');
        this.resetForm();
      })
  }
}
