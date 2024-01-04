import { FC } from "react";

type Props = {
  children: React.ReactNode;
};

export const BookLayouts: FC<Props> = ({ children }) => {
  return (
    <div className="w-full">
      <div className="w-full p-12">{children}</div>
    </div>
  );
};
