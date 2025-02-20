import React from "react";
import axios from "../axios";

export default class Bio extends React.Component {
    constructor(props) {
        super(props);
        this.state = { editorVisible: false, bio: this.props.bio };
    }
    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    toggleState() {
        this.setState({
            editorVisible: !this.state.editorVisible
        });
        this.submitBio();
    }

    submitBio() {
        axios
            .post("/setBio", {
                bio: this.state.bio
            })
            .then(bio => {
                this.props.setBio(bio.data);
            })
            .catch(err => {
                console.log("error in setBio: ", err);
            });
    }
    render() {
        return (
            <div className="bio-container">
                {!this.props.bio && (
                    <button
                        onClick={() => this.setState({ editorVisible: true })}
                    >
                        ADD BIO
                    </button>
                )}

                {this.props.bio && (
                    <div>
                        {this.state.editorVisible == false && (
                            <div>
                                <p className="bio">{this.props.bio}</p>
                                <button
                                    className="bio-button"
                                    onClick={() =>
                                        this.setState({ editorVisible: true })
                                    }
                                >
                                    EDIT BIO
                                </button>
                            </div>
                        )}
                    </div>
                )}

                {this.state.editorVisible == true && (
                    <div className="edit-container">
                        <textarea
                            className="bio-textarea"
                            name="textarea"
                            defaultValue={this.state.bio}
                            onChange={e => this.handleChange(e)}
                        ></textarea>
                        <button
                            className="bio-button"
                            onClick={() => this.toggleState()}
                        >
                            SAVE
                        </button>
                    </div>
                )}
            </div>
        );
    }
}
