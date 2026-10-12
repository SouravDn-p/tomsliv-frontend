import { formatDistanceToNow } from 'date-fns';
export const timeAgo = (date: string | Date): string => {
    return formatDistanceToNow(new Date(date), { addSuffix: true }).replace(/^about\s/, '');
};
