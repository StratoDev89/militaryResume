import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {

  setStorage(storageVariable: string, payload: any) {
    localStorage.setItem(storageVariable, JSON.stringify(payload));
  }

  getStorage(storageVariable: string) {
    return localStorage.getItem(storageVariable);
  }

  remove(storageVariable: string) {
    localStorage.removeItem(storageVariable)
  }
}
