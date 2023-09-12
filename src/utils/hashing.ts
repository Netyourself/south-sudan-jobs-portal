import bcrypt from 'bcrypt';

const saltRounds = 10; // Number of salt rounds for bcrypt

export const hashPassword = async (password: string) => {
  return await bcrypt.hash(password, saltRounds);
};
