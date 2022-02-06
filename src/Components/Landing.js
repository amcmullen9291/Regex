import React from 'react';
import { useState } from 'react';

export default function Landing() {

  let [ translation, setTranslation ] = useState(null);


  function findTranslation(e){
    e.preventDefault();
    let enteredExpression = document.getElementById("inputArea").value;
    document.getElementById('RegexTranslated').innerHTML = enteredExpression;
    setTranslation(enteredExpression);
}

  return (
      <>
  <div>
    <center><h1>Landing Page</h1></center>
  </div>
<center>
  <form>
    <input id="inputArea" type="text" onInput={(e) => {findTranslation(e)}} placeholder="enter Regex" autoComplete='off'/>
  </form>
</center>
<br/>
<hr/>
  <center><div id="RegexTranslated">

  </div></center>
<br/>
  {translation}
  </>
  );
}
