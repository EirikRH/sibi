"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.simpleSearchItems = exports.findItemsListedByUser = exports.addNewItemToDatabase = exports.findUserFromLoginToken = exports.validateLoginCredentials = exports.updateUserDetailsInDatabase = exports.deleteUserFromDatabase = exports.addNewUserToDatabase = void 0;
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
var client_1 = require("@prisma/client");
var prisma = new client_1.PrismaClient();
function addNewUserToDatabase(newUserDetails) {
    return __awaiter(this, void 0, void 0, function () {
        var username, password, email, user, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    username = newUserDetails.username, password = newUserDetails.password, email = newUserDetails.email;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, 4, 6]);
                    return [4 /*yield*/, prisma.users.create({
                            data: {
                                username: username,
                                password: password,
                                email: email,
                            },
                        })];
                case 2:
                    user = _a.sent();
                    return [2 /*return*/, user];
                case 3:
                    error_1 = _a.sent();
                    throw error_1;
                case 4: return [4 /*yield*/, prisma.$disconnect()];
                case 5:
                    _a.sent();
                    return [7 /*endfinally*/];
                case 6: return [2 /*return*/];
            }
        });
    });
}
exports.addNewUserToDatabase = addNewUserToDatabase;
function deleteUserFromDatabase(tokenContent, email, password) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: 
                //add user to deletedusers table then..
                return [4 /*yield*/, prisma.users.delete({ where: { id: tokenContent.id } })];
                case 1:
                    //add user to deletedusers table then..
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.deleteUserFromDatabase = deleteUserFromDatabase;
function updateUserDetailsInDatabase(userId, detailsToUpdate) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/];
        });
    });
}
exports.updateUserDetailsInDatabase = updateUserDetailsInDatabase;
function validateLoginCredentials(credentials) {
    return __awaiter(this, void 0, void 0, function () {
        var email, password, user, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    email = credentials.email, password = credentials.password;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, 4, 6]);
                    return [4 /*yield*/, prisma.users.findUnique({
                            where: {
                                email: email,
                                password: password,
                            },
                        })];
                case 2:
                    user = _a.sent();
                    return [2 /*return*/, user];
                case 3:
                    error_2 = _a.sent();
                    throw error_2;
                case 4: return [4 /*yield*/, prisma.$disconnect()];
                case 5:
                    _a.sent();
                    return [7 /*endfinally*/];
                case 6: return [2 /*return*/];
            }
        });
    });
}
exports.validateLoginCredentials = validateLoginCredentials;
function findUserFromLoginToken(decodedToken) {
    return __awaiter(this, void 0, void 0, function () {
        var id, username, userFromTokenContent, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    id = decodedToken.id, username = decodedToken.username;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, 4, 6]);
                    return [4 /*yield*/, prisma.users.findUnique({
                            where: {
                                id: id,
                                username: username,
                            },
                        })];
                case 2:
                    userFromTokenContent = _a.sent();
                    if (!userFromTokenContent) {
                        throw new Error('No user matching token');
                    }
                    return [2 /*return*/, userFromTokenContent];
                case 3:
                    error_3 = _a.sent();
                    throw error_3;
                case 4: return [4 /*yield*/, prisma.$disconnect()];
                case 5:
                    _a.sent();
                    return [7 /*endfinally*/];
                case 6: return [2 /*return*/];
            }
        });
    });
}
exports.findUserFromLoginToken = findUserFromLoginToken;
function addNewItemToDatabase(item, userId) {
    return __awaiter(this, void 0, void 0, function () {
        var newItem, error_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, 3, 5]);
                    return [4 /*yield*/, prisma.itemsforsale.create({
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
                        })];
                case 1:
                    newItem = _a.sent();
                    return [2 /*return*/, newItem];
                case 2:
                    error_4 = _a.sent();
                    throw error_4;
                case 3: return [4 /*yield*/, prisma.$disconnect()];
                case 4:
                    _a.sent();
                    return [7 /*endfinally*/];
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.addNewItemToDatabase = addNewItemToDatabase;
function findItemsListedByUser(userId) {
    return __awaiter(this, void 0, void 0, function () {
        var userItems, error_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, 3, 5]);
                    return [4 /*yield*/, prisma.itemsforsale.findMany({
                            where: { user_id: userId },
                        })];
                case 1:
                    userItems = _a.sent();
                    return [2 /*return*/, userItems];
                case 2:
                    error_5 = _a.sent();
                    throw error_5;
                case 3: return [4 /*yield*/, prisma.$disconnect()];
                case 4:
                    _a.sent();
                    return [7 /*endfinally*/];
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.findItemsListedByUser = findItemsListedByUser;
function simpleSearchItems(searchString) {
    return __awaiter(this, void 0, void 0, function () {
        var searchWords, searchResults, error_6;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    searchWords = searchString.split(' ');
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 2, 3, 5]);
                    searchResults = prisma.itemsforsale.findMany({
                        where: {
                            OR: searchWords.map(function (word) { return ({
                                OR: [
                                    { description: { search: word } },
                                    { category: { search: word } },
                                    { brand: { search: word } },
                                    { model: { search: word } },
                                    { size: { search: word } },
                                ],
                            }); }),
                        },
                    });
                    return [2 /*return*/, searchResults];
                case 2:
                    error_6 = _a.sent();
                    throw error_6;
                case 3: return [4 /*yield*/, prisma.$disconnect()];
                case 4:
                    _a.sent();
                    return [7 /*endfinally*/];
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.simpleSearchItems = simpleSearchItems;
/*
export {
  addNewUserToDatabase,
  deleteUserFromDatabase,
  updateUserDetailsInDatabase,
  validateLoginCredentials,
  findUserFromLoginToken,
  addNewItemToDatabase,
  simpleSearchItems,
  findItemsListedByUser,
};
 */
