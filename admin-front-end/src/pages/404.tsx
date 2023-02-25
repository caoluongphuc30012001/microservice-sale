import React from "react";
import Link from "next/link";
import Image from "next/image";
import bg404 from "public/background/404.png";

const NotFound = () => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      width: "100vw",
      height: "100vh",
      alignItems: "center",
    }}
  >
    <Image src={bg404} alt="not-found" />
    <Link href="/dashboard/product" className="link-home">
      Go Home
    </Link>
  </div>
);

export default NotFound;
