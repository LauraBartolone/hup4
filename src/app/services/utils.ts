export interface Api {
  DEVELOPMENT: string;
  PRODUCTION: string;
  STAGE?: string;
  VER: string;
  LOGIN: string;
  LOGIN_REFRESH: string;
  LOGOUT: string;
  SIGNUP: string;
  SEND_ERRORS?: boolean;
}

export class Utils {
  static equals<T>(value: T, ...comparables: T[]): boolean {
    return !!(comparables.find(comparable => value === comparable));
  }

  static isBoolean(value: any): boolean {
    return typeof value === 'boolean';
  }

  static isDefined(value: any): boolean {
    return value !== undefined && value !== null;
  }

  static isNotDefined(value: any): boolean {
    return value === undefined || value === null;
  }

  static isFunction(value: any): boolean {
    return typeof value === 'function';
  }

  static isNumber(value: any): boolean {
    return typeof value === 'number' && !isNaN(value);
  }

  // typeof null returns 'object', see isTrueObject
  static isObject(value: any): boolean {
    return typeof value === 'object';
  }

  static isArray(value: any): boolean {
    return Array.isArray(value);
  }

  static firstEmptyIndexOf(value: any): number {
    let i = 0;
    while (i in value) {
      i++;
    }
    return i;
  }

  static isEmpty(value: any): boolean {
    if (Utils.isNotDefined(value)) {
      return true;
    }
    switch (typeof value) {
      case 'string': {
        value = value as string;
        return Utils.isEmptyString(value);
      }
      case 'boolean': {
        return !value;
      }
      case 'number':
        return false;
      default:
        // Object or Arrays
        if (Utils.isDefined(value.constructor) && Utils.isDefined(value.constructor.name)) {
          switch (value.constructor.name) {
            case 'Date':
              return false;
          }
        }
        return Object.keys(value).length === 0;
    }
  }

  // typeof null returns 'object'
  static isTrueObject(value: any): boolean {
    return Utils.isDefined(value) && Utils.isObject(value);
  }

  static isEmptyObject(value: { [key: string]: any }): boolean {
    return (Utils.isTrueObject(value) && Object.getOwnPropertyNames(value).length === 0);
  }

  static isNonEmptyObject(value: { [key: string]: any }): boolean {
    return Utils.isTrueObject(value) && Object.getOwnPropertyNames(value).length > 0;
  }

