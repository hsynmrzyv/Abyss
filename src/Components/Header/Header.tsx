// Styles
import "./Header.css";

// Icons
import { BsSendFill } from "react-icons/bs";

// Components
import Button from "../Button/Button";
import ZoomCounter from "../ZoomCounter/ZoomCounter";

const Header = () => {
  const center = () => {
    document.querySelector(".draggable__container")?.classList.toggle("center");
  };
  return (
    <header>
      {/* Left */}
      <div className="services">
        <p>Services</p>
        <span>0</span>
      </div>
      {/* Right */}
      <div className="cta">
        <Button className="purple">list view</Button>
        <div className="center">
          <Button click={center}>
            <BsSendFill />
          </Button>
          <span className="tooltip">Go to center</span>
        </div>
        <ZoomCounter />
      </div>
    </header>
  );
};

export default Header;
