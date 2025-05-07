import { Uuid } from "../../src/modules/shared/domain/value-object/uuid.vo";
import * as bcrypt from 'bcrypt';

export class UserId extends Uuid {}

async function initializeUser() {
  const password = await hashPassword('admin');
  const admin = 
    {
      email: 'admin@example.com',
      password: password,
      name: 'admin',
      address: '123 Admin Street, Admin City, Admin Country',
    }

  return admin;
}

export { initializeUser };

async function hashPassword(password: string): Promise<string> {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
}