import React, { useContext } from "react";
import { Button, Popover } from "antd";
import { GetBase64, ValidateFile } from "./helpers";
import { AppContext } from "../store/app-context";
import { FirstLetterUppercase } from "./helpers";

export const FileUpload = (props) => {
  const {
    label,
    selectedBase64File,
    setSelectedBase64File,
    binaryFile,
    setBinaryFile,
    fileName,
    setFileName,
    fileDetails,
    setFileDetails,
    fileSizeMax,
    fileKeyName,
    onChange,
  } = props;
  const ctx = useContext(AppContext);

  const handleFileChange = (e) => {
    if (e.target.files[0].type === "") {
      onChange(null);
    }

    onChange(e.target.files[0]);
    if (
      !ValidateFile(
        ctx,
        e.target.files[0],
        fileSizeMax ? fileSizeMax : process.env.REACT_APP_MAX_UPLOAD_SIZE
      )
    ) {
      return;
    }
    GetBase64(e.target.files[0])
      .then((result) => {
        setFileName(e.target.files[0].name);
        setBinaryFile(e.target.files[0])
        setSelectedBase64File(result);
        let fileData = result.split(",");
        fileDetails[fileKeyName ? fileKeyName : "file"] = fileData[1];
        setFileDetails({
          ...fileDetails,
        });
      })
      .catch((e) => {});
  };

  return (
    <>
      {label ? (
        <div
          className={`font-poppins z-10 text-h1 font-normal leading-normal text-pickled-bluewood pb-2 `}
        >
          {label ? FirstLetterUppercase(label) : ""}
        </div>
      ) : (
        ""
      )}
      <div className="flex items-center border rounded-lg p-4 pl-0 mt-0">
        {selectedBase64File ? (
          <div className="flex w-full">
            <div className="relative w-full">
              {/* <img
              className="rounded-lg w-full"
              src={selectedBase64File}
              alt={fileName}
              style={{ height: "12rem" }}
            /> */}
              <div>
                <Button
                  onClick={() => {
                    setSelectedBase64File(null);
                    setFileName(null);
                    onChange(null);
                    setFileDetails({ ...fileDetails, file: "" });
                  }}
                  className="shadow-none bg-transparent flex items-center p-0 justify-end ml-auto"
                >
                  <div className="bg-daisy-bush p-2 rounded-full my-auto">
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
            className="flex items-center justify-center text-h4 mx-auto relative"
            style={{ borderColor: "#E0E0E3" }}
          >
            <div
              className="flex items-center justify-center text-h4 mx-auto relative border-regent-gray rounded-lg pl-4 botton_text_gray"
              style={{
                borderColor: "#E0E0E3",
                color: "#E0E0E3",
              }}
            >
            <img
              src="/images/icons/attachment.svg"
              alt="attach"
            />
              <input
                type="file"
                accept="image/*,.txt,application/pdf,application/msword,
              application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                className="absolute top-0 left-0 opacity-0 cursor-pointer rounded-lg"
                onChange={handleFileChange}
              />
            </div>
          </div>
        )}

        <div className="flex pl-2" style={{ justifyContent: "center" }}>
          <div className="font-poppins text-xs font-medium leading-tight bg-white text-pickled-bluewood">
            Attachment {fileName}
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
    </>
  );
};
