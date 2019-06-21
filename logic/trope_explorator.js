var _ = require('lodash');

function buildChoicesClause(choices) {
    console.log('arr', choices);
    if (choices.length === 0 || choices[0].length < 2) {
        return ``;
    } else {
        var mapped = _.map(choices, (choice) => {
            return `${choice} = true` } );
        var clauses = _.join(mapped, ' AND ');
        return `AND ${clauses}`;
    }

}



module.exports = function(params) {

console.log(params);
let yaw = -Number(params.yaw);
let roll = Number(params.roll);
let pitch = Number(params.pitch);
let picks = {

};
let gender = params.gender === 'any' ? '5 = 5' : `replace(gender, '"', '') = '${_.capitalize(params.gender)}'`;
let emotion = params.emotion === 'any' ? '5 = 5' : `strpos(emotions, upper('${params.emotion}')) > 0`;
let age = params.age;
let choices = buildChoicesClause(params.choices);
  return `
  
  SELECT 
   url as src
  FROM (
    SELECT 
        url, 
        pitchDiff + yawDiff + rollDiff as dist
    FROM (
        SELECT 
          IF(pitch > ${pitch}, pitch - ${pitch}, ${pitch}-pitch) as pitchDiff,
          IF(yaw > ${yaw}, yaw - ${yaw}, ${yaw}-yaw) as yawDiff,
          IF(roll > ${roll}, roll - ${roll}, ${roll}-roll) as rollDiff, 
          url,
           src
        FROM (
            SELECT 
                pitch, 
                yaw,
                roll, 
                replace(url, '"', '') as url, 
                'a'
            AS src 
            FROM "images"."analyzed_images" 
            WHERE roll is not null
            AND ${emotion}
            AND ${age}
            AND ${gender}
            ${choices}
        )
 )
 )
 order by dist asc limit 200
  `;
};

