import { Test, TestingModule } from "@nestjs/testing";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { PrismaService } from "src/prisma/prisma.service";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { Logger } from "nestjs-pino";
import { NotificationsService } from "../notifications/notifications.service";
import { EmailService } from "../email/email.service";

describe("AuthController", () => {
  let controller: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        AuthService,
        { provide: PrismaService, useValue: {} },
        { provide: JwtService, useValue: {} },
        { provide: ConfigService, useValue: { get: jest.fn() } },
        {
          provide: Logger,
          useValue: { log: jest.fn(), error: jest.fn(), warn: jest.fn() },
        },
        { provide: NotificationsService, useValue: { send: jest.fn() } },
        {
          provide: EmailService,
          useValue: {
            sendWelcomeEmail: jest.fn(),
            sendEmailVerificationEmail: jest.fn(),
            sendPasswordResetEmail: jest.fn(),
            sendPasswordNotSetEmail: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
