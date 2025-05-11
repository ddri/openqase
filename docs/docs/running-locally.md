# Running Locally

After completing the [Installation](./installation.md) steps, you can run the Next.js application and the Docusaurus documentation site locally for development.

## Running the Main Next.js Application

The main application uses the standard Next.js development command. Ensure you have your `.env.local` file configured correctly as described in the installation guide.

From the **root directory** of the project (`openqase/`):

```bash
npm run dev
```

This will typically start the Next.js development server on [`http://localhost:3000`](http://localhost:3000).

## Running the Documentation Site

The Docusaurus documentation site runs as a separate process.

From the **root directory** of the project (`openqase/`):

```bash
# Option 1: Using the helper script (Recommended, once added)
# npm run docs:start

# Option 2: Manually navigate and run
cd docs
npm run start -- --port 3001 # Use a different port (e.g., 3001)
```

*(Note: The `docs:start` helper script isn't added to the root `package.json` yet, as per `docs-plan.md`, Step 9. Using Option 2 works directly).*

This will start the Docusaurus development server, typically on [`http://localhost:3001`](http://localhost:3001). Since we configured `baseUrl: '/docs/'`, the documentation site will be accessible at [`http://localhost:3001/docs/`](http://localhost:3001/docs/).

## Running Both Simultaneously

You will need two separate terminal windows or tabs:

1.  In the first terminal, run `npm run dev` from the root directory for the Next.js app.
2.  In the second terminal, run `cd docs && npm run start -- --port 3001` (or `npm run docs:start` later) from the root directory for the Docusaurus site.

This allows you to develop and test both the main application and its documentation concurrently. 