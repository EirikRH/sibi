import { NewUser } from '../uitilities/globalInterfaces';
import { addNewUserToDatabase } from '../services/database';

export default class UserController {
  public async createNewUser(newUserDetails: NewUser) {
    try {
      await addNewUserToDatabase(newUserDetails);
    } catch (error) {
      throw error;
    }
  }
}
