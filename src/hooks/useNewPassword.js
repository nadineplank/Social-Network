import React, { useState } from "react";
import axios from "../axios";

export default function newPassword() {
    const [error, setError] = useState(false);

    const handleSubmit = () => {
        axios.post(url, values).then(({ data }) => {
            if (data) {
                this.setState({
                    step: 3
                });
            } else {
                this.setState({
                    codeWrong: true
                });
            }
        });
    };

    return [handleSubmit, error];
}
