import Image from "next/image";
import Link from "next/link";
import { Button } from "primereact/button";

export default async function NotFound() {
  return (
    <div className="flex items-center justify-center gap-9">
      <Image
        src={`/404.png`}
        alt="404"
        width={750}
        height={750}
      />
      <div className="flex flex-col items-center gap-15">
        <Image
          src={`/404_t.png`}
          alt="404 text"
          width={312}
          height={215}
        />
        <Button severity="help" rounded>
          <Link href={`/dashboard`} className="button-for-link">
            Go Home
          </Link>
        </Button>
      </div>
    </div>
  );
}
