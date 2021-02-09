const formatedDateTime = {
  getFormatedDate(dateTime = new Date(Date.now())) {
    const date = dateTime.getDate() < 10 ? `0${dateTime.getDate()}` : `${dateTime.getDate()}`;
    const month = (dateTime.getMonth() + 1) < 10 ? `0${dateTime.getMonth() + 1}` : `${dateTime.getMonth() + 1}`;
    const year = dateTime.getFullYear();  
    const result = `${year}-${month}-${date}`;
    return result;
  },
  getFormatedTime(dateTime = new Date(Date.now()), format = 'HH:MM') {
    const hours = dateTime.getHours() < 10 ? `0${dateTime.getHours()}` : `${dateTime.getHours()}`;
    const minutes = dateTime.getMinutes() < 10 ? `0${dateTime.getMinutes()}` : `${dateTime.getMinutes()}`;
    const seconds = dateTime.getSeconds() < 10 ? `0${dateTime.getSeconds()}`: `${dateTime.getSeconds()}`;
    const milliseconds = dateTime.getMilliseconds();
    switch(format) {
      case 'HH:MM':
        return `${hours}:${minutes}`;
      case 'HH:MM:SS':
        return `${hours}:${minutes}:${seconds}`;
      default:
        throw new Error('wrong date format');
    }
    return `${hours}:${minutes}:${seconds}.${milliseconds}`;
  },
};

const makeDateToISO = (formData) => {
  const date = formData.dateInput;
  const time = formData.timeInput;
  const timezone = formData['timezone-offset'];
  return `${date}T${time}${timezone}`;
};

const parseTime = (milleseconds) => {
  const seconds = Math.floor(milleseconds / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);
  
  const result = {
    years: years,
    months: Math.ceil(months / 12),
    days: days - months * 30,
    hours: hours - days * 24,
    minutes: minutes - hours * 60,
    seconds: seconds - minutes * 60,
    milleseconds: milleseconds - seconds * 1000,
  };
  return result;
};

const countDownState = {
  setIntervalCounter: 0,
  guestsCounterInitialDeadlineTime: 0,
  countDownType: 'guest',  
    };

const clearIntervals = (countDownState) => {
  for (let i = countDownState.setIntervalCounter + 1; i >= 0; i -= 1) {
    clearInterval(i);
  }
  return true;
};

const render = {
  timer: document.getElementById('timer'),
  formBlock: document.getElementById('formBlock'),
  dateInput: document.getElementById('dateInput'),
  timeInput: document.getElementById('timeInput'),
  guestCounterBlock: document.getElementById('guestCounterBlock'),
  romanCounterBlock: document.getElementById('romanCounterBlock'),
  initialTimeDelayMileSec: 60000,
  
  initiate(initialDateTime = new Date(Date.now() + this.initialTimeDelayMileSec)) {
    this.timeInput.value = formatedDateTime.getFormatedTime(initialDateTime, 'HH:MM');
    this.dateInput.value = formatedDateTime.getFormatedDate(initialDateTime);
    this.romanCounterBlock.classList.add('d-flex');
    this.romanCounterBlock.classList.remove('d-none');
    this.guestCounterBlock.classList.remove('d-flex');
    this.guestCounterBlock.classList.add('d-none');  
    // }
  },
  
  getToCountDown(special = false, specialData = {
                  caption1: '',
                  caption2: '',
                  }) {
    this.formBlock.classList.add('d-none');
    this.formBlock.classList.remove('d-flex');
    this.timer.classList.add('d-flex');
    this.timer.classList.remove('d-none');
    if (countDownState.countDownType === 'roman') {
      
      this.guestCounterBlock.classList.remove('d-none');
      this.guestCounterBlock.classList.add('d-flex');
      this.romanCounterBlock.classList.remove('d-flex');
      this.romanCounterBlock.classList.add('d-none');
    }
    if (countDownState.countDownType === 'guest') {
      this.romanCounterBlock.classList.add('d-flex');
      this.romanCounterBlock.classList.remove('d-none');
      this.guestCounterBlock.classList.remove('d-flex');
      this.guestCounterBlock.classList.add('d-none');  
    }
    
    document.getElementById('progress-bar1').classList.add('progress-bar-animated');
    document.getElementById('progress-bar1').setAttribute('style', `width: ${100}%`);
    if (special) {
      document.getElementById('timer-caption-1').innerHTML = specialData.caption1;
      document.getElementById('timer-caption-2').innerHTML = specialData.caption2;
    } else {
      document.getElementById('timer-caption-1').innerHTML = 'You got';
      document.getElementById('timer-caption-2').innerHTML = 'left';
    }
  },
  
  countDown: {
    update(remainTime, view = 'view01') {
      let ms = remainTime.milleseconds;
      if (remainTime.milleseconds < 1) {
        ms = `000`;        
      } else if (remainTime.milleseconds < 10) {
        ms = `00${remainTime.milleseconds}`;
      } else if (remainTime.milleseconds < 100) {
        ms = `0${remainTime.milleseconds}`;
      }
      
      switch(view) {
        case 'view01':          
          const x = `${remainTime.months} : ${remainTime.days} : ${remainTime.hours} : ${remainTime.minutes} : ${remainTime.seconds}.${ms}`;          
      document.getElementById('timer-group').innerHTML = `${x}`;
          break;
        case 'view02':
          document.getElementById('timer-group').innerHTML = `<div id="timer-months" class="h1 timer-string"><span id="timer-months-units-value">2</span><span id="timer-months-units-diviвук"> </span><span id="timer-months-units-name">Months</span></div>
      <div id="timer-days" class="h1 timer-string"><span id="timer-days-units-value">2</span><span id="timer-days-units-diviвук"> </span><span id="timer-days-units-name">Days</span></div>
      <div id="timer-hours" class="h1 timer-string"><span id="timer-hours-units-value">2</span><span id="timer-hours-units-diviвук"> </span><span id="timer-hours-units-name">Hours</span></div>
      <div id="timer-minutes" class="h1 timer-string"><span id="timer-minutes-units-value">2</span><span id="timer-minutes-units-diviвук"> </span><span id="timer-minutes-units-name">Minutes</span></div>
      <div id="timer-seconds" class="h1 timer-string"><span id="timer-seconds-units-value">2</span><span id="timer-seconds-units-diviвук"> </span><span id="timer-seconds-units-name">Seconds</span></div>
      <div id="timer-milleseconds" class="h1 timer-string"><span id="timer-milleseconds-units-value">2</span><span id="timer-milleseconds-units-diviвук"> </span><span id="timer-milleseconds-units-name">Milleseconds</span></div>`;
          document.getElementById('timer-months-units-value').innerHTML = remainTime.months;
          document.getElementById('timer-days-units-value').innerHTML = remainTime.days;
          document.getElementById('timer-hours-units-value').innerHTML = remainTime.hours;
          document.getElementById('timer-minutes-units-value').innerHTML = remainTime.minutes;
          document.getElementById('timer-seconds-units-value').innerHTML = remainTime.seconds;
          document.getElementById('timer-milleseconds-units-value').innerHTML = ms;
          break;
        default:
          throw new Error('view error');
      }      
    },
    outOfTime() {
      // document.getElementById('timer-milleseconds-units-value').innerHTML = 0;
      document.getElementById('timer-caption-1').innerHTML = 'You\'ve got nothing. It\'s all over.';
      document.getElementById('timer-caption-2').innerHTML = '';
      const view = window.innerWidth < 400 ? 'view02' : 'view01';
      render.countDown.update(parseTime(0), view);
      document.getElementById('progress-bar1').setAttribute('style', `width: ${0}%`);
      document.getElementById('progress-bar2').setAttribute('style', `width: ${100}%`);
    },
    progressBarUpdate(progress) {
      document.getElementById('progress-bar1').setAttribute('style', `width: ${100 - progress}%`);
      document.getElementById('progress-bar2').setAttribute('style', `width: ${progress}%`);
    }
  },
  getBackToCountDownForm() {
    this.timer.classList.remove('d-flex');
    this.timer.classList.add('d-none');
    this.formBlock.classList.remove('d-none');
    this.formBlock.classList.add('d-flex');
    this.initiate();
    
    document.getElementById('timer-caption-1').innerHTML = 'You got';
    document.getElementById('timer-caption-2').innerHTML = 'left';
    
  }
};


