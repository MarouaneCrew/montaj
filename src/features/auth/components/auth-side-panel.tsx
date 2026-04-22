import Image from "next/image";

export function AuthSidePanel() {
  return (
    <div className="relative h-full w-full bg-gradient-to-br from-primary-200 via-primary-400 to-primary-600">
      <div className="image">
        <Image
          src={"/auth-page/montaj-login.png"}
          alt="montaj login banner"
          fill
          className="object-cover"
        />
      </div>
      {/* <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.4),transparent_60%)]" /> */}
      <div className="absolute bottom-8 right-8 text-sm font-medium text-fg-on-primary/80">
        Generated in Muntaj
      </div>
    </div>
  );
}
