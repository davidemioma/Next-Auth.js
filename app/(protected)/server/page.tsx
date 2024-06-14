import { currentUser } from "@/lib/auth";
import UserInfo from "@/components/UserInfo";

export default async function ServerPage() {
  const { user } = await currentUser();

  return <UserInfo label="💻 Server component" user={user} />;
}
