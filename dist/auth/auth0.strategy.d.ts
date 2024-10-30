import { Strategy } from "passport-jwt";
declare const Auth0Strategy_base: new (...args: any[]) => Strategy;
export declare class Auth0Strategy extends Auth0Strategy_base {
    constructor();
    validate(payload: any): any;
}
export {};
