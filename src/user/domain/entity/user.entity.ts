import { validateEntity } from '@infinity-js/core';
import { CreateUserDTO, UserData } from './user.entity.data';
import { PhoneNumber } from './value-objects';
import { v4 as uuidV4 } from 'uuid';

export class User {
  private _id: string;
  private _name: string;
  private _phoneNumber: PhoneNumber;
  private _password: string;
  private _createdAt: Date;
  private _updatedAt: Date;

  private constructor(params: UserData) {
    this._id = params.id;
    this._name = params.name;
    this._phoneNumber = params.phoneNumber;
    this._password = params.password;
    this._createdAt = new Date(params.createdAt);
    this._updatedAt = new Date(params.updatedAt);
  }

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name;
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
      name: params.name,
      password: params.password,
      phoneNumber: PhoneNumber.instantiate({
        ddd: params.phoneNumber.ddd,
        ddi: params.phoneNumber.ddi,
        number: params.phoneNumber.number,
        isVerified: false,
      }),
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
      name: this.name,
      phoneNumber: this.phoneNumber,
      password: this.password,
      createdAt: this.createdAt.toISOString(),
      updatedAt: this.updatedAt.toISOString(),
    };
  }
}
