import { Router } from "next/router";
import { appRoutes } from "../constants/appRoutes";
import { RootState } from "../store";
import { useAppSelector } from "../store/hooks/hooks";

const isBrowser = () => typeof window !== "undefined";

interface Props {
  router: Router;
  children: any;
}

const ProtectedRoute = (props: Props) => {
  const isAuthenticated = useAppSelector(
    (state: RootState) => !!state.auth.user
  );
  const { router, children } = props;

  if (isBrowser() && !isAuthenticated) {
    router.push(appRoutes.LOGIN);
  }

  return children;
};

export default ProtectedRoute;
