const form = document.getElementById('ageForm');
const dayInput = document.getElementById('day');
const monthInput = document.getElementById('month');
const yearInput = document.getElementById('year');
const dayError = document.getElementById('dayError');
const monthError = document.getElementById('monthError');
const yearError = document.getElementById('yearError');
const dayLabel = document.getElementById('dayLabel');
const monthLabel = document.getElementById('monthLabel');
const yearLabel = document.getElementById('yearLabel');
const yearsResult = document.getElementById('yearsResult');
const monthsResult = document.getElementById('monthsResult');
const daysResult = document.getElementById('daysResult');

function resetErrors() {
    dayError.classList.add('hidden');
    monthError.classList.add('hidden');
    yearError.classList.add('hidden');

    dayInput.classList.remove('border-red-error');
    monthInput.classList.remove('border-red-error');
    yearInput.classList.remove('border-red-error');

    dayLabel.classList.remove('text-red-error');
    monthLabel.classList.remove('text-red-error');
    yearLabel.classList.remove('text-red-error');
}

function showError(field, message) {
    const errorElement = document.getElementById(`${field}Error`);
    const inputElement = document.getElementById(field);
    const labelElement = document.getElementById(`${field}Label`);

    errorElement.textContent = message;
    errorElement.classList.remove('hidden');
    inputElement.classList.add('border-red-error');
    labelElement.classList.add('text-red-error');
}

function isLeapYear(year) {
    return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
}

function getDaysInMonth(month, year) {
    const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    if (month === 2 && isLeapYear(year)) {
        return 29;
    }
    return daysInMonth[month - 1];
}

function validateForm() {
    resetErrors();
    let isValid = true;

    const day = dayInput.value.trim();
    const month = monthInput.value.trim();
    const year = yearInput.value.trim();

    if (!day) {
        showError('day', 'This field is required');
        isValid = false;
    }

    if (!month) {
        showError('month', 'This field is required');
        isValid = false;
    }

    if (!year) {
        showError('year', 'This field is required');
        isValid = false;
    }

    if (!isValid) {
        return false;
    }

    const dayNum = parseInt(day);
    const monthNum = parseInt(month);
    const yearNum = parseInt(year);

    if (isNaN(dayNum) || dayNum < 1 || dayNum > 31) {
        showError('day', 'Must be a valid day');
        isValid = false;
    }

    if (isNaN(monthNum) || monthNum < 1 || monthNum > 12) {
        showError('month', 'Must be a valid month');
        isValid = false;
    }

    if (isNaN(yearNum)) {
        showError('year', 'Must be a valid year');
        isValid = false;
    }

    if (!isValid) {
        return false;
    }

    const currentDate = new Date();
    const inputDate = new Date(yearNum, monthNum - 1, dayNum);

    if (inputDate > currentDate) {
        showError('year', 'Must be in the past');
        isValid = false;
        return false;
    }

    const maxDaysInMonth = getDaysInMonth(monthNum, yearNum);
    if (dayNum > maxDaysInMonth) {
        showError('day', 'Must be a valid date');
        isValid = false;
    }

    return isValid;
}

function calculateAge() {
    const day = parseInt(dayInput.value);
    const month = parseInt(monthInput.value);
    const year = parseInt(yearInput.value);

    const birthDate = new Date(year, month - 1, day);
    const today = new Date();

    let years = today.getFullYear() - birthDate.getFullYear();
    let months = today.getMonth() - birthDate.getMonth();
    let days = today.getDate() - birthDate.getDate();

    if (days < 0) {
        months--;
        const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0);
        days += prevMonth.getDate();
    }

    if (months < 0) {
        years--;
        months += 12;
    }

    return { years, months, days };
}

function animateNumber(element, target) {
    const duration = 1000;
    const steps = 30;
    const stepDuration = duration / steps;
    const increment = target / steps;
    let current = 0;

    const interval = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(interval);
        } else {
            element.textContent = Math.floor(current);
        }
    }, stepDuration);
}

form.addEventListener('submit', (e) => {
    e.preventDefault();

    if (validateForm()) {
        const age = calculateAge();
        animateNumber(yearsResult, age.years);
        animateNumber(monthsResult, age.months);
        animateNumber(daysResult, age.days);
    }
});

dayInput.addEventListener('input', (e) => {
    e.target.value = e.target.value.replace(/\D/g, '');
});

monthInput.addEventListener('input', (e) => {
    e.target.value = e.target.value.replace(/\D/g, '');
});

yearInput.addEventListener('input', (e) => {
    e.target.value = e.target.value.replace(/\D/g, '');
});
