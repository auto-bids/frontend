import { defineConfig } from "cypress";
import dotenv from "dotenv";

dotenv.config({ path: ".env" });

module.exports = defineConfig({
  video: false,
  screenshotOnRunFailure: true,
  e2e: {
    setupNodeEvents(on, config) {
    },
    baseUrl: "http://localhost:3000",
  },
  env: {
    USER_EMAIL: process.env.AUTH0_USERNAME,
    USER_PASSWORD: process.env.AUTH0_PASSWORD,
  },
});
