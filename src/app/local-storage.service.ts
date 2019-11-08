import { Inject, Injectable } from "@angular/core";
import { LOCAL_STORAGE, StorageService } from "ngx-webstorage-service"

const STORAGE_KEY = 'userDash';
const STORAGE = 'appended';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  pages: number;
  appendYet: boolean = false;
  
  constructor(@Inject(LOCAL_STORAGE) private storage: StorageService) { }
  
  public storeOnLocalStorage(images: object): void {
    this.pages = images['total_pages'];
    this.storage.set(STORAGE_KEY, images['results']);
  }
  
  public getFromStorage(): object[] {
    return this.storage.get(STORAGE_KEY);
  }
  
  public clearLocalStorate():void {
    this.storage.remove(STORAGE_KEY)
  }
  
  public appended(bool: boolean):void {
    this.storage.set(STORAGE, bool);
  }

  public returnAppended():boolean {
    return this.storage.get(STORAGE)
  }
  
  public returnPages():number {
    return this.pages;
  }
}
