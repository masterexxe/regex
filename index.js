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



function getInput() {
  let inputValue = input.value.replace(/\s+/g, '')
  let inputValuesSplit = inputValue.split('');
  let inputValuesSplitAccent = [];

  inputValuesSplit.forEach(element => {
    inputValuesSplitAccent.push(accents(element));
  });


  let [first, ...rest] = inputValuesSplitAccent;



  let endRegex = "";
  let startRegex = "";
  let finalRegexArr = [];
  let finalRegex = "";
  startRegex = regexStart(inputValuesSplitAccent[0]);

  console.log(rest)


  let len = rest.length;

  for (let i = 0; i < len; i++) {
    console.log(rest[i]);
    if (i+1 >= len || rest[i] != rest[i+1]) {
      console.log('oops!'); // print oops only if we're at the end of the array OR elements are different
      finalRegexArr.push(regex(rest[i]));
    }
  }


  //end-part of the regex
  finalRegexArr.push('+\\b');

  finalRegex = finalRegexArr.join('');


  finalRegex = startRegex + finalRegex + endRegex;


  stringForRegex.innerHTML = inputValue;
  finalText.innerHTML = finalRegex;

  navigator.clipboard.writeText(finalRegex);
}

function regex(x) {
  return '+([' + x +'][\\W_]*?)';
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

  r = r.replace("\u00f6", "\u00f6\u006f\u00f4\u00f2\u00f3\u00f5\u0153\u00f8\u014d\u0030");
  r = r.replace("\u00df", "\u00df\u0073");
  r = r.replace("a", "\u0061\u00e4\u0034");
  r = r.replace("b", "\u0062\u0036\u0431");
  r = r.replace("c", "\u0063\u0441\u00e7\u0107\u010d");
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