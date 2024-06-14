import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import { payment, preference } from './config/mpConfig';
import { InjectRepository } from '@nestjs/typeorm';
import { Publicaction } from 'src/database/entities/publication.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectRepository(Publicaction)
    readonly publicactionRepository: Repository<Publicaction>,
  ) {}
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
          success: 'https://www.youtube.com/?gl=AR&hl=es-419',
          pending: 'https://www.youtube.com/?gl=AR&hl=es-419',
          failure: 'https://www.youtube.com/?gl=AR&hl=es-419',
        },
        notification_url:
          'https://zbs04g65-3001.brs.devtunnels.ms/payments/webhook',
        auto_return: 'approved',
      };

      const result = await preference.create({ body });
      return { url: result.init_point };
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

  async webhook(req) {
    const paidState = req.body;

    if (paidState.type == 'payment') {
      const data = await payment.capture({ id: paidState.data.id });

      if (data.status === 'approved') {
        const item = data.additional_info.items[0];
        const publication = await this.publicactionRepository.findOne({
          where: { id: item.id },
        });
        const fecha = data.date_created;
        console.log(publication);

        const description = item.description;

        console.log(description);

        if (description == '7 días') {
          const date = new Date();
          date.setDate(date.getDate() + 7);
          console.log(date);
        }
        if (description == '15 días') {
          const date = new Date();
          date.setDate(date.getDate() + 15);
          console.log(date);
        }
        if (description == '30 días') {
          const date = new Date();
          date.setDate(date.getDate() + 30);
          console.log(date);
        }
      }
    }
  }
}
