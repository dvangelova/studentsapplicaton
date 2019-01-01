import { Component, OnInit } from '@angular/core';
import { StudentsService } from './students.service';

import Student from './types/students';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'studentsUI';

  allStudents: Student[];

  constructor (private studentsServ: StudentsService) {
    this.allStudents = [];
  }

  ngOnInit(){
    this.getAllStudents();
  }

  getAllStudents(): void {
    this.studentsServ.getAllStudents()
      .subscribe(response => {
        this.allStudents = response;
      });
  }

  deleteStudent(id): void {
    this.studentsServ.deleteStudent(id)
    .subscribe(response => {
      console.log('Delete was a success');
      this.getAllStudents();
    });
  }
}
