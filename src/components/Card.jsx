function Card({ item, click, ind, visible }) {
  return (
    <div
      style={{
        opacity: visible === true ? "1" : "0",
        height: "100%",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxSizing: "content-box",
        backgroundColor: "white",
        border: "2px solid",
        borderRadius: "8px",
      }}
      id={ind}
      className={item}
      onClick={(e) => click(e)}
    >
      {item}
    </div>
  );
}
export default Card;
