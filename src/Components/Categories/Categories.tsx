// Styles
import "./Categories.css";

// Components
import DirectionButtons from "../DirectionButtons/DirectionButtons";

// Hooks
import { useRef, useEffect, useState } from "react";
import Draggable from "../Draggable/Draggable";
import { log } from "console";

export interface Category {
  id: number;
  parent_id?: number;
  content: string;
}

const Categories = () => {
  const draggableRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const genId = () => Number(Math.random().toFixed(3));

  const [categories, setCategories] = useState<Category[]>([]);

  const addCategory = (parent_id: number = 0) => {
    const newCategories = [
      ...categories,
      {
        id: genId(),
        content: "",
        parent_id,
      },
    ];

    setCategories([...newCategories]);
  };

  const deleteCategory = (id: number) => {
    const newCategories = [...categories.filter((c) => c.id !== id)];

    setCategories([...newCategories]);
  };

  const updateCategory = (id: number, name: string) => {
    const categoriesClone = [...categories];
    const categoryToUpdate = categoriesClone.find((c) => c.id === id);

    const index = categoriesClone.findIndex((c) => c.id === id);

    if (!categoryToUpdate) {
      return;
    }

    categoryToUpdate.content = name;

    categoriesClone[index] = categoryToUpdate;
    setCategories([...categoriesClone]);
  };

  const isClicked = useRef<boolean>(false);

  const coords = useRef({
    startX: 0,
    startY: 0,
    lastX: 0,
    lastY: 0,
  });

  useEffect(() => {
    if (!draggableRef.current || !containerRef.current) return;

    const draggable = draggableRef.current;
    const container = containerRef.current;

    const onMouseDown = (e: MouseEvent) => {
      isClicked.current = true;

      coords.current.startX = e.clientX;
      coords.current.startY = e.clientY;

      coords.current.lastX = draggable.offsetLeft;
      coords.current.lastY = draggable.offsetTop;
    };

    const onMouseUp = (e: MouseEvent) => {
      isClicked.current = false;
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isClicked.current) return;

      const nextX = e.clientX - coords.current.startX + coords.current.lastX;
      const nextY = e.clientY - coords.current.startY + coords.current.lastY;

      if (draggable.style) {
        draggable.style.top = `${nextY}px`;
        draggable.style.left = `${nextX}px`;

        draggable.classList.remove("center");
      }
    };

    if (draggable.addEventListener && container.addEventListener) {
      draggable.addEventListener("mousedown", onMouseDown);
      draggable.addEventListener("mouseup", onMouseUp);
      container.addEventListener("mousemove", onMouseMove);
    }

    const cleanUp = () => {
      if (draggable.removeEventListener && container.removeEventListener) {
        draggable.removeEventListener("mousedown", onMouseDown);
        draggable.removeEventListener("mouseup", onMouseUp);
        container.removeEventListener("mousemove", onMouseMove);
      }
    };

    return cleanUp;
  }, []);

  return (
    <div ref={containerRef} className="categories">
      <DirectionButtons />
      <div ref={draggableRef} className="draggable__container">
        <div className="draggable">
          <div className="draggable__header">
            <h4 className="draggable__title">Categories</h4>

            <button onClick={() => addCategory()} className="draggable__btn">
              +
            </button>
          </div>
        </div>
        <div style={{ display: "flex", gap: "20px", marginBottom: "20px" }}>
          {categories.length > 0 &&
            categories
              .filter((c) => c.parent_id === 0)
              ?.map((category) => (
                <Draggable
                  key={category.id}
                  onAdd={addCategory}
                  onDelete={deleteCategory}
                  onUpdate={updateCategory}
                  category={category}
                  categories={categories}
                  level={0}
                />
              ))}
        </div>
      </div>
    </div>
  );
};

export default Categories;
