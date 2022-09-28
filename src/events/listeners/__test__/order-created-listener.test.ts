import { natsWrapper } from "../../../nats-wrapper";
import { Message } from 'node-nats-streaming';
import { OrderCreatedListener } from "../order-created-listener";
import { OrderCreatedEvent, OrderStatus } from "@frst-ticket-app/common";
import mongoose from "mongoose";
import { Order } from "../../../models/order";

const setup =async () => {
    const listener = new OrderCreatedListener(natsWrapper.client);

    const data: OrderCreatedEvent['data'] = {
        id: new mongoose.Types.ObjectId().toHexString(),
        version: 0,
        expiresAt: 'fasdf',
        userId: 'fasdf',
        status: OrderStatus.Created,
        ticket : {
            id: 'fasd',
            price: 10
        }
    };

    // @ts-ignore
    const msg: Message = {
        ack: jest.fn()
    };

    return { listener, data, msg };
}

test('should replicate the order info', async () => { 
    const { listener, data, msg } = await setup();

    await listener.onMessage(data, msg);

    const order = await Order.findById(data.id);

    expect(order!.price).toEqual(data.ticket.price);
});

test('should ack the message', async () => {
    const { listener, data, msg } = await setup();

    await listener.onMessage(data, msg);

    expect(msg.ack).toHaveBeenCalled();
});