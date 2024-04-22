//External resources
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();
/*use for image handling - https://www.npmjs.com/package/multer*/

import CrudUserController, { UserController } from './classes/userControllerClass';
import CrudItemController, { ItemController } from './classes/itemControllerClass';
import UserAuthServices, { AuthServices } from './classes/authServicesClass';
import JwtTokenController, { TokenController } from './classes/tokenControllerClass';
import DatabaseItemFinder, { ItemFinder } from './classes/itemFinderClass';

const tokenController: TokenController = new JwtTokenController(process.env.SECRET_KEY!);
const authServices: AuthServices = new UserAuthServices(tokenController);
const itemController: ItemController = new CrudItemController();
const userController: UserController = new CrudUserController();
const itemFinder: ItemFinder = new DatabaseItemFinder();

const PORT = process.env.PORT!;

const app = express();
app.use(cors());
app.use(express.json());

app.post('/createUser', async (req, res) => {
  const { username, password, email } = req.body;
  const newUserData = { username, password, email };

  try {
    await userController.createNewUser(newUserData);

    res.status(200).json({ message: 'User created' });
  } catch (error) {
    let errorMessage = 'Internal server error';
    let statusCode = 500;

    if (error.code === 'P2002') {
      errorMessage = `User with this ${error.meta.target[0]} already exists`;
      statusCode = 400;
    }
    res.status(statusCode).json({ error: errorMessage, field: error.meta.target[0] });
  }
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const credentials = { email, password };

  try {
    const loginToken = await authServices.createLoginTokenIfValidCredentials(credentials);
    res.status(200).json({ loginToken });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/addNewItem', async (req, res) => {
  const { loginToken, newItem } = req.body;

  try {
    const validToken = await authServices.validateLoginToken(loginToken);
    const listedItem = await itemController.addNewItemForSale(newItem, validToken.id);

    res.status(200).json({ progress: 'Item listed', listedItem });
  } catch (error) {
    res.status(500).json({ error, msg: error.message });
  }
});

app.get('/getUserItems', async (req, res) => {
  const { loginToken } = req.body;

  try {
    const validToken = await authServices.validateLoginToken(loginToken);
    const userItems = await itemFinder.findUserItems(validToken.id);

    res.status(200).json(userItems);
  } catch (error) {
    res.status(500).json('Internal server error');
  }
});

app.get('/simpleSearch', async (req, res) => {
  const { searchString } = req.query;

  try {
    const searchResult = await itemFinder.findItemsMatchingSearchString(searchString);
    res.status(200).json(searchResult);
  } catch (error) {
    return res.status(500).json(error);
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} 
Remember to select appropriat DB-URL`);
});
