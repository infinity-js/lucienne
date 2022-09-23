import { Injectable, OnModuleInit } from '@nestjs/common';
import { connect, Connection } from 'amqplib';

@Injectable()
export class RabbitMQService implements OnModuleInit {
  amqpConnection!: Connection;

  async onModuleInit() {
    this.amqpConnection = await connect('amqp://localhost');
  }
}
