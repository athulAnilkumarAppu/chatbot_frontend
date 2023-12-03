import Image from "next/image";
import styles from "./page.module.css";
import ChatInterface from "@/components/chatBot/ChatInterface";

export default function Home() {
  return (
    <main>
      <ChatInterface />
    </main>
  );
}
