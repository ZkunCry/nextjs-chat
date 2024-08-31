import ProfileForm from "@/components/widgets/ProfileForm";
import { axiosInstance } from "@/services/axios";
import type User from "@/types/type";

type Props = {
  params: { id: number };
};

export default async function ProfilePage({ params: { id } }: Props) {
  const { data: user } = await axiosInstance.get<User>(`/api/user/${id}`);

  return (
    <div className="flex-1 max-w-2xl">
      <ProfileForm user={user} />
    </div>
  );
}
