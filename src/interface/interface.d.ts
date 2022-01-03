interface iTask {
  readonly id?: number;
  readonly title: string;
  readonly description: string;
}
interface iError {
  readonly statusCode: number;
  readonly message: string;
}
interface iAuth {
  readonly id?: number;
  readonly email: string;
  readonly name: string;
  readonly password: string;
  readonly role: number;
  readonly status: number;
}
interface iTokenData {
  readonly token: string;
}
interface iDataStoredInToken {
  readonly _id: number;
  readonly iat?: number;
  readonly exp?: number;
}
