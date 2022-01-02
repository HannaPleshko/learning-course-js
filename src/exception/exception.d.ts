export const enum ExceptionType {
  SERVER_ERROR = 'Server Error!',
  CHECK_FOR_EMPTY = 'Title or Description are missing',
  EMPTY_LOGIN = 'Title are missing',
  NOT_FOUND = 'Not Found!',
  ERROR_CONNECTION = 'Getting error during the connection',
  USER_ALREADY_EXISTS = 'This user already exists',
  INPUT_ERROR_PASSWORD = 'Failure! Input Error! Try again!',
  INPUT_ERROR_LOGIN = 'Failure! There is no user with this login! Try again!',
  TOKEN_EXCEPTION = 'Wrong Authentication Token!',
  TOKEN_MISSING = 'Authentication Token is Missing!',
}
export const enum SuccessType {
  SUCCESS = 'Success!',
  LOGOUT_SUCCESS = 'You have been logged out successfully!',
}
