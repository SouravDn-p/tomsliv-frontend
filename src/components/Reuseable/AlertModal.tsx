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
import { Button } from "@/components/ui/button";
import { useAppDispatch } from "@/hooks/useRedux";
import { useDeleteSelfMutation } from "@/redux/features/auth/authApi";
import { logOut } from "@/redux/features/auth/authSlice";
import { toast } from "sonner";

export function AlertModal() {
  const [deleteSelf] = useDeleteSelfMutation();
  const dispatch = useAppDispatch();
  const handleDeleteAccount = async () => {
    try {
      await deleteSelf().unwrap();
      toast.success("Account deleted successfully!");
      dispatch(logOut());
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to delete account");
    }
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger className="border-none" asChild>
        <Button
          className="bg-destructive text-white mt-6 px-6 w-fit"
          variant="outline"
        >
          Delete Account
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-white border-none">
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className="bg-red-600 text-white"
            onClick={handleDeleteAccount}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
