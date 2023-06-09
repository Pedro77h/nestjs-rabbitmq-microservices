import { compare, hash } from 'bcrypt';
import { UsersRepository } from './users.repository';
import { CreateUserDTO } from './dto/create-user.dto';
import { User } from './schema/user.schema';
import {
  Injectable,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async createUser(request: CreateUserDTO) {
    await this.validateCreateUserRequest(request);
    const user = await this.usersRepository.create({
      ...request,
      password: await hash(request.password, 10),
    });
    return user;
  }

  private async validateCreateUserRequest(request: CreateUserDTO) {
    let user: User;
    try {
      user = await this.usersRepository.findOne({
        email: request.email,
      });
    } catch (err) {
      console.log(err);
    }

    if (user) {
      throw new UnprocessableEntityException('Email alredy exists');
    }
  }
  async validateUser(email: string, password: string) {
    const user = await this.usersRepository.findOne({ email });
    const passwordIsValid = await compare(password, user.password);

    if (!passwordIsValid) {
      throw new UnauthorizedException('Credentials are not valid');
    }

    return user;
  }

  async getUser(getUsersArgs: Partial<User>) {
    return this.usersRepository.findOne(getUsersArgs);
  }
}
