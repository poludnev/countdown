const formatedDateTime = {
  getFormatedDate(dateTime = new Date(Date.now())) {  
    const date = dateTime.getDate();
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
    console.log(milliseconds);
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
  console.log(formData);
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
  console.log(milleseconds % 1000, seconds, minutes, hours, days);
  console.log(days, hours - days * 24, minutes - hours * 60, seconds - minutes * 60, milleseconds - seconds * 1000);
  
  const result = {
    years: years,
    months: Math.ceil(months / 12),
    days: days - months * 30,
    hours: hours - days * 24,
    minutes: minutes - hours * 60,
    seconds: seconds - minutes * 60,
    milleseconds: milleseconds - seconds * 1000,
  }
  return result;
};

const countDownState = {
      setIntervalCounter: 0,
    };

const countDown = (deadLineTime) => {
  console.log('countdown ran')
  console.log('countdownstate', countDownState);
  
  const id = setInterval(() => { 
    
    console.log('interval started');
    console.log(parseTime(deadLineTime - new Date(Date.now())));
    const remain = parseTime(deadLineTime - new Date(Date.now()));
    console.log('remain', deadLineTime - new Date(Date.now()));
    if (deadLineTime - new Date(Date.now()) <= 0) {
      document.getElementById('timer-milleseconds-units-value').innerHTML = 0;
      for (let i = countDownState.setIntervalCounter + 1; i >= 0; i -= 1) {
      console.log('clear test', i);  
      clearInterval(i);
        console.log('clear test');
      }
      return;
    }
    document.getElementById('timer-months-units-value').innerHTML = remain.months;
    document.getElementById('timer-days-units-value').innerHTML = remain.days;
    document.getElementById('timer-hours-units-value').innerHTML = remain.hours;
    document.getElementById('timer-minutes-units-value').innerHTML = remain.minutes;
    document.getElementById('timer-seconds-units-value').innerHTML = remain.seconds;
    let ms = remain.milleseconds;
    if (remain.milleseconds < 100) {
      ms = `0${remain.milleseconds}`;
    } else if (remain.milleseconds < 10) {
      ms = `00${remain.milleseconds}`;
    }
    
    document.getElementById('timer-milleseconds-units-value').innerHTML = ms;
  }, 10);
  countDownState.setIntervalCounter += 1;
    
  
};

window.onload = function() {
  const dateInput = document.getElementById('dateInput');
  const timeInput = document.getElementById('timeInput');
  const timer = document.getElementById('timer');
  const formBlock = document.getElementById('formBlock');
  const form = document.getElementById('form');
  const inputTimeFormSubmitButton = document.getElementById('inputTimeFormSubmitButton');
  const stopResetButton = document.getElementById('stopResetButton');
  const initialDateTime = new Date(Date.now() + 1000 * 60 * 1);
  // const initialDateTime = new Date('2023-04-29T00:00:00.000+10:00');
  console.log(initialDateTime.toISOString());
  timeInput.value = formatedDateTime.getFormatedTime(initialDateTime, 'HH:MM');
  dateInput.value = formatedDateTime.getFormatedDate(initialDateTime);
  
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    console.log('submit');
    const formData = [...e.target.children]
      .map(e => [...e.children]
      .filter(e => e.tagName === 'INPUT' || e.tagName === 'SELECT'))
      .flat()
      .reduce((acc, val) => {
        acc[val.id] = val.value; 
        return acc;
      }, {});
    console.log('formdata', formData);
    console.log(makeDateToISO(formData));
    
    const deadLineTime = new Date(makeDateToISO(formData));
    // console.log(x.toISOString());
    // console.log((x - Date.now()) / 1000 / 60);
    
    
    formBlock.classList.add('d-none');
    formBlock.classList.remove('d-flex');
    timer.classList.add('d-flex');
    timer.classList.remove('d-none');
    countDown(deadLineTime);
  });
  
  stopResetButton.addEventListener('click', (e) => {
    timer.classList.remove('d-flex');
    timer.classList.add('d-none');
    formBlock.classList.remove('d-none');
    formBlock.classList.add('d-flex');
    console.log('countdownstate', countDownState);
    for (let i = countDownState.setIntervalCounter + 1; i >= 0; i -= 1) {
      console.log('clear test', i);  
      clearInterval(i);
        console.log('clear test');
      }
    
    
  })
  
}