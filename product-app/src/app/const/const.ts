import { InjectionToken } from "@angular/core";

export const getLocationObject = () => location;
export const getWindowObject = () => window;
export enum CodeStatus {
  OK = 'OK',
  FAILED = 'FAILED'
}
export const LOCATION = new InjectionToken<Location>('LOCATION', {
  providedIn: 'root',
  factory: getLocationObject
});

export const WINDOWS_ROOT_OBJECT = new InjectionToken<Window>('WINDOWS_ROOT_OBJECT', {
  providedIn: 'root',
  factory: getWindowObject
});