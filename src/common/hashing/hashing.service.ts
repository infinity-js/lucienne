import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
@Injectable()
export class HashingService {
  private DEFAULT_SALT = 13;

  async hash(stringToSalt: string): Promise<string> {
    return bcrypt.hash(stringToSalt, this.DEFAULT_SALT);
  }
}
