import AccountForm from "@/components/widgets/AccountForm";
import ProfileHeader from "@/components/widgets/ProfileHeader";
import User from "@/types/type";
import { axiosInstance } from "@/services/axios";
type Props = {
  params: { id: number };
};

export default async function Account({ params: { id } }: Props) {
  const { data: user } = await axiosInstance.get<User>(`/api/user/${id}`);
  return (
    <div className="flex-1 max-w-2xl">
      <ProfileHeader
        title="Account"
        content="Update your account settings. Set your preferred language and timezone."
      />
      <AccountForm user={user} />
    </div>
  );
}
