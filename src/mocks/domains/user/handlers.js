import { rest } from "msw";
import { storeToRefs } from "pinia";

import { defaultApiError500 } from "@/mocks/handlers";
import { useMockStore } from "@/stores/mock";
import { generateUserprofile } from "@/mocks/domains/user/model";

export const handlers = [
  rest.get(
    "https://uat-apigateway.ezbiz.com/dev-glsshoppingapi/v1/parameters/userprofile",
    async (req, res, ctx) => {
      const result = generateUserprofile();

      const mockStore = useMockStore();
      const { isUserProfileApiError500 } = storeToRefs(mockStore);
      if (isUserProfileApiError500.value) {
        return res(ctx.status(500), ctx.json(defaultApiError500));
      }

      return res(ctx.json(result));
    }
  ),
];
