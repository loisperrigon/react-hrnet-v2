// config.ts
export const ENV: "development" | "production" =
  (process.env.REACT_APP_ENV as "development" | "production") || "development";

interface Config {
  development: {
    durationToast: string;
  };
  production: {
    durationToast: string;
  };
}

export const config: Config = {
  development: {
    durationToast: "60000",
  },
  production: {
    durationToast: "3000",
  },
};
