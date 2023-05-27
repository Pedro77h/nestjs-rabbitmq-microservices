import { Injectable } from '@nestjs/common';
import { CreateOrderDTO } from './dto/CreateOrder.dto';
import { OrdersRepository } from './orders.repository';

@Injectable()
export class OrdersService {
  constructor(private readonly orderRepository: OrdersRepository) {}

  async createOrder(request: CreateOrderDTO) {
    return this.orderRepository.create(request);
  }
}
