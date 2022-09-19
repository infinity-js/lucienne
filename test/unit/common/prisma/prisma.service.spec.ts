import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from 'src/common/prisma/prisma.service';
describe('PrismaService', () => {
  let service: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrismaService],
    }).compile();

    service = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it("should call prisma's connect method on module init", async () => {
    const spy = jest.spyOn(service, '$connect');
    spy.mockImplementation(() => Promise.resolve());
    await service.onModuleInit();
    expect(spy).toHaveBeenCalled();
  });
});
