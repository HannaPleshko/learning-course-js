import jwt from 'jsonwebtoken';
import jwt_decode from 'jwt-decode';

const createToken = (user: iAuth): iTokenData => {
  const secret = process.env.JWT_SECRET;
  const dataStoredInToken: iDataStoredInToken = {
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
    status: user.status,
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
