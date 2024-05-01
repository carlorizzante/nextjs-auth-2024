import { auth } from '@/auth';

export default async function SettingsPage() {
  const session = await auth();

  return (
    <div>
      <h1>Settings</h1>
      <p>Settings page</p>
      <p>{JSON.stringify(session)}</p>
    </div>
  )
}
