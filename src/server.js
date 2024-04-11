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
//External resources
var express = require('express');
var cors = require('cors');
var dotenv = require('dotenv');
dotenv.config();
/*use for image handling - https://www.npmjs.com/package/multer*/
var userControllerClass_1 = require("./classes/userControllerClass");
var itemControllerClass_1 = require("./classes/itemControllerClass");
var itemFinderClass_1 = require("./classes/itemFinderClass");
var authServicesClass_1 = require("./classes/authServicesClass");
var PORT = process.env.PORT;
var app = express();
app.use(cors());
app.use(express.json());
app.post('/createUser', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, username, password, email, newUserData, user, error_1, errorMessage, statusCode;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, username = _a.username, password = _a.password, email = _a.email;
                newUserData = { username: username, password: password, email: email };
                user = new userControllerClass_1.default();
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, user.createNewUser(newUserData)];
            case 2:
                _b.sent();
                res.status(200).json({ message: 'User created' });
                return [3 /*break*/, 4];
            case 3:
                error_1 = _b.sent();
                errorMessage = 'Internal server error';
                statusCode = 500;
                if (error_1.code === 'P2002') {
                    errorMessage = "User with this ".concat(error_1.meta.target[0], " already exists");
                    statusCode = 400;
                }
                res
                    .status(statusCode)
                    .json({ error: errorMessage, field: error_1.meta.target[0] });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
app.post('/login', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, password, credentials, tokenHandler, loginToken, error_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, email = _a.email, password = _a.password;
                credentials = { email: email, password: password };
                tokenHandler = new authServicesClass_1.default();
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, tokenHandler.createLoginToken(credentials)];
            case 2:
                loginToken = _b.sent();
                res.status(200).json({ loginToken: loginToken });
                return [3 /*break*/, 4];
            case 3:
                error_2 = _b.sent();
                res.status(500).json({ error: error_2.message });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
app.post('/addNewItem', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, loginToken, newItem, tokenHandler, item, validUserId, listedItem, error_3;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, loginToken = _a.loginToken, newItem = _a.newItem;
                tokenHandler = new authServicesClass_1.default();
                item = new itemControllerClass_1.default();
                _b.label = 1;
            case 1:
                _b.trys.push([1, 4, , 5]);
                return [4 /*yield*/, tokenHandler.validateLoginToken(loginToken)];
            case 2:
                validUserId = _b.sent();
                return [4 /*yield*/, item.addNewItemForSale(newItem, validUserId)];
            case 3:
                listedItem = _b.sent();
                res.status(200).json({ progress: 'Item listed', listedItem: listedItem });
                return [3 /*break*/, 5];
            case 4:
                error_3 = _b.sent();
                res.status(500).json({ error: error_3.message });
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); });
app.get('/getUserItems', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var loginToken, tokenHandler, items, userId, userItems, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                loginToken = req.body.loginToken;
                tokenHandler = new authServicesClass_1.default();
                items = new itemFinderClass_1.default();
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                return [4 /*yield*/, tokenHandler.validateLoginToken(loginToken)];
            case 2:
                userId = _a.sent();
                return [4 /*yield*/, items.findUserItems(userId)];
            case 3:
                userItems = _a.sent();
                res.status(200).json(userItems);
                return [3 /*break*/, 5];
            case 4:
                error_4 = _a.sent();
                res.status(500).json('Internal server error');
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); });
app.get('/simpleSearch', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var searchString, items, searchResult, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                searchString = req.query.searchString;
                items = new itemFinderClass_1.default();
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, items.findItemsMatchingSearchString(searchString)];
            case 2:
                searchResult = _a.sent();
                res.status(200).json(searchResult);
                return [3 /*break*/, 4];
            case 3:
                error_5 = _a.sent();
                return [2 /*return*/, res.status(500).json(error_5)];
            case 4: return [2 /*return*/];
        }
    });
}); });
app.listen(PORT, function () {
    console.log("Server is running on port ".concat(PORT));
});
