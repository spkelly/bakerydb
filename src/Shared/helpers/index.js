import moment from 'moment';

export function capitalizeFirstLetter(str){
  return str.charAt(0).toUpperCase() + str.slice(1)
}

// datetime-local input does not like the default ISO format of date, so I have to format it with moment
export function formatDateTime(date){
  console.log(typeof(moment(date).format("YYYY-MM-DDTHH:mm")))
  return moment(date).format("YYYY-MM-DDTHH:mm");
}