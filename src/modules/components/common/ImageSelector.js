import React, { useContext } from "react";
import { Button, Popover } from "antd";
import { GetBase64, ValidateFile } from "./helpers";
import { AppContext } from "../store/app-context";

export const ImageSelector = (props) => {
  const {
    selectedBase64Image,
    setSelectedBase64Image,
    imageName,
    imageDetails,
    setImageDetails,
    imageSizeMax,
    imageKeyName
  } = props;
  const ctx = useContext(AppContext);

  const handleFileChange = (e) => {
    if (!ValidateFile(ctx, e.target.files[0], imageSizeMax ? imageSizeMax : process.env.REACT_APP_MAX_UPLOAD_SIZE)) {
      return;
    }
    GetBase64(e.target.files[0])
      .then((result) => {
        setSelectedBase64Image(result);
        let imageData = result.split(",");
        imageDetails[imageKeyName ? imageKeyName : "image"] = imageData[1];
        setImageDetails({
          ...imageDetails
        });
      })
      .catch((e) => {
        alert("error", e);
      });
  };

  return (
    <div className="flex flex-col">
      {selectedBase64Image ? (
        <div className="flex w-full">
          <div className="relative w-full">
            <img
              className="rounded-lg w-full"
              src={selectedBase64Image}
              alt={imageName}
              style={{ height: "12rem" }}
            />
            <div className="absolute" style={{ top: "8px", right: "8px" }}>
              <Button
                onClick={() => {
                  setSelectedBase64Image(null);
                  setImageDetails({ ...imageDetails, image: "" });
                }}
                className="shadow-none bg-transparent flex items-center border-0 p-0 justify-end ml-auto"
              >
                <div className="bg-daisy-bush  p-2 rounded-full my-auto">
                  <div
                    className="p-1 bg-center bg-contain bg-no-repeat"
                    style={{
                      backgroundImage: "url(/images/icons/x-mark-delete.svg)",
                    }}
                  />
                </div>
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div
          className="flex mb-2 items-center justify-center text-h4 rounded-full mx-auto border relative"
          style={{ width: "70px", height: "70px", borderColor: "#E0E0E3" }}
        >
          <div
            className="flex items-center justify-center text-h4 rounded-full mx-auto border relative"
            style={{
              width: "70px",
              height: "70px",
              borderColor: "#E0E0E3",
              color: "#E0E0E3",
            }}
          >
            +
            <input
              type="file"
              accept="image/*"
              className="absolute top-0 left-0 opacity-0 cursor-pointer rounded-full"
              style={{ width: "70px", height: "70px" }}
              onChange={handleFileChange}
            />
          </div>
        </div>
      )}

      <div className="flex mt-2" style={{ justifyContent: "center" }}>
        <div className="font-poppins text-xs font-medium leading-tight bg-white text-pickled-bluewood">
          Upload Image of {imageName}
        </div>
        <Popover content="The supported extensions for the image uploads are .bmp, .gif, .jpeg/.jpg, and .png">
          <img
            className="ant-popover-open inline-block ml-3 w-3"
            src="/images/icons/information.svg"
            alt="info"
          />
        </Popover>
      </div>
    </div>
  );
};
