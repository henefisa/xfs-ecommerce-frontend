import React, { useEffect } from "react";

export default function useDetectClickOutside(
  ref: React.RefObject<any> | null,
  callback: () => void
) {
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref?.current && !ref?.current.contains(e.target as Node)) {
        callback();
      }

      document.addEventListener("click", handleClickOutside);
      return () => {
        document.removeEventListener("click", handleClickOutside);
      };
    };
  }, [ref, callback]);
}
