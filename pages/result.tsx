import { updateOrder } from "apis";
import Button from "components/common/Button/Button";
import { useAppSelector } from "hooks";
import CommonLayout from "layouts/CommonLayout";
import { EOrderStatus } from "models/Order";
import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import * as React from "react";

const Result: NextPage = () => {
  const router = useRouter();
  const order = useAppSelector((state) => state.order.order);

  React.useEffect(() => {
    if (!order || router.query.redirect_status !== "succeeded") return;

    updateOrder(order.id, EOrderStatus.PROCESSING);
  }, [order, router.query.redirect_status]);

  if (router.query.redirect_status === "succeeded") {
    return (
      <CommonLayout>
        <div className="mx-auto mt-6 max-w-xl relative flex flex-col sm:flex-row sm:items-center bg-white shadow rounded-md py-5 pl-6 pr-8 sm:pr-6">
          <div className="flex flex-row items-center border-b sm:border-b-0 w-full sm:w-auto pb-4 sm:pb-0">
            <div className="text-green-500">
              <svg
                className="w-6 sm:w-5 h-6 sm:h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
            </div>
            <div className="text-sm font-medium ml-3">Success Payment.</div>
          </div>
          <div className="text-sm tracking-wide text-gray-500 mt-4 sm:mt-0 sm:ml-4">
            Your Payment was Successful. You can use our services!
          </div>
        </div>
        <div className="mt-4 text-center">
          <Button>
            <Link href="/">
              <a>Back to home</a>
            </Link>
          </Button>
        </div>
      </CommonLayout>
    );
  }

  return (
    <CommonLayout>
      <div className="mx-auto mt-6 max-w-xl relative flex flex-col sm:flex-row sm:items-center bg-white shadow rounded-md py-5 pl-6 pr-8 sm:pr-6">
        <div className="flex flex-row items-center border-b sm:border-b-0 w-full sm:w-auto pb-4 sm:pb-0">
          <div className="text-green-500"></div>
          <div className="text-sm font-medium ml-3">Payment Failed.</div>
        </div>
        <div className="text-sm tracking-wide text-gray-500 mt-4 sm:mt-0 sm:ml-4">
          Your Payment was failed.
        </div>
      </div>
      <div className="mt-4 text-center">
        <Button>
          <Link href="/">
            <a>Back to home</a>
          </Link>
        </Button>
      </div>
    </CommonLayout>
  );
};

export default Result;
