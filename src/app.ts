//External resources
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();
/*use for image handling - https://www.npmjs.com/package/multer*/

import UserController from './classes/userControllerClass';
import DatabaseItemController from './classes/itemControllerClass';
import { NewUser, LoginAttempt } from './uitilities/globalInterfaces';
import DatabaseItemFinder from './classes/itemFinderClass';
import UserAuthServices from './classes/authServicesClass';

const PORT = process.env.PORT!;

const app = express();
app.use(cors());
app.use(express.json());

app.post('/createUser', async (req, res) => {
  const { username, password, email } = req.body;
  const newUserData: NewUser = { username, password, email };
  const user = new UserController();

  try {
    await user.createNewUser(newUserData);

    res.status(200).json({ message: 'User created' });
  } catch (error) {
    let errorMessage = 'Internal server error';
    let statusCode = 500;

    if (error.code === 'P2002') {
      errorMessage = `User with this ${error.meta.target[0]} already exists`;
      statusCode = 400;
    }
    res
      .status(statusCode)
      .json({ error: errorMessage, field: error.meta.target[0] });
  }
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const credentials: LoginAttempt = { email, password };
  const tokenHandler = new UserAuthServices();

  try {
    const loginToken = await tokenHandler.createLoginToken(credentials);
    res.status(200).json({ loginToken });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/addNewItem', async (req, res) => {
  const { loginToken, newItem } = req.body;
  const tokenHandler = new UserAuthServices();
  const item = new DatabaseItemController();

  try {
    const validUserId = await tokenHandler.validateLoginToken(loginToken);
    const listedItem = await item.addNewItemForSale(newItem, validUserId);

    res.status(200).json({ progress: 'Item listed', listedItem });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/getUserItems', async (req, res) => {
  const { loginToken } = req.body;
  const tokenHandler = new UserAuthServices();
  const items = new DatabaseItemFinder();

  try {
    const userId = await tokenHandler.validateLoginToken(loginToken);
    const userItems = await items.findUserItems(userId);

    res.status(200).json(userItems);
  } catch (error) {
    res.status(500).json('Internal server error');
  }
});

app.get('/simpleSearch', async (req, res) => {
  const { searchString } = req.query;
  const items = new DatabaseItemFinder();

  try {
    const searchResult = await items.findItemsMatchingSearchString(
      searchString
    );
    res.status(200).json(searchResult);
  } catch (error) {
    return res.status(500).json(error);
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
