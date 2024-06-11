import { Controller, Get, Post, Req } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { Request } from 'express';
// import { NextFunction, Request, Response } from 'express';

@Controller('payments')
export class PaymentsController {
  constructor(private paymentService: PaymentsService) {}

  @Get('methods')
  getPyaMethods() {
    return this.paymentService.getPyaMethods();
  }
  @Post()
  createPaymenttt(@Req() req: Request) {
    return this.paymentService.createPaymenttt(req);
  }
}
