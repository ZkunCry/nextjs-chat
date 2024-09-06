import ProfileForm from "@/components/widgets/ProfileForm";
import ProfileHeader from "@/components/widgets/ProfileHeader";
import { axiosInstance } from "@/services/axios";
import type User from "@/types/type";

type Props = {
  params: { id: number };
};

export default async function ProfilePage({ params: { id } }: Props) {
  const { data: user } = await axiosInstance.get<User>(`/api/user/${id}`);

  return (
    <div className="flex-[3] ">
      <ProfileHeader
        title="Profile"
        content="This is how others will see you on the site"
      />
      <ProfileForm user={user} />
    </div>
  );
}
