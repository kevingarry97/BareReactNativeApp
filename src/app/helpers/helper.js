const formatPhoneNumber = (str) => {
  let cleaned = ('' + str).replace(/\D/g, '');
  
  let match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/);
  
  if (match) {
    let intlCode = (match[1] ? '+1 ' : '')
    return [intlCode, '(', match[2], ') ', match[3], '-', match[4]].join('')
  }
  
  return null;
}

const convertTime = minutes => {
  if(minutes) {
    const hrs = minutes / 60;
    const minute  = hrs.toString().split('.')[0];
    const percent  = parseInt(hrs.toString().split('.')[1].slice(0, 2));
    const sec = Math.ceil((60 * percent) / 100);

    if(parseInt(minute) < 10 && sec < 10) {
      return `0${minute}:0${sec}`;
    }

    if(parseInt(minute) < 10) {
      return `0${minute}:${sec}`;
    }

    if(sec < 10) {
      return `${minute}:0${sec}`;
    }

    return `${minute}:${sec}`;
  }
}

export default {
  formatPhoneNumber,
  convertTime
}