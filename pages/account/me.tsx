import { InferGetServerSidePropsType } from "next";
import { END } from "redux-saga";

// store
import { SagaStore, wrapper } from "store";
import { authActions } from "store/auth/authSlice";

import AccountView from "views/Account/Account";

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    store.dispatch(authActions.getUserInfoRequest());
    store.dispatch(END);
    await (store as SagaStore).sagaTask?.toPromise();

    if (store.getState().auth.user) {
      return {
        props: {},
      };
    }

    return {
      props: {},
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
);

type AccountProps = InferGetServerSidePropsType<typeof getServerSideProps>;

const MyAccount: React.FC<AccountProps> = () => {
  return <AccountView />;
};

export default MyAccount;
