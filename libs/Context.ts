import { GetServerSidePropsContext } from "next";

export class Context {
  private static context: GetServerSidePropsContext | null;

  static getContext() {
    return this.context;
  }

  static setContext(context: GetServerSidePropsContext) {
    this.context = context;
  }

  static clearContext() {
    this.context = null;
  }
}
