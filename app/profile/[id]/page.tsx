import PageHeader from "@/components/widgets/PageHeader";
import { axiosInstance } from "@/services/axios";
import type User from "@/types/type";

type Props = {
  params: { id: number };
};
export default async function ProfilePage({ params: { id } }: Props) {
  const { data: user } = await axiosInstance.get<User>(`/api/user/${id}`);

  return (
    <div className="flex flex-col h-full">
      <PageHeader />
      <div className="flex container  ">
        <div className="flex flex-col  w-full inner border mt-[10px] rounded-lg p-7">
          <div className="header border-b w-full">
            <h1 className="font-bold text-[32px]">Settings</h1>
            <p className="text-gray-300 mb-4">
              Manage your account settings and set e-mail preferences.
            </p>
          </div>
          <div className="flex flex-col lg:flex-row">
            <aside>f</aside>
            <div>f</div>
          </div>
        </div>
      </div>
    </div>
  );
}
