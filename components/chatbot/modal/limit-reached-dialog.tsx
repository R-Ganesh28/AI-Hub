"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface LimitReachedDialogProps {
  open: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

export default function LimitReachedDialog({
  open,
  onCancel,
  onConfirm,
}: LimitReachedDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onCancel}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Session Limit Reached</DialogTitle>
          <DialogDescription>
            The current session has exceeded the response length limit. Do you
            want to start a new session?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            className="cursor-pointer"
            variant="outline"
            onClick={onCancel}
          >
            Cancel
          </Button>
          <Button className="cursor-pointer" onClick={onConfirm}>
            Start New Session
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
