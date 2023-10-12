// Styles
import "./DirectionButtons.css";

// Icons
import { MdKeyboardArrowUp } from "react-icons/md";

const DirectionButtons = () => {
  return (
    <>
      <button className="direction__btn top">
        <MdKeyboardArrowUp />
      </button>
      <button className="direction__btn right">
        <MdKeyboardArrowUp />
      </button>
      <button className="direction__btn bottom">
        <MdKeyboardArrowUp />
      </button>
      <button className="direction__btn left">
        <MdKeyboardArrowUp />
      </button>
    </>
  );
};

export default DirectionButtons;
