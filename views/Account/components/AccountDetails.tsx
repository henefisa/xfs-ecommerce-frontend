import { getUserInfo, updateInfomationUser } from "apis";
import Button from "components/common/Button/Button";
import Col from "components/common/Col/Col";
import Container from "components/common/Container/Container";
import { Form, FormItem } from "components/common/Form";
import Input from "components/common/Input/Input";
import Row from "components/common/Row/Row";
import { useAppSelector } from "hooks";
import { AccountDetailsInput } from "models/User";
import * as React from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import { RootState } from "store";
import { RESPONSE } from "store/types/response";
// validation
import * as yup from "yup";

const phoneRegex =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const updateInfomationSchema = yup.object().shape({
  email: yup.string().email("Invalid email!").required("Email is required!"),
  firstName: yup.string().required("First name is required!").trim(),
  lastName: yup.string().required("Last name is required!").trim(),
  phoneNumber: yup.string().matches(phoneRegex, "Phone number is not valid"),
  birthday: yup
    .date()
    .required("Birthday is required!")
    .nullable()
    .transform((curr, orig) => (orig === "" ? null : curr)),
});

const AccountDetails: React.FC = () => {
  const { user } = useAppSelector((state: RootState) => state.auth);
  const [id, setId] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  // const [firstName, setFirstName] = useState<string>("");
  // const [lastName, setLastName] = useState<string>("");
  // const [birthday, setBirthday] = useState<string>("");
  // const [phoneNumber, setPhoneNumber] = useState<string>("");

  React.useEffect(() => {
    getUserData();
  }, []);

  const getUserData = async () => {
    const data = await getUserInfo();
    setId(data.data.id);
    // console.log("data", data);
    // setFirstName(data.data.firstName);
    // setLastName(data.data.lastName);
    // setBirthday(data.data.birthday);
    // setPhoneNumber(data.data.phoneNumber);
  };

  // console.log("birthday", birthday);

  // React.useEffect(() => {
  //   if (user) {
  //     setFirstName(user.firstName);
  //     setLastName(user.lastName);
  //     setBirthday(user.birthday);
  //     setPhoneNumber(user.phoneNumber);
  //   }
  // }, [user]);

  const handleSubmit = (values: AccountDetailsInput) => {
    setIsLoading(true);
    updateInfomationUser(id, values, (type: RESPONSE, message?: string) => {
      setIsLoading(false);
      if (type === RESPONSE.SUCCESS) {
        toast.success("Update Infomation Success");
        return;
      }
      if (type === RESPONSE.ERROR) {
        toast.error(message, {
          position: "top-right",
          autoClose: 5000,
        });
      }
    });
  };

  return (
    <div className="my-account-page__account-details">
      <h2 className="my-account-page__title">Account Details</h2>

      <Container>
        <Form
          className="my-account-page__form"
          schema={updateInfomationSchema}
          onSubmit={handleSubmit}
          name="account"
        >
          <Row gutter={12}>
            <Col span={12} md={12}>
              <FormItem name="email" label="Email">
                <Input placeholder="Enter your new email" />
              </FormItem>
            </Col>
          </Row>
          <Row gutter={12}>
            <Col span={12} md={6}>
              <FormItem name="firstName" label="First Name">
                <Input placeholder="Enter your new first name" />
              </FormItem>
            </Col>
            <Col span={12} md={6}>
              <FormItem name="lastName" label="Last Name">
                <Input placeholder="Enter your new last name" />
              </FormItem>
            </Col>
          </Row>
          <Row gutter={12}>
            <Col span={12} md={6}>
              <FormItem name="phoneNumber" label="Phone Number">
                <Input placeholder="Enter your phone number" />
              </FormItem>
            </Col>

            <Col span={12} md={6}>
              <FormItem name="birthday" label="Birthday">
                <Input type="date" placeholder="Enter your Birthday" />
              </FormItem>
            </Col>
            <Button htmlType="submit" loading={isLoading}>
              Submit
            </Button>
          </Row>
        </Form>
      </Container>
    </div>
  );
};

export default AccountDetails;
