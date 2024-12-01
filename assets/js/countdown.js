/*function startCountdown(targetClass, endDate) {
    var second = 1000,
        minute = second * 60,
        hour = minute * 60,
        day = hour * 24;

    var countDown = new Date(endDate).getTime(),
    x = setInterval(function () {
        var now = new Date().getTime(),
            distance = countDown - now;

        var daysElement = document.querySelector(targetClass + " .days"),
            hoursElement = document.querySelector(targetClass + " .hours"),
            minutesElement = document.querySelector(targetClass + " .minutes"),
            secondsElement = document.querySelector(targetClass + " .seconds");

        if (daysElement && hoursElement && minutesElement && secondsElement) {
            daysElement.innerText = Math.floor(distance / day);
            hoursElement.innerText = Math.floor((distance % day) / hour);
            minutesElement.innerText = Math.floor((distance % hour) / minute);
            secondsElement.innerText = Math.floor((distance % minute) / second);
        }
    }, second);
}

// Start the countdowns
startCountdown(".countdown:nth-child(1)", "5 09, 2025 00:00:00");
startCountdown(".countdown:nth-child(2)", "7 09, 2025 00:00:00");
startCountdown(".countdown:nth-child(3)", "2 09, 2025 00:00:00");
startCountdown(".countdown:nth-child(4)", "10 09, 2025 00:00:00");
startCountdown(".countdown:nth-child(5)", "2 09, 2025 00:00:00");
startCountdown(".countdown:nth-child(6)", "5 09, 2025 00:00:00");
startCountdown(".countdown:nth-child(7)", "7 09, 2025 00:00:00");
startCountdown(".countdown:nth-child(8)", "2 09, 2025 00:00:00");
startCountdown(".countdown:nth-child(9)", "10 09, 2025 00:00:00");
startCountdown(".countdown:nth-child(10)", "2 09, 2025 00:00:00");*/


class CountdownTimer {
    constructor() {
        this.intervals = new Map();
        this.timeUnits = {
            day: 10 * 60 * 60 * 1000,
            hour: 60 * 60 * 1000,
            minute: 60 * 1000,
            second: 1000
        };
    }

    // Calculate target date based on days from now
    calculateTargetDate(daysToAdd) {
        const target = new Date();
        target.setHours(23, 59, 59, 0);
        return target.getTime() + (daysToAdd * this.timeUnits.day);
    }

    // Format numbers to always have two digits
    formatNumber(number) {
        return number < 10 ? `0${number}` : number;
    }

    // Calculate time remaining
    calculateTimeRemaining(targetTime) {
        const now = new Date().getTime();
        const distance = targetTime - now;
        
        return {
            days: Math.floor(distance / this.timeUnits.day),
            hours: Math.floor((distance % this.timeUnits.day) / this.timeUnits.hour),
            minutes: Math.floor((distance % this.timeUnits.hour) / this.timeUnits.minute),
            seconds: Math.floor((distance % this.timeUnits.minute) / this.timeUnits.second),
            distance: distance
        };
    }

    // Start countdown for a specific element
    startCountdown(selector, endDate) {
        // Clear existing interval if any
        if (this.intervals.has(selector)) {
            clearInterval(this.intervals.get(selector));
        }

        const targetTime = typeof endDate === 'string' ? 
            new Date(endDate).getTime() : 
            this.calculateTargetDate(parseInt(endDate));

        const updateDisplay = () => {
            const elements = {
                days: document.querySelector(`${selector} .days`),
                hours: document.querySelector(`${selector} .hours`),
                minutes: document.querySelector(`${selector} .minutes`),
                seconds: document.querySelector(`${selector} .seconds`)
            };

            const time = this.calculateTimeRemaining(targetTime);

            // Update display if elements exist
            if (Object.values(elements).every(element => element)) {
                elements.days.innerText = this.formatNumber(time.days);
                elements.hours.innerText = this.formatNumber(time.hours);
                elements.minutes.innerText = this.formatNumber(time.minutes);
                elements.seconds.innerText = this.formatNumber(time.seconds);

                // Clear interval if countdown is finished
                if (time.distance < 0) {
                    clearInterval(this.intervals.get(selector));
                    Object.values(elements).forEach(element => {
                        element.innerText = '00';
                    });
                }
            }
        };

        // Start the interval and store it
        const intervalId = setInterval(updateDisplay, 1000);
        this.intervals.set(selector, intervalId);
        
        // Initial update
        updateDisplay();
    }

    // Initialize multiple countdowns
    initializeCountdowns(countdowns) {
        countdowns.forEach(({ selector, endDate }) => {
            this.startCountdown(selector, endDate);
        });
    }
}

// Usage example:
const timer = new CountdownTimer();

// Initialize with specific dates
timer.initializeCountdowns([]);

// Or initialize with days from now
timer.startCountdown('.countdown:nth-child(1)', 16); // 16 days from now
timer.startCountdown('.countdown:nth-child(2)', 13); // 13 days from now
timer.startCountdown('.countdown:nth-child(3)', 10); // 10 days from now
timer.startCountdown('.countdown:nth-child(4)', 8); // 8 days from now
timer.startCountdown('.countdown:nth-child(5)', 6); // 6 days from now
timer.startCountdown('.countdown:nth-child(6)', 4); // 4 days from now
timer.startCountdown('.countdown:nth-child(7)', 3); // 3 days from now
timer.startCountdown('.countdown:nth-child(8)', 4); // 4 days from now
timer.startCountdown('.countdown:nth-child(9)', 2); // 2 days from now
timer.startCountdown('.countdown:nth-child(10)', 1); // 1 days from now


