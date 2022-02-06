import React from 'react';
import { useState } from 'react';

export default function Landing() {

  let [ translation, setTranslation ] = useState(null);
  const backslash = String.raw` \ `;

  const charClasses = [ backslash, ", ", ".", " , ", "\\cX", ", ", "\\d", ", ", "\\D", ", ", "\\f", ", ", "\\n",", ", "\\r",", ", "\\s",", ", "\\S",", ", "\\t",", ", "\\v",", ", "\\w",", ", "\\W",", ", "\\0",", ", "[^]"];
  const assertions = ["^", ", ", "$", ", ",  "\\b", ", ",  "\\B"]
  const quantifiers = ["*", ", ", "+", ", ", "?", ", ", "x{n}", ", ", "x{n,}", ", ", "x{n,m}"];
  //for .includes() method

  const HTMLCharClasses = [ < span key={"1"}>{backslash}</span>]
  const HTMLAsserstions = [];
  const HTMLQuantifiers = [];
  //@ mapping HTMLClasses for nicer visual HTML

  function findTranslation(e){
    e.preventDefault();
    let enteredExpression = document.getElementById("inputArea").value;
    document.getElementById('RegexTranslated').innerHTML = enteredExpression;
    setTranslation(enteredExpression);
    console.log(enteredExpression[enteredExpression.length -1]);
    //reads last character from input
}

  return (
      <>
  <div>
    <h1>Enter an Expression</h1>
  </div>
<center>
  <form>
    <input id="inputArea" type="text" onInput={(e) => {findTranslation(e)}} placeholder="Regular Expressions" autoComplete='off'/>
  </form>
</center>
<br/>
<div id="charClass">
  <span className="regexHeading"><center>Charater Class: </center></span><center>{charClasses}</center>
  <span className="regexHeading"><center>Assertions: </center></span><center>{assertions}</center>
  <span className="regexHeading"><center>Quantifiers: </center></span><center>{quantifiers}</center>
</div>

  <center><div id="RegexTranslated">

  </div></center>
<center><br/><br/><br/>
 <div id="translatedArea">
  {translation}
  </div>
  </center>
  </>
  );
}
