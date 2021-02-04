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
  // console.log(formData);
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
    };

const countDown = (deadLineTime) => {
  const initialTime = new Date(Date.now());
    
  const id = setInterval(() => { 
    // console.log(deadLineTime - new Date(Date.now()));
      
    const remain = parseTime(deadLineTime - new Date(Date.now()));
    
    const progress = 100 - (deadLineTime - new Date(Date.now())) / (deadLineTime - initialTime)* 100;
    console.log(initialTime);
    console.log(deadLineTime);
    console.log(deadLineTime - initialTime);
    console.log(deadLineTime - new Date(Date.now()))
    console.log((1 - (deadLineTime - new Date(Date.now()))/(deadLineTime - initialTime)) * 100);
    console.log(progress);
  
    if (deadLineTime - new Date(Date.now()) <= 0) {
      document.getElementById('timer-milleseconds-units-value').innerHTML = 0;
      document.getElementById('timer-caption-1').innerHTML = 'You\'ve got nothing. It\'s all over.';
      document.getElementById('timer-caption-2').innerHTML = '';
      document.getElementById('progress-bar1').classList.remove('progress-bar-animated');
      document.getElementById('progress-bar1').setAttribute('style', `width: ${0}%`);
      
      for (let i = countDownState.setIntervalCounter + 1; i >= 0; i -= 1) {      
      clearInterval(i);     
      }
      return;
    }
    document.getElementById('timer-months-units-value').innerHTML = remain.months;
    document.getElementById('timer-days-units-value').innerHTML = remain.days;
    document.getElementById('timer-hours-units-value').innerHTML = remain.hours;
    document.getElementById('timer-minutes-units-value').innerHTML = remain.minutes;
    document.getElementById('timer-seconds-units-value').innerHTML = remain.seconds;
    document.getElementById('progress-bar1').setAttribute('style', `width: ${100 - progress}%`);
    document.getElementById('progress-bar2').setAttribute('style', `width: ${progress}%`);
    let ms = remain.milleseconds;
    if (remain.milleseconds < 100) {
      ms = `0${remain.milleseconds}`;
    } else if (remain.milleseconds < 10) {
      ms = `00${remain.milleseconds}`;
    }
    
    document.getElementById('timer-milleseconds-units-value').innerHTML = ms;
  }, 50);
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

  timeInput.value = formatedDateTime.getFormatedTime(initialDateTime, 'HH:MM');

  dateInput.value = formatedDateTime.getFormatedDate(initialDateTime);
  
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

    
    const deadLineTime = new Date(makeDateToISO(formData));
    // console.log(x.toISOString());
    // console.log((x - Date.now()) / 1000 / 60);
    
    
    formBlock.classList.add('d-none');
    formBlock.classList.remove('d-flex');
    timer.classList.add('d-flex');
    timer.classList.remove('d-none');
    document.getElementById('progress-bar1').classList.add('progress-bar-animated');
    document.getElementById('progress-bar1').setAttribute('style', `width: ${100}%`);
    countDown(deadLineTime);
  });
  
  stopResetButton.addEventListener('click', (e) => {
    timer.classList.remove('d-flex');
    timer.classList.add('d-none');
    formBlock.classList.remove('d-none');
    formBlock.classList.add('d-flex');

    for (let i = countDownState.setIntervalCounter + 1; i >= 0; i -= 1) {

      clearInterval(i);

      }
    
    
  });
  
};
