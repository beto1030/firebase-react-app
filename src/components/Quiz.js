import "../App.css";
import React, { useState, useEffect } from 'react';
import {query, getFirestore, onSnapshot, collection, addDoc, getDocs } from "firebase/firestore";
import app from '../firebase.js';
import {getAuth} from "firebase/auth";

const db = getFirestore(app);
const auth = getAuth(app);
 
const Quiz = () => {
    const [quiz, setQuiz] = useState([]);
    const [loading, setLoading] = useState(true);
    const [submit, setSubmitionStatus] = useState("Submit");
    const [numCorrect, setNumCorrect] = useState(0);
    const [score, setScore] = useState("");


 
    const choices = [];
    const fetchPost = async () => {
       
        await getDocs(collection(db, "quiz"))
            .then((querySnapshot)=>{              
                const newData = querySnapshot.docs.map((doc) => ({
                    ...doc.data() 
                }));

                //for (let i = 0; i < newData.length; i++) {
                //    choices.push(newData[i]);
                //}
                setQuiz(newData);                
                setLoading(false);
            })


    }
   
    useEffect(()=>{
        fetchPost();
    }, []);

    if(loading) {
        return <h1>Loading...</h1>;
    }


    function showResults(){
        let submitBtn = document.getElementById("submitBtn");

        let inputTags = document.querySelectorAll(".quiz-container input[type='radio']");
        let labelTags = document.querySelectorAll(".quiz-container input[type='radio']");
        //console.log(inputTags);
        for(let i = 0; i<inputTags.length; i++){
              inputTags[i].disabled = true;
              inputTags[i].nextSibling.style.color = "lightgrey";
        }

        let answerContainers = document.querySelectorAll(".choicesContainer");
        let userAnswer = '';
        let numCorrect = 0;
        let otherAnswers = '';



        userAnswer = document.querySelectorAll(".quiz-container input[type='radio']:checked");
        for(let i = 0; i<quiz.length; i++){
                if(userAnswer[i].value === quiz[i].answer){
	            	    numCorrect++;
                        userAnswer[i].nextSibling.style.color = 'lightgreen';
                    }
                else {
	                 userAnswer[i].nextSibling.style.color = 'red';
                     let explainationEl= document.createElement("p");
                     explainationEl.classList.add("explaination");
                     let explainationText = document.createTextNode("Explaination: " +quiz[i].definition);
                     explainationEl.appendChild(explainationText);

                     let pEl = userAnswer[i].parentNode;
                     let choicesContainerEl = pEl.parentNode;
                     let sectionEl = choicesContainerEl.parentNode;
                     sectionEl.append(explainationEl);
                    
                }



           //if answer is correct
        }
        setScore("Score: "+(String(numCorrect/quiz.length)*100).toFixed()+"%");
        //let scoreText = document.createTextNode(((numCorrect/quiz.length)*100).toFixed() );
        //score.appendChild(scoreText);


        //submitBtn.after(score);

        if(submitBtn.innerHTML === "Submit"){
            setSubmitionStatus("Try Again");

        } else {
            setSubmitionStatus("Submit");
            setScore("");
            let quizContainer = document.getElementById("quizContainer"); 
            let explainationTag = quizContainer.querySelectorAll(".explaination");
            for(let i = 0; i<inputTags.length; i++){
                  inputTags[i].disabled = false;
                  inputTags[i].checked = false;
                  inputTags[i].nextSibling.style.color = "#000";
            }
            for(let j = 0; j<explainationTag.length; j++){
                explainationTag[j].remove();
            }
        }   

    }
 
    return (
        <section id="quizContainer" className="quiz-container">
            <h3>ABO Quiz</h3>
            {
                  quiz?.map((quiz, i)=>(
                    
                      <section key={i}>
                          <h3>{quiz.question}</h3>
                          <div className="choicesContainer">
                              {quiz.choices.map((choice, j) => (
                                    <div key={j}>
                                        <input
                                          id={"question#"+i+"choice"+j}
                                          type="radio"
                                          name={"question#"+i+"choice"}
                                          value={String.fromCharCode(97 + j)}
                                        />
                                        <label htmlFor={"question#"+i+"choice"+j} >{choice}</label>
                                    </div>
                                ))}
                          </div>
                      </section>

                  ))
            }
            <br/>
            <button id="submitBtn" onClick={showResults}>{submit}</button>
            <p id="score">{score}</p>
        </section>
    )
}
 
export default Quiz 
