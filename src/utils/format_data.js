import dayjs from "dayjs";

export function formatMonthDay(data, formatStr = "MM月DD日") {
  return dayjs(data).format(formatStr)
}

export function getDiffDays(startDate, endDate) {
  return dayjs(endDate).diff(startDate, "day")
}