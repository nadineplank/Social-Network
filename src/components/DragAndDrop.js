import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import axios from "../axios";

export default function Uploader(props) {
    const [files, setFiles] = useState({});
    const onDrop = useCallback(file => {
        // Do something with the files
        setFiles(file[0]);
    }, []);
    const upload = e => {
        e.preventDefault();
        var formData = new FormData();
        formData.append("file", files);
        console.log("formData: ", formData);
        axios
            .post("/upload", formData)
            .then(image => {
                props.setImageUrl(image.data);
                props.toggleState();
            })
            .catch(err => {
                console.log("error in upload: ", err);
            });
    };
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop
    });

    return (
        <div className="upload">
            <i className="fas fa-times" onClick={props.toggleState}></i>
            <div className="dropzone" {...getRootProps()}>
                <input {...getInputProps()} />
                {isDragActive ? (
                    <p>Drop the files here ...</p>
                ) : (
                    <p>
                        Drag and drop some files here, or click to select files
                    </p>
                )}
            </div>
            <button id="upload" onClick={e => upload(e)}>
                UPLOAD
            </button>
        </div>
    );
}
