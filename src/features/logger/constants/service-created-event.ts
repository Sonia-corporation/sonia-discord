import { Subject } from "rxjs";
import { ServiceNameEnum } from "../../../classes/enums/service-name.enum";

export const SERVICE_CREATED_EVENT$: Subject<ServiceNameEnum> = new Subject<
  ServiceNameEnum
>();
