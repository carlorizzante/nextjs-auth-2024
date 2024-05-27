'use client';

import {
  signOut,
  useSession,
} from 'next-auth/react';
import { logoutAction } from '@/actions';
import { useCurrentUser } from '@/hooks';

export default function SettingsPage() {
  const session = useSession();
  const user = useCurrentUser();

  const handleSignOut = () => {
    signOut();
  }

  const handleLogout = () => {
    logoutAction();
  }

  return (
    <div>
      <h1>Settings</h1>
      <p>Settings page</p>
      <p>{JSON.stringify(user)}</p>

      <button onClick={handleSignOut}>Logout (from next-auth/react)</button>
      <br />
      <button onClick={handleLogout}>Logout (from @/auth)</button>
    </div>
  )
}
