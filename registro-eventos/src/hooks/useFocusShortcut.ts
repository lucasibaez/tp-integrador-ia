import { useEffect } from "react";

export function useFocusShortcut(
  key: string,
  ref: React.RefObject<HTMLInputElement | null>
) {
  useEffect(() => {

    const handleKeyDown = (e: KeyboardEvent) => {

      if (e.ctrlKey && e.key.toLowerCase() === key.toLowerCase()) {
        e.preventDefault();
        ref.current?.focus();
      }

    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);

  }, [key, ref]);
}