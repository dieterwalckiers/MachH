


import { component$ } from "@builder.io/qwik";

interface CalendarDayProps {
    dayLbl: number;
    noRightBorder?: boolean;

}

const CalendarDay = component$<CalendarDayProps>(({ dayLbl, noRightBorder }) => {
    return (


        <div class={`w-[14.2857143%] border-b ${noRightBorder ? "" : "border-r "} aspect-square`}>
            <div class="w-full text-center text-gray-400 text-sm font-semibold mt-2">
                {dayLbl}
            </div>
        </div>


    );
});

export default CalendarDay;