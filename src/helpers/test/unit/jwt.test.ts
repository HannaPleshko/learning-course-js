import { createToken, createCookie, decodeToken } from '../../jwt';

describe('function decodeToken()', () => {
  it('should return a token', () => {
    const token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOjY5LCJpYXQiOjE2MzQxMjUzMTksImV4cCI6MTYzNDEyODkxOX0.gyFOYeLk5zCCCo_LOy7s8OJayEblo2pDQwtrSFSLUwY';
    const expectedUser = { _id: 69, exp: 1634128919, iat: 1634125319 };

    const user = decodeToken(token);

    expect(expectedUser).toEqual(user);
  });
});

describe('function createCookie()', () => {
  it('should return new token', () => {
    const expectedUser = 'Bearer  ';

    const user = createCookie({
      token: ' ',
    });

    expect(expectedUser).toBe(user);
  });
});

describe('function createToken()', () => {
  it('should return token', () => {
    const user = createToken({
      login: '1',
      password: '1',
    });

    expect(user).toHaveProperty('token');
    expect(user.token).toMatch(/.*/);
  });
});
