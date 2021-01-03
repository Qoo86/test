var formDuration = function(ms) {
  if (ms < 0) ms = -ms;
  const time = {
    hour: Math.floor(ms / 3600000) % 24,
    minute: Math.floor(ms / 60000) % 60,
    second: Math.floor(ms / 1000) % 60,
  };
  if (time.hour < 10) time.hour = "0" + time.hour;
  if (time.minute < 10) time.minute = "0" + time.minute;
  if (time.second < 10) time.second = "0" + time.second;

  if (time.hour == 0) return time.minute + " : " + time.second;
  else if (time.hour == 0 && time.minute == 0) return time.second;
  else return time.hour + " : " + time.minute + " : " + time.second;
};

export default formDuration;
