import { DateTime } from 'luxon';

const setDate = (dateString: string): string => {
  return DateTime.fromISO(new Date(dateString).toISOString()).toLocaleString();
};

export default setDate;
