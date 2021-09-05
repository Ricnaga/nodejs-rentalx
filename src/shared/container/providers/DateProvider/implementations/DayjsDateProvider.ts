import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

import { IDateProvider } from "../IDateProvider";

dayjs.extend(utc);

export class DayjsDateProvider implements IDateProvider {
    compareInHours(start_date: Date, end_date: Date): number {
        const end_date_utc = this.converToUTC(end_date);
        const start_date_utc = this.converToUTC(start_date);
        return dayjs(end_date_utc).diff(start_date_utc, "hours");
    }

    converToUTC(date: Date): string {
        return dayjs(date).utc().local().format();
    }

    dateNow(): Date {
        return dayjs().toDate();
    }

    compareInDays(start_date: Date, end_date: Date): number {
        const end_date_utc = this.converToUTC(end_date);
        const start_date_utc = this.converToUTC(start_date);

        return dayjs(end_date_utc).diff(start_date_utc, "days");
    }

    addDays(day: number) {
        return dayjs().add(day, "days").toDate();
    }

    addHours(hours: number): Date {
        return dayjs().add(hours, "hour").toDate();
    }

    compareIfBefore(start_date: Date, end_date: Date): boolean {
        return dayjs(start_date).isBefore(end_date);
    }
}
