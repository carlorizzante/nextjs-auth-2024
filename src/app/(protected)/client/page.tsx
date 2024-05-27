'use client';

import { UserInfo } from '@/components';
import { useCurrentUser } from '@/hooks';

export default function ClientPage() {
  const user = useCurrentUser();

  return (
    <UserInfo label="👩‍💻 Client Component" user={user} />
  )
}
