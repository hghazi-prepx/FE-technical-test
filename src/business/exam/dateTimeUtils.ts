import moment from 'moment-timezone';

/**
 * Date and time utilities for exam processing
 */
export class DateTimeUtils {
  /**
   * Process time and date values to create a timestamp
   */
  static processTimeAndDate(
    hour: string,
    minute: string,
    shift: string,
    dateValue: any,
    timeZone: string
  ): number | null {
    if (!hour || !minute || !shift || !dateValue) {
      return null;
    }

    try {
      const date = moment(dateValue.valueOf()).tz(timeZone, true);
      let hour24 = +hour;
      
      if (shift === "PM" && hour24 < 12) {
        hour24 += 12;
      } else if (shift === "AM" && hour24 === 12) {
        hour24 = 0;
      }

      const localDate = date.clone().tz(timeZone, true);
      localDate.set({
        hour: hour24,
        minute: +minute,
        second: 0,
      });
      
      return localDate.valueOf();
    } catch (error) {
      console.error('Error processing time and date:', error);
      return null;
    }
  }

  /**
   * Format exam date for display
   */
  static formatExamDate(timestamp: number | string): string {
    try {
      return moment(timestamp).format('YYYY-MM-DD HH:mm');
    } catch (error) {
      return 'Invalid Date';
    }
  }

  /**
   * Add minutes to a timestamp
   */
  static addMinutesToTimestamp(timestamp: number, minutes: number): number {
    return moment(timestamp).add(minutes, 'minutes').valueOf();
  }
}
