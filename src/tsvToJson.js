import { shuffle, trim, startCase } from 'lodash';

export const tsvJSON = (tsv) => {
  var lines=tsv.split("\n");
  var result = [];
  var headers=lines[0].split("\t");

  for(var i=1;i<lines.length;i++){
	  var obj = {};
	  var currentline=lines[i].split("\t");
	  for(var j=0;j<headers.length;j++){
      const value = trim(currentline[j]);
      const key = trim(headers[j]);
		  obj[key] =  key === 'City' ? startCase(value) : value;
	  }
	  result.push(obj);
  }
  
  return shuffle(result);
}

