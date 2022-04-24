import React, { useCallback, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import * as Styled from './Calendar.styles';
import ReminderLine from './ReminderLine';
import SetReminder from './SetReminder';


const weekDays = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday'
];

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
];



function Calendar() {
  const [currMonth, setCurrMonth] = useState(new Date().getMonth());
  const [currYear, setCurrYear] = useState(new Date().getFullYear());
  const [viewTypeReminder, setviewTypeReminder] = useState('create');
  const [popupReminder, showPopupReminder] = useState(false);
  const [selectedDate, setSelectedDate] = useState({});
  const reminders = useSelector((state) => state.reminders);

  const togglePopupReminder = () => {
    showPopupReminder(!popupReminder);
  }

  const changeMonth = useCallback((type, month) => {
    const operation = {
      foward: () => {
        if (month === 11) {
          setCurrMonth(0);
          setCurrYear(currYear + 1);
        } else {
          setCurrMonth(month + 1);
        }
      },
      back: () => {
        if (month === 0) {
          setCurrMonth(11);
          setCurrYear(currYear - 1);
        } else {
          setCurrMonth(month - 1);
        }
      }
    };
    return operation[type]();
  }, [setCurrMonth, currYear]);

  const mountCalendarDays = useMemo(() => {
    const calendarDays = [];
    let week = [];
    const firstDateMonth = new Date(currYear, currMonth, 1);
    let dayOfWeekCounter = firstDateMonth.getDay();

    while (week.length <= 7 && calendarDays.length < 6) {
      if (week.length === 7) {
        calendarDays.push(week);
        week = []
      } else {
        if (week.length === 0 && calendarDays.length === 0) {
          firstDateMonth.setDate(firstDateMonth.getDate() - dayOfWeekCounter)
        } else {
          firstDateMonth.setDate(firstDateMonth.getDate() + 1)
        }
        week.push({
          day: firstDateMonth.getDate(),
          month: firstDateMonth.getMonth(),
          year: firstDateMonth.getFullYear(),
          weekday: firstDateMonth.getDay()
        })
      }
    }

    return calendarDays
  }, [currMonth, currYear])

  return (
    <Styled.Calendar>
      <Styled.MonthHeader>
        <Styled.DateButton onClick={() => setCurrYear(currYear - 1)}>{'<'}</Styled.DateButton>
        <Styled.DateButton onClick={() => changeMonth('back', currMonth)}>
          {'<<'}
        </Styled.DateButton>
        {months[currMonth]} - {currYear}
        <Styled.DateButton onClick={() => changeMonth('foward', currMonth)}>
          {'>>'}
        </Styled.DateButton>
        <Styled.DateButton onClick={() => setCurrYear(currYear + 1)}>{'>'}</Styled.DateButton>
      </Styled.MonthHeader>
      <Styled.WeekdaysHeader>
        {weekDays.map((day) => (
          <div key={day}>{day}</div>
        ))}
      </Styled.WeekdaysHeader>
      <Styled.DaysContainer>
        {mountCalendarDays.map((week) => (
          <Styled.WeekContainer>
            {week.map((dayObj) => {
              let cardDate = `${months[dayObj.month]} ${dayObj.day}, ${dayObj.year}`;
              let className = '';
              let dateValue = `${dayObj.year}/${dayObj.month}/${dayObj.day}`;

              className += dayObj.weekday === 0 || dayObj.weekday === 6 ? 'weekendCard ' : '';
              className += dayObj.month !== currMonth ? 'otherMonthCard' : '';
              return (
                <Styled.DayCard
                  className={className}
                  key={cardDate}
                >
                  <span style={{ fontWeight: 800 }}>{dayObj.day}</span>
                  <button
                    style={{
                      float: 'right',
                      borderRadius: '50%',
                      border: 'none',
                      color: 'black',
                      backgroundColor: 'transparent',
                      margin: 0,
                      fontSize: '14pt'

                    }}
                    onClick={() => {
                      setviewTypeReminder('create')
                      togglePopupReminder()
                      setSelectedDate({ title: cardDate, date: dateValue })
                    }}
                  >
                    +
                  </button>
                  {reminders[dateValue] &&
                    Object.values(reminders[dateValue]).map((dataReminder) => {
                      return (
                        <ReminderLine
                          {...dataReminder}
                          onClick={() => {
                            setSelectedDate({ ...dataReminder, title: cardDate, date: dateValue })
                            setviewTypeReminder('view')
                            togglePopupReminder()
                          }}
                        />
                      )
                    })
                  }
                </Styled.DayCard>
              )
            })}
          </Styled.WeekContainer>
        ))}
      </Styled.DaysContainer>
      {popupReminder &&
        <SetReminder
          togglePopup={togglePopupReminder}
          {...selectedDate}
          type={viewTypeReminder}
        />}
    </Styled.Calendar>
  );
}

export default Calendar;
