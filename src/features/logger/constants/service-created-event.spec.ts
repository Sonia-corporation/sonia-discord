import { Subject } from "rxjs";
import { SERVICE_CREATED_EVENT$ } from "./service-created-event";

describe(`SERVICE_CREATED_EVENT$`, (): void => {
  it(`should be a Subject`, (): void => {
    expect.assertions(1);

    expect(SERVICE_CREATED_EVENT$).toStrictEqual(expect.any(Subject));
  });
});
