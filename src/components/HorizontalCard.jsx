import { Badge, Card } from "flowbite-react";
import { BsBookmark, BsBookmarkCheckFill } from "react-icons/bs";

const HorizontalCard = ({ cover, title, synopsis , ISBN ,toggleReadingList , inReadingList, pages }) => {
  return (
    <Card horizontal imgSrc={cover}>
      <h5 className="text-2xl font-Raleway font-bold tracking-tight text-gray-800 dark:text-white">
        <p>{title}</p>
      </h5>
      <p className="font-normal font-Raleway text-gray-700 dark:text-gray-400">{synopsis}</p>
      <div className="flex">
        <Badge color={`indigo`} className="font-Raleway ">pág: {pages}</Badge>
      </div>
      <div>
        <span className="text-lg cursor-pointer" onClick={()=>toggleReadingList(ISBN) }>
          {inReadingList && <BsBookmarkCheckFill />}
          {!inReadingList && <BsBookmark />}
        </span>
      </div>
    </Card>
  );
};

export default HorizontalCard;
