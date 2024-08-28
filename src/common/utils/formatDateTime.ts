import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utcPlugin from "dayjs/plugin/utc";
import "dayjs/locale/ru";

dayjs.locale("ru");
dayjs.extend(timezone);
dayjs.extend(utcPlugin);

export const formatDateTime = (utcDate?: string | null, withoutTime?: boolean, isForTitle?: boolean): string => {
  if (!utcDate) {
    return "до нашей эры";
  }

  const now = dayjs().tz();
  const date = dayjs.utc(utcDate).tz();

  const diffSeconds = now.diff(date, "second");
  const diffMinutes = now.diff(date, "minute");
  const diffDays = now.diff(date, "day");

  if (diffSeconds <= 0) {
    return `сейчас`;
  } else if (date.year() !== now.year()) {
    return isForTitle ? date.format("HH:mm") : date.format("D MMM YYYY");
  } else if (diffMinutes < 1) {
    return `${diffSeconds} секунд${getSuffix(diffSeconds)} назад`;
  } else if (diffMinutes < 60) {
    return `${diffMinutes} минут${getSuffix(diffMinutes)} назад`;
  } else if (date.isSame(now, "day")) {
    return withoutTime ? date.format("сегодня") : date.format("сегодня в HH:mm");
  } else if (date.isSame(now.subtract(1, "day"), "day")) {
    return withoutTime ? "вчера" : `вчера в ${date.format("HH:mm")}`;
  } else if (diffDays >= 2) {
    return withoutTime ? date.format("D MMMM") : `${date.format("D MMM в HH:mm")}`;
  } else {
    return withoutTime ? date.format("D MMMM") : date.format("D MMM в HH:mm");
  }
};

function getSuffix(num: number): string {
  if (num >= 11 && num <= 19) {
    return "";
  }
  const lastDigit = num % 10;
  if (lastDigit === 1) {
    return "у";
  }
  if (lastDigit >= 2 && lastDigit <= 4) {
    return "ы";
  }
  return "";
}
