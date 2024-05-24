import { db } from '@/lib/db';

export const getUserById = async (id?: string) => {
  if (!id) return null;
  try {
    return await db.user.findUnique({
      where: { id },
    });
  } catch (error) {
    console.error(error);
    return null;
  }
}
