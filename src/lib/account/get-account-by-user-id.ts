import { db } from '@/lib/db';

export const getAccountByUserId = async (userId: string) => {
  return await db.account.findFirst({
    where: { userId },
  });
}
