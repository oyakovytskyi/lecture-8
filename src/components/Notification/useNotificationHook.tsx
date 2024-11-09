import { useState, useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";
import axiosInstance from "../../api/axiosInstance";

const SOCKET_SERVER_URL = `${axiosInstance.defaults.baseURL}notifications`;

export const useSocket = () => {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [message, setMessage] = useState("");
  const isAtTopRef = useRef<boolean>(true);
  const topOfPageRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const socket: Socket = io(SOCKET_SERVER_URL);

    socket.on("newPost", (data: { message: string; user: string }) => {
      setMessage(`User ${data.user} created a new post with description: ${data.message}`);
      setOpenSnackbar(true);

      if (isAtTopRef.current) {
        window.location.reload();
      }
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    const topObserver = new IntersectionObserver(
      (entries) => {
        const isTop = !entries[0].isIntersecting;
        isAtTopRef.current = isTop;
      },
      { rootMargin: "0px 0px -100% 0px" }
    );

    if (topOfPageRef.current) topObserver.observe(topOfPageRef.current);
    return () => topObserver.disconnect();
  }, []);

  return {
    openSnackbar,
    message,
    setOpenSnackbar,
    setMessage,
    isAtTopRef,
    topOfPageRef,
  };
};
