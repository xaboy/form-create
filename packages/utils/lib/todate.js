import is from './type';

export function toDate(timeStamp) {
    if (is.Date(timeStamp))
        return timeStamp;
    else {
        let date = new Date(timeStamp);
        return date.toString() === 'Invalid Date' ? timeStamp : date;
    }
}
