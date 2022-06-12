import { useState } from "react";
import { RightOutlined, LeftOutlined } from "@ant-design/icons";
export const DiscopsHeaderCard = (props) => {
  const {
    icon,
    mainTitle,
    iconBgColor,
    iconColor,
    mainValue,
    subTitleOne,
    subValueOne,
    subTitleTwo,
    subValueTwo,
    subTitleThree,
    subValueThree,
    subTitleFour,
    subValueFour,
    onCardClick,
  } = props;

  const [page, setPage] = useState(1);
  return (
    <div
      className="bg-white border-iron rounded-md flex flex-row w-1/4 items-center py-2 px-3 h-20"
      onClick={() => onCardClick()}
    >
      {page === 1 && (
        <>
          <div
            className={`rounded-full px-2 py-1 text-white mr-2 text-3xl bg-${iconBgColor} text-${iconColor} -mt-3`}
          >
            {icon}
          </div>
          <div className="flex flex-col ml-2">
            <div className="text-gray text-sm">{mainTitle}</div>
            <div className="text-daisy-bush font-bold text-2xl">
              {mainValue}
            </div>
          </div>
          <div className="flex-grow" />
          <RightOutlined
            className="text-daisy-bush"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setPage(2);
            }}
          />
        </>
      )}
      {page === 2 && (
        <div className="flex flex-row items-center w-full">
          <LeftOutlined
            className="text-daisy-bush"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setPage(1);
            }}
          />
          {!subTitleThree && !subTitleFour ? (
            <div
              className={`rounded-md bg-${iconBgColor} flex flex-row w-full justify-around ml-3 py-2 text-center`}
            >
              <div className="flex flex-col justify-center">
                <div className="text-daisy-bush text-xs font-semibold">
                  {subTitleOne}
                </div>
                <div className="font-semibold">{subValueOne}</div>
              </div>
              <div className={`border-l border-${iconColor}`} />
              <div className="flex flex-col">
                <div className="text-daisy-bush text-xs font-semibold">
                  {subTitleTwo}
                </div>
                <div className="font-semibold">{subValueTwo}</div>
              </div>
            </div>
          ) : (
            <div
              className={`rounded-md bg-${iconBgColor} flex flex-row w-full justify-around ml-3 py-2 text-center`}
            >
              <div className="flex flex-col justify-center">
                <div className="text-daisy-bush text-xs font-semibold">
                  {subTitleOne}
                </div>
                <div className="font-semibold">{subValueOne}</div>
              </div>
              <div className="flex flex-col justify-center">
                <div className="text-daisy-bush text-xs font-semibold">
                  {subTitleTwo}
                </div>
                <div className="font-semibold">{subValueTwo}</div>
              </div>
              <div className={`border-l border-${iconColor}`} />
              <div className="flex flex-col">
                <div className="text-daisy-bush text-xs font-semibold">
                  {subTitleThree}
                </div>
                <div className="font-semibold">{subValueThree}</div>
              </div>
              <div className="flex flex-col">
                <div className="text-daisy-bush text-xs font-semibold">
                  {subTitleFour}
                </div>
                <div className="font-semibold">{subValueFour}</div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
