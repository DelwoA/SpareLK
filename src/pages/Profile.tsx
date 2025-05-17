import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, Outlet } from "react-router-dom";
import { RootState } from "../store/store";
import { userActions } from "../reducers/userSlice";

export default function Profile() {
  const { user, isUserAuthed } = useSelector((state: RootState) => state.user);

  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isUserAuthed) {
      dispatch(userActions.setPreviosPage(location.pathname));
      navigate("/");
    }
  }, []);

  return isUserAuthed && user && <Outlet />;
}
