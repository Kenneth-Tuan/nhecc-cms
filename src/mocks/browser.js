import { setupWorker } from "msw";
import { handlers } from "@/mocks/handlers";

const worker = setupWorker(...handlers);

export function loadMockService() {
  worker.start({
    onUnhandledRequest: "bypass",
  });
}
