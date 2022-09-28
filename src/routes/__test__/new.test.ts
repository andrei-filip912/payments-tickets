import mongoose from 'mongoose';
import request from 'supertest';
import { app } from '../../app';
import { OrderStatus } from '@frst-ticket-app/common';
import { Order } from '../../models/order';

test('should return 404 when purchasing an inexistent order', async () => {
    await request(app)
        .post('/api/payments')
        .set('Cookie', global.signin())
        .send({
            token: 'fasdf',
            orderId: new mongoose.Types.ObjectId().toHexString()
        })
        .expect(404);
});

test('should return 401 when purchasing an order that does not belong to the user', async () => {
    const order = Order.build({
        id: new mongoose.Types.ObjectId().toHexString(),
        userId: new mongoose.Types.ObjectId().toHexString(),
        version: 0,
        price: 20,
        status: OrderStatus.Created
    });
    await order.save();

    await request(app)
        .post('/api/payments')
        .set('Cookie', global.signin())
        .send({
            token: 'fasdf',
            orderId: order.id
        })
        .expect(401);

});

test('should return 400 when purchasing a cancelled order', async () => {
      
});