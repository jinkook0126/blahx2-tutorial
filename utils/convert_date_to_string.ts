import moment from 'moment';

function convertDateToString(datestring: string): string {
  const datTime = moment(datestring, moment.ISO_8601).milliseconds(0);
  const now = moment();

  const diff = now.diff(datTime);
  const calDuration = moment.duration(diff);
  const year = calDuration.years();
  const month = calDuration.months();
  const days = calDuration.days();
  const hours = calDuration.hours();
  const minutes = calDuration.minutes();
  const seconds = calDuration.seconds();

  if (
    year === 0 &&
    days === 0 &&
    month === 0 &&
    hours === 0 &&
    minutes === 0 &&
    seconds !== undefined &&
    (seconds === 0 || seconds < 1)
  ) {
    return '0초';
  }
  if (year === 0 && month === 0 && days === 0 && hours === 0 && minutes === 0 && seconds) {
    return `${Math.floor(seconds)}초`;
  }
  if (year === 0 && month === 0 && days === 0 && hours === 0) {
    return `${minutes}분`;
  }
  if (year === 0 && month === 0 && days === 0) {
    return `${hours}시`;
  }
  if (year === 0 && month === 0) {
    return `${days}일`;
  }
  if (year === 0) {
    return `${month}개월`;
  }
  return `${year}년`;
}

export default convertDateToString;