const countDown = (deadLineTime, initialTime = new Date(Date.now())) => {
  const deadLineInitialTimeDifference = deadLineTime - initialTime;
    const id = setInterval(() => {
      const deadLineTimeNowTimeDifference = (deadLineTime - new Date(Date.now()));     
      
      if (deadLineTimeNowTimeDifference <= 0) {
        render.countDown.outOfTime();
        clearIntervals(countDownState);
        return;
      }
      
      const remainTime = parseTime(deadLineTimeNowTimeDifference);
      const progress = 100 - deadLineTimeNowTimeDifference / deadLineInitialTimeDifference * 100;
      let intViewportWidth = window.innerWidth;
      const view = intViewportWidth < 400 ? 'view02' : 'view01';
      render.countDown.update(remainTime, view);
      render.countDown.progressBarUpdate(progress);
  }, 50);
  countDownState.setIntervalCounter += 1;  
};

window.onload = function() {
  render.initiate();
  
  const form = document.getElementById('form');
  const stopResetButton = document.getElementById('stopResetButton');  
  const romanCounter = document.getElementById('romanCounter');
  const guestCounterBtn = document.getElementById('guestCounterBtn');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = [...e.target.children]
      .map(e => [...e.children]
      .filter(e => e.tagName === 'INPUT' || e.tagName === 'SELECT'))
      .flat()
      .reduce((acc, val) => {
        acc[val.id] = val.value; 
        return acc;
      }, {});
    const initialTime = new Date(Date.now())
    const deadLineTime = new Date(makeDateToISO(formData));  
    countDownState.countDownType = 'guest';
    countDownState.guestsCounterInitialDeadlineTime = deadLineTime;
    render.getToCountDown();
    countDown(deadLineTime, initialTime);
  });
  
  stopResetButton.addEventListener('click', (e) => {
    countDownState.countDownType = 'guest';
    render.getBackToCountDownForm();
    clearIntervals(countDownState);
  });
  romanCounter.addEventListener('click', (e) => {
    
    const formData = {
      dateInput: '2021-02-17',
      timeInput: '09:35',
      'timezone-offset': '+10:00'
    }
    const deadLineTime = new Date(makeDateToISO(formData));
    
    clearIntervals(countDownState);
    countDownState.countDownType = 'roman';
    render.getToCountDown(true, { caption1: 'Roman has', caption2: 'to leave Vladivostok'});
    
    countDown(deadLineTime, new Date('2021-02-05T00:00:00+10:00'));
    
  });
  guestCounterBtn.addEventListener('click', (e) => {
    countDownState.countDownType = 'guest';
    clearIntervals(countDownState);
    render.getToCountDown();
    countDown(countDownState.guestsCounterInitialDeadlineTime);
    })
  
};
