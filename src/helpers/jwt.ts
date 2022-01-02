import jwt from 'jsonwebtoken';
import jwt_decode from 'jwt-decode';

const createToken = (user: iAuth): iTokenData => {
  const secret = process.env.JWT_SECRET;
  const dataStoredInToken: iDataStoredInToken = {
    _id: user.id,
  };

  return {
    token: jwt.sign(dataStoredInToken, secret),
  };
};

const decodeToken = (token: string): iDataStoredInToken => {
  return jwt_decode(token);
};

const createCookie = (tokenData: iTokenData): string => {
  return `Bearer ${tokenData.token}`;
};

export { createToken, createCookie, decodeToken };
