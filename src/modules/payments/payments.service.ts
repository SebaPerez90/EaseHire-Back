import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import { payment, preference } from './config/mpConfig';
import { InjectRepository } from '@nestjs/typeorm';
import { Publicaction } from 'src/database/entities/publication.entity';
import { Repository } from 'typeorm';
import { Payment } from 'src/database/entities/payment.entity';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectRepository(Publicaction)
    private publicactionRepository: Repository<Publicaction>,

    @InjectRepository(Payment) private paymentRepository: Repository<Payment>,
  ) {}

  async mockPayment() {
    
  }

  async createPaymenttt(req: Request) {
    try {
      const body = {
        items: [
          {
            id: req.body.id,
            title: req.body.title,
            quantity: Number(req.body.quantity),
            unit_price: Number(req.body.unit_price),
            description: req.body.description,
            currency_id: 'ARS',
          },
        ],
        back_urls: {
          success: 'https://pf-g5-front.vercel.app/',
          pending: 'https://pf-g5-front.vercel.app/',
          failure: 'https://pf-g5-front.vercel.app/',
        },
        notification_url:
          'https://zbs04g65-3001.brs.devtunnels.ms/payments/webhook',
        auto_return: 'approved',
      };

      const result = await preference.create({ body });
      return { url: result.init_point, item: result.items[0] };
    } catch (error) {
      if (error)
        console.log('something goes wrong in payment proceess. Plis try again');
    }
  }

  async getPyaMethods() {
    const response = await fetch(
      'https://api.mercadopago.com/v1/payment_methods',
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${process.env.MP_ACCESS_TOKEN}`,
        },
      },
    );
    const data = await response.json();
    return data.map((element) => element.id);
  }

  async historiPayments() {
    const payments = await this.paymentRepository.find();
    return payments;
  }

  async webhook(req) {
    const paidState = req.body;

    if (paidState.type == 'payment') {
      const data = await payment.capture({ id: paidState.data.id });

      if (data.status === 'approved') {
        const item = data.additional_info.items[0];

        const publication = await this.publicactionRepository.findOne({
          where: { id: item.id },
        });

        const payment = new Payment();
        payment.value = data.transaction_details.net_received_amount;
        payment.description = data.description;
        payment.datePayment = data.date_approved.split('T')[0];
        console.log(payment);
        await this.paymentRepository.save(payment);


        if (item.description == '7 días') {
          publication.premium = true;
          const date = new Date();
          date.setDate(date.getDate() + 7);
        }
        if (item.description == '15 días') {
          const date = new Date();
          date.setDate(date.getDate() + 15);
        }
        if (item.description == '30 días') {
          const date = new Date();
          date.setDate(date.getDate() + 30);
        }
      }
    }
  }
}
