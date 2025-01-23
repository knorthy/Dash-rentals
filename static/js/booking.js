const monthYearElement = document.getElementById('monthYear');
const datesElement = document.getElementById('dates');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

const pickupDateInput = document.getElementById('pickup-date');
const returnDateInput = document.getElementById('return-date');

let currentDate = new Date(2025, 0);

const updateCalendar = () => {
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();

    const firstDay = new Date(currentYear, currentMonth, 1);
    const lastDay = new Date(currentYear, currentMonth + 1, 0);
    const totalDays = lastDay.getDate();
    const firstDayIndex = firstDay.getDay();
    const lastDayIndex = lastDay.getDay();

    const monthYearString = currentDate.toLocaleString('default', { month: 'long', year: 'numeric' });
    monthYearElement.textContent = monthYearString;

    let datesHTML = '';

    for (let i = 0; i < firstDayIndex; i++) {
        datesHTML += `<div class="date empty"></div>`;
    }

    for (let i = 1; i <= totalDays; i++) {
        const date = new Date(currentYear, currentMonth, i);
        const today = new Date();
        const activeClass = date.toDateString() === today.toDateString() ? 'active' : '';
        const isPast = date < today;

        datesHTML += `<div class="date ${activeClass} ${isPast ? 'past' : ''}">
            ${isPast ? i : `<button class="date-button" data-date="${i}">${i}</button>`}
        </div>`;
    }

    for (let i = 1; i <= 7 - lastDayIndex; i++) {
        const nextDate = new Date(currentYear, currentMonth + 1, i);
        datesHTML += `<div class="date inactive">${nextDate.getDate()}</div>`;
    }

    datesElement.innerHTML = datesHTML;
}

prevBtn.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    updateCalendar();
});

nextBtn.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    updateCalendar();
});

datesElement.addEventListener('click', (event) => {
    if (event.target.classList.contains('date-button')) {
        const selectedDay = event.target.getAttribute('data-date');
        const selectedMonth = currentDate.getMonth() + 1;
        const selectedYear = currentDate.getFullYear();

        const dateValue = `${selectedYear}-${selectedMonth < 10 ? '0' : ''}${selectedMonth}-${selectedDay < 10 ? '0' : ''}${selectedDay}`;

        // Update the pick-up date and return date
        if (!pickupDateInput.value) {
            pickupDateInput.value = dateValue;
        } else {
            returnDateInput.value = dateValue;
        }
    }
});

updateCalendar();
