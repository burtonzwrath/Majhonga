import Card from "./Card";
import { useState, useMemo } from "react";
import Rules from "./Rules";
import { styles } from "../styles/styles";

function CardsArray() {
  // ----------------------Constants-------------------------
  const [visible, setVisible] = useState(true);
  let firstCard = {
    id: "",
    index: "",
  };
  let secondCard = {
    id: "",
    index: "",
  };

  let flag = true;
  let first;
  let second;
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

  // ----------------------Actions functions-------------------------
  function startGame() {
    setVisible(false);
  }

  function click(e) {
    if (flag && visible === false) {
      firstCard = {
        ...firstCard,
        id: e.target.id,
        index: e.target.className,
      };
      first = document.getElementById(firstCard.id);

      e.target.style.opacity = "1";
      e.target.style.border = "2px solid blue";
      e.target.style.borderRadius = "8px";
    } else if (!flag && visible === false) {
      secondCard = {
        ...secondCard,
        id: e.target.id,
        index: e.target.className,
      };
      second = document.getElementById(secondCard.id);
      e.target.style.opacity = "1";
      e.target.boxShadow = "3px";
      e.target.style.borderRadius = "8px";
      e.target.style.border = "2px solid blue";
      if (
        firstCard.index === secondCard.index &&
        firstCard.id !== secondCard.id
      ) {
        second.style.opacity = "1";
        first.style.opacity = "1";
        e.target.style.border = "2px solid blue";
      } else {
        second.style.opacity = "0";
        first.style.opacity = "0";
      }
    }
    flag = !flag;
  }
  // ----------------------Hovers-------------------------

  function onMouseEnter(e) {
    e.currentTarget.style.border = "2px solid blue";
    e.currentTarget.style.borderRadius = "8px";
    e.currentTarget.style.boxShadow = "3px 2px 9px black";
  }
  function onMouseLeave(e) {
    e.currentTarget.style.border = "2px solid black";
    e.currentTarget.style.borderRadius = "8px";
    e.currentTarget.style.boxShadow = "none";
  }
  // -------------------------------------------------------
  return (
    <div style={styles.wrapper}>
      <Rules />
      <button
        style={styles.button}
        onClick={(e) => {
          startGame();
        }}
      >
        Start
      </button>
      <div style={styles.gridBox}>
        {randomArray.map((item, index) => (
          <div
            onMouseEnter={(e) => onMouseEnter(e)}
            onMouseLeave={(e) => onMouseLeave(e)}
            className="cardWrapper"
            style={styles.cardBox}
          >
            <Card visible={visible} ind={index} item={item} click={click} />
          </div>
        ))}
      </div>
    </div>
  );
}
export default CardsArray;
