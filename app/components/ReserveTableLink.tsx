import { reserveTableWhatsAppUrl } from "@/lib/whatsapp";

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
      href={reserveTableWhatsAppUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      onClick={onClick}
    >
      {children}
    </a>
  );
}
