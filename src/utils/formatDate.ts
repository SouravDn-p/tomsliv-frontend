import { format, parseISO, isValid } from "date-fns";

export const formatDateMMDDYYYY = (
    date: string | Date,
    dateFormat = "MMM dd, yyyy"
): string => {
    const parsedDate = typeof date === "string" ? parseISO(date) : date;

    if (!isValid(parsedDate)) return "";

    return format(parsedDate, dateFormat);
};
