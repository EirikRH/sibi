/* 
  NEEDS:
  getItemByItemId - to view or edit a single item
  markItemAsSold - To mark an item as sold by adding a date to it. Maybe move to new table "soldItems"?
  deleteItem - To remove an item from the database and users listings.

  Figure out how to handle:
  communitacte interest in an item to the seller? 
  notify user/seller of interest in listed item?
  chats between seller/buyer per item or per seller/buyer pair?
  agree to sale in app?
  does the app organise the sale or is it just a listing app?
  direct linking to postal service?
  */
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

import {
  NewUser,
  ExistingUser,
  LoginAttempt,
  TokenContent,
  NewItem,
  ExistingItem,
  AdvancedSearchTerms,
} from '../uitilities/globalInterfaces';

async function addNewUserToDatabase(
  newUserDetails: NewUser
): Promise<ExistingUser> {
  const { username, password, email } = newUserDetails;

  try {
    const user = await prisma.users.create({
      data: {
        username: username,
        password: password,
        email: email,
      },
    });

    return user;
  } catch (error) {
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

async function validateLoginCredentials(
  credentials: LoginAttempt
): Promise<ExistingUser | null> {
  const { email, password } = credentials;

  try {
    const user = await prisma.users.findUnique({
      where: {
        email: email,
        password: password,
      },
    });
    return user;
  } catch (error) {
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

async function findUserFromLoginToken(
  decodedToken: TokenContent
): Promise<ExistingUser> {
  const { id, username } = decodedToken;

  try {
    const userFromTokenContent = await prisma.users.findUnique({
      where: {
        id,
        username,
      },
    });

    if (!userFromTokenContent) {
      throw new Error('No user matching token');
    }
    return userFromTokenContent;
  } catch (error) {
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

async function addNewItemToDatabase(
  item: NewItem,
  userId: number
): Promise<ExistingItem> {
  try {
    const newItem = await prisma.itemsforsale.create({
      data: {
        user_id: userId,
        image_location: item.image_location,
        description: item.description,
        category: item.category,
        price: item.price,

        brand: item.brand || null,
        model: item.model || null,
        size: item.size || null,
      },
    });
    return newItem;
  } catch (error) {
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

async function findItemsListedByUser(userId: number): Promise<ExistingItem[]> {
  try {
    const userItems = await prisma.itemsforsale.findMany({
      where: { user_id: userId },
    });
    return userItems;
  } catch (error) {
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

async function simpleSearchItems(
  searchString: string
): Promise<ExistingItem[]> {
  const searchWords: string[] = searchString.split(' ');

  try {
    const searchResults = prisma.itemsforsale.findMany({
      where: {
        OR: searchWords.map((word) => ({
          OR: [
            { description: { search: word } },
            { category: { search: word } },
            { brand: { search: word } },
            { model: { search: word } },
            { size: { search: word } },
          ],
        })),
      },
    });

    return searchResults;
  } catch (error) {
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

export {
  addNewUserToDatabase,
  validateLoginCredentials,
  findUserFromLoginToken,
  addNewItemToDatabase,
  simpleSearchItems,
  findItemsListedByUser,
};
