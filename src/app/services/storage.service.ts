import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private storageVariables = [
    'header',
    'summary',
    'workExperience',
    'education',
    'certifications',
    'awards',
    'languages',
    'references',
    'additionalInformation',
  ];

  setStorage(storageVariable: string, payload: any) {
    localStorage.setItem(storageVariable, JSON.stringify(payload));
  }

  getStorage(storageVariable: string) {
    return localStorage.getItem(storageVariable);
  }

  remove(storageVariable: string) {
    localStorage.removeItem(storageVariable);
  }

  clearStorage() {
    this.storageVariables.forEach((item) => {
      this.remove(item);
      location.reload()
    });
  }
}
