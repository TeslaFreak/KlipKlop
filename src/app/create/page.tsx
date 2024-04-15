"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { create } from "@/app/actions";
import { SubmitButton } from "@/components/SubmitButton";
import { useFormState } from "react-dom";

const initialState = {
  message: "",
};

export default function CreateModal() {
  const [state, formAction] = useFormState(create, initialState);
  const router = useRouter();

  const closeModal = () => {
    router.back();
  };

  return (
    <Dialog defaultOpen={true} onOpenChange={closeModal}>
      <DialogContent className="sm:max-w-[425px]">
        <form action={formAction}>
          <DialogHeader>
            <DialogTitle>Save Video By URL</DialogTitle>
            <DialogDescription>
              Save a video to your collection
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                URL
              </Label>
              <p aria-live="polite" className="sr-only">
                {state?.message}
              </p>
              <Input id="url" name="url" type="url" className="col-span-3" />
            </div>
          </div>
          <DialogFooter>
            <SubmitButton />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
