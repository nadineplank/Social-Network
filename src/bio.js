import React from "react";
import axios from "./axios";

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
            editorVisible: false
        });
        this.submitBio();
    }

    submitBio() {
        axios
            .post("/setBio", {
                bio: this.state.bio
            })
            .then(bio => {
                console.log("axios bio: ", bio);
                this.props.setBio(bio.data);
            })
            .catch(err => {
                console.log("error in setBio: ", err);
            });
    }
    render() {
        return (
            <div className="bio-container">
                {this.props.bio && (
                    <div>
                        <h2>{this.props.bio}</h2>

                        <button
                            onClick={() =>
                                this.setState({ editorVisible: true })
                            }
                        >
                            EDIT BIO
                        </button>
                    </div>
                )}

                {this.props.bio == null && (
                    <button
                        onClick={() => this.setState({ editorVisible: true })}
                    >
                        ADD BIO
                    </button>
                )}

                {this.state.editorVisible == true && (
                    <div className="bio-container">
                        <textarea
                            name="bio"
                            defaultValue={this.state.bio}
                            onChange={e => this.handleChange(e)}
                        ></textarea>
                        <button onClick={() => this.toggleState()}>SAVE</button>
                    </div>
                )}
            </div>
        );
    }
}
