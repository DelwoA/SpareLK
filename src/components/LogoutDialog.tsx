import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userActions } from "../reducers/userSlice";

interface LogoutDialogProps {
  onClose: () => void;
  isOpen: boolean;
}

export default function LogoutDialog({ onClose, isOpen }: LogoutDialogProps) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear cookie if needed
    const removeCookie = (document.cookie =
      "user=; Max-Age=0; path=/; domain=" + window.location.hostname);

    // Update UI first for better perceived performance
    onClose();

    // Show toast notification
    toast.success("Successfully logged out", {
      position: "top-center",
      duration: 3000,
    });

    // Perform logout
    setTimeout(() => {
      dispatch(userActions.logout());
      navigate("/");
    }, 300);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md border-2 border-orange-200 shadow-lg animate-in fade-in zoom-in duration-200">
        <CardHeader className="bg-gradient-to-r from-orange-50 to-slate-50 rounded-t-lg">
          <CardTitle className="flex items-center gap-2 text-xl">
            <LogOut className="h-5 w-5 text-orange-500" />
            <span>Confirm Logout</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6 pb-4">
          <p className="text-slate-700">
            Are you sure you want to log out of your account? You will need to
            login again to access your profile.
          </p>
        </CardContent>
        <CardFooter className="flex justify-end gap-3 bg-gray-50 rounded-b-lg py-3">
          <Button
            variant="outline"
            onClick={onClose}
            className="border-gray-300 hover:bg-gray-100 hover:text-gray-700"
          >
            Cancel
          </Button>
          <Button
            onClick={handleLogout}
            className="bg-orange-500 hover:bg-orange-600 text-white hover:text-white"
          >
            Yes, Logout
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
