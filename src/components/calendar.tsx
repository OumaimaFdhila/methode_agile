"use client"
import React from 'react';
import { Calendar } from 'react-big-calendar'; // Renamed Calendar to BigCalendar
import { momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';


export default function MyCalendar(){
    const localizer = momentLocalizer(moment);
    return(
        <div className='w-[600px]  '>
            <Calendar
            localizer={localizer}
            events={[
                {
                title: 'My event',
                start: new Date(),
                end: new Date(),
                },
            ]}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 500 }}
            />
        </div>
    );
}

