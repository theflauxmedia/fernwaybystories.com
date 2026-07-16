import Image from "next/image";

export default function FooterCredits() {
  return (
    <div className="footer-credits">
      <div className="footer-credits-inner section-wrap">
        <Image
          src="/brands/flauxmedia.png"
          alt="The Flaux Media"
          width={72}
          height={24}
          className="footer-credits-logo"
        />
        <p className="footer-credits-text">
          Website designed and developed by{" "}
          <a
            href="https://theflauxmedia.in"
            target="_blank"
            rel="noopener noreferrer"
          >
            TheFlauxMedia
          </a>
        </p>
      </div>
    </div>
  );
}
