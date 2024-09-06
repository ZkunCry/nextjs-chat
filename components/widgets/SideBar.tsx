import React from "react";

type Props = {
  children:React.ReactNode
  className: string;
};
const SideBar = ({  className = "",children }: Props) => {

  return (
    <aside className={`${className}`}>
    {children}
    </aside>
  );
};

export default SideBar;
