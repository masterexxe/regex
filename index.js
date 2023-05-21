let input = document.getElementById("textbox");
let stringForRegex = document.getElementById("resultRegex");
let finalText = document.getElementById("stringForRegex");

let inputBox = document.getElementById("textbox");


input.addEventListener("keypress", function (event){
  if(event.key === "Enter") {
    event.preventDefault();
    getInput();
  }
})

function xy() {
  if(inputValue.includes("(") && inputValue.includes(")")) {
    let matches = regExp.exec(input.value);
    console.log(matches[1]);
    console.log(matches[1].length);

    if(matches[1].length == 1) {
      placeholder = regexOptionalParameters(matches[1]);
      inputValue = inputValue.replace("("+matches[1]+")", placeholder)
    } else if(matches[1].length == 2) {
      placeholder = regexOptionalParametersDouble(matches[1]);
      inputValue = inputValue.replace("("+matches[1]+")", placeholder)
    }
    console.log(inputValue);
  }
}



function getInput() {
  let inputValue = input.value.replace(/\s+/g, '')
  let inputValuesSplit = inputValue.split('');
  let inputValuesSplitAccent = [];

  inputValuesSplit.forEach(element => {
    inputValuesSplitAccent.push(accents(element));
  });

  console.log(inputValuesSplitAccent);
  if(inputValuesSplitAccent.includes("(") && inputValuesSplitAccent.includes(")")) {
  }

  let [first, ...rest] = inputValuesSplitAccent;

  let endRegex = "";
  let startRegex = "";
  let finalRegexArr = [];
  let finalRegex = "";
  startRegex = regexStart(inputValuesSplitAccent[0]);



  let len = rest.length;

  let specialMode = false;
  specialMode = false;
  for (let i = 0; i < len; i++) {
    specialMode = true;
    if (i+1 >= len || rest[i] != rest[i+1]) {
      if(rest[i-1] == "(" && rest[i+1] == ")") {
        finalRegexArr.pop(i);
        rest[i] = regexOptionalParameters(rest[i]);
      }
      if(rest[i-1] == "(" && rest[i+2] == ")") {
        specialMode = false;
        finalRegexArr.pop(i);
        rest[i] = regexOptionalParametersOne(rest[i]);
        rest[i+1] = regexOptionalParametersTwo(rest[i+1]);
      }

      finalRegexArr.push(regex(rest[i]));
    }
  }


  //end-part of the regex
  if (specialMode === true) {
    finalRegexArr.push('\\b');
  } else {
    finalRegexArr.push('+\\b');
  }

  console.log(finalRegexArr);
  finalRegexArr = finalRegexArr.filter(item => item !== "+([)][\\W_]*?)");



  finalRegex = finalRegexArr.join('');


  finalRegex = startRegex + finalRegex + endRegex;


  stringForRegex.innerHTML = inputValue;
  finalText.innerHTML = finalRegex;

  navigator.clipboard.writeText(finalRegex);
}

function regexOptionalParameters(x) {
  return '+(?:(?:['+ x +'][\\W_]*?)+|)';
}



function regexOptionalParametersOne(x) {
  return '+((?:['+x+'][\\W_]*?)+|';
}

function regexOptionalParametersTwo(x) {
  return '(?:['+x+'][\\W_]*?)+)';
}


function regex(x) {
  if(x.includes("(") && x.includes(")")) {
    return x;
  } else {
    return '+([' + x +'][\\W_]*?)';
  }

}

function regexStart(x) {
  let selected = document.querySelector('input[name="gender"]:checked').id;

  if(selected == "keywords") {
    return 'regex:\\b([' + x + '][\\W_]*?)';
  } else if (selected == "blocked") {
    return '\\b([' + x + '][\\W_]*?)';
  } else if (selected == "negative") {
    return 'regex:negative:\\b([' + x + '][\\W_]*?)';
  } else {
    console.log("ERROR");
  }

}


function accents(s) {

  let r = s.toString().toLowerCase();

  r = r.replace("\u00df", "\u00df\u0073");
  r = r.replace("a", "\u0061\u00e4\u0034");
  r = r.replace("b", "\u0062\u0036\u0431");
  r = r.replace("c", "c");
  r = r.replace("e", "\u0065\u0033");
  r = r.replace("g", "g69");
  r = r.replace("i", "i1");
  r = r.replace("l", "l1");
  r = r.replace("o", "o\u00F6\u0030");
  r = r.replace("s", "s5");
  r = r.replace("t", "t7");
  r = r.replace("u", "u\u00FC");
  r = r.replace("y", "y");


  return r.toLowerCase();

}