import { hash } from 'bcrypt';

const saltOrRounds = 10;

export async function hashPassword(password: string): Promise<string> {
  return await hash(password, saltOrRounds);
}
