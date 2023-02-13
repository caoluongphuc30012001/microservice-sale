import MainLayout from "@/components/layouts/main-layout";
import style from "@/styles/Home.module.css";
import background from "public/background/background.jpg";
import Image from "next/image";

export default function Home() {
  return (
    <MainLayout>
      <div className={style["home-page"]}>
        <Image src={background} alt="" className={style["background"]} />
      </div>
    </MainLayout>
  );
}
