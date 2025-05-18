import LoginForm from '@/components/modules/Auth/LoginForm';
import { Button } from '@/components/ui/button';
import React from 'react';

type SearchParams = Promise<{ [key: string]: string | undefined }>;
const LoginPage = async ({ searchParams }: { searchParams: SearchParams }) => {
  const { redirectPath } = await searchParams;
  return <LoginForm redirectPath={redirectPath} />;
};

export default LoginPage;