import {
  findUserFromLoginToken,
  validateLoginCredentials,
} from '../services/database';
import {
  ExistingUser,
  LoginAttempt,
  TokenContent,
} from '../uitilities/globalInterfaces';
import { TokenController } from './tokenControllerClass';

export interface AuthServices {
  createLoginTokenIfValidCredentials(
    credentials: LoginAttempt
  ): Promise<string>;
  validateLoginToken(token: string): Promise<TokenContent>;
}

export default class UserAuthServices implements AuthServices {
  private readonly tokenController: TokenController;

  constructor(tokenController: TokenController) {
    this.tokenController = tokenController;
  }

  public async createLoginTokenIfValidCredentials(
    credentials: LoginAttempt
  ): Promise<string> {
    try {
      const findUserFromLoginAttempt = await validateLoginCredentials(
        credentials
      );

      if (!findUserFromLoginAttempt) {
        throw new Error('Invalid credentials');
      }

      return this.createTokenFromValidLogin(findUserFromLoginAttempt);
    } catch (error) {
      throw error;
    }
  }

  public async validateLoginToken(token: string): Promise<TokenContent> {
    try {
      const userFromToken: ExistingUser | null =
        await this.matchTokenToExistingUser(token);
      if (!userFromToken) {
        throw new Error('Invalid token');
      }
      const { id, username } = userFromToken;
      const tokenContent: TokenContent = { id, username };
      return tokenContent;
    } catch (error) {
      throw error;
    }
  }

  private createTokenFromValidLogin(validUser: ExistingUser) {
    const { id, username } = validUser;
    const tokenContent: TokenContent = { id, username };
    return this.tokenController.createToken(tokenContent);
  }

  private async matchTokenToExistingUser(token: string) {
    const decodedToken = this.tokenController.decodeToken(token);
    const userCheck = await findUserFromLoginToken(decodedToken);
    return userCheck;
  }
}
