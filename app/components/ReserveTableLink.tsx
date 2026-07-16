import { BUSINESS } from "@/lib/site";

type ReserveTableLinkProps = {
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
};

export default function ReserveTableLink({
  className,
  children,
  onClick,
}: ReserveTableLinkProps) {
  return (
    <a
      href={BUSINESS.reserveTableUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      onClick={onClick}
    >
      {children}
    </a>
  );
}
