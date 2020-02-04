import React from "react";
import Bio from "./bio";
import axios from "axios";
import { render, waitForElement, fireEvent } from "@testing-library/react";

jest.mock("axios");

test("Clicking the Save button causes an ajax request", async () => {
    axios.post.mockResolvedValue({
        data: {
            bio: "Kitty"
        }
    });
});

test("clicking on the button makes textare appear", () => {
    const { container } = render(<Bio />);

    fireEvent.click(container.querySelector("button"));
    expect(container.querySelector("div").innerHTML).toContain("textarea");
});

//     const { container } = render(<Bio />);
//
//     expect(container.innerHTML).toContain("Loading...");
//
//     const elem = await waitForElement(() => container.querySelector("div"));
//
//     expect(elem.innerHTML).toBe("Hello, Kitty!");
// });

test("Renders correctly when no prop is passed", () => {
    const { container } = render(<Bio />);
    expect(container.querySelector("button").innerHTML).toContain("ADD");
});

test("Renders correctly when prop is passed", () => {
    const { container } = render(<Bio bio="kitty" />);
    expect(container.querySelector("button").innerHTML).toContain("EDIT");
});
