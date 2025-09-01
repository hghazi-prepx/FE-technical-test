import moment from 'moment-timezone';

export const formatExamDate = (date: string | number | Date, timezone: string = 'America/Toronto'): string => {
  if (!date) return '-';
  
  try {
    return moment.tz(date, timezone).format('MM-DD-YYYY');
  } catch (error) {
    console.error('Error formatting exam date:', error);
    return '-';
  }
};

export const formatExamDateTime = (date: string | number | Date, timezone: string = 'America/Toronto'): string => {
  if (!date) return '-';
  
  try {
    return moment.tz(date, timezone).format('YYYY-MM-DD hh:mm A z');
  } catch (error) {
    console.error('Error formatting exam date time:', error);
    return '-';
  }
};

export const formatCreatedDate = (date: string | number | Date): string => {
  if (!date) return '-';
  
  try {
    return moment(date).format('MM-DD-YYYY');
  } catch (error) {
    console.error('Error formatting created date:', error);
    return '-';
  }
};
