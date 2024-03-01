import Head from "next/head";
import styles from "@/styles/Home.module.css";

import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Box, Button, Typography } from "@mui/material";

import { useEffect, useState } from "react";
import axios from "axios";



export default function Home() {
  
  let [start, setStart] = useState(false)
  let [score, setScore] = useState(0)
  
  let [dsabld, setDisabled] = useState(false)
  let [quesNum, setQuesNum] = useState(1)

  let [indexAlert, setIndexAlert] = useState<number>(-1)
  
  let [ApiArray, setApiArray] = useState([])

  type currentQuestionType = {
    correct_answer: string,
    incorrect_answers: (string | boolean | number)[],
    question:string,
    type:string,
    category:string,
    difficulty:string,
  }
  let [currentQuestion, setcurrentQuestion] = useState<currentQuestionType>(
    {
      correct_answer: "",
      incorrect_answers: ["","","",""],
      question:"Loading...",
      type:"",
      category:"",
      difficulty:"",
    }
  )

  return (
    <>
      <Head>
        <title>Quiz App By ABS</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Quiz App With TypeScript Powered By Abdul Rehman" />
        <link rel="icon" href="/next.svg" />
      </Head>
      <main className={`${styles.main} ${inter.className}`}
        style={{
          backgroundImage: "URL(/beach.jpg)",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize:"cover"
        }}>
        {/* <button
          onClick={() => {
          console.log(Math.round(Math.random()*40))
        }}
        >
          generate random number
        </button> */}

        <Typography variant="h2"
          sx={{
            fontWeight: "700",
            backgroundImage: "linear-gradient(rgb(255, 255, 255), rgb(135, 241, 255))",
            backgroundSize: "100%",
            backgroundClip: "text",
            color: "transparent",
            filter: "drop-shadow(rgb(0, 133, 163) 2px 2px)",
            fontSize: "70px",
            textAlign: "center",
            margin: "20px",
          }}
        >
          Quiz App By A.B.S
        </Typography>
        <Button
          onClick={() => {
            setStart(true)
            axios.get("https://opentdb.com/api.php?amount=10&category=18").then((result) => {
              // console.log(result.data.results);
              setApiArray(result.data.results)
              setcurrentQuestion(result.data.results[0])
              setcurrentQuestion(prev =>{
                return {
                ...prev,
                  incorrect_answers: prev?.incorrect_answers?.concat(prev?.correct_answer)
                  // splice(Math.round(Math.random() * (prev?.incorrect_answers?.length)), 0, 4)
                  // prev.incorrect_answers.splice(Math.round(Math.random()*(prev.incorrect_answers.length)))
                }
              })

            })
          }}

          sx={{
            display: start?"none":"inline-block",
            cursor: "pointer",
            background: "linear-gradient(rgb(255, 255, 255), rgb(255, 204, 145))",
            border: "2px solid rgb(211, 133, 88)",
            boxShadow: "rgba(0, 0, 0, 0.25) 0px 5px 10px",
            borderRadius: "10px",
            margin: "20px 0px",
            padding: "10px 40px",
            color: "black",
            fontWeight:"600"
          }}  
        >
          Start 
        </Button>
        { quesNum>10 &&<>
          <Typography
            sx={{
              display: quesNum>10?"inline-block":"none",
              color: "rgb(255, 255, 255)",
              fontSize: "2rem",
              margin: "0px",
            }}  
          >
            Score : {score} 
          </Typography>
          <Button
            onClick={() => {
              setStart(true)
              setDisabled(false)
              setScore(0)
              setQuesNum(1)
                
              axios.get("https://opentdb.com/api.php?amount=10&category=18").then((result) => {
                // console.log(result.data.results);
                setApiArray(result.data.results)
                setcurrentQuestion(result.data.results[0])
                setcurrentQuestion(prev =>{
                  return {
                  ...prev,
                    incorrect_answers: prev?.incorrect_answers?.concat(prev?.correct_answer)
                  }
                })
              })

            }}
              
            sx={{
              display: "inline-block",
              cursor: "pointer",
              background: "linear-gradient(rgb(255, 255, 255), rgb(255, 204, 145))",
              border: "2px solid rgb(211, 133, 88)",
              boxShadow: "rgba(0, 0, 0, 0.25) 0px 5px 10px",
              borderRadius: "10px",
              margin: "20px 0px",
              padding: "10px 40px",
              color: "black",
              fontWeight:"600"
            }}  
          >
            Test Again 
          </Button>
        </>}
        {start && quesNum<=10 && <>
        <Box>
          {/* Question's of Multi Choices' */}
          <Box
            sx={{
              maxWidth: "1100px",
              background: "rgb(235, 254, 255)",
              borderRadius: "10px",
              border: "2px solid rgb(0, 133, 163)",
              padding: "20px",
              boxShadow: "rgba(0, 0, 0, 0.25) 0px 5px 10px",
              textAlign: "center",
            }}
          >
            <Typography
              sx={{
                fontWeight:"600",
                marginBlockEnd:"20px"
              }}
            >
              Questions: {quesNum+"/10"}
            </Typography>
              
            <Typography
              sx={{
                fontWeight:"600",
                marginBlockEnd:"20px"
              }}
            >
              {currentQuestion?.question}
            </Typography>
              {
                currentQuestion?.incorrect_answers?.sort().map((item, index) => {
                  return (
                  <Button key={index} 
                    variant="contained"
                      
                    onClick={(evt) => {
                      setDisabled(true)
                      if (item == currentQuestion.correct_answer ) {
                        setScore((prev)=> prev+1)
                      } else {
                        setIndexAlert(index)
                      }
                    }}
                      
                    sx={{
                      width: "100%",
                      height: "40px",
                      margin: "5px 0px",
                      userSelect: "none",
                      fontSize: "0.8rem",
                      color: "rgb(255, 255, 255)",
                      backgroundImage: indexAlert == index? "linear-gradient(76deg, rgb(219, 50, 8), rgb(177, 38, 38))": dsabld && item == currentQuestion?.correct_answer ? "linear-gradient(76deg, rgb(70 181 0), rgb(68 137 45))": "linear-gradient(90deg, rgb(86, 204, 255), rgb(110, 175, 180))",
                      border: "3px solid rgb(255, 255, 255)",
                      boxShadow: "rgba(0, 0, 0, 0.1) 1px 2px 0px",
                      borderRadius: "10px",
                      textShadow: "rgba(0, 0, 0, 0.25) 0px 1px 0px",
                      cursor: "pointer",
                    }}
                    disabled={dsabld}
                  >
                    {item}
                  </Button>
                  )
                })
            }
          </Box>
          <Button variant="contained"
            sx={{
              marginBlock:"30px",
              display: !dsabld?"none":"inline-block",
              cursor: "pointer",
              background: "linear-gradient(rgb(255, 255, 255), rgb(255, 204, 145))",
              border: "2px solid rgb(211, 133, 88)",
              boxShadow: "rgba(0, 0, 0, 0.25) 0px 5px 10px",
              borderRadius: "10px",
              margin: "20px 0px",
              padding: "10px 40px",
              color: "black",
              fontWeight:"600"
            }}
              onClick={(evt) => {
                if (quesNum <= 10 ) { 
                  setDisabled(false)
                  setIndexAlert(-1)
                  
                  setcurrentQuestion(ApiArray[quesNum])
                  setcurrentQuestion(prev =>{
                    return {
                      ...prev,
                      incorrect_answers: prev?.incorrect_answers?.concat(prev?.correct_answer)
                    }
                  })
                  setQuesNum(prev => prev + 1)
                }
                if (quesNum == 10) {
                  setDisabled(true)
                }
                
              }}
          >
              { quesNum>=10?"Show Result":"Next Question"}
          </Button>
          </Box>  
        </>}

      </main>
    </>
  );
}
