export class HashingServiceMock {
  async hash(stringToHash: string): Promise<string> {
    return `hashed-${stringToHash}`;
  }
}
