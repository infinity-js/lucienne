import { validateEntity } from '@infinity-js/core';
import { UserPhoneNumberData } from './phone-number.value-object.data';

export class UserPhoneNumber {
  private _ddd: string;
  private _ddi: string;
  private _number: string;
  private _isVerified: boolean;

  private constructor(params: UserPhoneNumberData) {
    this._ddd = params.ddd;
    this._ddi = params.ddi;
    this._number = params.number;
    this._isVerified = params.isVerified;
  }

  get ddd(): string {
    return this._ddd;
  }

  get ddi(): string {
    return this._ddi;
  }

  get number(): string {
    return this._number;
  }

  get isVerified(): boolean {
    return this._isVerified;
  }

  static instantiate(params: UserPhoneNumberData): UserPhoneNumber {
    UserPhoneNumber.Validate(params);
    return new UserPhoneNumber(params);
  }

  static Validate(params: UserPhoneNumberData): void {
    validateEntity(UserPhoneNumberData, params);
  }

  toJSON(): UserPhoneNumberData {
    return {
      ddd: this.ddd,
      ddi: this.ddi,
      number: this.number,
      isVerified: this.isVerified,
    };
  }
}
