# Movies App

## Overview

This is my implementation of a movie search app as part of an employer's take-home exercise

## Features

- **Movie Search:**
  Users can search for movies by keyword and view a list of results.

- **Genre Filtering:**
  Search results can be filtered by genre.

- **Pagination:**
  The app implements next/previous pagination, allowing users to navigate through pages of results.

- **Total Results Count:**
  It displays the count of search results by calculating the total from available pages and the number of items on the last page. (See: Future Enhancements)

- **Movie Details:**
  Each search result shows key movie information, including a summary, poster, duration, rating, and more.

## Technical Implementation

- **Framework & Tools:**
  The app is built using the latest versions of React with Next.js. I chose these technologies to leverage their strengths in server-side rendering, routing, and performance.

- **Data Fetching & Caching:**
  Data is fetched securely from the Movies API with error handling. I’ve implemented caching strategies via Next.js’s data fetching features to improve performance and reduce redundant API calls.

- **Hybrid Rendering Approach:**
  To balance SEO and interactivity, the app uses server-side rendering for movie details and client-side rendering for snappier perceived performance in the movies list.

## Additional Considerations

- **Third-Party Libraries:**
  I have incorporated Shadcn UI components. They are found in the components/ui directory.

- **Design Philosophy:**
  While the design is straightforward (focused on functionality over flash), I prioritized code clarity, performance, and a smooth user experience.

- **Highlights & Future Improvements:**
  - **What I’m Proud Of:** This being a total demo of streamlined work with completed requirements, tests, and a good basic ci/cd workflow.
  - **Future Enhancements:** A follow-up feature may be to improve how I handle total count of search results. This is currently page results, as movie count is not part of GET /movies a follow up request. I would go back to product to clarify this requirement. I would update GET /movies with the count rather than using another request.

## Final Thoughts

This implementation reflects my technical acumen and the thoughtful design choices I make when building products. I look forward to your feedback and further discussion on potential improvements or additional features.

## Running the project

1. Add `API_BASE_URL` to `.env`
2. `npm run dev`

<details>
  <summary>Common Next.js Project Information</summary>
  <p>This is a <a href="https://nextjs.org">Next.js</a> project bootstrapped with
  <a href="https://nextjs.org/docs/app/api-reference/cli/create-next-app">`create-next-app`</a>.</p>

  <h2>Getting Started</h2>
  <p>First, run the development server:</p>

  <pre><code>
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
  </code></pre>

  <p>Open <a href="http://localhost:3000">http://localhost:3000</a> with your browser to see the result.</p>

  <p>You can start editing the page by modifying <code>app/page.tsx</code>. The page auto-updates as you edit the file.</p>

  <p>This project uses <a href="https://nextjs.org/docs/app/building-your-application/optimizing/fonts">`next/font`</a> to
  automatically optimize and load <a href="https://vercel.com/font">Geist</a>, a new font family for Vercel.</p>

  <h2>Learn More</h2>
  <p>To learn more about Next.js, take a look at the following resources:</p>
  <ul>
    <li><a href="https://nextjs.org/docs">Next.js Documentation</a> - learn about Next.js features and API.</li>
    <li><a href="https://nextjs.org/learn">Learn Next.js</a> - an interactive Next.js tutorial.</li>
  </ul>
  <p>You can check out <a href="https://github.com/vercel/next.js">the Next.js GitHub repository</a> - your feedback and contributions are welcome!</p>

  <h2>Deploy on Vercel</h2>
  <p>The easiest way to deploy your Next.js app is to use the
  <a href="https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme">
  Vercel Platform</a> from the creators of Next.js.</p>

  <p>Check out our
  <a href="https://nextjs.org/docs/app/building-your-application/deploying">Next.js deployment documentation</a> for more details.</p>
</details>
