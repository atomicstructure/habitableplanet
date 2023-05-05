import { parse } from 'csv-parse';
import fs from 'fs';


const results = [];

const habitablePlanet = function(planet){
  return planet['koi_disposition'] === 'CONFIRMED'
  && planet['koi_insol'] > 0.36 && planet['koi_insol'] < 1.11
  && planet['koi_prad'] < 1.6
}

fs.createReadStream('kepler_data.csv')
  .pipe(parse({
    comment: '#',
    columns: true,
  }))
  .on('data', (data) => {
    if (habitablePlanet(data)){
      results.push(data)
    }
  })
  .on('error', (err) => {
    console.log(err)
  })
  .on('end', () => {
    console.log(results.map((planets)=>{
      return planets['kepler_name']
    }))
    console.log(`The total number of planets that are habitable is ${results.length}!`);
  });

// parse();