const client = new tmi.Client({
  channels: ['letsbrock', 'colloquialowl']
});

let time = document.getElementById('time');
let pause = false;
let countDownValue = 5009;

function updateTime(){
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
}

client.on("connected", () => console.log('Reading from Twitch! ✅'));
client.connect();
client.on('message', (channel, tags, message, self) => {
  console.log(tags);
  if (!tags.mod) return;
  if (message === '!pause') pause = true;
  if (message === "!unpause") pause = false;
  let split = message.split(' ');
  if (split.length > 2) return;
  if (split[0] === "!addsec"){
    let num = parseInt(split[1]);
    if (num) countDownValue = countDownValue + num;
    updateTime();
  }
  if (split[0] === "!addmin"){
    let num = parseInt(split[1]);
    if (num) {
      num = num * 60;
      countDownValue = countDownValue + num;
      updateTime();
    }
  }
  if (split[0] === "!resetclock"){
    let num = parseInt(split[1]);
    if (num) countDownValue = num;
    updateTime();
  }
});

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
  updateTime();
}, 1000);