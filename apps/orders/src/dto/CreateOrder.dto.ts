import {
  IsNotEmpty,
  IsPositive,
  IsPhoneNumber,
  IsString,
} from 'class-validator';

export class CreateOrderDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsPositive()
  price: number;

  @IsPhoneNumber()
  phoneNumber: string;
}
