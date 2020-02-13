import React, { useState } from "react";

export default function useSearchField() {
    const [input, setInput] = useState({});

    const onChange = ({ target }) => {
        setInput({
            ...input,
            [target.name]: target.value
        });
    };

    return [input, onChange];
}
