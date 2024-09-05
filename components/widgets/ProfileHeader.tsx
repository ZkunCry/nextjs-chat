type Props = {
  title: string;
  content: string;
};
const ProfileHeader = ({ title, content }: Props) => {
  return (
    <div className="border-b mb-[16px]">
      <h1 className="font-medium text-lg">{title}</h1>
      <p className="mb-[16px] text-sm text-gray-400">{content}</p>
    </div>
  );
};

export default ProfileHeader;
