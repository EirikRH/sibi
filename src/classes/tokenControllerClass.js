"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jwt = require('jsonwebtoken');
var JwtTokenController = /** @class */ (function () {
    function JwtTokenController(secretKey) {
        this.scretKey = secretKey;
    }
    JwtTokenController.prototype.createToken = function (tokenContent) {
        var token = jwt.sign(tokenContent, this.scretKey);
        return token;
    };
    JwtTokenController.prototype.decodeToken = function (token) {
        var decodedToken = jwt.verify(token, this.scretKey);
        return decodedToken;
    };
    return JwtTokenController;
}());
exports.default = JwtTokenController;
