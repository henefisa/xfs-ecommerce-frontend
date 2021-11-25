import { GetServerSidePropsContext } from "next";
import { instance } from "../apis";

interface ContextOptions {
  setCookie?: boolean;
}

export class Context {
  private static context: GetServerSidePropsContext | null;
  static isAuthenticated = false;
  static getContext() {
    return this.context;
  }

  static setContext(
    context: GetServerSidePropsContext,
    options: ContextOptions = {}
  ) {
    this.context = context;

    if (!options.setCookie) return;
    const cookie = context?.req?.headers?.cookie;
    if (!cookie) return;
    instance.defaults.headers.common.cookie = cookie;
  }

  static clearContext() {
    this.context = null;
    this.isAuthenticated = false;
  }
}
