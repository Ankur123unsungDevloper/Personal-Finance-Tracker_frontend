import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export const useConfirm = (
  title: string,
  message: string,
): [() => JSX.Element, () => Promise<unknown>] => {
  const [promise, setPromise] = useState<{resolve: (value: boolean) => void} | null>(null);
}