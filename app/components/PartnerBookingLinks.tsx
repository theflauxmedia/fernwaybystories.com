import Image from "next/image";
import { BUSINESS } from "@/lib/site";

type PartnerBookingLinksProps = {
  variant?: "dark" | "light";
  label?: string;
};

export default function PartnerBookingLinks({
  variant = "dark",
  label = "Also book on",
}: PartnerBookingLinksProps) {
  return (
    <div className={`partner-booking partner-booking--${variant}`}>
      <p className="partner-booking-label">{label}</p>
      <div className="partner-booking-grid">
        {BUSINESS.bookingPartners.map((partner) => (
          <a
            key={partner.id}
            href={partner.href}
            className="partner-booking-link"
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Book on ${partner.name}`}
          >
            <Image
              src={partner.logo}
              alt={partner.name}
              width={partner.logoWidth}
              height={partner.logoHeight}
              className="partner-booking-logo"
            />
          </a>
        ))}
      </div>
    </div>
  );
}
