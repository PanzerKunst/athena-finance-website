type Config = {
  readonly IS_PROD: boolean;
  readonly BACKEND_URL: string;
}

/* eslint-disable @typescript-eslint/no-unsafe-assignment */
export const config: Config = {
  IS_PROD: import.meta.env.MODE === "production",
  BACKEND_URL: import.meta.env.VITE_BACKEND_URL!
}
/* eslint-enable @typescript-eslint/no-unsafe-assignment */
