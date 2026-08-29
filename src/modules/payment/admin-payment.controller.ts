import {
  Controller,
  Get,
  Post,
  Param,
  Query,
  ParseUUIDPipe,
} from "@nestjs/common";
import { ApiTags, ApiOperation, ApiBearerAuth } from "@nestjs/swagger";
import { PaymentService } from "./payment.service";
import { Roles } from "src/common/decorators/roles.decorator";
import { UserRole } from "generated/prisma/client";
import { PaymentQueryDto } from "./dtos/payment-query.dto";

@ApiTags("Payments (Admin)")
@ApiBearerAuth()
@Controller("admin/payments")
@Roles(UserRole.ADMIN)
export class AdminPaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Get("/")
  @ApiOperation({ summary: "List all payments with filters" })
  async listPayments(@Query() query: PaymentQueryDto) {
    return this.paymentService.adminListPayments(query);
  }

  @Get("/failed")
  @ApiOperation({ summary: "List failed payments" })
  async listFailedPayments(@Query() query: PaymentQueryDto) {
    return this.paymentService.adminListFailedPayments(query);
  }

  @Get("/:id")
  @ApiOperation({ summary: "Get payment details" })
  async getPayment(@Param("id", ParseUUIDPipe) id: string) {
    return this.paymentService.adminGetPayment(id);
  }

  @Post("/:id/retry")
  @ApiOperation({ summary: "Retry a failed payment verification" })
  async retryPayment(@Param("id", ParseUUIDPipe) id: string) {
    return this.paymentService.adminRetryPayment(id);
  }
}
