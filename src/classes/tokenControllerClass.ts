const jwt = require('jsonwebtoken');
import { TokenContent } from '../uitilities/globalInterfaces';

export interface TokenController {
  createToken(tokenContent: TokenContent): string;
  decodeToken(token: string): TokenContent;
}

export default class JwtTokenController implements TokenController {
  private readonly scretKey: string;

  constructor(secretKey: string) {
    this.scretKey = secretKey;
  }

  public createToken(tokenContent: TokenContent): string {
    const token = jwt.sign(tokenContent, this.scretKey);
    return token;
  }

  public decodeToken(token: string): TokenContent {
    const decodedToken = jwt.verify(token, this.scretKey);
    return decodedToken;
  }
}
