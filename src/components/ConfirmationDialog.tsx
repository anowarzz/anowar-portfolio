import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import type { ReactNode } from "react";
import { useEffect, useState } from "react";

interface IProps {
  children: ReactNode;
  description: string;
  onConfirm: () => void;
  isLoading?: boolean;
  title?: string;
  confirmText?: string;
  cancelText?: string;
  loadingText?: string;
}

export function ConfirmationDialog({
  children,
  description,
  onConfirm,
  isLoading = false,
  title = "Are you absolutely sure?",
  confirmText = "Continue",
  cancelText = "Cancel",
  loadingText = "Processing...",
}: IProps) {
  const [open, setOpen] = useState(false);
  const [wasLoading, setWasLoading] = useState(false);

  // Track loading state changes
  useEffect(() => {
    if (isLoading) {
      setWasLoading(true);
    } else if (wasLoading && !isLoading) {
      // Loading just finished, show success briefly then close
      const timer = setTimeout(() => {
        setOpen(false);
        setWasLoading(false);
      }, 1200);
      return () => clearTimeout(timer);
    }
  }, [isLoading, wasLoading]);

  const handleConfirm = () => {
    if (!isLoading) {
      onConfirm();
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent className="bg-gray-900 border-gray-700">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-white">{title}</AlertDialogTitle>
          <AlertDialogDescription className="text-gray-300">
            {description}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            className="bg-gray-700 text-white border-gray-600 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isLoading}
            onClick={(e) => {
              if (isLoading) {
                e.preventDefault();
              }
            }}
          >
            {cancelText}
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleConfirm}
            className={`transition-all duration-300 ${
              isLoading
                ? "bg-red-400 opacity-80 cursor-not-allowed"
                : wasLoading && !isLoading
                ? "bg-green-600 hover:bg-green-600"
                : "bg-red-600 hover:bg-red-700"
            } text-white`}
            disabled={isLoading || (wasLoading && !isLoading)}
          >
            {isLoading ? (
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                {loadingText}
              </div>
            ) : wasLoading && !isLoading ? (
              <div className="flex items-center">
                <div className="w-4 h-4 mr-2 text-white">✓</div>
                Completed
              </div>
            ) : (
              confirmText
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
