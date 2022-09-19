import { User } from './user.entity';
import { faker } from '@faker-js/faker';

export const makeFakeUserEntity = (): User => {
  return User.instantiate({
    id: faker.datatype.uuid(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    phoneNumber: {
      ddd: faker.phone.number('##'),
      ddi: faker.phone.number('##'),
      isVerified: faker.datatype.boolean(),
      number: faker.phone.number('#########'),
    },
    password: faker.internet.password(),
    createdAt: faker.date.past().toISOString(),
    updatedAt: faker.date.past().toISOString(),
  });
};

describe('User entity', () => {
  let user: User;

  describe('instantiate', () => {
    beforeEach(() => {
      user = makeFakeUserEntity();
    });

    it('should instantiate a user', () => {
      expect(user).toBeInstanceOf(User);
    });

    describe('should throw an error when', () => {
      it('id is not provided', () => {
        expect(() => {
          User.instantiate({
            ...user.toJSON(),
            id: undefined as any,
          });
        }).toThrowError('[{"field":"id","message":"id must be a string"}]');
      });
    });

    it('should throw an error when firstName is not provided', () => {
      expect(() => {
        User.instantiate({
          ...user.toJSON(),
          firstName: undefined as any,
        });
      }).toThrowError(
        '[{"field":"firstName","message":"firstName must be a string"}]',
      );
    });

    it('should throw an error when lastName is not provided', () => {
      expect(() => {
        User.instantiate({
          ...user.toJSON(),
          lastName: undefined as any,
        });
      }).toThrowError(
        '[{"field":"lastName","message":"lastName must be a string"}]',
      );
    });

    it('should throw an error when password is not provided', () => {
      expect(() => {
        User.instantiate({
          ...user.toJSON(),
          password: undefined as any,
        });
      }).toThrowError(
        '[{"field":"password","message":"password must be a string"}]',
      );
    });

    it('should throw an error when createdAt is not provided', () => {
      expect(() => {
        User.instantiate({
          ...user.toJSON(),
          createdAt: undefined as any,
        });
      }).toThrowError(
        '[{"field":"createdAt","message":"createdAt must be a valid ISO 8601 date string"}]',
      );
    });

    it('should throw an error when updatedAt is not provided', () => {
      expect(() => {
        User.instantiate({
          ...user.toJSON(),
          updatedAt: undefined as any,
        });
      }).toThrowError(
        '[{"field":"updatedAt","message":"updatedAt must be a valid ISO 8601 date string"}]',
      );
    });

    it('should throw an error when phoneNumber is not provided', () => {
      expect(() => {
        User.instantiate({
          ...user.toJSON(),
          phoneNumber: undefined as any,
        });
      }).toThrowError(
        '[{"field":"phoneNumber","message":"phoneNumber must be an object"}]',
      );
    });
  });

  describe('create', () => {
    const fakeDate = faker.date.past().toISOString();

    beforeAll(() => {
      jest.useFakeTimers();
      jest.setSystemTime(new Date(fakeDate));
    });

    beforeEach(() => {
      user = User.create({
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        phoneNumber: {
          ddd: faker.phone.number('##'),
          ddi: faker.phone.number('##'),
          number: faker.phone.number('#########'),
        },
        password: faker.internet.password(),
      });
    });

    afterAll(() => {
      jest.useRealTimers();
    });

    it('should create a user', () => {
      expect(user).toBeInstanceOf(User);
    });

    it('should create a user with createdAt and updatedAt', () => {
      expect(user.createdAt.toISOString()).toBe(fakeDate);
      expect(user.updatedAt.toISOString()).toBe(fakeDate);
    });

    it('should create a user with id', () => {
      expect(user.id).toBeDefined();
    });
  });
});
