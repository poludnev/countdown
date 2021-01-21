<DOCTYPE html>
  <html>
    <head>
      <style>
        .timer {
  font-size: 1.5em;
  margin: auto;
  text-align: center;
  position: absolute;
  width: 100%;
  height: 80px;
  top: calc(50% - 80px / 2);
  left: calc(50% - 100%/2);
}
.body {
  margin: auto;
  position: relative;
  text-align: center;
}
        h1 {
          margin: 0;
        }
        .date {
          text-align: center;
          margin: 150px;
        }
      </style>
    </head>
    <body>
      <script>
       window.onload = function() {
  
  const getTime = (time) => {
    const rightNow = Date.now();  
    const deadline = time;
    const x = new Date(rightNow);
    const diff = (deadline - rightNow)/1000;
    console.log(diff);
    let days = diff / 60 / 60 / 24;
    let hours = (days - Math.floor(days)) * 24;
    let minutes = (hours - Math.floor(hours)) * 60;
    let seconds = (minutes - Math.floor(minutes)) * 60;
    const setDays = (days) => {
      if (days < 1) return '';
      if (days < 2) return '1 Day : ';
      return `${Math.floor(days)} Days : `; 
    };
    const setHours = (hours) => {
      if (hours <= 9) return `0${Math.floor(hours)} Hours : `;
      return `${Math.floor(hours)} Hours : `
    };
    const setMinutes = (minutes) => {
      if (minutes < 2 && minutes >= 1) return `0${Math.floor(minutes)} Minute : `;
      if (minutes < 10 || minutes < 1) return `0${Math.floor(minutes)} Minutes : `;
      return `${Math.floor(minutes)} Minutes : `
    };
    const setSeconds = (seconds) => {
      if (seconds < 2 && seconds >= 1) return `0${Math.floor(seconds)} Second`;
      if (seconds < 10 || seconds < 1) return `0${Math.floor(seconds)} Seconds`;
      return `${Math.floor(seconds)} Seconds`
    };
    const string = document.getElementById('tiemr-string');
    if ( diff <= 0) {
      string.innerHTML = 'It\'s too late to set countdown. You\'ve missed that all.';
      return;
    }
    string.innerHTML = `${setDays(days)}${setHours(hours)}${setMinutes(minutes)}${setSeconds(seconds)}`;
    return;
  };
  
  const countDown = () => {
    
    const state = {
      setIntervalCounter: 0,
    };  
    
    const dateInputStart = () => {
      console.log(state);
      for (let i = state.setIntervalCounter; i >= 0; i -= 1) {
        clearInterval(i);
        console.log('clear test');
      }
      console.log('value', dateInput.value)
      const newTime = Date.parse(`${(dateInput.value)}:00+00:00`);
      console.log(newTime);
    
      console.log('date input start');
      const id = setInterval(() => { getTime(newTime) }, 1000);
      state.setIntervalCounter += 1;
    }
    
    const dateInput = document.getElementById('dateInput');
    dateInput.addEventListener('input', dateInputStart);
    dateInput.addEventListener('click', () => {});
    
  
  };
  
  countDown();
  
  
    
//     dateInput.addEventListener('input', () => {
      
//       console.log(state.setIntervalCounter);
//       const newTime = Date.parse(`${(dateInput.value)}:00+00:00`);
//       const interval = setInterval(
//         () => {
//          state.setIntervalCounter += 1;
//          return f(newTime);
//         },
//         1000);
//     });
//     dateInput.addEventListener('click', () => {
//       console.log('state.setIntervalCounter', state.setIntervalCounter)
//     for (let i = state.setIntervalCounter; i > 1; i -= 1 ) {
//         clearInterval(i);
//       };
//     });
  
  
  };
      </script>
      <div class="timer">
        <h1 id="tiemr-string"></h1>
      </div>
      <div class="date">
        <input type="datetime-local" id="dateInput">
      </div>
    </body>
  </html>
