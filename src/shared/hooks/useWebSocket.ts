import { useEffect, useState } from "react";

export const useWebSocket = (url: string) => {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    const ws = new WebSocket(url);

    ws.onopen = () => console.log("WebSocket подключен");

    ws.onmessage = (event) => {
      setMessages((prev) => [...prev, event.data]);
    };

    ws.onerror = (error) => console.error("Ошибка WebSocket:", error);

    ws.onclose = () => console.log("WebSocket соединение закрыто");

    setSocket(ws);

    return () => {
      ws.close();
    };
  }, [url]);

  return { socket, messages };
};
