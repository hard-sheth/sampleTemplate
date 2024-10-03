'use client';
import * as React from "react";
import {
  ControllerFieldState,
  ControllerRenderProps,
  FieldValues,
} from "react-hook-form";
import { IoMdCloudUpload } from "react-icons/io";
import { FileBifercation } from "./FileBifercation";
import "./fileInput.css"
type FileProps = {
  field: ControllerRenderProps<FieldValues, string>;
  fieldState: ControllerFieldState;
  item: {
    isPreview: boolean,
    name: string,
    clearable?: boolean,
    isMulti?: boolean,
    square?: boolean,
    accept?: string
  };
};
export default function FileInput(props: FileProps | any) {

  const { item, field, fieldState } = props;
  function handleDragOver(event: any) {
    event.preventDefault();
    const files = event.dataTransfer.files;
    field.onChange(files);
  }

  function handleDrop(event: React.DragEvent) {
    event.preventDefault();
    const files = event.dataTransfer.files;
    field.onChange(files);
  }

  function updateFileForm(valueFile: any) {
    if (valueFile.length === 0) {
      field.onChange(null);
    }
    else {
      field.onChange(valueFile);
    }
  }

  function fileUploadEvent(event: React.ChangeEvent<HTMLInputElement>) {
    console.log(event.target.files, 'event.target.files');    
    field.onChange(event.target.files);
  }
  return (
    <div
      className="col-12 col-md-12 mb-2"
      onDragOver={handleDragOver}
      onDrop={(eve) => handleDrop(eve)}
    >
      {item.isPreview && field.value && (
        <FileBifercation
          UpdteValue={updateFileForm}
          PropertyName={item.name}
          clearable={item.clearable || true}
          SortCategory={field.value}
        />
      )}
 {!item.square && 
        <input
          type="file"
          multiple={item.isMulti || false}
          accept={item.accept || '*/*'}
          className="form-control"
          onChange={(eve) => fileUploadEvent(eve)}
        />
      }
      {item.square && <div
        className={`border-dashed-light rounded text-center border-secondary`}
      >
        <label
          className="w-100 py-3"
          htmlFor={`file-input${field.name}`}
        >
          <IoMdCloudUpload size={150} color="#006FAC" />
          <p>Drag & drop your files here</p>
        </label>
        <input
          type="file"
          multiple={item.isMulti || false}
          hidden
          accept={item.accept || '*/*'}
          onChange={(eve) => fileUploadEvent(eve)}
          id={`file-input${field.name}`}
        />
      </div>}
    </div>
  );
}
