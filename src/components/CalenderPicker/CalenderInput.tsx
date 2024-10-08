import * as React from "react";
import moment from "moment";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {
  ControllerFieldState,
  ControllerRenderProps,
  FieldValues,
  UseFormStateReturn,
} from "react-hook-form";
import { CustomHeader } from "./CalenderHeader";
import { CalenderPropInput, isDateValid, ParticularDay } from "./types";

type CalenderProps = {
  field: ControllerRenderProps<FieldValues, string>;
  fieldState: ControllerFieldState;
  formState: UseFormStateReturn<FieldValues>;
  item: CalenderPropInput;
};
function CalenderInput({ field, fieldState, formState, item }: CalenderProps) {
  if (item.type === "date") {
    const isWeekday = (date: Date) => {
      const weekDay = moment(date).weekday() as ParticularDay;
      if (item.weekendOff) {
        return weekDay !== 0 && weekDay !== 6;
      } else if (
        item.removeParticularDays &&
        item.removeParticularDays.length > 0
      ) {
        if (item.removeParticularDays.includes(weekDay)) {
          return false;
        } else {
          return true;
        }
      } else {
        return true;
      }
    };

    return (
      <div className="w-100">
        <DatePicker
          showIcon={item.showIcon}
          icon={item.icons}
          selected={field.value}
          toggleCalendarOnIconClick
          className={`form-control ${fieldState.error ? "is-invalid" : ""} `}
          renderCustomHeader={(item: any) => (
            <CustomHeader
              {...item}
              startYear={item.startYear}
              endYear={item.endYear}
              changeDate={item.changeDate}
            />
          )}
          filterDate={isWeekday}
          holidays={item.holidays ? [...item.holidays] : []}
          dateFormat={item.dateFormat}
          onChange={(dates: Date | null | [Date | null, Date | null]) => {
            field.onChange(dates);
          }}
          isClearable={true}
          excludeDates={item.excludeDates}
          minDate={item.minDate && isDateValid(item.minDate) ? new Date(item.minDate) : undefined}
          maxDate={item.maxDate && isDateValid(item.maxDate) ? new Date(item.maxDate) : undefined}
        />
      </div>
    );
  } else if (item.type === "daterange") {
    const isWeekday = (date: Date) => {
      const weekDay = moment(date).weekday() as ParticularDay;
      if (item.weekendOff) {
        return weekDay !== 0 && weekDay !== 6;
      } else if (
        item.removeParticularDays &&
        item.removeParticularDays.length > 0
      ) {
        if (item.removeParticularDays.includes(weekDay)) {
          return false;
        } else {
          return true;
        }
      } else {
        return true;
      }
    };
    return (
      <DatePicker
        showIcon={item.showIcon}
        icon={item.icons}
        toggleCalendarOnIconClick
        className={`form-control ${fieldState.error ? "is-invalid" : ""} `}
        renderCustomHeader={(item: any) => (
          <CustomHeader
            {...item}
            startYear={item.startYear}
            endYear={item.endYear}
            changeDate={item.changeDate}
          />
        )}
        holidays={item.holidays ? [...item.holidays] : []}
        dateFormat={item.dateFormat}
        selectsRange={true}
        filterDate={isWeekday}
        startDate={field.value ? field.value[0] : null}
        endDate={field.value ? field.value[1] : null}
        onChange={(dates: Date | null | [Date | null, Date | null]) => {
          field.onChange(dates);
        }}
        isClearable={true}
        excludeDates={item.excludeDates}
        minDate={item.minDate && isDateValid(item.minDate) ? new Date(item.minDate) : undefined}
        maxDate={item.maxDate && isDateValid(item.maxDate) ? new Date(item.maxDate) : undefined}
      />
    );
  } 
  else if (item.type === "datetime") {
    const getTimeIntervalArray = (timeBreakArray: string[][]) => {
      const timeIntervalArray: string[] = [];
      timeBreakArray.forEach((timeRange: Array<string>) => {
        const startTime = moment(timeRange[0], "HH:mm");
        const endTime = moment(timeRange[1], "HH:mm");
        while (startTime.isBefore(endTime)) {
          timeIntervalArray.push(startTime.format("HH:mm"));
          startTime.add(item.timeIntervals, "minutes");
        }
      });

      return timeIntervalArray;
    };

    function particularDayTime(dateString: string) {
      if (listOfDates.includes(dateString)) {
        const positionOfDate = listOfDates.findIndex((date) => date == dateString);
        const data = listOfTimes[positionOfDate];
        const intevalsList = getTimeIntervalArray(
          data
        );
        return intevalsList;
      } else {
        return [];
      }
    }

    const listOfDates: string[] = [];
    const listOfTimes: any = [];
    if (item.excludeDatesList) {
      for (const excludeDateList of item.excludeDatesList) {
        if (isDateValid(excludeDateList.date)) {
          const isValidTime = excludeDateList.time.reduce((previous:any, current:any) => {
            if (previous === true || (isHourValid(current[0]) && isHourValid(current[1]))) {
              return true;
            } else {
              return false;
            }
          }, false)
          if (isValidTime) {
            listOfDates.push(moment(excludeDateList.date).format('DD/MM/YYYY'));
            listOfTimes.push(excludeDateList.time);
          }
        } else {
          continue;
        }
      };
    };

    const filterPassedTime = (time: Date) => {
      const momentselectedDate = moment(time).format("H:mm");
      const weekDay = moment(time).weekday() as ParticularDay;
      const dateSelect: string = moment(time).format('DD/MM/YYYY');
      const timeInterval = particularDayTime(dateSelect);
      console.log(timeInterval, 'timeInterval', time);
      
      function onDateSelectTime() {
        return timeInterval.includes(momentselectedDate)
      }
      if (item.particularDaysTiming && item.particularDayTime) {
        const timeIntervalArrayWeekend = getTimeIntervalArray(
          item.particularDaysTiming
        );
        if (item.particularDayTime.includes(weekDay)) {
          if (timeIntervalArrayWeekend.includes(momentselectedDate)) {
            if (timeInterval.length > 0) {
              return onDateSelectTime()
            }
            else {
              return true;
            }
          } else {
            return false
          }
        }
        else {
          if (timeInterval.length > 0) {
            return onDateSelectTime()
          }
          else {
            return true;
          }
        }
      } else {
        if (timeInterval.length > 0) {
          return onDateSelectTime()
        }
        else {
          return true;
        }
      }
    };

    return (
      <DatePicker
        showIcon={item.showIcon}
        icon={item.icons}
        toggleCalendarOnIconClick
        className={`form-control ${fieldState.error ? "is-invalid" : ""} `}
        renderCustomHeader={(item: any) => (
          <CustomHeader
            {...item}
            startYear={item.startYear}
            endYear={item.endYear}
            changeDate={item.changeDate}
          />
        )}
        holidays={item.holidays ? [...item.holidays] : []}
        dateFormat={item.dateFormat}
        onChange={(dates: Date | null | [Date | null, Date | null]) => {
          field.onChange(dates);
        }}
        filterTime={filterPassedTime}
        showTimeSelect
        selected={field.value != '' ? field.value : undefined}
        isClearable={true}
        excludeDates={item.excludeDates}
        timeIntervals={item.timeIntervals||30}
        minDate={item.minDate && isDateValid(item.minDate) ? new Date(item.minDate) : undefined}
        maxDate={item.maxDate && isDateValid(item.maxDate) ? new Date(item.maxDate) : undefined}
        minTime={moment().set('hour', Number(item.minTime.split(':')[0])|| 0).set('minute',Number(item.minTime.split(':')[1])|| 0).set('second', 0).toDate()}
        maxTime={moment().set('hour',Number(item.maxTime.split(':')[0]) || 23).set('minute', Number(item.maxTime.split(':')[1]) || 59).set('second', 59).toDate()}
      />
    );
  }
  else {
    <p>Calendar component</p>
  }
}

export default CalenderInput;
