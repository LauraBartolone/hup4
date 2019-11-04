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
    static isNotDefined(value: any): boolean {
      return value === undefined || value === null;
    }

    static isNumber(value: any): boolean {
      return typeof value === 'number' && !isNaN(value);
    }
    static isDefined(value: any): boolean {
      return value !== undefined && value !== null;
    }

    static isNonEmptyObject(value: { [key: string]: any }): boolean {
      return Utils.isTrueObject(value) && Object.getOwnPropertyNames(value).length > 0;
    }
    static isTrueObject(value: any): boolean {
      return Utils.isDefined(value) && Utils.isObject(value);
    }
    static isEmptyObject(value: { [key: string]: any }): boolean {
      return (Utils.isTrueObject(value) && Object.getOwnPropertyNames(value).length === 0);
    }
        // typeof null returns 'object', see isTrueObject
    static isObject(value: any): boolean {
      return typeof value === 'object';
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
