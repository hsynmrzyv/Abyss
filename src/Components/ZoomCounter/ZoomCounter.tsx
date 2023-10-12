// Styles
import "./ZoomCounter.css";

// Components
import Button from "../Button/Button";

// Icons
import { AiOutlineCheck } from "react-icons/ai";

// Hooks
import { useEffect, useState } from "react";

// Data
import { zoomValues } from "../../data";

// Interfaces

interface ZoomValue {
  id: number;
  value: number;
}

const ZoomCounter: React.FC = () => {
  const [showScale, setShowScale] = useState<boolean>(false);
  const [zoomValue, setZoomValue] = useState<{ value: number; index: number }>({
    value: 100,
    index: 8,
  });

  const dragContainer: HTMLElement | null = document.querySelector(
    ".draggable__container"
  );

  useEffect(() => {
    if (!dragContainer) return;

    dragContainer.style.scale = `${zoomValue.value / 100}`;
  }, [zoomValue, dragContainer]);

  const showZoomScale = (): void => {
    setShowScale(true);
  };

  const selectZoomValue = (value: number, index: number) => {
    setZoomValue({ value: value, index: index });
    setShowScale(false);
  };

  const next = () => {
    let previousIndex = zoomValue.index;

    if (previousIndex < zoomValues.length - 1) {
      previousIndex++;
      setZoomValue({
        value: zoomValues[previousIndex].value,
        index: previousIndex,
      });
      setShowScale(false);
    }
  };

  const previous = () => {
    let previousIndex = zoomValue.index;

    if (previousIndex > 0) {
      previousIndex--;
      setZoomValue({
        value: zoomValues[previousIndex].value,
        index: previousIndex,
      });
      setShowScale(false);
    }
  };

  return (
    <div className="zoom">
      <Button click={previous}>-</Button>
      <Button className="wide" click={showZoomScale}>
        {zoomValue.value}%
      </Button>
      <Button click={next}>+</Button>
      {showScale && (
        <ul>
          {zoomValues.map(({ id, value }: ZoomValue, index: number) => (
            <li
              onClick={() => selectZoomValue(value, index)}
              key={id}
              className={zoomValue.value === value ? "active" : ""}
            >
              {value}%
              <span>
                <AiOutlineCheck />
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ZoomCounter;
