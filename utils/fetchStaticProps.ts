import { configAuthorization, instance } from "apis";

export const fetchStaticProps = async (token?: string) => {
  configAuthorization(token);

  const getCategories = instance.get("/category");

  return Promise.all([getCategories]);
};
