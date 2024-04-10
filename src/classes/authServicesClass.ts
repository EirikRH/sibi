import jwt from 'jsonwebtoken';
import {
  findUserFromLoginToken,
  validateLoginCredentials,
} from '../services/database';
import { ExistingUser, LoginAttempt, TokenContent } from '../uitilities/types';

interface AuthServices {
  createLoginToken(credentials: LoginAttempt): Promise<string>;
  validateLoginToken(token: string): Promise<number>;
}

export default class UserAuthServices implements AuthServices{
  public async createLoginToken(credentials: LoginAttempt) {
    try {
      const userFromLoginAttempt = await validateLoginCredentials(credentials);

      if (!userFromLoginAttempt) {
        throw new Error('Invalid credentials');
      }

      if (userFromLoginAttempt) {
        return this.tokenFromValidLogin(userFromLoginAttempt);
      }
    } catch (error) {
      throw error;
    }
  }

  public async validateLoginToken(token: string): Promise<number> {
    try {
      const userFromToken: ExistingUser | null =
        await this.matchTokenToExistingUser(token);
      if (!userFromToken) {
        throw new Error('Invalid token');
      }
      return userFromToken.id;
    } catch (error) {
      throw error;
    }
  }

  private tokenFromValidLogin(validUser: ExistingUser) {
    const { id, username } = validUser;
    const tokenContent: TokenContent = { id, username };
    return this.createToken(tokenContent);
  }

  private async matchTokenToExistingUser(token: string) {
    const decodedToken = this.decodeToken(token);
    const userCheck = await findUserFromLoginToken(decodedToken);
    return userCheck;
  }

  private decodeToken(token: string) {
    return jwt.verify(token, Buffer.from(process.env.SECRET_KEY!, 'base64'));
  }

  private createToken(tokenContent: TokenContent) {
    const token = jwt.sign(
      tokenContent,
      Buffer.from(process.env.SECRET_KEY!, 'base64')
    );
    return token;
  }
}
