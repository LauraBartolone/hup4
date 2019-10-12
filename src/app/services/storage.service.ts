import { Injectable } from '@angular/core';
import { Utils } from './utils';

export interface StorageInterface {
  setItem(reference: string, value: any): Promise<any>;
  getItem(reference: string): Promise<any>;
  remove(reference: string): Promise<any>;
  clear(): Promise<any>;
  keys(): Promise<any>;
}

export enum StorageType {
  local,
  native
}

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  protected nativeStorage: StorageInterface;
  protected localStorage: Storage;
  protected selected: StorageType;

  constructor() {
    if (typeof Storage !== 'undefined' && window && window.localStorage !== undefined ) {
      this.localStorage = window.localStorage;
    }
  }

  public init(type: StorageType): void {
    this.selected = type;
  }

  public setNative(nativeStorage: StorageInterface): void {
    this.nativeStorage = nativeStorage;
  }

  public isNativeStorageSupported(): boolean {
    return Utils.isDefined(this.nativeStorage);
  }

  public isLocalStorageSupported(): boolean {
    return Utils.isDefined(this.localStorage);
  }

  public get(key: string): Promise<any> {
    if (Utils.isDefined(this.nativeStorage)) {
      return this.nativeStorage.getItem(key);
    }
    return new Promise((resolve, reject) => {
      if (Utils.isDefined(this.localStorage)) {
        const value: string = this.localStorage.getItem(key);
        if (Utils.isDefined(value)) {
          resolve(value);
          return;
        }
      }
      reject();
    });
  }

  public set(key: string, value: any): void {
    if (this.nativeStorage) {
      this.nativeStorage.setItem(key, value).
        then(() => {}).
        catch(error => {
          console.error('[HUP][NativeStorage] Can\'t storing item with key: "' + key + '", value:');
          console.log(value);
          console.error(error);
        });
    } else {
      if (this.localStorage) {
        this.localStorage.setItem(key, JSON.stringify(value));
      }
    }
  }

  public remove(key: string): void {
    if (this.nativeStorage) {
      this.nativeStorage.remove(key).
        then((data: string) => {
          if (data !== 'OK') {
            console.log(data);
          }
        }).
        catch(error => console.error('[HUP][NativeStorage] Can\'t removing item', error));
    } else {
      if (this.localStorage) {
        this.localStorage.removeItem(key);
      }
    }
  }

  public clear(): void {
    if (this.nativeStorage) {
      this.nativeStorage.clear();
    } else {
      if (this.localStorage) {
        this.localStorage.clear();
      }
    }
  }
}
