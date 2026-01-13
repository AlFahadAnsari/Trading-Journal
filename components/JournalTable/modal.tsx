"use client";

import { useForm } from "react-hook-form";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import toast from "react-hot-toast";
import axios from "axios";
import {  JournalSchemaType } from "../Common/Types";
import { useState } from "react";

export default function EditModal({
  entry,
  onClose,
}: {
  entry: JournalSchemaType;
  onClose: () => void;
}) {
  const { register, handleSubmit, setValue, watch } = useForm<Partial<JournalSchemaType>>({
    defaultValues: entry,
  });

  const emotions = watch("emotions") ?? [];

  const updateEmotions = (emotion: string, checked: boolean) => {
    if (checked) setValue("emotions", [...emotions, emotion]);
    else setValue("emotions", emotions.filter((v) => v !== emotion));
  };

  const onSubmit = async (data: Partial<JournalSchemaType>) => {
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
      <DialogContent className="max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Journal</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

          {/* Trade Overview */}
          <Select onValueChange={(v) => setValue("totalTrades", v)} defaultValue={entry.totalTrades}>
            <SelectTrigger className="w-full"><SelectValue placeholder="Total Trades" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="1">1</SelectItem>
              <SelectItem value="2">2</SelectItem>
              <SelectItem value="3">3</SelectItem>
            </SelectContent>
          </Select>

          <Select onValueChange={(v) => setValue("session", v)} defaultValue={entry.session}>
            <SelectTrigger className="w-full"><SelectValue placeholder="Session" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="Asia">Asia</SelectItem>
              <SelectItem value="London">London</SelectItem>
              <SelectItem value="New York">New York</SelectItem>
            </SelectContent>
          </Select>

          <Select onValueChange={(v) => setValue("tradeResult", v)} defaultValue={entry.tradeResult}>
            <SelectTrigger className="w-full"><SelectValue placeholder="Trade Result" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="Profit">Profit</SelectItem>
              <SelectItem value="Loss">Loss</SelectItem>
              <SelectItem value="BreakEven">Break Even</SelectItem>
              <SelectItem value="RiskFree">Risk Free</SelectItem>
            </SelectContent>
          </Select>

          <Input {...register("profit")} placeholder="Profit ₹" />
          <Input {...register("loss")} placeholder="Loss ₹" />

          {/* Setup & Planning */}
          <Select onValueChange={(v) => setValue("setup", v)} defaultValue={entry.setup}>
            <SelectTrigger className="w-full"><SelectValue placeholder="Setup" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="Haan">Haan</SelectItem>
              <SelectItem value="Nahi">Nahi</SelectItem>
            </SelectContent>
          </Select>

          <Input {...register("reason")} placeholder="Reason" />
          <Textarea {...register("confirmations")} placeholder="Confirmations" />
          <Checkbox onCheckedChange={(v) => setValue("fixedSL", !!v)} checked={entry.fixedSL} /> Fixed SL
          <Input {...register("riskPercent")} placeholder="Risk %" />
          <Input {...register("rr")} placeholder="RR" />

          {/* Analysis */}
          <Textarea {...register("zoneReason")} placeholder="Zone Reason" />
          <Textarea {...register("chartAnalysis")} placeholder="Chart Analysis" />
          <Textarea {...register("learning")} placeholder="Learning" />

          {/* Execution */}
          <Textarea {...register("entryReview")} placeholder="Entry Review" />

          <div className="flex flex-wrap gap-4">
            {["Fear", "FOMO", "Over-confidence", "Emotionless"].map((e) => (
              <label key={e} className="flex gap-2 items-center">
                <Checkbox
                  checked={emotions.includes(e)}
                  onCheckedChange={(v) => updateEmotions(e, !!v)}
                />
                {e}
              </label>
            ))}
          </div>

          {/* Mistakes */}
          <Select onValueChange={(v) => setValue("mistake", v === "Haa")} defaultValue={entry.mistake ? "Haa" : "Nahi"}>
            <SelectTrigger className="w-full"><SelectValue placeholder="Mistake?" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="Haa">Haa</SelectItem>
              <SelectItem value="Nahi">Nahi</SelectItem>
            </SelectContent>
          </Select>

          <Textarea {...register("mistakeReason")} placeholder="Mistake Reason" />
          <Textarea {...register("avoidPlan")} placeholder="Avoid Plan" />

          {/* Positive */}
          <Textarea {...register("positive")} placeholder="Positive" />

          <Select onValueChange={(v) => setValue("improved", v)} defaultValue={entry.improved}>
            <SelectTrigger className="w-full"><SelectValue placeholder="Improved?" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="Haan">Haan</SelectItem>
              <SelectItem value="Nahi">Nahi</SelectItem>
            </SelectContent>
          </Select>

          <Textarea {...register("improvementReason")} placeholder="Improvement Reason" />

          {/* Documentation */}
          <Select onValueChange={(v) => setValue("updateDone", v === "Done")} defaultValue={entry.updateDone ? "Done" : "NotDone"}>
            <SelectTrigger className="w-full"><SelectValue placeholder="Update Done?" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="Done">Done</SelectItem>
              <SelectItem value="NotDone">Not Done</SelectItem>
            </SelectContent>
          </Select>

          <DialogFooter>
            <Button type="submit">Save Changes</Button>
            <Button type="button" variant="secondary" onClick={onClose}>
              Cancel
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
