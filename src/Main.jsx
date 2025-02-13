import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import emoji1 from "./assets/pag1.png";
import emoji2 from "./assets/pag2.png";
import emoji3 from "./assets/pag3.png";
import emoji4 from "./assets/pag4.png";
import emoji5 from "./assets/pag5.png";
import health from "./assets/health.png";

export default function Main() {
  const { id } = useParams();

  const [phrase, setPhrase] = useState("");

  useEffect(() => {
    if (id) {
      fetch(`https://for-bell-api.vercel.app/${id}`)
        .then(response => response.json())
        .then(data => setPhrase(data.phrase))
    }
  }, [id]);

  var noButtonTranslate = 0
  const noButton = useRef()
  const [currentAnswer, setCurrentAnswer] = useState(0);
  const answers = [
    "Você está disposto a responder algumas perguntas?",
    "Você responderá com total sinceridade?",
    "Tem certeza de que deseja continuar?",
    "Deixa eu te amar na boca? 👉👈"
  ]
  const imgs = [
    emoji1,
    emoji2,
    emoji3,
    emoji4,
    emoji5
  ]

  const handleYesAnswerButton = () => {
    setCurrentAnswer(currentAnswer + 1)
  }
  const handleNoAnswerButton = () => {
    if (noButtonTranslate === 0) {
      noButton.current.style.transform = "translateX(100px)"
      noButtonTranslate = 1
    } else {
      noButton.current.style.transform = "translateX(0px)"
      noButtonTranslate = 0
    }
  }


  return (
    <div className="flex flex-col w-full min-h-screen items-center pt-14">
      <img src={imgs[currentAnswer]} alt="" width={200} />

      <div className="flex flex-col mt-10 min-w-full items-center">
        <p className="text-sms font-semibold break-words" align="center">{answers[currentAnswer]}</p>

        <div className="flex mt-10 gap-4">
          {currentAnswer < answers.length ? (
            <>
              <button
                onClick={handleYesAnswerButton}
                className="bg-tertiary text-secondary font-bold px-6 py-2 rounded border-primary border-r-2 border-b-2 active:bg-secondary active:color-tertiary transition-colors duration-300"
              >
                Sim
              </button>

              {currentAnswer === answers.length - 1 && (
                <button
                  ref={noButton}
                  onClick={handleNoAnswerButton}
                  className="bg-tertiary text-secondary font-bold px-6 py-2 rounded border-primary border-r-2 border-b-2 active:bg-secondary active:text-tertiary transition-colors duration-300"
                >
                  Não
                </button>
              )}
            </>
          ) : (
            <div className="flex flex-col items-center gap-4">
              {!id ? (
                <>
                  <p className="font-semibold" align="center">"
                    <b>Meu amor por você é One Piece, não tem fim 🤍"</b> - Maria
                  </p>

                  <p align="center">Te amo Lebin, meu crackudo em UFC 🤍</p>

                  <img src={health} alt="" width={200} />

                  <p className="mt-10">Made with 🤍 by <a className="font-semibold text-red-300" href="https://www.instagram.com/yourlocalmarry/">@yourlocalmarry</a></p>
                </>
              ) : (
                <>
                  <p className="font-semibold max-w-md" align="center">
                    <b>{phrase}</b>
                  </p>
                  <img src={health} alt="" width={200} />

                  <p className="mt-10">Made with 🤍 by <a className="font-semibold text-red-300" href="https://www.instagram.com/yourlocalmarry/">@yourlocalmarry</a></p>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div >
  );
}
