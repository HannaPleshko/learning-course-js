interface iAuth {
  readonly id?: number;
  readonly email: string;
  readonly name: string;
  readonly password: string;
  readonly role: number;
  readonly status: number;
}
interface iCourse {
  readonly id?: number;
  readonly title: string;
}
interface iTopic {
  readonly id?: number;
  readonly course_id: number;
  readonly title: string;
  readonly description?: string
}
interface iLesson {
  readonly id?: number;
  readonly topic_id: number;
  readonly is_read: boolean;
  readonly title: string;
  readonly content: string;
}
interface iError {
  readonly statusCode: number;
  readonly message: string;
}
interface iTokenData {
  readonly token: string;
}
interface iDataStoredInToken {
  readonly _id: number;
  readonly iat?: number;
  readonly exp?: number;
}
