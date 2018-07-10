/* 
	Name: Amarkant Kumar,
	Email-id : amar.du2013@gmail.com
	Contact no: +91-9108529765
*/


let newspapersText = "The government said Sanchez used government computers and equipment to steal the identities of at least seven “particularly vulnerable” illegal or undocumented immigrants who were facing deportation or exclusion from the country, the Seattle Times reported. He created fake identification cards in the names of the victims using his own picture and then opened bank accounts and got credit cards in the victims’ names. He even used the photograph of a slain woman published in the press on forged female ID documents.";
let ransomText = "computers and equipment to steal the identities";

const getMappedData = (inputText) => {
  	// split the input text and remove all empty value form array, if any. Then create a mapped data <word,count>
  	return inputText.split(/[\s,]+/).filter(Boolean).reduce((map, word) => {
    	// if word exist into map then increment value of count by 1 or, set count 1 for new word. 
    	return map.has(word) ? map.set(word, map.get(word) + 1) : map.set(word, 1);
  	}, new Map());
};

// Version 1
const checkCanPrepareTheRansomNote = (newspapers, ransom) => {
  	if (ransom.length > newspapers.length) {
    	return false;
  	} else {
    	let canPrepare = false;
    	newspapers = getMappedData(newspapers); // get newspapers mapped data 
    	ransom = getMappedData(ransom); // get ramsom mapped data 
    	for (let [word, count] of ransom) {
	      	if (newspapers.has(word) && newspapers.get(word) >= count) {
	        	canPrepare = true;
	      	} else {
	        	canPrepare = false;
	        	break;
	      	}
	    }
    	return canPrepare;
  	}
}

// Version 2
const checkCanPrepareTheRansomNoteV2 = (newspapers, ransom) => {
  	if (ransom.length > newspapers.length) {
    	return false;
  	} else {
    	newspapers = getMappedData(newspapers); // get newspapers mapped data 
    	ransom = ransom.split(/[\s,]+/).filter(Boolean); // split and remove empty string
    	for (let word of ransom) {
    		if (newspapers.has(word)) {
    			if (newspapers.get(word) > 1) {
    				newspapers.set(word, newspapers.get(word)-1);
    			} else {
    				newspapers.delete(word);
    			}
    		} else {
    			return false;
    		}
    	}
    	return true;
  	}
}

if (checkCanPrepareTheRansomNote(newspapersText.trim(), ransomText.trim())) {
  console.log('Yes, we can prepare the ransom note using the given newspaper and ransom message.');
} else {
  console.log('No, we can\'t prepare the ransom note using the given newspaper and ransom message.');
}

if (checkCanPrepareTheRansomNoteV2(newspapersText.trim(), ransomText.trim())) {
  console.log('Yes, we can prepare the ransom note using the given newspaper and ransom message.');
} else {
  console.log('No, we can\'t prepare the ransom note using the given newspaper and ransom message.');
}
