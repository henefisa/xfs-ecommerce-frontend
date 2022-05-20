import { Listbox, Transition } from "@headlessui/react";
import { createOrder } from "apis";
import Button from "components/common/Button/Button";
import Card from "components/common/Card/Card";
import { Form, FormItem } from "components/common/Form";
import Input from "components/common/Input/Input";
import { useAppDispatch, useAppSelector } from "hooks";
import CommonLayout from "layouts/CommonLayout";
import { OrderRequest } from "models/Order";
import Head from "next/head";
import { useRouter } from "next/router";
import * as React from "react";
import { addOrder } from "store/order/orderSlice";
import * as yup from "yup";

const options = [
  {
    title: "Cash",
    value: "cash",
  },
  {
    title: "Card",
    value: "card",
  },
];

interface FormValues {
  address: string;
  province: string;
  district: string;
  village: string;
  phoneNumber: string;
}

const phoneRegex =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const schema = yup.object().shape({
  address: yup.string().required("Address is required!").trim(),
  province: yup.string().required("Province is required!").trim(),
  district: yup.string().required("District is required!").trim(),
  village: yup.string().required("Village is required!").trim(),
  phoneNumber: yup.string().matches(phoneRegex, "Phone number is not valid"),
});

const CheckoutView: React.FC = () => {
  const [selected, setSelected] = React.useState(options[0]);
  const router = useRouter();
  const carts = useAppSelector((state) => state.carts.carts);
  const [isLoading, setIsLoading] = React.useState(false);
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    if (!carts.length) {
      router.push("/");
    }
  }, [carts.length, router]);

  const handleSubmit = async (values: FormValues) => {
    setIsLoading(true);
    const data: OrderRequest = {
      ...values,
      paymentType: selected.value,
      products: carts.map((item) => ({
        productId: item.id,
        quantity: item.quantity,
      })),
    };

    const response = await createOrder(data);

    if (response.status === 201) {
      dispatch(addOrder(response.data.order));

      if (selected.value === "cash") {
        router.push("/result?redirect_status=succeeded");
      }

      if (selected.value === "card") {
        router.push(
          `/order?success=true&type=card&intent=${response.data.intent}&orderId=${response.data.order.id}`
        );
      }
    } else {
      router.push("/result");
    }

    setIsLoading(false);
  };

  return (
    <CommonLayout>
      <Head>
        <title>Checkout</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Card className="mx-auto max-w-3xl mt-10">
        <Form onSubmit={handleSubmit} schema={schema}>
          <FormItem label="Address" name="address">
            <Input placeholder="Address" />
          </FormItem>
          <FormItem label="Province" name="province">
            <Input placeholder="Province" />
          </FormItem>
          <FormItem label="District" name="district">
            <Input placeholder="District" />
          </FormItem>
          <FormItem label="Village" name="village">
            <Input placeholder="Village" />
          </FormItem>
          <FormItem label="Phone number" name="phoneNumber">
            <Input placeholder="Phone number" />
          </FormItem>

          <div className="text-md">Payment Type</div>
          <Listbox value={selected} onChange={setSelected}>
            <div className="relative mt-1">
              <Listbox.Button className="relative border border-gray-300 w-full py-2 pl-3 pr-10 text-left bg-white rounded-sm cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm">
                <span className="block truncate">{selected.title}</span>
              </Listbox.Button>
              <Transition
                as={React.Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options className="absolute w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                  {options.map((option, idx) => (
                    <Listbox.Option
                      key={idx}
                      className={({ active }) =>
                        `cursor-default select-none relative py-2 pl-10 pr-4 ${
                          active
                            ? "text-amber-900 bg-amber-100"
                            : "text-gray-900"
                        }`
                      }
                      value={option}
                    >
                      {({ selected }) => (
                        <>
                          <span
                            className={`block truncate ${
                              selected ? "font-medium" : "font-normal"
                            }`}
                          >
                            {option.title}
                          </span>
                        </>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          </Listbox>
          <Button className="mt-4" loading={isLoading}>
            Paynow
          </Button>
        </Form>
      </Card>
    </CommonLayout>
  );
};

export default CheckoutView;
