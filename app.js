const firebaseConfig = {
  apiKey: "AIzaSyAUAUoxMf2eX361ZpDAuapUsZiDjr0Vqd4",
  authDomain: "quiz-app-c5166.firebaseapp.com",
  databaseURL: "https://quiz-app-c5166-default-rtdb.firebaseio.com",
  projectId: "quiz-app-c5166",
  storageBucket: "quiz-app-c5166.appspot.com",
  messagingSenderId: "531138608248",
  appId: "1:531138608248:web:d9c7027fea89b52151418d"
};

  // Initialize Firebase
  var app = firebase.initializeApp(firebaseConfig);



var questions = [
  {
      question: "JavaScript is a _____ language.",
      option1: "Scripting",
      option2: "Programming",
      option3: "Markup",
      corrAnswer: "Scripting",
  },
  {
      question: "Which HTML attribute is used to define inline styles?",
      option1: "style",
      option2: "class",
      option3: "id",
      corrAnswer: "style",
  },
  {
      question: "Which method is used to join two or more arrays in JavaScript?",
      option1: "concat()",
      option2: "merge()",
      option3: "join()",
      corrAnswer: "concat()",
  },
  {
      question: "How do you write 'Hello World' in an alert box?",
      option1: "alertBox('Hello World');",
      option2: "msg('Hello World');",
      option3: "alert('Hello World');",
      corrAnswer: "alert('Hello World');",
  },
  {
      question: "Which HTML tag is used to define an internal style sheet?",
      option1: "<script>",
      option2: "<style>",
      option3: "<css>",
      corrAnswer: "<style>",
  },
  {
      question: "How do you create a function in JavaScript?",
      option1: "function myFunction()",
      option2: "function:myFunction()",
      option3: "createFunction myFunction()",
      corrAnswer: "function myFunction()",
  },
  {
      question: "Which CSS property controls the text size?",
      option1: "font-style",
      option2: "text-size",
      option3: "font-size",
      corrAnswer: "font-size",
  },
  {
      question: "How do you select elements with class name 'example' in CSS?",
      option1: ".example",
      option2: "#example",
      option3: "example",
      corrAnswer: ".example",
  },
  {
      question: "Which event occurs when the user clicks on an HTML element?",
      option1: "onchange",
      option2: "onclick",
      option3: "onmouseclick",
      corrAnswer: "onclick",
  },
  {
      question: "Which JavaScript method is used to remove the last element from an array?",
      option1: "pop()",
      option2: "remove()",
      option3: "delete()",
      corrAnswer: "pop()",
  },
];

var ques = document.getElementById("ques");
var opt1 = document.getElementById("opt1");
var opt2 = document.getElementById("opt2");
var opt3 = document.getElementById("opt3");
var btn = document.getElementById("btn");
var timer = document.getElementById("timer");
var index = 0;
var score = 0;
var min = 0;
var sec = 30;

var interval = setInterval(function () {
  timer.innerHTML = `${min}:${sec}`;
  sec--;
  if (sec < 0) {
      sec = 30;
      nextQuestion();
    }
}, 1000);


function alertResult(title,percentage,icon){
  Swal.fire({
    title: `${title}`,
    text: `Your Percentage: ${percentage}%`,
    icon : `${icon}`
  }).then(()=>{
    window.location.replace(window.location.href)
  })
  clearInterval(interval);
  
}


var id = Date.now().toString(25)
dataInObj = {
  id : id
}

function nextQuestion() {
  var getOptions = document.getElementsByName("option");
  
  
  for (var i = 0; i < getOptions.length; i++) {
    
    if (getOptions[i].checked) {
      
      
      var selectedAns = getOptions[i].value;
      var selectedOpt = questions[index - 1][`option${selectedAns}`];
      var correctAns = questions[index - 1]["corrAnswer"];
      
      
       Object.defineProperty(dataInObj, `ques${index}SelectedOption`, {value:selectedOpt, enumerable: true})
      
      if (selectedOpt == correctAns) {
        score++;
      }
    }
    
    getOptions[i].checked = false;
    
}
  btn.disabled = true;
  
  var percentage = ((score / questions.length) * 100).toFixed(2)
  
  if (index > questions.length - 1) {
    firebase.database().ref('userQuizQuestionsSelectedOption/' + id).set(dataInObj)
    console.log(dataInObj)
    if(percentage == 100){
      alertResult('Perfect!',percentage,'success')
    }else if(percentage < 100 && percentage >= 90){
      alertResult('Amazing!',percentage,'success')
    }else if (percentage < 90  && percentage >= 80){
      alertResult('Good!',percentage,'success')
    }else if (percentage < 80  && percentage >= 70){
      alertResult('Well Done!',percentage,'success')
    }else if (percentage < 70  && percentage >= 60){
      alertResult('Good',percentage,'success')
    }else if (percentage < 60  && percentage >= 50){
      alertResult('Need Improvement',percentage,'warning')
    }else if (percentage < 50){
      alertResult('Failed',percentage,'error')
    }
  } else {
    ques.innerText = questions[index].question;
    opt1.innerText = questions[index].option1;
    opt2.innerText = questions[index].option2;
    opt3.innerText = questions[index].option3;
    index++;
    sec = 30;
  }
}

function enableNextBtn() {
  btn.disabled = false;
}