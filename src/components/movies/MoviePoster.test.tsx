import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import MoviePoster from "./MoviePoster";
import Image from "next/image";
import { JSX, ClassAttributes, HTMLAttributes } from "react";

jest.mock("next/image", () => ({
  __esModule: true,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @next/next/no-img-element, jsx-a11y/alt-text
  default: jest.fn(({ fill, ...props }) => <img {...props} />),
}));
jest.mock("@/components/ui/skeleton", () => ({
  Skeleton: (
    props: JSX.IntrinsicAttributes &
      ClassAttributes<HTMLDivElement> &
      HTMLAttributes<HTMLDivElement>
  ) => <div {...props} />,
}));

describe("MoviePoster", () => {
  const posterUrl = "https://example.com/poster.jpg";
  const title = "Big Movie";

  it("renders the image when loaded", async () => {
    render(<MoviePoster posterUrl={posterUrl} title={title} />);

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
