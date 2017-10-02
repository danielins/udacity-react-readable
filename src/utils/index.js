/**
 * Helper functions
 */

export const sorting = function(key, order='asc') {
  return function(a, b) {
    if(!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
      // property doesn't exist on either object
        return 0; 
    }

    const varA = (typeof a[key] === 'string') ? 
      a[key].toUpperCase() : a[key];
    const varB = (typeof b[key] === 'string') ? 
      b[key].toUpperCase() : b[key];

    let comparison = 0;
    if (varA > varB) {
      comparison = 1;
    } else if (varA < varB) {
      comparison = -1;
    }
    return (
      (order === 'desc') ? (comparison * -1) : comparison
    );
  };
}


export const getDateByTimestamp = (timestamp) => {

	const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

	const originalDate = new Date(timestamp);
	let date = {};

	date.year = originalDate.getFullYear();
	date.month = months[originalDate.getMonth()];
	date.day = originalDate.getDate();
	date.hours = originalDate.getHours() < 10 ? `0${originalDate.getHours()}` : originalDate.getHours();
	date.minutes = originalDate.getMinutes() < 10 ? `0${originalDate.getMinutes()}` : originalDate.getMinutes();

	return `${date.month}/${date.day}/${date.year} - ${date.hours}:${date.minutes}`;

}


export const guid = () => {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + s4() + s4() +
    s4() + s4() + s4() + s4();
}