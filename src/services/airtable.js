import airtable from 'airtable';

let API_KEY = 'keySCoKA0j0MYnttj';

let base = new airtable({apiKey: API_KEY}).base('appFMfdHgnKfbwxmX');

export default async function retrieveAllClasses(){
  let allClasses = {};

  allClasses['dates'] = [];

  await base('Classes').select({
    // view: 'Grid View'
  }).eachPage((records, fetchNextPage) => {
    records.forEach((record) => {
      let parsedDate = record.get('Date').substring(5);
      allClasses["dates"].push(parsedDate);
      let currRecord = {
        'date': record.get('Date'),
        'name': record.get('Name'),
        'status': record.get('Status'),
        'time': record.get('Time')
      }
      if (!(parsedDate in allClasses)){
        allClasses[parsedDate] = [];
      } 
      allClasses[parsedDate].push(currRecord);
    });
    console.log(JSON.stringify(allClasses));

    fetchNextPage();
  });

  return allClasses;
}
