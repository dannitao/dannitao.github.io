import React, { FC } from "react";
import Data2023 from "../../Data2023";
import Data2022 from "../../Data2022";
import { Button } from "semantic-ui-react";
import { ButtonsProps } from "../../types";

import "semantic-ui-css/semantic.min.css";
import "./Buttons.css";

const Buttons: FC<ButtonsProps> = ({
  filterItem,
  togglePhotos,
  setItems,
  categories,
}) => {
  const data = [Data2022, Data2023];
  return (
    <div className="buttons-container">
      {categories.map((Val, id) => {
        return (
          <Button color="pink" onClick={() => filterItem(Val)} key={id}>
            {Val}
          </Button>
        );
      })}
      <Button
        color="pink"
        onClick={() => {
          setItems.map((fn, i) => {
            fn(data[i]);
          });
        }}
      >
        all
      </Button>
      <Button color="blue" onClick={() => togglePhotos()}>
        hide/show pics
      </Button>
    </div>
  );
};

export default Buttons;
