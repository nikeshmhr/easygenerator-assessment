import { Inject, Injectable, Logger, forwardRef } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,
    private readonly logger: Logger,
    private readonly jwtService: JwtService,
  ) {
    this.logger = new Logger(AuthService.name);
  }

  async validateUser(username: string, password: string): Promise<any> {
    this.logger.log(`validating user creds for username ${username}`);
    const user = await this.usersService.findOneByEmail(username);
    if (user) {
      if (await bcrypt.compare(password, user.passwordHash)) {
        this.logger.log(`user credential validated sucessfully`);
        return {
          email: user.email,
          name: user.name,
          id: user._id,
        };
      } else {
        this.logger.error(`invalid jwt token`);
      }
    } else {
      this.logger.error(`user not found.`);
    }

    return null;
  }

  async login(user: any) {
    const payload = { username: user.email, sub: user.id };
    this.logger.log(`generating jwt for payload ${JSON.stringify(user)}`);
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
