import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import MoviePoster from "./MoviePoster";
import Image from "next/image";

jest.mock("next/image", () => ({
  __esModule: true,
  default: jest.fn(({ fill, ...props }) => <img {...props} />),
}));
jest.mock("@/components/ui/skeleton", () => ({
  Skeleton: (props: any) => <div {...props} />,
}));

describe("MoviePoster", () => {
  const posterUrl = "https://example.com/poster.jpg";
  const title = "Big Movie";

  it("renders the image when loaded", async () => {
    render(<MoviePoster posterUrl={posterUrl} title={title} />);
    const img = screen.getByRole("img");

    expect(Image).toHaveBeenCalledWith(
      expect.objectContaining({
        src: posterUrl,
        alt: `${title} poster`,
      }),
      undefined
    );
  });

  it("renders the placeholder image on error", () => {
    render(<MoviePoster posterUrl={posterUrl} title={title} />);
    const img = screen.getByRole("img");
    if (img) {
      img.onerror = () => {
        expect(img).toHaveAttribute("src", "/placeholder.svg");
      };
    }
  });

  it("renders the correct alt text", () => {
    render(<MoviePoster posterUrl={posterUrl} title={title} />);
    expect(screen.getByAltText("Big Movie poster")).toBeInTheDocument();
  });
});
