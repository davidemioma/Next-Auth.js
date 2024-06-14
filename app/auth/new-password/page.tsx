import NewPasswordForm from "@/components/auth/NewPasswordForm";

export default function NewPasswordPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const { token } = searchParams;

  return <NewPasswordForm token={token as string} />;
}
