import { EventInterface } from "@/types";
import moment from "moment";

export const eventDateFormatter = (
    event: EventInterface | null
  ): { fully: string; partial: string } => {
    const diffDate = moment(event?.end_date).diff(event?.start_date, 'days');

    if (diffDate > 0)
      return {
        fully: `${moment(event?.start_date)
          .format('DD MMM - YYYY, LT')
          .toUpperCase()} > ${moment(event?.end_date)
            .format('DD MMM - YYYY, LT')
            .toUpperCase()}`,
        partial: `${moment(event?.start_date)
          .format('DD MMM')
          .toUpperCase()} • ${moment(event?.end_date)
            .format('DD MMM')
            .toUpperCase()}`,
      };

    return {
      fully: `${moment(event?.start_date)
        .format('DD MMM - YYYY, LT')
        .toUpperCase()}`,
      partial: `${moment(event?.start_date)
        .format('DD MMM [-] HH a')
        .toUpperCase()}`,
    };
  };
