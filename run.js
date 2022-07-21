const client = new tmi.Client({
  channels: ['letsbrock', 'colloquialowl']
});

let time = document.getElementById('time');
let pause = false;

client.on("connected", () => console.log('Reading from Twitch! ✅'));
client.connect();
client.on('message', (channel, tags, message, self) => {
  console.log(tags);
  if (message === '!pause') pause = true;
  if (message === "!unpause") pause = false;
  if (!tags.mod) return;

  let split = message.split(' ');
  if (split.length > 2) return;
  if (split[0] === "!addsec"){
    let num = parseInt(split[1]);
    if (num) countDownValue = countDownValue + num;
  }
  if (split[0] === "!addmin"){
    let num = parseInt(split[1]);
    if (num) {
      num = num * 60;
      countDownValue = countDownValue + num;
    }
  }
  if (split[0] === "!resetclock"){
    let num = parseInt(split[1]);
    if (num) countDownValue = num;
  }
});


// Set the date we're counting down to
var countDownValue = 5009;

// Update the count down every 1 second
setInterval(() => {
  if (pause) {
    time.style.color = 'red';
    time.style.setProperty('--nameCol', 'white');
    time.className = '';
    return; 
  } else {
    time.style.color = 'white';
    time.className = 'float';
    time.style.setProperty('--nameCol', 'black');
  };
  if (countDownValue >= 1) countDownValue = countDownValue - 1;
  let hours = Math.floor((countDownValue / 60)/60);
  let minutes = Math.floor((countDownValue / 60) - (hours * 60));
  let seconds = Math.floor(countDownValue - (minutes * 60) - (hours * 60 *60));

  hours = hours.toLocaleString('en-US', {
    minimumIntegerDigits: 2,
    useGrouping: false
  });

  minutes =  minutes.toLocaleString('en-US', {
    minimumIntegerDigits: 2,
    useGrouping: false
  });

  seconds = seconds.toLocaleString('en-US', {
    minimumIntegerDigits: 2,
  })

  time.innerText = `${hours}:${minutes}:${seconds}`;
}, 1000);