'use server';

import { signOut } from '@/auth';

export const logoutAction = async () => {
  // Do some server stuff here before logging out the user.
  await signOut();
}
