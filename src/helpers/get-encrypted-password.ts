import * as bcrypt from 'bcrypt';

const SALT_OR_ROUNDS = 10;

export const getEncryptedPassword = async (password: string) => {
  const encryptedPassword = await bcrypt.hash(password, SALT_OR_ROUNDS);

  return encryptedPassword;
};
