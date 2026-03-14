import Link from "next/link";
import Image from "next/image";
import { company } from "@/lib/site-content";

type BrandProps = {
  href?: string;
  showName?: boolean;
  logoClassName?: string;
  nameClassName?: string;
  className?: string;
};

export function Brand({
  href = "#inicio",
  showName = true,
  logoClassName = "h-9 w-auto",
  nameClassName = "text-sm font-semibold tracking-[0.14em]",
  className = "",
}: BrandProps) {
  return (
    <Link href={href} className={`inline-flex items-center gap-3 ${className}`}>
      <Image src="/simple-core-logo.svg" alt={`${company.name} logo`} width={168} height={46} className={logoClassName} />
      {showName ? <span className={nameClassName}>{company.name.toUpperCase()}</span> : null}
    </Link>
  );
}
