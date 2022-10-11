import Card from "./Card";
import { useState, useCallback, useMemo, useRef } from "react";

function CardsArray() {
  const [visible, setVisibile] = useState(true);
  const divRef = useRef();
  let stylesWrapper = {
    width: "100%",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };
  let stylesGrid = {
    display: "grid",
    gridTemplateColumns: "repeat(8, 1fr)",
    gridGap: "10px",
    fontSize: "30px",
  };
  let stylesCard = {
    border: "2px solid",
    borderRadius: "8px",
    width: "80px",
    height: "104px",
  };

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
  function randomValue() {
    const randomArray = Array.from({ length: 30 }, () =>
      Math.floor(Math.random() * 40)
    );
    const uniqueArray = [...new Set(randomArray)];
    uniqueArray.length = 16;
    const ArrayOfCards = uniqueArray.concat(uniqueArray);
    ArrayOfCards.sort(() => Math.random() - 0.5);
    return ArrayOfCards;
  }
  const randomArray = useMemo(() => randomValue(), []);

  console.log(randomValue());

  function startGame() {
    setVisibile(false);
  }

  function click(e) {
    if (flag) {
      firstCard = {
        ...firstCard,
        id: e.target.id,
        index: e.target.className,
      };
      first = document.getElementById(firstCard.id);
      secondCard = {
        ...secondCard,
        id: "",
        index: "",
      };
      e.target.style.opacity = "1";
      e.target.parentElement.style.border = "2px solid blue";
      e.target.style.borderRadius = "8px";
    } else {
      secondCard = {
        ...secondCard,
        id: e.target.id,
        index: e.target.className,
      };
      second = document.getElementById(secondCard.id);
      e.target.style.opacity = "1";
      e.target.boxShadow = "3px";
      e.target.style.borderRadius = "8px";
      e.target.parentElement.style.border = "2px solid blue";
      if (
        firstCard.index === secondCard.index
      ) {
        console.log(firstCard, secondCard);
        second.style.opacity = "1";
        first.style.opacity = "1";
        second.parentElement.style.border = "2px solid blue";
        first.parentElement.style.border = "2px solid blue";
      } else {
        second.style.opacity = "0";
        first.style.opacity = "0";
      }


    }
    flag = !flag;
  }
  function onMouseEnter(e) {
    e.currentTarget.style.border = "2px solid brown";
    e.currentTarget.style.borderRadius = "8px";
    e.currentTarget.style.boxShadow = "3px 2px 9px black";
  }
  function onMouseLeave(e) {
    e.currentTarget.style.border = "2px solid black";
    e.currentTarget.style.borderRadius = "8px";
    e.currentTarget.style.boxShadow = "none";
  }

  return (
    <div style={stylesWrapper}>
      <button
        onClick={(e) => {
          startGame();
        }}
      >
        Start
      </button>
      <div style={stylesGrid}>
        {randomArray.map((item, index) => (
          <div
            onMouseEnter={(e) => onMouseEnter(e)}
            onMouseLeave={(e) => onMouseLeave(e)}
            className="cardWrapper"
            style={stylesCard}
          >
            <Card visible={visible} ind={index} item={item} click={click} />
          </div>
        ))}
      </div>
    </div>
  );
}
export default CardsArray;
