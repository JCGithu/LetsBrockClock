const client = new tmi.Client({
  channels: ['letsbrock', 'colloquialowl']
});

let time = document.getElementById('time');

client.on("connected", () => console.log('Reading from Twitch! ✅'));
client.connect();
client.on('message', (channel, tags, message, self) => {
  console.log(tags);
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
var countDownValue = 69;

// Update the count down every 1 second
setInterval(() => {
  if (countDownValue >= 1) countDownValue = countDownValue - 1;
  let hours = Math.floor((countDownValue % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  let minutes = Math.floor(countDownValue / 60);
  let seconds = Math.floor(countDownValue - minutes * 60);

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