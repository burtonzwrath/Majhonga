import Card from "./Card";
import { useMemo, useRef, createRef, useState, useEffect } from "react";
import Rules from "./Rules";
import "../styles/styles.css";
import background from "../images/card1.png";
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
    (element, i) => refs.current[i] ?? createRef()
  );

  // ----------------------Actions functions-------------------------

  function hideCards() {
    refs.current.forEach((item) => {
      item.current.classList.add("invisible");
      item.current.parentElement.classList.remove("borderStyle");
    });
  }

  function showCards() {
    refs.current.forEach((item) => {
      item.current.classList.remove("invisible");
    item.current.classList.remove("borderStyle")

    })
  }

  // -------------------------------------------------------
  return (
    <div className="wrapper">
      <Rules />
      <div className="gridBox">
        {randomArray.map((item, index) => (
          <div
            style={{
              backgroundImage: `url(${background})`,
              backgroundSize: "cover",
            }}
            key={index}
            className="cardBox"
          >
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
      <div className="buttons_wrapper">
        <button className="button button_showCards" onClick={() => showCards()}>
          Show cards
        </button>
        <button className="button button_hideCards" onClick={() => hideCards()}>
          Hide cards
        </button>
      </div>
    </div>
  );
}
export default CardsArray;
