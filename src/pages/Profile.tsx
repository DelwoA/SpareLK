import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, Outlet } from "react-router-dom";
import { RootState } from "../store/store";
import { userActions } from "../reducers/userSlice";
import { ErrorMessage } from "@/components/ui/error-message";
import { Button } from "@/components/ui/button";
import { RefreshCcw } from "lucide-react";

export default function Profile() {
  const { user, isUserAuthed } = useSelector((state: RootState) => state.user);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    // Check authentication without simulated delay
    if (!isUserAuthed) {
      dispatch(userActions.setPreviosPage(location.pathname));
      navigate("/");
    }
  }, [isUserAuthed]);

  if (error) {
    return (
      <div className="w-screen min-h-screen bg-gray-50 py-12 px-4 sm:px-6 md:px-8">
        <div className="max-w-md mx-auto">
          <ErrorMessage message={error} />
          <div className="mt-4 flex justify-center">
            <Button
              onClick={() => window.location.reload()}
              className="bg-orange-500 hover:bg-orange-600 text-white"
            >
              <RefreshCcw className="h-4 w-4 mr-2" />
              Try Again
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return isUserAuthed && user && <Outlet />;
}
