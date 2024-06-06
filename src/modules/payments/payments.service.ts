import { Injectable } from '@nestjs/common';
import { Request, Response } from 'express';
import { MercadoPagoConfig, Preference } from 'mercadopago';

@Injectable()
export class PaymentsService {
  async createPaymenttt(req: Request, res: Response) {
    const client = new MercadoPagoConfig({
      accessToken: process.env.MP_ACCESS_TOKEN,
    });

    try {
      const body = {
        items: [
          {
            id: '1',
            title: req.body.title,
            quantity: Number(req.body.quantity),
            unit_price: Number(req.body.unit_price),
            currency_id: 'ARS',
          },
        ],
        back_urls: {
          success: 'https://www.youtube.com/?gl=AR&hl=es-419',
          pending: 'https://www.youtube.com/?gl=AR&hl=es-419',
          failure: 'https://www.youtube.com/?gl=AR&hl=es-419',
        },
        auto_return: 'approved',
      };

      const preference = new Preference(client);
      const result = await preference.create({ body });
      res.json({ id: result.id });
    } catch (error) {
      if (error) console.log('algo salio muy muy mal');
    }
  }

  async getPyaMethods() {
    const headers = {
      Authorization: `Bearer ${process.env.MERCADOPAGO_ACCESS_TOKEN}`,
    };
    const res = await fetch('https://api.mercadopago.com/v1/payment_methods', {
      method: 'GET',
      headers,
    });
    const data = await res.json();
    return data;
  }
}
