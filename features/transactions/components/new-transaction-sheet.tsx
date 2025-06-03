/* eslint-disable @typescript-eslint/no-unused-vars */
import { z } from "zod";

import { useNewTransaction } from "@/features/transactions/hooks/use-new-transaction";
import { TransactionForm } from "@/features/transactions/components/transaction-form";
import { useCreateTransaction } from "@/features/transactions/api/use-create-transaction";

import { inserTransactionSchema } from "@/db/schema";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";


const formSchema = inserTransactionSchema.omit({
  id: true,
});

type FormValues = z.input<typeof formSchema>;

export const NewTransactionSheet = () => {
  const { isOpen, onClose } = useNewTransaction();

  const mutation = useCreateTransaction();

  const onSubmit = (values: FormValues) => {
    mutation.mutate(values, {
      onSuccess: () => {
        onClose();
      }
    });
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="space-y-4">
        <SheetHeader>
          <SheetTitle>
            New Transaction
          </SheetTitle>
          <SheetDescription>
            Create a new transaction to track your transaction.s.
          </SheetDescription>
        </SheetHeader>
        <TransactionForm
          onSubmit={onSubmit}
          disabled={mutation.isPending}
          defaultValues={{
            name: "",
          }}
        />
      </SheetContent>
    </Sheet>
  );
};
