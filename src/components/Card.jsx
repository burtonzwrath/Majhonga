function Card({ item, click, ind, visible }) {
  return (
    <div
      style={{ opacity: visible === true ? "1" : "0", height: "100%", width:"100%", border:"none", display:"flex", alignItems:"center",justifyContent:"center" }}
      id={ind}
      className={item}
      onClick={(e) => click(e)}
    >

      {item}

    </div>
  );
}
export default Card;
