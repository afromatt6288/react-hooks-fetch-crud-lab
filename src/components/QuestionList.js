import React, {useState, useEffect} from "react";
import QuestionItem from "./QuestionItem"

function QuestionList() {
  const [questions, setQuestions] = useState([])

  useEffect(()=> {
    fetch("http://localhost:4000/questions")
    .then(r=> r.json())
    .then((questions)=> setQuestions(questions))
  }, [])

  function handleDeleteClick(question){
    fetch(`http://localhost:4000/questions/${question.id}`, {
      method: "DELETE"
    })
  //   const updatedQuestions = questions.filter((q) => q.id !== question.id)
  //   setQuestions(updatedQuestions)
  // }
  .then((r) => r.json())
  .then(() => {
    const updatedQuestions = questions.filter((q) => q.id !== question.id);
    setQuestions(updatedQuestions);
  });
}

  function handleAnswerChange(id, newValue){
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type" : "application/json"
      },
      body: JSON.stringify({correctIndex : newValue})
    })
    .then(r=>r.json)
    .then((updatedQuestion) => {
      const updatedQuestions = questions.map((question) => {
        if (question.id === updatedQuestion.id) return updatedQuestion
        return question
      })
    setQuestions(updatedQuestions)
    console.log("change", id, newValue)
  })
}

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul> {questions.map((question)=> (
        <QuestionItem key={question.id} question={question} onAnswerChange={handleAnswerChange} onDeleteClick={handleDeleteClick}/>
      ))}
        </ul>
    </section>
  );
}

export default QuestionList