function Card({ item, ind, refs, flag, setFlag, firstCard, setFirstCard }) {
  function click(e) {
    if (flag && e.target.classList.contains("invisible")) {
      setFirstCard({ id: e.target.id, index: e.target.dataset.id });
      e.target.classList.remove("invisible");
      e.target.classList.add("borderStyle");
      e.target.parentElement.classList.add("borderStyle");
      setFlag(!flag);
    }

    if (!flag && e.target.classList.contains("invisible")) {
      e.target.classList.remove("invisible");
      e.target.parentElement.classList.add("borderStyle");
      e.target.classList.add("borderStyle");

      if (refs?.current[e.target.dataset.id]?.current.id !== firstCard.index) {
        setTimeout(() => {
          refs.current[firstCard.id].current.parentElement.classList.remove(
            "borderStyle"
          );
          refs.current[firstCard.id].current.classList.add("invisible");
          refs.current[e.target.id].current.parentElement.classList.remove(
            "borderStyle"
          );
          refs.current[e.target.id].current.classList.add("invisible");
        }, 700);
      }
      setFirstCard("");
      setFlag(!flag);
    }
  }

  return (
    <div
      ref={refs.current[ind]}
      id={ind}
      data-id={item}
      className="card"
      onClick={(e) => click(e)}
    >
      {item}
    </div>
  );
}
export default Card;
