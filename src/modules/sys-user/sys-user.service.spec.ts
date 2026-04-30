import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../database/prisma/prisma.service';
import { SysUserService } from './sys-user.service';

describe('SysUserService', () => {
  let service: SysUserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SysUserService,
        {
          provide: PrismaService,
          useValue: {
            sys_user: {
              findMany: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<SysUserService>(SysUserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
