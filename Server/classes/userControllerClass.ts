import { NewUser, ExistingUser, LoginAttempt } from '../uitilities/types';
import {
  addNewUserToDatabase,
  findUserFromLoginToken,
  validateLoginCredentials,
} from '../services/database';
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

export default class UserController {
  public async createNewUser(newUserDetails: NewUser) {
    try {
      await addNewUserToDatabase(newUserDetails);
    } catch (error) {
      throw error;
    }
  }

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
    const { id, username, email } = validUser;

    const token = jwt.sign(
      { id, username, email },
      Buffer.from(process.env.SECRET_KEY!, 'base64')
    );
    return token;
  }

  private async matchTokenToExistingUser(token: string) {
    const decodedToken = jwt.verify(
      token,
      Buffer.from(process.env.SECRET_KEY!, 'base64')
    );
    const userCheck = await findUserFromLoginToken(decodedToken);
    return userCheck;
  }
}
