import { addNewItemToDatabase } from '../services/database';
import { ExistingItem, NewItem } from '../uitilities/globalInterfaces';

export interface ItemController {
  addNewItemForSale(item: NewItem, userId: number): Promise<ExistingItem>;
}

export default class CrudItemController implements ItemController {
  public async addNewItemForSale(
    item: NewItem,
    userId: number
  ): Promise<ExistingItem> {
    try {
      const newItem = await addNewItemToDatabase(item, userId);

      return newItem;
    } catch (error) {
      throw error;
    }
  }
}
