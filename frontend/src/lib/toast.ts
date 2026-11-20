import { toast as sonner } from "sonner";

// sonner liefert Stapel und Animation, das Aussehen kommt von .ds-toast (siehe components/ui/sonner.tsx).
export const toast = {
  success: (text: string) => {
    return sonner.success(text);
  },
  error: (text: string) => {
    return sonner.error(text, { duration: Infinity });
  },
};
