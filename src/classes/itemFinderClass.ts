import { findItemsListedByUser, simpleSearchItems } from '../services/database';
import { ExistingItem } from '../uitilities/globalInterfaces';

interface ItemFinder {
  findItemsMatchingSearchString(
    searchString: string
  ): Promise<string | ExistingItem[]>;
  findUserItems(userId: number): Promise<string | ExistingItem[]>;
}

export default class DatabaseItemFinder implements ItemFinder {
  public async findItemsMatchingSearchString(searchString: string) {
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
