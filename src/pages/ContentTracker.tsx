import { FC, useState } from "react";
import Data2023 from "../Data2023";
import Buttons from "../components/buttons/Buttons";
import Cards from "../components/card/Cards";
import Data2022 from "../Data2022";
import { ContentItem } from "../types";

const ContentTrackerPage: FC = () => {
  const [item2023, setItem2023] = useState<ContentItem[]>(Data2023);
  const [item2022, setItem2022] = useState<ContentItem[]>(Data2022);

  const [pics, setPics] = useState<boolean>(true);

  const togglePhotos = () => {
    setPics(!pics);
  };

  const categories: string[] = [
    ...new Set(Data2023.flatMap((Val) => Val.category)),
  ];

  const filterItem = (curcat: string) => {
    const newItem23 = Data2023.filter((newVal) => {
      return newVal.category.includes(curcat);
    });
    const newItem22 = Data2022.filter((newVal) => {
      return newVal.category.includes(curcat);
    });
    setItem2023(newItem23);
    setItem2022(newItem22);
  };

  return (
    <div>
      <h1 className="title">✨Danni の Content Consumption✨</h1>
      <Buttons
        filterItem={filterItem}
        togglePhotos={togglePhotos}
        setItems={[setItem2022, setItem2023]}
        categories={categories}
      />
      <h3>2023</h3>
      <Cards item={item2023} pics={pics} />
      <h3>2022</h3>
      <Cards item={item2022} pics={pics} />
    </div>
  );
};

export default ContentTrackerPage;
