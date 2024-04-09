import {
  addNewItemToDatabase,
  findItemsListedByUser,
  simpleSearchItems,
} from '../services/database';
import { ExistingItem, NewItem } from '../uitilities/types';

export default class ItemController {
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
  public async findItemsMatchingSimpleSearch(searchString: string) {
    try {
      const searchResult = await simpleSearchItems(searchString);

      if (searchResult.length < 1) {
        return 'No items matching search';
      }
      return searchResult;
    } catch (error) {
      throw error;
    }
  }
  public async findUserItems(userId: number) {
    try {
      const userItems = await findItemsListedByUser(userId);
      if (userItems.length < 1) {
        return 'No listed items';
      }
      return userItems;
    } catch (error) {
      throw error;
    }
  }
}
