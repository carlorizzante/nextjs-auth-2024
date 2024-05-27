import {
  auth,
  signOut,
} from '@/auth';

export default async function SettingsPage() {
  const session = await auth();

  return (
    <div>
      <h1>Settings Server</h1>
      <p>{JSON.stringify(session)}</p>
      <form action={async () => {
        'use server';
        await signOut();
      }}>
        <button type="submit">Logout</button>
      </form>
    </div>
  )
}
