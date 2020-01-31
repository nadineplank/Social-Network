import React from "react";
import axios from "./axios";

export default class Uploader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.setImageUrl = this.props.setImageUrl;
    }
    handleChange(e) {
        /// this[e.target.name] = e.target.value;

        this.file = e.target.files[0];
    }
    upload(e) {
        e.preventDefault();

        var formData = new FormData();
        formData.append("file", this.file);
        console.log("file: ", this.file);
        console.log("formData: ", formData);

        axios
            .post("/upload", formData)
            .then(data => {
                console.log("Data from upload: ", data.data);
                this.setImageUrl(data.data);
            })
            .catch(err => {
                console.log("error in upload: ", err);
            });
    }
    render() {
        return (
            <div className="upload">
                <input
                    name="file"
                    type="file"
                    accept="image/*"
                    onChange={e => this.handleChange(e)}
                />
                <button onClick={e => this.upload(e)}>UPLOAD</button>
            </div>
        );
    }
}
