import getUserData from '@/actions/users/getUserData';
import { redirect } from 'next/navigation';
import React from 'react'
import EditUserData from './EditUserData';

async function SettingsPage() {
  const userData = await getUserData();

  if (!userData) redirect("/");

  return (
    <EditUserData userData={userData} />
  )
}

export default SettingsPage