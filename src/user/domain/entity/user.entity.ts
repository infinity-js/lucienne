import { uuidV4, validateEntity } from '@infinity-js/core';
import { CreateUserDTO, UserData } from './user.entity.data';
import { PhoneNumber } from './value-objects';

export class User {
  private _id: string;
  private _firstName: string;
  private _lastName: string;
  private _phoneNumber: PhoneNumber;
  private _password: string;
  private _createdAt: Date;
  private _updatedAt: Date;

  private constructor(params: UserData) {
    this._id = params.id;
    this._firstName = params.firstName;
    this._lastName = params.lastName;
    this._password = params.password;
    this._phoneNumber = PhoneNumber.instantiate(params.phoneNumber);
    this._createdAt = new Date(params.createdAt);
    this._updatedAt = new Date(params.updatedAt);
  }

  get id(): string {
    return this._id;
  }

  get firstName(): string {
    return this._firstName;
  }

  get lastName(): string {
    return this._lastName;
  }

  get phoneNumber(): PhoneNumber {
    return this._phoneNumber;
  }

  get password(): string {
    return this._password;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  get updatedAt(): Date {
    return this._updatedAt;
  }

  static create(params: CreateUserDTO): User {
    validateEntity(CreateUserDTO, params);

    return User.instantiate({
      id: uuidV4(),
      firstName: params.firstName,
      lastName: params.lastName,
      password: params.password,
      phoneNumber: {
        ddd: params.phoneNumber.ddd,
        ddi: params.phoneNumber.ddi,
        number: params.phoneNumber.number,
        isVerified: false,
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
  }

  static instantiate(params: UserData): User {
    validateEntity(UserData, params);
    return new User(params);
  }

  toJSON(): UserData {
    return {
      id: this.id,
      firstName: this.firstName,
      lastName: this.lastName,
      phoneNumber: this.phoneNumber.toJSON(),
      password: this.password,
      createdAt: this.createdAt.toISOString(),
      updatedAt: this.updatedAt.toISOString(),
    };
  }
}
