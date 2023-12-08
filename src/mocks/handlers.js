import { handlers as userHandlers } from "@/mocks/domains/user/handlers";

export const defaultApiError500 = {
  title: "System Not Available",
  details: [
    {
      message: "Server Busy",
      resource:
        "https://uat-apigateway-ezyonerecord.ezbiz.com/dev-onerecordapi/swagger/index.html",
      id: "30029-02",
      language: "en",
    },
  ],
  id: "500",
  type: "",
  language: "en",
};

export const handlers = [...userHandlers];
