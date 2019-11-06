import { Inject, Injectable } from "@angular/core";
import { LOCAL_STORAGE, StorageService } from "ngx-webstorage-service"

const STORAGE_KEY = 'userDash';;

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor(@Inject(LOCAL_STORAGE) private storage: StorageService) { }

  public storeOnLocalStorage(images: object[]): void {
    this.storage.set(STORAGE_KEY, images);
  }

  public clearLocalStorate():void {
    this.storage.remove(STORAGE_KEY)
  }

  public getFromStorage(): object[] {
    return this.storage.get(STORAGE_KEY);
  }
}
