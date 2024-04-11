import {
  ExistingUser,
  NewUser,
  UserDeletionRequest,
} from '../uitilities/globalInterfaces';
import {
  addNewUserToDatabase,
  attemptDeleteUserFromDatabase,
  updateUserDetailsInDatabase,
} from '../services/database';
import UserAuthServices from './authServicesClass';
import JwtTokenController from './tokenControllerClass';

export interface UserController {
  createNewUser(newUserDetails: NewUser): Promise<void>;
  updateUserDetails(updatedUserDetails: ExistingUser): Promise<void>;
  deleteUser(deletionRequest: UserDeletionRequest): Promise<void>;
}
export default class CrudUserController implements UserController {
  public async createNewUser(newUserDetails: NewUser) {
    try {
      await addNewUserToDatabase(newUserDetails);
    } catch (error) {
      throw error;
    }
  }
  public async updateUserDetails(
    updatedUserDetails: ExistingUser
  ): Promise<void> {
    throw new Error('Method not implemented.');
  }
  public async deleteUser(deletionRequest: UserDeletionRequest): Promise<void> {
    const { token, email, password } = deletionRequest;
    const tokenDecoder = new JwtTokenController(process.env.SECRET_KEY!);
    const authService = new UserAuthServices(tokenDecoder);
    const tokenContent = await authService.validateLoginToken(token);
    try {
      await attemptDeleteUserFromDatabase(tokenContent, email, password);
    } catch (error) {
      throw error;
    }
  }
}
