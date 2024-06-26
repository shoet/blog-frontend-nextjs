import Image from "next/image";
import styles from "./page.module.css";
import { Badge } from "./_components/Atoms/Badge";

export default function Home() {
  return (
    <div>
      <Badge backgroundColor="blue" color="white">
        hoge
      </Badge>
    </div>
  );
}
