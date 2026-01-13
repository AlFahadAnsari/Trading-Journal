"use client";

import { useForm } from "react-hook-form";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";
import axios from "axios";
import { JournalEntry } from "../Common/Types";

export default function EditModal({
  entry,
  onClose,
}: {
  entry: JournalEntry;
  onClose: () => void;
}) {
  const { register, handleSubmit } = useForm<Partial<JournalEntry>>({
    defaultValues: entry,
  });

  const onSubmit = async (data: Partial<JournalEntry>) => {
    try {
      await axios.put(`/api/journals/${entry.id}`, data);
      toast.success("Updated successfully");
      onClose();
    } catch {
      toast.error("Failed to update");
    }
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Journal</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          <Input {...register("session")} placeholder="Session" />
          <Input {...register("tradeResult")} placeholder="Profit/Loss/BE" />
          <Input {...register("profit")} placeholder="Profit ₹" />
          <Input {...register("loss")} placeholder="Loss ₹" />

          <DialogFooter>
            <Button type="submit">Save</Button>
            <Button variant="secondary" onClick={onClose}>
              Cancel
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
