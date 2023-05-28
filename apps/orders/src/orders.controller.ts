import { Body, Controller, Get, Post } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDTO } from './dto/CreateOrder.dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  async CreateOrder(@Body() request: CreateOrderDTO) {
    return this.ordersService.createOrder(request);
  }

  @Get()
  async getOrders() {
    return this.ordersService.getOrders();
  }
}
