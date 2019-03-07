import { DateTime } from "luxon";
import { Page } from "puppeteer";
import { Lord } from "../typings/lord";

// TODO: create a Date string
const setDate = (dateString: string): string => {
  return DateTime.fromISO(new Date(dateString).toISOString()).toLocaleString();
};

const getLord = async (page: Page, url: string): Promise<Lord> => {
  await page.goto(url);
  let lord: Lord;
  try {
    lord = await page.evaluate(() => ({
      email: (document.querySelector(
        'p[data-generic-id="email-address"] > a',
      ) as HTMLAnchorElement)
        ? (document.querySelector(
            'p[data-generic-id="email-address"] > a',
          ) as HTMLAnchorElement).innerText
        : null,
      fullTitle: (document.querySelector("#lords-fulltitle") as HTMLDivElement)
        ? (document.querySelector("#lords-fulltitle") as HTMLDivElement)
            .innerText
        : null,
      name: (document.querySelector("#lords-name") as HTMLDivElement)
        ? (document.querySelector("#lords-name") as HTMLDivElement).innerText
        : null,
      joinedTheLords: (document.querySelector(
        "#joined-lords",
      ) as HTMLDivElement)
        ? (document.querySelector("#joined-lords") as HTMLDivElement).innerText
        : null,
      parliamentTitle: (document.querySelector("h1") as HTMLHeadingElement)
        ? (document.querySelector("h1") as HTMLHeadingElement).innerText
        : null,
      party: (document.querySelector("#lords-party-group") as HTMLDivElement)
        ? (document.querySelector("#lords-party-group") as HTMLDivElement)
            .innerText
        : null,
      twitter: {
        handler: (document.querySelector(
          'li[data-generic-id="twitter"] > a',
        ) as HTMLAnchorElement)
          ? (document.querySelector(
              'li[data-generic-id="twitter"] > a',
            ) as HTMLAnchorElement).innerText
          : null,
        url: (document.querySelector(
          'li[data-generic-id="twitter"] > a',
        ) as HTMLAnchorElement)
          ? (document.querySelector(
              'li[data-generic-id="twitter"] > a',
            ) as HTMLAnchorElement).href
          : null,
      },
      website: (document.querySelector(
        'li[data-generic-id="website"] > a',
      ) as HTMLAnchorElement)
        ? (document.querySelector(
            'li[data-generic-id="website"] > a',
          ) as HTMLAnchorElement).href
        : null,
    }));
  } catch (error) {
    // tslint:disable-next-line:no-console
    console.error(error);
    throw error;
  }
  return lord;
};

export default getLord;
