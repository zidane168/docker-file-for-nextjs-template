import * as appYup from "yup";

import { commonHelpers } from "@/utils/helpers";

appYup.addMethod<appYup.StringSchema>(
  appYup.string,
  "appPhone",
  function (ref: appYup.Reference<string>, message: string) {
    return this.test("appPhone", message, function (value) {
      const { path, createError } = this;
      const countryCodeRefValue = this.resolve(ref);

      const isValid = commonHelpers.isValidPhoneNumber({
        phone: value!,
        code: countryCodeRefValue,
      });

      return (
        isValid || createError({ path, message: message || "Phone is invalid" })
      );
    });
  }
);

export default appYup;
