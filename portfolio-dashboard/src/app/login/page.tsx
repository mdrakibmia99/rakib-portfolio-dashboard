import LoginForm from "@/components/modules/Auth/LoginForm";

type SearchParams = Promise<{ [key: string]: string | undefined }>;
const LoginPage = async ({ searchParams }: { searchParams: SearchParams }) => {
  const { redirectPath } = await searchParams;
  return (
      <LoginForm redirectPath={redirectPath} />
  );
};

export default LoginPage;
