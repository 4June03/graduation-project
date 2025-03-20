export interface MotorCardProps {
  name?: string;
  image?: string;
  price?: number;
  handleClick: () => void;
}

export interface ListProductByTabProps {
  activeTab: string;
}

export interface FunctionButtonProps {
  className?: string;
  text: string;
}
