import React, { useState, useEffect } from "react";

function TestsPage() {

const [startTest,setStartTest]=useState(false);
const [selectedCourse,setSelectedCourse]=useState("");
const [currentQuestion,setCurrentQuestion]=useState(0);
const [time,setTime]=useState(7200);
const [code,setCode]=useState("");
const [answers,setAnswers]=useState({});
const [output,setOutput]=useState("");
const [result,setResult]=useState(null);

const courses = JSON.parse(localStorage.getItem("enrolledCourses")) || [];

const today = new Date().getDay();
const isWeekend = today === 6 || today === 0;

useEffect(()=>{

if(!startTest) return;

const timer=setInterval(()=>{
setTime(prev=>prev-1);
},1000);

return ()=>clearInterval(timer);

},[startTest]);

if(!isWeekend){
return(
<div className="container mt-5">
<h3>Tests available only on Saturday and Sunday</h3>
</div>
);
}

if(courses.length===0){
return(
<div className="container mt-5">
<h3>Please enroll in a course first</h3>
</div>
);
}

const questions=[

{
type:"coding",
title:"Sum of Two Numbers",
problem:"Write a program that reads two integers and prints their sum.",
input:"Two integers A and B",
output:"Print A + B",
sampleInput:"2 3",
sampleOutput:"5"
},

{
type:"coding",
title:"Even or Odd",
problem:"Determine whether a number is even or odd.",
input:"Integer N",
output:"EVEN or ODD",
sampleInput:"4",
sampleOutput:"EVEN"
},

{
type:"coding",
title:"Reverse String",
problem:"Reverse the given string.",
input:"String S",
output:"Reversed string",
sampleInput:"hello",
sampleOutput:"olleh"
},

{
type:"coding",
title:"Factorial",
problem:"Find factorial of a number.",
input:"Integer N",
output:"Print N!",
sampleInput:"5",
sampleOutput:"120"
},

{
type:"coding",
title:"Largest Number",
problem:"Find the largest among three numbers.",
input:"Three integers",
output:"Largest number",
sampleInput:"3 8 5",
sampleOutput:"8"
},

{
type:"coding",
title:"Palindrome Number",
problem:"Check if a number is palindrome.",
input:"Integer N",
output:"YES or NO",
sampleInput:"121",
sampleOutput:"YES"
},

{
type:"mcq",
question:"Binary search complexity?",
options:["O(n)","O(log n)","O(n log n)","O(1)"],
answer:"O(log n)",
explanation:"Binary search repeatedly divides the search space into two halves. Because the array size reduces by half each step, the number of operations grows logarithmically with input size.",
tip:"Whenever an algorithm repeatedly divides the problem into halves, the time complexity is usually O(log n)."
},

{
type:"mcq",
question:"Which data structure follows FIFO?",
options:["Stack","Queue","Tree","Graph"],
answer:"Queue",
explanation:"FIFO means First In First Out. The element inserted first will be removed first. Queue follows this principle.",
tip:"Think of a queue like people standing in a line at a ticket counter."
},

{
type:"mcq",
question:"Which sorting algorithm is stable?",
options:["Merge Sort","Quick Sort","Heap Sort","Selection Sort"],
answer:"Merge Sort",
explanation:"A stable sort preserves the relative order of elements with equal keys. Merge sort maintains this property during merging.",
tip:"Stable sorting is important when sorting records with multiple fields."
},

{
type:"mcq",
question:"Which data structure follows LIFO?",
options:["Stack","Queue","Array","Linked List"],
answer:"Stack",
explanation:"LIFO means Last In First Out. The most recently inserted element is removed first.",
tip:"Stack operations are push (insert) and pop (remove)."
}

];

const question = questions[currentQuestion];

const compileCode=()=>{
setOutput("Code compiled successfully.");
};

const runCode=()=>{
setOutput("Program executed.");
};

const saveCodingAnswer=()=>{
setAnswers({...answers,[currentQuestion]:code});
};

const selectMCQ=(option)=>{
setAnswers({...answers,[currentQuestion]:option});
};

const nextQuestion=()=>{
if(currentQuestion < questions.length-1){
setCurrentQuestion(currentQuestion+1);
}
};

const prevQuestion=()=>{
if(currentQuestion>0){
setCurrentQuestion(currentQuestion-1);
}
};

const submitTest=()=>{

let score=0;

questions.forEach((q,i)=>{

if(q.type==="mcq"){
if(answers[i]===q.answer){
score++;
}
}

if(q.type==="coding"){
if(answers[i] && answers[i].length>5){
score++;
}
}

});

const percentage=Math.round((score/questions.length)*100);

const results=JSON.parse(localStorage.getItem("testResults"))||[];

results.push({
course:selectedCourse,
score:percentage,
date:new Date().toLocaleDateString()
});

localStorage.setItem("testResults",JSON.stringify(results));

setResult(percentage);

};

const formatTime=()=>{
const h=Math.floor(time/3600);
const m=Math.floor((time%3600)/60);
const s=time%60;
return `${h}:${m}:${s}`;
};

if(result!==null){

return(

<div className="container mt-5">

<h2>Your Score: {result}%</h2>

<h3 className="mt-4">Review Your Mistakes</h3>

{questions.map((q,i)=>{

if(q.type==="mcq" && answers[i] && answers[i]!==q.answer){

return(

<div key={i} className="card p-4 mt-3 border-danger">

<h5>Question:</h5>
<p>{q.question}</p>

<p><b>Your Answer:</b> {answers[i]}</p>

<p style={{color:"green"}}>
<b>Correct Answer:</b> {q.answer}
</p>

<p>
<b>Explanation:</b> {q.explanation}
</p>

<p style={{background:"#f0f7ff",padding:"10px"}}>
💡 <b>Learning Tip:</b> {q.tip}
</p>

</div>

);

}

return null;

})}

</div>

);

}

return(

<div className="container mt-5">

<h2>Weekly Tests</h2>

{!startTest ?(

courses.map((course,index)=>(

<div key={index} className="card p-4 mt-3">

<h4>{course.name} Test</h4>

<p>10 Questions | 2 Hours</p>

<button
className="btn btn-dark"
onClick={()=>{
setSelectedCourse(course.name);
setStartTest(true);
}}
>
Start Test
</button>

</div>

))

):( 

<div>

<h4>{selectedCourse} Test</h4>
<h5>Time Left: {formatTime()}</h5>

<div className="card p-4 mt-3">

{question.type==="coding" ?(

<div>

<h4>{question.title}</h4>

<p>{question.problem}</p>

<p><b>Input:</b> {question.input}</p>
<p><b>Output:</b> {question.output}</p>
<p><b>Sample Input:</b> {question.sampleInput}</p>
<p><b>Sample Output:</b> {question.sampleOutput}</p>

<textarea
className="form-control"
rows="8"
value={code}
onChange={(e)=>setCode(e.target.value)}
placeholder="Write your code here"
/>

<div className="mt-3">

<button className="btn btn-secondary me-2" onClick={compileCode}>
Compile
</button>

<button className="btn btn-primary me-2" onClick={runCode}>
Run
</button>

<button className="btn btn-success" onClick={saveCodingAnswer}>
Save Answer
</button>

</div>

{output &&(
<div className="alert alert-info mt-3">
{output}
</div>
)}

</div>

):( 

<div>

<h4>{question.question}</h4>

{question.options.map((opt,i)=>(

<div key={i}>

<input
type="radio"
name="mcq"
onChange={()=>selectMCQ(opt)}
/>

{" "} {opt}

</div>

))}

</div>

)}

</div>

<div className="mt-3">

<button
className="btn btn-secondary me-2"
onClick={prevQuestion}
>
Previous
</button>

<button
className="btn btn-primary me-2"
onClick={nextQuestion}
>
Next
</button>

{currentQuestion===questions.length-1 &&(

<button
className="btn btn-success"
onClick={submitTest}
>
Submit Test
</button>

)}

</div>

</div>

)}

</div>

);

}

export default TestsPage;