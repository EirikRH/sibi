import { ExistingUser, NewUser } from '../uitilities/globalInterfaces';
import { addNewUserToDatabase } from '../services/database';

interface UserController {
  createNewUser(newUserDetails: NewUser): void;
  updateUserDetails(updatedUserDetails: ExistingUser): void;
  deleteUser(userId: number): void;
}
export default class CrudUserController implements UserController {
  public async createNewUser(newUserDetails: NewUser) {
    try {
      await addNewUserToDatabase(newUserDetails);
    } catch (error) {
      throw error;
    }
  }
  updateUserDetails(updatedUserDetails: ExistingUser): void {
    throw new Error('Method not implemented.');
  }
  deleteUser(userId: number): void {
    throw new Error('Method not implemented.');
  }
}
