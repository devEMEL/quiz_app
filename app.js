
//QUESTIONS
const myQuestions = [
    {
        question: "who invented Javascript?",
        answers: {
            a: "A. Brendan Eich",
            b: "B. Douglas Crockford",
            c: "C. Sheryl Sandberg",
            d: "D. Bill James"
        },
        correctAnswer: "a",
    },

    {
        question: "which of these is a Javascript package manager?",
        answers: {
            a: "A. Node.js",
            b: "B. Typescript",
            c: "C. npm",
            d: "D. React.js"
        },
        correctAnswer: "c",
    },

    {
            question: "which tool can you use to ensure code quality",
        answers: {
            a: "A. Angular",
            b: "B. Jquery",
            c: "C. RequireJS",
            d: "D. ESLint"
        },
        correctAnswer: "d",
    },

    {
        question: "Inside which HTML element do we put the Javascript?",
        answers: {
            a: "A. javascript",
            b: "B. js",
            c: "C. scripting",
            d: "D. script"
        },
        correctAnswer: "d",
    },

    {
        question: "How do you create a function in Javascript",
        answers: {
            a: "A. function = myfunction()",
            b: "B. function myfunction()",
            c: "C. function:myfunction()",
            d: "D. function()"
        },
        correctAnswer: "b"
    }
];


//FUNCTIONS

let count, points, scores, totalQuestions, numberOfAnsweredQuestions, numberOfCorrectQuestions, currentQuestion, play;

count = 0;
points = 0;
scores = [];
totalQuestions = myQuestions.length;
numberOfAnsweredQuestions = 0;
numberOfCorrectQuestions = 0;
currentQuestion = 1;

let container = document.querySelector(".container");
let next = document.querySelector(".next");

let gameK = document.querySelector(".game");

play = true;


let buildGame = () => {

    if(count < myQuestions.length) {
       
        let html = `
            <div class="time-remaining">
                <div class="question-counter">
                    <div class="ac">${numberOfCorrectQuestions} / ${numberOfAnsweredQuestions} answers correct</div>
                    <div class="aq">question ${currentQuestion} / ${totalQuestions}</div>
                </div>
            </div>
            <div class="question">
                <div class="question-body">
                    ${myQuestions[count].question}
                </div>
            </div>
            <div class="options">
                <button class="box box1">${myQuestions[count].answers["a"]}</button>
                <button class="box box2">${myQuestions[count].answers["b"]}</button>
                <button class="box box3">${myQuestions[count].answers["c"]}</button>
                <button class="box box4">${myQuestions[count].answers["d"]}</button>
            </div>
        `
        gameK.innerHTML = html;

        let box = document.querySelectorAll(".box");
        let boxes = Array.from(box);
        //console.log(boxes);

        boxes.forEach(box => {
            box.addEventListener("click", updateUI)
        })

    };

    if(count === 4) {
        next.classList.add("submit");
        next.textContent = "submit"

        let submit = document.querySelector(".submit");
        submit.addEventListener("click",() => {
            submitGame();
        });

    }

}




let updateScores = () => {

    
    if(play) {
        let e = event.target;
        let elAns = event.target.textContent.split("")[0];
        let answer = myQuestions[count-1].correctAnswer.toUpperCase();

        // console.log(elAns);
        // console.log(answer);

        if(elAns === answer) {
            setTimeout(() => {

                numberOfCorrectQuestions++
                let arr = Array.from(document.querySelectorAll(".box"));
                arr.forEach(a => {
                    a.style.backgroundColor = "#f12323";
                    a.style.color = "white";
                })
                e.style.backgroundColor = "#1bd824";
                e.style.color = "white";

                scores.push(parseInt(20));
                console.log(scores)
                
                
            },300)

            
        }else{
            setTimeout(() => {

                let arrs = Array.from(document.querySelectorAll(".box"));
                arrs.forEach(a => {
                    a.style.backgroundColor = "#f12323";
                    a.style.color = "white";
                })

                let arr = Array.from(document.querySelectorAll(".box"));
                let ans = arr.find(el => el.textContent.split("")[0] === answer);
                ans.style.backgroundColor = "#1bd824";
                ans.style.color = "white";
            },300)
        }

        console.log(e);

        numberOfAnsweredQuestions++

        setTimeout(() => {
            document.querySelector(".ac").textContent = `${numberOfCorrectQuestions} / ${numberOfAnsweredQuestions} answers correct`;
        },500)

        
    }

    play = false;

   
}


let game = event => {

    play = true
    //1. UI
    buildGame();

    

    count++
    //numberOfAnsweredQuestions++
    currentQuestion++


};

let updateUI = event => {
    //2.UPDATE SCORE
    updateScores();
};

let submitGame = () => {
    scores.forEach(el => {
        points += el
    })
    console.log(points);

    container.innerHTML = `
        <div class="result">
            <h2>your score is</h2>
            <h2>${points} / 100</h2>
            <a href="game.html" class="playAgain">Play again</a>
        </div>
    `
};

//takes me to another page and then calls the function;

next.addEventListener("click",game);


game();