import { Injectable } from '@nestjs/common';
import { CreateOrderDTO } from './dto/CreateOrder.dto';
import { OrdersRepository } from './orders.repository';

@Injectable()
export class OrdersService {
  constructor(private readonly ordersRepository: OrdersRepository) {}

  async createOrder(request: CreateOrderDTO) {
    return this.ordersRepository.create(request);
  }

  async getOrders() {
    return this.ordersRepository.find({});
  }
}
