let timerInterval;
        let running = false;
        let milliseconds = 0, seconds = 0, minutes = 0, hours = 0;
        let alarmTime = 0; // Tempo do alarme em milissegundos

        const timer = document.getElementById('timer');
        const startButton = document.getElementById('startButton');
        const stopButton = document.getElementById('stopButton');
        const resetButton = document.getElementById('resetButton');
        const alarmInput = document.getElementById('alarmInput');
        const setAlarmButton = document.getElementById('setAlarmButton');
        const alarmSound = document.getElementById('alarmSound');

        startButton.addEventListener('click', startTimer);
        stopButton.addEventListener('click', stopTimer);
        resetButton.addEventListener('click', resetTimer);
        setAlarmButton.addEventListener('click', setAlarm);

        function startTimer() {
            if (!running) {
                running = true;
                timerInterval = setInterval(updateTimer, 10);
            }
        }

        function stopTimer() {
            running = false;
            clearInterval(timerInterval);
        }

        function resetTimer() {
            running = false;
            clearInterval(timerInterval);
            milliseconds = 0;
            seconds = 0;
            minutes = 0;
            hours = 0;
            updateTimer();
        }

        function setAlarm() {
            const alarmTimeString = alarmInput.value;
            const [alarmHours, alarmMinutes, alarmSeconds] = alarmTimeString.split(':');
            alarmTime = (parseInt(alarmHours) * 3600 + parseInt(alarmMinutes) * 60 + parseInt(alarmSeconds)) * 1000;
        }

        function updateTimer() {
            milliseconds++;
            if (milliseconds === 100) {
                milliseconds = 0;
                seconds++;
                if (seconds === 60) {
                    seconds = 0;
                    minutes++;
                    if (minutes === 60) {
                        minutes = 0;
                        hours++;
                    }
                }
            }

            const formattedTime = pad(hours) + ':' + pad(minutes) + ':' + pad(seconds) + ':' + pad(milliseconds);
            timer.textContent = formattedTime;

            if (alarmTime > 0 && hours * 3600000 + minutes * 60000 + seconds * 1000 + milliseconds === alarmTime) {
                playAlarm();
            }
        }

        function pad(value) {
            return value < 10 ? '0' + value : value;
        }

        function playAlarm() {
            alarmSound.play();
        }