import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  ParseUUIDPipe,
} from "@nestjs/common";
import { ApiTags, ApiOperation, ApiBearerAuth } from "@nestjs/swagger";
import { PaymentService } from "./payment.service";
import { GetUser } from "src/common/decorators/get-user.decorator";
import { Roles } from "src/common/decorators/roles.decorator";
import { UserRole } from "generated/prisma/client";
import { CreatePaymentDto } from "./dtos/create-payment.dto";
import { PaymentQueryDto } from "./dtos/payment-query.dto";

@ApiTags("Payments (Customer)")
@ApiBearerAuth()
@Controller("payments")
@Roles(UserRole.CUSTOMER)
export class CustomerPaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post("/")
  @ApiOperation({
    summary: "Create a payment via gateway (JazzCash / Easypaisa / Card)",
  })
  async createPayment(
    @GetUser("sub") userId: string,
    @Body() dto: CreatePaymentDto,
  ) {
    return this.paymentService.createPayment(userId, dto);
  }

  @Get("/")
  @ApiOperation({ summary: "List my payment history" })
  async listPayments(
    @GetUser("sub") userId: string,
    @Query() query: PaymentQueryDto,
  ) {
    return this.paymentService.listMyPayments(userId, query);
  }

  @Get("/:id")
  @ApiOperation({ summary: "Get payment details" })
  async getPayment(
    @GetUser("sub") userId: string,
    @Param("id", ParseUUIDPipe) id: string,
  ) {
    return this.paymentService.getPaymentStatus(userId, id);
  }

  @Post("/:id/verify")
  @ApiOperation({ summary: "Manually verify a payment via gateway" })
  async verifyPayment(
    @GetUser("sub") userId: string,
    @Param("id", ParseUUIDPipe) id: string,
  ) {
    return this.paymentService.verifyPayment(userId, id);
  }
}
