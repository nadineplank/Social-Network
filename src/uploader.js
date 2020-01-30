import React from "react";
import axios from "./axios";

export default class Uploader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.setImageUrl = props.setImageUrl;
    }
    handleChange(e) {
        /// this[e.target.name] = e.target.value;
        console.log("file: ", e.target.files[0]);
        this.file = e.target.files[0];
    }
    upload(e) {
        console.log("image: ", this.file);
        console.log("setImageUrl: ", this.setImageUrl);

        e.preventDefault();

        var formData = new FormData();
        formData.append("image", this.file);

        console.log("formData: ", formData);

        axios
            .post("/upload", formData)
            .then(data => {
                console.log("Data from upload: ", data);
                console.log("setImageUrl after: ", this.setImageUrl);
            })
            .catch(err => {
                console.log("error in upload: ", err);
            });
    }
    render() {
        return (
            <div className="upload">
                <form>
                    <input
                        name="file"
                        type="file"
                        accept="image/*"
                        onChange={e => this.handleChange(e)}
                    />
                    <button onClick={e => this.upload(e)}>UPLOAD</button>
                </form>
            </div>
        );
    }
}
