import { getRequestConfig } from "next-intl/server";
import { isLocale, routing, type Locale } from "./routing";
import { loadMessages } from "./load-messages";

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale: Locale =
    requested && isLocale(requested) ? requested : routing.defaultLocale;

  return {
    locale,
    messages: await loadMessages(locale),
  };
});
