import { randomBytes } from 'crypto';

const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

export const generateShortCode = (length: number = 6): string => {
  const bytes = randomBytes(length);
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(bytes[i] % characters.length);
  }
  return result;
}
