"use client";
import { useEffect, useState } from "react";
import Chat from "@/components/Chat";
import Login from "@/components/Login";

export default function Home() {
  const [isConnected, setIsConnected] = useState<boolean | null>(null);

  useEffect(() => {
    fetch("/api/gmail/session")
      .then(res => res.json())
      .then(data =>{ setIsConnected(data.connected)
        console.log(data.connected)
      })
      .catch(() => setIsConnected(false));
  }, []);

  if (isConnected === null) return <p>Loading...</p>;

  return isConnected ? <Chat /> : <Login />;
}
