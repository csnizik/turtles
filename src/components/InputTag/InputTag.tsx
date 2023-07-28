import "./input-tag.scss";

import { useState, useRef } from "react";

interface Props {
   description:string;
  tags:string;
}

const InputTag = ({
     description}) => {
  
  const [tags, setTags] = useState([description]);
  const removeTag = (i) => {
    const newTags = [...tags];
    newTags.splice(i, 1);
    setTags(newTags);
  };
  
  let tagInputRef = useRef("");

  const inputKeyDown = (e) => {
    const val = e.target.value;
    if (e.key === "Enter" && val) {
      if (tags.find((tag) => tag.toLowerCase() === val.toLowerCase())) {
        return;
      }
      setTags([...tags, val]);
      if (tagInputRef.current != null){
        tagInputRef.current = "";
      }
    } else if (e.key === "Backspace" && !val) {
      removeTag(tags.length - 1);
    }
  };
  
  return (
    <div>
      <ul className="input-tag__tags">
        {tags.map((tag, i) => (
          <li key={tag}>
            {tag}
            <button type="button" onClick={() => removeTag(i)}>
              +
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default InputTag; 