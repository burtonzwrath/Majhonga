import Card from "./Card";
import { useMemo, useRef, createRef, useState, useEffect } from "react";
import Rules from "./Rules";
import "../styles/styles.css";
import "../styles/cardStyle.css";

function CardsArray() {
  // ----------------------Constants-------------------------

  const [flag, setFlag] = useState(true);
  const [firstCard, setFirstCard] = useState();


  const refs = useRef([]);

  // ----------------------Create array with random numbers-------------------------

  function randomValue() {
    const randomArray = Array.from({ length: 30 }, () =>
      Math.floor(Math.random() * 40)
    );
    const uniqueArray = [...new Set(randomArray)];
    uniqueArray.length = 16;
    const arrayOfCards = uniqueArray.concat(uniqueArray);
    arrayOfCards.sort(() => Math.random() - 0.5);
    return arrayOfCards;
  }
  // ----------------------Memorization array -------------------------
  const randomArray = useMemo(() => randomValue(), []);

  //-----------------------Creating refs------------------------------

  refs.current = randomArray.map(
    (element, i) => refs?.current[i] ?? createRef()
  );

  // ----------------------Actions functions-------------------------

  function startGame() {
    refs.current.forEach((item) => item.current.classList.add("invisible"));
  }

  // -------------------------------------------------------
  return (
    <div className="wrapper">
      <Rules />
      <button
        className="button"
        onClick={(e) => {
          startGame();
        }}
      >
        Start
      </button>
      <div className="gridBox">
        {randomArray.map((item, index) => (
          <div key={index} className="cardBox">
            <Card
              ind={index}
              refs={refs}
              item={item}
              flag={flag}
              setFlag={setFlag}
              firstCard={firstCard}
              setFirstCard={setFirstCard}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
export default CardsArray;