  static validateStruct(base: { [key: string]: any }, object: { [key: string]: any }): boolean {
    if (Utils.isNotDefined(object) || !Utils.isObject(object)) {
      return false;
    }
    const keys: string[] = Object.keys(base);
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < keys.length; ++i) {
      if (Utils.isNotDefined(object[keys[i]])) {
        return false;
      }
      if (typeof object[keys[i]] === 'object') {
        if (!Utils.validateStruct(base[keys[i]], object[keys[i]])) {
          return false;
        }
      }
    }
    return true;
  }

  static isString(value: any): boolean {
    return typeof value === 'string';
  }

  static isEmptyString(value: string | null | undefined): boolean {
    return typeof value !== 'string' || value.length === 0;
  }

  static splitFormInputName(inputName: string): string[] {
    return inputName.split('[').map((key) => {
      if (key.charAt(key.length - 1) === ']') {
        return key.slice(0, -1);
      }
      return key;
    });
  }

  static getChildPropertyName(parent: { [key: string]: any }, child: any): string | undefined {
    if (Utils.isTrueObject(parent)) {
      const keys: string[] = Object.keys(parent);
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < keys.length; ++i) {
        if (parent[keys[i]] === child) {
          return keys[i];
        }
      }
    }
    return undefined;
  }

  static isEmail(value: string | null | undefined): boolean {
    /* tslint:disable:max-line-length */
    const re: any = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
    /* tslint:enable:max-line-length */
    return re.test(value);
  }

  static maskToString(mask: string | RegExp | (string | RegExp)[]): string | string[] | undefined {
    if (Utils.isString(mask)) {
      return mask as string;
    } else if (mask instanceof RegExp) {
      return mask.toString();
    } else if (Array.isArray(mask)) {
      return mask.map(value => Utils.maskToString(value)) as string[];
    }
    return undefined;
  }

  static maskFromString(mask: string | string[]): string | RegExp | (string | RegExp)[] | undefined {
    if (typeof mask === 'string') {
      const isRegExp: boolean = (mask as string).startsWith('/') && (mask as string).endsWith('/');
      return isRegExp ? new RegExp((mask as string).slice(1, mask.length - 1)) : mask;
    } else if (Array.isArray(mask)) {
      return (mask as string[]).map(value => Utils.maskFromString(value)) as string[];
    }
    return undefined;
  }

  static merge(baseValue: any, defaultValue: any): any {
    if (Utils.isNotDefined(baseValue)) {
      return defaultValue;
    }
    if (Utils.isTrueObject(baseValue)) {
      Object.keys(baseValue).
        map(property => {
          if (baseValue.hasOwnProperty(property) && Utils.isObject(baseValue[property])) {
            baseValue[property] = Utils.merge(baseValue[property], defaultValue ? defaultValue[property] : undefined);
          }
        });
      return defaultValue
        ? Object.assign(defaultValue, baseValue)
        : baseValue;
    }
    return baseValue;
  }

  static parseJSONReviver(value: any): any {
    const regexDateISO: any = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*))(?:Z|(\+|-)([\d|:]*))?$/;
    return Utils.isString(value) && regexDateISO.test(value) ? new Date(value) : value;
  }

  static capitalize(str: string): string {
    return str.replace(/\b(\w)/g, s => s.toUpperCase());
  }

  static rand(min: number = 0, max: number = 1): number {
    return min + (Math.random() * (max - min));
  }

  static randInt(min: number = 0, max: number = 1): number {
    return min + Math.floor(Math.random() * (max - min + 1));
  }

  static randString(n: number = 5): string {
    const elements = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let tmp = '';
    for (let i = 0; i < n; ++i) {
      tmp += elements.charAt(Math.floor(Math.random() * elements.length));
    }
    return tmp;
  }

  // https://stackoverflow.com/questions/25582882/javascript-math-random-normal-distribution-gaussian-bell-curve
  static randGaussian(width: number = 6): number {
    let rand = 0;
    for (let i = 0; i < width; ++i) {
      rand += Math.random();
    }
    return rand / width;
  }

  static randomGaussian(min: number = -1, max: number = 1): number {
    return min + (Utils.randGaussian() * (max - min));
  }

  static serialize(obj: any, prefix?: any): string {
    const str: string[] = [];
    let p: string;
    for (p in obj) {
      if (obj.hasOwnProperty(p)) {
        const k: string = prefix ? prefix + '[' + p + ']' : p, v: string = obj[p];
        const value: string = (v !== null && typeof v === 'object')
          ? Utils.serialize(v, k)
          : encodeURIComponent(k) + '=' + encodeURIComponent(v);
        if (value) {
          str.push(value);
        }
      }
    }
    return str.join('&');
  }

  // static getRandomValues(): ArrayBuffer | SharedArrayBuffer {
  //   const array: Int32Array = new Int32Array(16);
  //   window.crypto.getRandomValues(array);
  //   return array.buffer;
  // }

  static throwError(err: any): Error {
    throw new Error(err);
  }

  // TODO: renderla SHA
  static hash(value: string): number {
    let hash = 0;
    let chr: number;
    if (value.length === 0) {
      return hash;
    }
    for (let i = 0; i < value.length; i++) {
      chr = value.charCodeAt(i);
      // tslint:disable:no-bitwise
      hash = ((hash << 5) - hash) + chr;
      hash |= 0; // Convert to 32bit integer
      // tslint:enable:no-bitwise
    }
    return hash;
  }

  /**
   * @description Creates UUID for user based on several different browser variables
   * It will never be RFC4122 compliant but it is robust
   *
   */
  static uuid(): string {
    const nav: Navigator = window.navigator;
    const screen: Screen = window.screen;

    let uuid = 'B';
    uuid += nav.mimeTypes.length // 2
      + nav.plugins.length // 2
      + screen.height // 4
      + screen.width // 4
      + screen.pixelDepth // 4
      + nav.userAgent.replace(/\D+/g, ''); // 20
    return uuid;
  }

  static base64StringToString(b64str: string): string {
    return atob(b64str);
  }

  static stringToBase64(str: string): string {
    return btoa(str);
  }

  // static stringToArrayBuffer(str: string): ArrayBuffer | SharedArrayBuffer {
  //   const bufView: Uint8Array = new Uint8Array(str.length);
  //   for (let i: number = 0; i < str.length; ++i) {
  //     bufView[i] = str.charCodeAt(i);
  //   }
  //   return bufView.buffer;
  // }

  // static arrayBufferToString(arrayBuffer: ArrayBuffer | SharedArrayBuffer): string {
  //   const byteArray: Uint8Array = new Uint8Array(arrayBuffer);
  //   let byteString: string = '';
  //   for (let i: number = 0; i < byteArray.byteLength; ++i) {
  //     byteString += String.fromCharCode(byteArray[i]);
  //   }
  //   return byteString;
  // }

  // static arrayBufferToBase64String(arrayBuffer: ArrayBuffer): string {
  //   return Utils.stringToBase64(Utils.arrayBufferToString(arrayBuffer));
  // }

  // static base64StringToArrayBuffer(b64str: string): ArrayBuffer | SharedArrayBuffer {
  //   return Utils.stringToArrayBuffer(Utils.base64StringToString(b64str));
  // }

  static round(val: number, digit: number): string {
    return parseFloat(Math.round(val * Math.pow(10, digit)) / Math.pow(10, digit) + '').toFixed(digit);
  }

  static urlToQueryString(url: string): string {
    const query: string = url.split('?')[1];
    return Utils.isDefined(query)
      ? query
      : '';
  }

  static queryStringToObject(query: string): { [key: string]: string } {
    const obj: { [key: string]: string } = {};
    const array: string[] = query.split('&');
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < array.length; ++i) {
      let el: string[] = Array(2);
      el = array[i].split('=');
      if (el.length === 2) {
        obj[el[0]] = el[1];
      }
    }
    return obj;
  }

  static getQueryFromUrl(url: string): { [key: string]: string } {
    return Utils.queryStringToObject(Utils.urlToQueryString(url));
  }

  static getParamsFromUrl(url: string): { [key: string]: string } {
    const hashes: string[] = url.slice(url.indexOf('?') + 1).split('&');
    const params: any = {};
    hashes.map(hash => {
      const [key, val] = hash.split('=');
      params[key] = decodeURIComponent(val);
    });

    return params;
  }

  static totalOffsetElement(element: HTMLElement): { top: number, left: number } {
    let top = 0;
    let left = 0;
    do {
      top += element.offsetTop || 0;
      left += element.offsetLeft || 0;
      element = element.offsetParent as HTMLElement;
    } while (Utils.isDefined(element));

    return {
      top,
      left
    };
  }

  static truncateText(str: string, length: number = 100, ending: string = '...'): string {
    if (Utils.isNotDefined(length)) {
      length = 100;
    }
    if (Utils.isNotDefined(ending)) {
      ending = '...';
    }
    return (str.length > length)
      ? str.substring(0, length - ending.length) + ending
      : str;
  }

  static makeSprintF(val: string, args: string[]): string {
    let i = 0;
    return Utils.isNotDefined(val)
      ? ''
      : (val.replace(/%s/g, () => args[i++]));
  }

  static clone(src: any): any {
    function mixin(dest: any, source: any): any {
      let name: any;
      let s: any;
      const empty: any = {};
      // tslint:disable-next-line:forin
      for (name in source) {
        s = source[name];
        // Facepalm. Usare empty invece di hasOwnProperty... MAH
        if (!(name in dest) || (dest[name] !== s && (!(name in empty) || empty[name] !== s))) {
          dest[name] = Utils.clone(s);
        }
      }
      return dest;
    }

    if (!src || typeof src !== 'object' || Object.prototype.toString.call(src) === '[object Function]') {
      // null, undefined, any non-object, or function
      return src; // anything
    }
    if (src.nodeType && 'cloneNode' in src) {
      // DOM Node
      return src.cloneNode(true);
    }
    if (src instanceof Date) {
      // Date
      return new Date(src.getTime());
    }
    if (src instanceof RegExp) {
      // RegExp
      return new RegExp(src);
    }
    let r: any;
    if (src instanceof Array) {
      // Array
      r = [];
      const length: number = src.length;
      for (let i = 0; i < length; ++i) {
        if (i in src) {
          r.push(Utils.clone(src[i]));
        }
      }
      // we don't clone functions for performance reasons
      // } else if (d.isFunction(src)) {
      // // function
      // r = function() { return src.apply(this, arguments); };
    } else {
      // generic objects
      r = src.constructor ? new src.constructor() : {};
    }
    return mixin(r, src);
  }

  static getCardType(cardNumber: string): string | undefined {
    let re: RegExp = new RegExp(/^4/);
    if (re.test(cardNumber)) {
      return 'visa';
    }

    // Mastercard
    re = new RegExp(/^5[1-5]/);
    if (re.test(cardNumber)) {
      return 'mastercard';
    }

    // // AMEX
    // re = new RegExp('^3[47]');
    // if (re.test(cardNumber))
    //   return 'amex';

    // // Discover
    // re = new RegExp('^(6011|622(12[6-9]|1[3-9][0-9]|[2-8][0-9]{2}|9[0-1][0-9]|92[0-5]|64[4-9])|65)');
    // if (re.test(cardNumber))
    //   return 'discover';

    // // Diners
    // re = new RegExp('^36');
    // if (re.test(cardNumber))
    //   return 'diners';

    // // Diners - Carte Blanche
    // re = new RegExp('^30[0-5]');
    // if (re.test(cardNumber))
    //   return 'dinerscarteblanche';

    // // JCB
    // re = new RegExp('^35(2[89]|[3-8][0-9])');
    // if (re.test(cardNumber))
    //   return 'jcb';

    // Visa Electron
    re = new RegExp(/^(4026|417500|4508|4844|491(3|7))/);
    if (re.test(cardNumber)) {
      return 'visa';
    }

    return undefined;
  }

  static compareVersion(a: string, b: string): -1 | 0 | 1 {
    if (a === b) {
      return 0;
    }

    const acomponents: string[] = a.split('.');
    const bcomponents: string[] = b.split('.');

    const len: number = Math.min(acomponents.length, bcomponents.length);

    // loop while the components are equal
    for (let i = 0; i < len; i++) {
      // A bigger than B
      if (parseInt(acomponents[i], 10) > parseInt(bcomponents[i], 10)) {
        return 1;
      }

      // B bigger than A
      if (parseInt(acomponents[i], 10) < parseInt(bcomponents[i], 10)) {
        return -1;
      }
    }

    // If one's a prefix of the other, the longer one is greater.
    if (acomponents.length > bcomponents.length) {
      return 1;
    }

    if (acomponents.length < bcomponents.length) {
      return -1;
    }

    // Otherwise they are the same.
    return 0;
  }

  static chunk(array: any[], chunkSize: number): any[] {
    const R: any[] = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      R.push(array.slice(i, i + chunkSize));
    }
    return R;
  }
}

export interface Environment {
  TARGET: 'development' | 'production' | 'stage';
  API?: Api;
  FACEBOOK?: {
    APP_ID: string;
    APP_NAME: string;
  };
  GOOGLE?: {
    APP_ID: string;
  };
}

// export function getApiUrl(ENV: Environment): string {
//   if (Utils.isNotDefined(ENV.API)) {
//     return '';
//   }

//   switch (ENV.TARGET) {
//     case 'development':
//       return ENV.API.DEVELOPMENT;
//     case 'production':
//       return ENV.API.PRODUCTION;
//     case 'stage':
//       return Utils.isDefined(ENV.API.STAGE) ? ENV.API.STAGE : '';
//     default:
//       return '';
//   }
// }
