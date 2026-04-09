import "@testing-library/jest-dom";
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { ThemeProvider } from "styled-components";

const mockTheme = {
  colors: {
    brandColor: "#4f8ef7",
    input: { default: "#f5f5f5", border: "#ddd", hover: "#ececec" },
    textOnSecondary: "#333",
  },
  font: { fontSize: "14px" },
};

jest.mock("@/common/utils", () => ({
  getAvatarImageLink: (v: string) => v ?? "",
}));

jest.mock("@/common/utils/formatDateTime", () => ({
  formatDateTime: () => "01.01.2025",
}));

jest.mock("@/ui/StarRating/StarRating", () => ({
  __esModule: true,
  default: () => <span data-testid="star-rating" />,
}));

jest.mock("@/ui/MessageCard/MessageCard", () => ({
  MessageCard: ({ children }: { children: React.ReactNode }) => <div data-testid="message-card">{children}</div>,
}));

import { Message } from "../Message";

const makeComment = (text: string) => ({
  id: 1,
  text,
  createdUtcDate: "2025-01-01T00:00:00Z",
  user: { id: 1, username: "testuser", avatar: "" },
});

const renderMessage = (text: string, onMentionClick?: (username: string) => void) =>
  render(
    <ThemeProvider theme={mockTheme}>
      <Message
        comment={makeComment(text)}
        onMentionClick={onMentionClick}
      />
    </ThemeProvider>,
  );

describe("mention rendering as TextLink", () => {
  it("renders @username as a styled TextLink (span with brandColor)", () => {
    renderMessage("hello @ping world");

    const mention = screen.getByText("@ping");
    expect(mention).toBeTruthy();
    expect(mention.tagName).toBe("SPAN");
  });

  it("calls onMentionClick with username when TextLink is clicked", () => {
    const handler = jest.fn();
    renderMessage("hey @alice check this", handler);

    const mention = screen.getByText("@alice");
    fireEvent.click(mention);

    expect(handler).toHaveBeenCalledWith("alice");
    expect(handler).toHaveBeenCalledTimes(1);
  });

  it("renders multiple mentions as separate TextLinks", () => {
    renderMessage("@alice and @bob");

    expect(screen.getByText("@alice")).toBeTruthy();
    expect(screen.getByText("@bob")).toBeTruthy();
  });

  it("does not render plain text as TextLink", () => {
    renderMessage("just plain text");

    const card = screen.getByTestId("message-card");
    const spans = card.querySelectorAll("span");
    const mentionSpans = Array.from(spans).filter((s) => s.textContent?.startsWith("@"));
    expect(mentionSpans).toHaveLength(0);
  });
});
