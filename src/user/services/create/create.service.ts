import { Injectable } from '@nestjs/common';

@Injectable()
export class CreateUserService {
  execute() {
    return 'This service adds a new user';
  }
}
