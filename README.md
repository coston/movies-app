# Movies App

## Notice

I built this app as a coding test from a potential employer.

## Build Notes

- SSR API Requests for speed and guarding resources
- SSR Movies List and filtering for percieved speed
- CSR Movie Details to ensure they’re fully indexable by search engines
- Shadcn components and theming used to accelerate development (see components/ui)

## Assignment Details

### The task

As a user,

- I can search for movies and see a paginated list of results
- I can filter search results by genre
- I can navigate through the next and previous pages of the paginated results
- I see the total count of search results
- I see notable information for each search result, such as the summary, poster,
  duration, rating, etc.

### Feedback

- My goal was to push a complete demo of streamlined work with completed requirements, tests, and a good basic ci/cd workflow.
- I'm pleased with the speed using a mix of SSR and CSR.
- A follow-up feature may be to improve how I handle total count of search results. This is currently page results, as movie count is not part of GET /movies. I would go back to product to clarify this requirement. If needed, I would update GET /movies with the count rather than using another request.

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
