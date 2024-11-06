import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  backendPath: string;

  constructor(private http: HttpClient) {
    this.backendPath = `http://aa06dcde0f3b84b9d88285a7beabbc1b-760422395.us-east-1.elb.amazonaws.com:3000`
  }

  async get(path: string) {
    return await fetch(`${this.backendPath}/${path}`);
  }


  async post(path: string, body: any) {
    return await fetch(`${this.backendPath}/${path}`, {
      method: 'POST',
      body: JSON.stringify(body),
    });
  }

  async put(path: string, body: any) {
    return await fetch(`${this.backendPath}/${path}`, {
      method: 'PUT',
      body: JSON.stringify(body),
    });
  }

  async delete(path: string) {
    return await fetch(`${this.backendPath}/${path}`, {
      method: 'DELETE',
    });
  }
}
