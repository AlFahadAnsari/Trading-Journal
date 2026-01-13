"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import z from "zod";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useState } from "react";
import { Spinner } from "@/components/ui/spinner";

import axios from "axios";
import { journalSchema } from "../../components/Common/Types";
import { uploadToCloudinary } from "../../components/Common/useUpload";

const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div className="space-y-1 w-full">
    <Label className="font-medium">{label}</Label>
    {children}
  </div>
);

const Page = () => {
  type JournalSchemaType = z.infer<typeof journalSchema>;
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, reset, setValue, watch } = useForm<JournalSchemaType>({
    resolver: zodResolver(journalSchema),
    defaultValues: { emotions: [] },
  });

  const emotions = watch("emotions");

  const updateEmotions = (emotion: string, checked: boolean) => {
    if (checked) setValue("emotions", [...(emotions ?? []), emotion]);
    else setValue("emotions", (emotions ?? []).filter((v) => v !== emotion));
  };

  const onSubmit: SubmitHandler<JournalSchemaType> = async (data) => {
    setLoading(true);

    try {
      let img1 = "";

      const fileInput = document.getElementById("screenshot-upload") as HTMLInputElement;
      const file = fileInput?.files?.[0];

      if (file) {
        img1 = await uploadToCloudinary(file);
      }

      await axios.post("/api/journals", {
        ...data,
        img1,
        date: new Date(),
      });

      toast.success("Journal Saved!");
      reset();
    } catch (error) {
      toast.error("Something went wrong!");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-1 max-w-3xl mx-auto space-y-8">
      <h1 className="text-2xl font-bold text-center">Daily Trading Journal</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">

        <Card>
          <CardHeader><CardTitle>A. Trade Overview</CardTitle></CardHeader>
          <CardContent className="space-y-6">
            <Field label="Aaj total kitne trade liye">
              <Select onValueChange={(v) => setValue("totalTrades", v)}>
                <SelectTrigger className="w-full"><SelectValue placeholder="Select" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1</SelectItem>
                  <SelectItem value="2">2</SelectItem>
                  <SelectItem value="3">3</SelectItem>
                </SelectContent>
              </Select>
            </Field>

            <Field label="Trading Session">
              <Select onValueChange={(v) => setValue("session", v)}>
                <SelectTrigger className="w-full"><SelectValue placeholder="Select" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Asia">Asia</SelectItem>
                  <SelectItem value="London">London</SelectItem>
                  <SelectItem value="New York">New York</SelectItem>
                </SelectContent>
              </Select>
            </Field>

            <Field label="Trade Result">
              <RadioGroup onValueChange={(v) => setValue("tradeResult", v)} className="space-y-2">
                {["Profit", "Loss", "BreakEven", "RiskFree"].map((r) => (
                  <Label key={r} className="flex gap-2 items-center font-normal">
                    <RadioGroupItem value={r} /> {r}
                  </Label>
                ))}
              </RadioGroup>
            </Field>

            <Field label="Profit Kitna Hua">
              <Input {...register("profit")} placeholder="Amount ₹" />
            </Field>

            <Field label="Loss Kitna Hua">
              <Input {...register("loss")} placeholder="Amount ₹" />
            </Field>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>B. Setup & Planning</CardTitle></CardHeader>
          <CardContent className="space-y-6">
            <Field label="Proper Setup bana tha?">
              <Select onValueChange={(v) => setValue("setup", v)}>
                <SelectTrigger className="w-full"><SelectValue placeholder="Select" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Haan">Haan</SelectItem>
                  <SelectItem value="Nahi">Nahi</SelectItem>
                </SelectContent>
              </Select>
            </Field>

            <Field label="Trade lene ka clear reason kya tha?">
              <Input {...register("reason")} placeholder="Liquidity, A+, TJL zone etc." />
            </Field>

            <Field label="Kaun-kaun se confirmations mile the?">
              <Textarea {...register("confirmations")} placeholder="Min 2-3 likho" />
            </Field>

            <div className="space-y-2">
              <Label className="font-medium">Risk Management follow kiya?</Label>
              <Label className="flex gap-2 items-center font-normal">
                <Checkbox onCheckedChange={(v) => setValue("fixedSL", !!v)} />
                Fixed SL
              </Label>
              <Input {...register("riskPercent")} placeholder="Risk %" />
              <Input {...register("rr")} placeholder="RR e.g. 1:2" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>C. Analysis Details</CardTitle></CardHeader>
          <CardContent className="space-y-6">
            <Field label="Konse time frame ke Zone par Trade liye aur Kyun?">
              <Textarea {...register("zoneReason")} />
            </Field>

            <Field label="Konse time frame mein confirmations ke saath entry liye aur kyun?">
              <Textarea {...register("chartAnalysis")} />
            </Field>

            <Field label="Aaj chart se kya naya seekhne ko mila?">
              <Textarea {...register("learning")} />
            </Field>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>D. Execution Review</CardTitle></CardHeader>
          <CardContent className="space-y-6">
            <Field label="Entry sahi jagah par hui ya jaldi/late?">
              <Textarea {...register("entryReview")} />
            </Field>

            <Field label="Emotions involved the?">
              <div className="flex flex-wrap gap-4">
                {["Fear", "FOMO", "Over-confidence", "Emotionless"].map((e) => (
                  <Label key={e} className="flex gap-2 items-center font-normal">
                    <Checkbox
                      checked={emotions?.includes(e)}
                      onCheckedChange={(v) => updateEmotions(e, !!v)}
                    />
                    {e}
                  </Label>
                ))}
              </div>
            </Field>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>E. Mistake / Improvement</CardTitle></CardHeader>
          <CardContent className="space-y-6">
            <Field label="Aaj koi galti hui?">
              <Select onValueChange={(v) => setValue("mistake", v === "Haa")}>
                <SelectTrigger className="w-full"><SelectValue placeholder="Select" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Haa">Haa</SelectItem>
                  <SelectItem value="Nahi">Nahi</SelectItem>
                </SelectContent>
              </Select>
            </Field>

            <Field label="Agar galti hui to kya aur kyun hui?">
              <Textarea {...register("mistakeReason")} />
            </Field>

            <Field label="Future mein is galti ko kaise avoid karunga?">
              <Textarea {...register("avoidPlan")} />
            </Field>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>F. Positive Review</CardTitle></CardHeader>
          <CardContent className="space-y-6">
            <Field label="Aaj kya cheez best rahi?">
              <Textarea {...register("positive")} />
            </Field>

            <Field label="Aaj ka trade overall improve hua ya nahi?">
              <Select onValueChange={(v) => setValue("improved", v)}>
                <SelectTrigger className="w-full"><SelectValue placeholder="Improved?" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Haan">Haan</SelectItem>
                  <SelectItem value="Nahi">Nahi</SelectItem>
                </SelectContent>
              </Select>
            </Field>

            <Field label="Why improve/not improve?">
              <Textarea {...register("improvementReason")} />
            </Field>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>G. Documentation</CardTitle></CardHeader>
          <CardContent className="space-y-6">
            <Field label="Trade update kiya?">
              <Select onValueChange={(v) => setValue("updateDone", v === "Done")}>
                <SelectTrigger className="w-full"><SelectValue placeholder="Trade Update?" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Done">Update Done</SelectItem>
                  <SelectItem value="NotDone">Not Done</SelectItem>
                </SelectContent>
              </Select>
            </Field>

            <Field label="Chart Screenshots Attached">
              <Input id="screenshot-upload" type="file" accept="image/*" />
            </Field>
          </CardContent>
        </Card>


        <Input {...register("zoneTradeTF")} placeholder="Timeframe" className="hidden" />
        <Input {...register("confirmTF")} placeholder="Confirm TF" className="hidden" />


        <Button className="w-full text-lg" type="submit">
          {loading ? (
            <>
              <Spinner /> Please wait
            </>
          ) : (
            "Save Journal"
          )}
        </Button>
      </form>
    </div>
  );
};

export default Page;
