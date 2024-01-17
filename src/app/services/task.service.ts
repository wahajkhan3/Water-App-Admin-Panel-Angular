import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseUrl } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: HttpClient) { }
  getTaskList() {
    return this.http.get(`${baseUrl}admin/task?perPage=${10000000}`);
  }
  addTask(data: any) {
    return this.http.post(`${baseUrl}admin/task`, data);
  }
  getbyIdTask(id: number) {
    return this.http.get(`${baseUrl}admin/task/${id}`);
  }
  updateTask(id: number, data: any) {
    return this.http.put(`${baseUrl}admin/task/${id}`, data);
  }
  delTask(id: number) {
    return this.http.delete(`${baseUrl}admin/task/${id}`);
  }
  getSingleUserTask() {
    return this.http.get(`${baseUrl}admin/task/user/`)
  }
  updateTaskStatus(id: any, status: any) {
    return this.http.put(`${baseUrl}admin/task/status/${id}`, status);
  }
}
