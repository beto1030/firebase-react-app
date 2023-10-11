import "../App.css";
import React, { useState, useEffect } from 'react';
import {getFirestore, collection, addDoc, getDocs } from "firebase/firestore";
import app from '../firebase';//you dont need curly brackets for default export

const db = getFirestore(app);
 
 
const Todo = () => {
    const [question, setQuestion] = useState("");
    const [questions, setQuestions] = useState([]);
 
    const addQuestion= async (e) => {
        e.preventDefault();  
       
        try {
            const docRef = await addDoc(collection(db, "quiz"), {
              question: question,
            });
            console.log("Document written with ID: ", docRef.id);
          } catch (e) {
            console.error("Error adding document: ", e);
          }
    }
 
    const fetchPost = async () => {
       
        await getDocs(collection(db, "quiz"))
            .then((querySnapshot)=>{              
                const newData = querySnapshot.docs
                    .map((doc) => ({...doc.data(), id:doc.id }));
                setQuestion(newData);                
                console.log(question, newData);
                console.log("hello");
            })
       
    }
   

    useEffect(()=>{
        fetchPost();
    }, [])
 
 
    return (
        <section className="quiz-container">
            <div className="quiz">
                <h1 className="header">
                    Todo-App
                </h1>
   
                <div>
   
                    <div>
                        <input
                            type="text"
                            placeholder="What do you have to do today?"
                            onChange={(e)=>setQuestion(e.target.value)}
                        />
                    </div>
   
                    <div className="btn-container">
                        <button
                            type="submit"
                            className="btn"
                            onClick={addQuestion}
                        >
                            Submit
                        </button>
                    </div>
   
                </div>
   
                <div className="quiz-content">
                    {
                        questions?.map((quiz,i)=>(
                            <p key={i}>
                                {quiz.question}
                            </p>
                        ))
                    }
                </div>
            </div>
        </section>
    )
}
 
export default Todo
