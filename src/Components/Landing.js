import React from 'react';
import { useState } from 'react';

export default function Landing() {

  let [ translation, setTranslation ] = useState(null);
  let [explination, setExplination ] = useState(null);
  const backslash = String.raw` \ `;

  const charClasses = [ backslash, ".", "\\d", "\\D", "\\n", "\\r", "\\s", "\\S", "\\t", "\\w", "\\W", "\\0", "[^]"];
  const assertions = ["^", "$", "\\b", "\\B", "|" ]
  const quantifiers = ["*", "+", "?", "x{n}", "x{n,}", "x{n,m}"];
  const flags = ["i", "g" ]; 
  //for .includes() method

  const definitionsHTMLCharClass = ["placeholder" , "Matches the first occurance of either term 'x' or term 'y'.", "A wildcard; this matches any single character. However, inside square brackets, it matches a literal dot or period.", "", "This expression will match any digit. It is equivalent to the Character Case expression [0-9].", "This expression matches any character that is not a digit. It is equivalent to Character Case expression [^0-9].", "", "This expression looks for the character used to signify the end of a line of text and the start of a new line which is ' \\n '.", "This expression looks for the control character used to reset a cursor's position to the beginning of a line of text (like when you use the return key)."];
  const definitionsAssertions = ["placeholder", "Outside of square brackets, a caret looks for matches at the beginning of a string. Inside square brackets, a caret matches values NOT equal to the given filter."];
  const definitionsQuantifiers = [ "placeholder" , "The asterisk will look for the preceding character 0 or more times. Note: if multiple letters are searched for, ALL of the letters will have to appear in the searched string in the same order as the entered regex filter value. The asterisk only affects the character immediately before it." ];

  const HTMLCharClasses = [ < span key={"2"} onClick={(e) => {define(e, "2")}}>. </span>, <span>, </span>, < span key={"4"} onClick={(e) => {define(e, "4")}}>\d </span>,<span>, </span>, < span key={"5"} onClick={(e) => {define(e, "5")}}>\D </span>,<span>, </span>, < span key={"7"} onClick={(e) => {define(e, "7")}}>\n </span>,<span>, </span>, < span key={"8"} onClick={(e) => {define(e, "8")}}>\r </span>,<span>, </span>, < span key={"9"}>\s </span>,<span>, </span>, < span key={"10"}>\S </span>,<span>, </span>, < span key={"11"}>\t </span>,<span>, </span>, < span key={"13"}>\w </span>,<span>, </span>, < span key={"14"}>\W </span>,<span>, </span>, < span key={"15"}>\0 </span>,<span>, </span>, < span key={"16"}>[^  ]</span>, <span>,</span>,< span key={"17"}>[x-y]</span> , <span>, </span>, < span key={"1"} onClick={(e) => {define(e, "1")}}>[x|y]</span>]
  const HTMLAssertions = [< span key={"1"} onClick={(e) => {define2(e, "1")}}>^</span>, <span>, </span>,< span key={"2"}>$</span>, <span>, </span>,< span key={"3"}>\b</span>, <span>, </span>,< span key={"4"}>\B</span> ];
  const HTMLQuantifiers = [< span key={"1"} onClick={(e) => {define3(e, "1")}}>*</span>, <span>, </span>,< span key={"2"}>+</span>, <span>, </span>,< span key={"3"}>?</span>, <span>, </span>,< span key={"4"}>x&#x007B;n&#x007D;</span>, <span>, </span>,< span key={"5"}>x&#x007B;n,_&#x007D;</span>, <span>, </span>,< span key={"6"}>x&#x007B;n,m&#x007D;</span>,<span>,</span>,< span key={"7"}>-g</span> ];


  const endOfQuery = " :";
  let [ endOfQuerySlash, setEndOfQuerySlash ] = useState("\\");

  function findTranslation(e){
    e.preventDefault();
    let enteredExpression = document.getElementById("inputArea").value;
    document.getElementById('RegexTranslated').innerHTML = enteredExpression;
    setTranslation(enteredExpression);
    console.log(enteredExpression[enteredExpression.length -1]);
    //reads last character from input
}

function resetRegex(e){
  e.preventDefault(e);
  setTranslation();
  document.getElementById("inputArea").value = "";
  document.getElementById("ignoreCase").disabled = false;
  document.getElementById("repetition").disabled = false;
  document.getElementById("bottomDiv").innerHTML = " ";
  setEndOfQuerySlash("\\");
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
}

function define2 (e, index){  //Assertions definitions
  e.preventDefault();
  e.target.style.color = "red";
  document.getElementById("bottomDiv").innerHTML = definitionsAssertions[index];
}

function define3 (e, index){  //quantifiers definitions
  e.preventDefault();
  e.target.style.color = "red";
  document.getElementById("bottomDiv").innerHTML = definitionsQuantifiers[index];
}

 //something like
 //let searchterm = "";  (need to set constant)
 //while((!charClasses.includes(enteredExpression[enteredExpression.length -1])) && (!quantifers.includes(enteredExpression[enteredExpression.length -1]) && (!charClasses.includes(enteredExpression[enteredExpression.length -1])){
//    searchTerm += enteredExpression[enteredExpression.length -1])
// }
//... and if it does contain an expression, set serach term  (searchterm, setSearchterm)
//also need to set the "n"s in the constants to accept any number


  return (
      <>
  <div>
    <center><p id="headingTop">REGEX</p></center>
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
    <div id="bottomDiv2Translate">Translation goes here.</div>
  </div>

  <button id="resetButton" onClick={(e) => {resetRegex(e)}}>reset</button>
  <p id="sideNotes-Int">A global modifier finds <i>all</i> matches (including matches that have a prefix or a suffix).</p>
  </>
  );
}
