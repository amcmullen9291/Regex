import React from 'react';
import { useState, useEffect } from 'react';

export default function Landing() {

  let [ translation, setTranslation ] = useState(null);
  let [explination, setExplination ] = useState(null);  //words of explination
  let [ enteredExpression, setEnteredExpression ] = useState(null); // search value
  let [ inputLength, setInputLength ] = useState(1);

  const backslash = String.raw` \ `;

  const charClasses = [ "", "[x|y]", "." , "", "\\d", "\\D", "", "\\n", "\\r", "\\s", "\\S", "\\t", "", "\\w", "\\W", "\\0", "[^]", "[x-y]"];
  const assertions = ["^", "$", "\\b", "\\B", "|" ]
  const quantifiers = ["*", "+", "?", "{n}", "{n,}", "{n,m}"];

  const definitionsHTMLCharClass = ["placeholder" , "Matches the first occurance of either term 'x' or term 'y'.", "A wildcard; this matches any single character. However, inside square brackets, it matches a literal dot or period.", "", "This expression will match any digit. It is equivalent to the Character Case expression [0-9].", "This expression matches any character that is not a digit. It is equivalent to Character Case expression [^0-9].", "", "This expression looks for the character used to signify the end of a line of text and the start of a new line which is ' \\n '.", "This expression looks for the control character used to reset a cursor's position to the beginning of a line of text (like when you use the return key)."];
  const definitionsAssertions = ["placeholder", "Outside of square brackets, a caret looks for matches at the beginning of a string. Inside square brackets, a caret matches values NOT equal to the given filter.", "The $ expression looks for matches the end of a string.", "This character matches a 'word boundary'.  A word boundery is before the first character or after the last character in the string, if the last character is a word character. It also matches the space between two characters in a string, where one is a word character and the other is not a word character.", "Match a value NOT at the beginning or end of a word. This matches a non-word boundary; a position where the previous and next character (in relation to your value) are of the same type: Either both must be letters, or both must be word characters ( [a-z,0-9, or an underscore] ).", "Lookahead assertion: Matches 'X' only if 'X' is followed by 'Y'."];
  const definitionsQuantifiers = [ "placeholder" , "The asterisk will look for the preceding character 0 or more times. Note: if multiple letters are searched for, ALL of the letters will have to appear in the searched string in the same order as the entered regex filter value. The asterisk only affects the character immediately before it.","","","","","","The 'g' modifier specifies a global match. It will find all matches present in a string." ];

  const HTMLCharClasses = [ < span key={"2"} onClick={(e) => {define(e, "2")}}>. </span>, <span>, </span>, < span key={"4"} onClick={(e) => {define(e, "4")}}>\d </span>,<span>, </span>, < span key={"5"} onClick={(e) => {define(e, "5")}}>\D </span>,<span>, </span>, < span key={"7"} onClick={(e) => {define(e, "7")}}>\n </span>,<span>, </span>, < span key={"8"} onClick={(e) => {define(e, "8")}}>\r </span>,<span>, </span>, < span key={"9"} onClick={(e) => {define(e, "9")}}>\s </span>,<span>, </span>, < span key={"10"} onClick={(e) => {define(e, "10")}}>\S </span>,<span>, </span>, < span key={"11"} onClick={(e) => {define(e, "11")}}>\t </span>,<span>, </span>, < span key={"13"} onClick={(e) => {define(e, "13")}}>\w </span>,<span>, </span>, < span key={"14"} onClick={(e) => {define(e, "14")}}>\W </span>,<span>, </span>, < span key={"15"} onClick={(e) => {define(e, "15")}}>\0 </span>,<span>, </span>, < span key={"16"} onClick={(e) => {define(e, "16")}}>[^  ]</span>, <span>,</span>,< span key={"17"} onClick={(e) => {define(e, "17")}}>[x-y]</span> , <span>, </span>, < span key={"1"} onClick={(e) => {define(e, "1")}}>[x|y]</span>]
  const HTMLAssertions = [< span key={"1"} onClick={(e) => {define2(e, "1")}}>^</span>, <span>, </span>,< span key={"2"}  onClick={(e) => {define2(e, "2")}}>$</span>, <span>, </span>,< span key={"3"}  onClick={(e) => {define2(e, "3")}}>\b</span>, <span>, </span>,< span key={"4"}  onClick={(e) => {define2(e, "4")}}>\B</span>,<span>, </span>, < span key={"5"} onClick={(e) => {define2(e, "5")}}>x(?=y)</span> ];
  const HTMLQuantifiers = [< span key={"1"} onClick={(e) => {define3(e, "1")}}>*</span>, <span>, </span>,< span key={"2"} onClick={(e) => {define3(e, "2")}}>+</span>, <span>, </span>,< span key={"3"} onClick={(e) => {define3(e, "3")}}>?</span>, <span>, </span>,< span key={"4"} onClick={(e) => {define3(e, "4")}}>x&#x007B;n&#x007D;</span>, <span>, </span>,< span key={"5"} onClick={(e) => {define3(e, "5")}}>x&#x007B;n,_&#x007D;</span>, <span>, </span>,< span key={"6"} onClick={(e) => {define3(e, "6")}}>x&#x007B;n,m&#x007D;</span>,<span>,</span>,< span key={"7"} onClick={(e) => {define3(e, "7")}}>-g</span> ];


  const endOfQuery = " :";
  let [ endOfQuerySlash, setEndOfQuerySlash ] = useState("\\");

  function findTranslation(e){
    e.preventDefault();
    let enteredExpression = document.getElementById("inputArea").value;
    setEnteredExpression(enteredExpression);
    if(translation != null){
      if(enteredExpression.length < inputLength){
        if((enteredExpression.length < 1) && (enteredExpression.length > -1) ){
          setTranslation(translation.slice(0, -1));   
          setInputLength(0);
          if(document.getElementById("bottomDiv2Translate").innerHTML !== "Translation goes here. Note: Regex expressions are written and read left to right!"){ 
            let currentCondition = document.getElementById("bottomDiv2Translate").innerHTML;
            document.getElementById("bottomDiv2Translate").innerHTML =  currentCondition.slice(0, -1);
          }  
        }else{
        setTranslation(translation.slice(0, -1));
        setInputLength(enteredExpression.length);
          let currentCondition = document.getElementById("bottomDiv2Translate").innerHTML;
          document.getElementById("bottomDiv2Translate").innerHTML =  currentCondition.slice(0, -1);
      }
      }else{
        setTranslation(translation += enteredExpression[enteredExpression.length-1]);
        setInputLength(inputLength+=1);

        if(document.getElementById("bottomDiv2Translate").innerHTML !== "Translation goes here. Note: Regex expressions are written and read left to right!"){ 
          let currentCondition = document.getElementById("bottomDiv2Translate").innerHTML;
          const bridge = "followed by ";
          if( document.getElementById("bottomDiv2Translate").innerHTML.includes(bridge)){
            document.getElementById("bottomDiv2Translate").innerHTML =  currentCondition + enteredExpression[enteredExpression.length-1] + "";
          }else{
              if((document.getElementById("bottomDiv2Translate").innerHTML.includes("Find the first match for ")) || (document.getElementById("bottomDiv2Translate").innerHTML.includes("Starting at the beginning of the string, look for the value "))){
                document.getElementById("bottomDiv2Translate").innerHTML =  currentCondition + enteredExpression[enteredExpression.length-1];
              }else{
                document.getElementById("bottomDiv2Translate").innerHTML =  currentCondition + bridge + enteredExpression[enteredExpression.length-1] + "";
            }
          }
        }
      }
    }
    if(translation == null){
      setTranslation(enteredExpression);
      if((document.getElementById("bottomDiv2Translate").innerHTML = "Translation goes here. Note: Regex expressions are written and read left to right!") && (!document.getElementById("bottomDiv2Translate").innerHTML.includes("Find the first match"))){ 
        let currentCondition = document.getElementById("bottomDiv2Translate").innerHTML;
        document.getElementById("bottomDiv2Translate").innerHTML =  "Find the first match for " + enteredExpression;
      }

    } 
}

function resetRegex(e){
  e.preventDefault(e);
  setTranslation();
  document.getElementById("inputArea").value = "";
  document.getElementById("ignoreCase").disabled = false;
  document.getElementById("repetition").disabled = false;
  document.getElementById("bottomDiv").innerHTML = " ";
  setEndOfQuerySlash("\\");
  document.getElementById("bottomDiv2Translate").innerHTML = "Translation goes here. Note: Regex expressions are written and read left to right!";
}

function ignoreCase(e){
    e.preventDefault();
    let repetitionButton = document.getElementById("repetition");
    if(repetitionButton.checked || repetitionButton.disabled === true){
    setEndOfQuerySlash("\\ig");
  }else{
  setEndOfQuerySlash("\\i");
  }
  document.getElementById("ignoreCase").disabled = true;
}

function lookForRepeat(e){
  e.preventDefault();
    let ignoreCaseButton = document.getElementById("ignoreCase");
    if(ignoreCaseButton.checked || ignoreCaseButton.disabled === true){
    setEndOfQuerySlash("\\ig");
  }else{
  setEndOfQuerySlash("\\g");
  }
  document.getElementById("repetition").disabled = true;
  let notes = document.getElementById("sideNotes-Int");
  notes.id = "sideNotes";
}

function define (e, index){  //CharClass definitions
  e.preventDefault();
  e.target.style.color = "red";
  document.getElementById("bottomDiv").innerHTML = definitionsHTMLCharClass[index];
  let enteredExpression = charClasses[index];
  if((index == "16") || (index == "17") || (index == "1")){
      enteredExpression = "(" + enteredExpression + ")";
  }
  if(translation != null){
  setTranslation(translation + enteredExpression);
  document.getElementById("inputArea").value = "";
  theTranslation("charClasses", index);
  setInputLength(0);
}else{
  setTranslation(enteredExpression);
  document.getElementById("inputArea").value ="";
  theTranslation("charClasses", index);
  setInputLength(0);
}
}

function define2 (e, index){  //Assertions definitions
  e.preventDefault();
  e.target.style.color = "red";
  document.getElementById("bottomDiv").innerHTML = definitionsAssertions[index];
  let enteredExpression = assertions[index-1];
  if(translation != null){
    setTranslation(translation + enteredExpression);
    document.getElementById("inputArea").value ="";
    theTranslation("assertions", index);
    setInputLength(0);
  }else{
    setTranslation(enteredExpression);
    document.getElementById("inputArea").value ="";
    theTranslation("assertions", index);
    setInputLength(0);
  }
}

function define3 (e, index){  //quantifiers definitions
  e.preventDefault();
  e.target.style.color = "red";
  document.getElementById("bottomDiv").innerHTML = definitionsQuantifiers[index];
  let enteredExpression = quantifiers[index-1];
  if(translation != null){
    setTranslation(translation + enteredExpression);
    document.getElementById("inputArea").value ="";
    theTranslation("quantifiers", index);
    setInputLength(0);
  }else{
    setTranslation(enteredExpression);
    document.getElementById("inputArea").value ="";
    theTranslation("quantifiers", index);
    setInputLength(0);
  }
}

useEffect(() => {
  readInputIndexbyIndex();
}, [translation, enteredExpression]);

function theTranslation(group, index){
  if(group == "charClasses"){
    switch (index) {
      case "1":
        if(document.getElementById("bottomDiv2Translate").innerHTML != "Translation goes here. Note: Regex expressions are written and read left to right!"){
         let currentTranslation = document.getElementById("bottomDiv2Translate").innerHTML;
          document.getElementById("bottomDiv2Translate").innerHTML = currentTranslation + "I am looking for the first occurance of either value 'X' or value 'Y'. "
        }
        if(document.getElementById("bottomDiv2Translate").innerHTML == "Translation goes here. Note: Regex expressions are written and read left to right!"){
           document.getElementById("bottomDiv2Translate").innerHTML = "I am looking for the first occurance of either value 'X' or value 'Y'. "
         } 
        break;
      case "2":
        console.log("now case 2 is added to the explination.");
        break;
      case "4":
        console.log('now case 4 is added to the explination.');
        break;
      default:
        console.log(`Did not find the expression.`); //will probably leave default blank.
    }
  }
  if(group == "assertions"){
    switch (index) {
      case "1":
        if(document.getElementById("bottomDiv2Translate").innerHTML != "Translation goes here. Note: Regex expressions are written and read left to right!"){
          let currentTranslation = document.getElementById("bottomDiv2Translate").innerHTML;
           document.getElementById("bottomDiv2Translate").innerHTML = currentTranslation + "At the beginning of the string, "
         }
         if(document.getElementById("bottomDiv2Translate").innerHTML == "Translation goes here. Note: Regex expressions are written and read left to right!"){
            document.getElementById("bottomDiv2Translate").innerHTML = "Starting at the beginning of the string, look for the value "
          } 
 
      break;
      case "2":
        console.log("now case 2 is added to the explination from the assertions group.");
        break;
      case "3":
        console.log('now case 3 is added to the explination from the assertions group.');
        break;
      default:
        console.log(`Did not find the expression.`); //will probably leave default blank.
    }
  }
  if(group == "quantifiers"){
    switch (index) {
      case "1":
        console.log('that is what i want to see from the quantifiers group');
        break;
      case "2":
        console.log("now case 2 is added to the explination from the quantifiers group.");
        break;
      case "3":
        console.log('now case 3 is added to the explination from the quantifiers group.');
        break;
      default:
        console.log(`Did not find the expression.`); //will probably leave default blank.
    }
  }

}

function readInputIndexbyIndex(){  //not needed
    if(document.getElementById("inputArea").value != null){
      let enteredExpression = document.getElementById("inputArea").value;
      console.log(enteredExpression);
  }
}
  return (
      <>
  <div>
    <p id="headingTop"><center>REGEX</center></p>
    <h1>Enter an Expression</h1>
  </div>
  <div id="rightSidebar">
      <input type="checkbox" className="options" id="ignoreCase" name="ignoreCase" value="true" onClick={(e) => {ignoreCase(e)}}/>
      <label htmlFor="ignoreCase">Ignore Case</label><br/>
      <input type="checkbox" className="options" id="repetition" name="repetition" value="true" onClick={(e) => {lookForRepeat(e)}}/>
      <label htmlFor="repitition">Look for repetition</label><br/>
      <p id="optionLabel"><center>Options</center></p>
  </div>
<center>
  <form>
    <input id="inputArea" type="text" onInput={(e) => {findTranslation(e)}} placeholder="exclude leading and trailing backlash" autoComplete='off'/>
  </form>
</center>
<br/>
<div id="charClass">
  <span className="regexHeading"><center>Charater class notations: </center></span><div className="entries"><center>{HTMLCharClasses}</center></div>
  <span className="regexHeading"><center>Assertions: </center></span><div className="entries"><center>{HTMLAssertions}</center></div>
  <span className="regexHeading"><center>Quantifiers: </center></span><div className="entries"><center>{HTMLQuantifiers}</center></div>
</div>

  <center><div id="RegexTranslated">

  </div></center>
<center><br/><br/><br/>
 <div id="translatedArea">
  \{translation}{endOfQuerySlash}{endOfQuery}
  </div>
  </center>
  <div id="bottomDiv">Click on an expression for its definition.</div>
  <div id="bottomDiv2">
    <div id="bottomDiv2Translate">Translation goes here. Note: Regex expressions are written and read left to right!</div>
  </div>

  <button id="resetButton" onClick={(e) => {resetRegex(e)}}>reset</button>
  <p id="sideNotes-Int">A global modifier finds <i>all</i> matches (including matches that have a prefix or a suffix).</p>
  </>
  );
}