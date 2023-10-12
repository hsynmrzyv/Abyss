import { useState } from "react";

// Components
import { Category } from "../Categories/Categories";

// Icons
import { FiEdit2 } from "react-icons/fi";
import { AiOutlineCheck } from "react-icons/ai";
import { LiaTimesSolid } from "react-icons/lia";

interface PropInterface {
  category: Category;
  categories: Category[];
  onAdd: (parent_id?: number) => void;
  onDelete: (id: number) => void;
  onUpdate: (id: number, name: string) => void;
  level: number;
}

const Draggable = ({
  category,
  onAdd,
  categories,
  onDelete,
  onUpdate,
  level,
}: PropInterface) => {
  const [name, setName] = useState(category.content);
  const [isEditing, setIsEditing] = useState(true);

  const handleEdit = () => {
    if (isEditing) {
      onUpdate(category.id, name);
    }

    setIsEditing(!isEditing);
  };

  const subCategories = () =>
    categories.filter((c) => c.parent_id === category.id);

  return (
    <div className="draggable">
      <div className="draggable__header">
        {isEditing ? (
          <input
            className="draggable__input"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        ) : (
          <h4 className="draggable__title">{category.content}</h4>
        )}
        <button onClick={() => onAdd(category.id)} className="draggable__btn">
          +
        </button>
        <button
          onClick={handleEdit}
          style={{
            backgroundColor: `${isEditing ? "#46C774" : ""}`,
          }}
          className="draggable__btn"
        >
          {isEditing ? <AiOutlineCheck /> : <FiEdit2 />}
        </button>
        <button
          onClick={() => onDelete(category.id)}
          className="draggable__btn delete"
        >
          <LiaTimesSolid />
        </button>
      </div>
      <ul className="draggable__list">
        {subCategories()?.map((category) => (
          <li key={category.id}>
            <Draggable
              onAdd={onAdd}
              category={category}
              categories={categories}
              onDelete={onDelete}
              onUpdate={onUpdate}
              level={level + 1}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Draggable;
