import { Subjects, Publisher, PaymentCreatedEvent } from '@frst-ticket-app/common';

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
    subject: Subjects.PaymentCreated = Subjects.PaymentCreated;
}