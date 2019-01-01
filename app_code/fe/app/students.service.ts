import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Student from './types/students';
import { Observable } from 'rxjs';

const root = 'http://localhost:7000';


@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  constructor(private http: HttpClient ) { }

  getAllStudents(): Observable <Student[]> {
    return this.http.get <Student[]> (root + '/api/students');
  }

  createNewStudent(body): Observable <Student> {
    return this.http.post <Student> (root + '/api/students', body);
  }

  deleteStudent(id): Observable <Student> {
    return this.http.delete <Student> (root + '/api/students/' + id);
  }
}
