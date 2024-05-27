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
    <div className="max-w-4xl bg-white p-10 rounded-xl">
      <h1>Settings Client</h1>
      <p>{JSON.stringify(user)}</p>

      <button onClick={handleSignOut}>Logout (from next-auth/react)</button>
      <br />
      <button onClick={handleLogout}>Logout (from @/auth)</button>
    </div>
  )
}
