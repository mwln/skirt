# skirt

SvelteKit template, with Svelte 5, for scaffolding a new project with authentication & data storage.

❤ SvelteKit + Svelte 5, Tailwind, Drizzle, Turso, Lucia Auth ❤️

# To Use

-   Clone this repository
-   Run `pnpm install`
-   Install [Turso CLI](https://docs.turso.tech/cli/introduction)
-   Setup [Google OAuth Client](https://developers.google.com/identity/gsi/web/guides/get-google-api-clientid) credentials. Ensure to add a test user so that you will be able to login.
-   Setup environment variables (see `.env.example`)
-   `pnpm run db:generate` (will generate a migrations folder)
-   `turso dev` (will launch a local libsql database on port 8080 - Requires turso CLI)

In a new terminal:

-   `pnpm run db:push` (will push schema to database in `.env` file)
-   `pnpm dev`

If everything is setup correctly you should see the SvelteKit dev server running on `:5173` and your Turso DB running on `:8080`. If you're missing anything, follow through the `TODO:` comments in the codebase to ensure you have followed the necessary steps.

Once live, clicking the login button will initiate the OAuth codeflow, where you will run through the usual Google Authentication process and be sent back to the landing page as authenticated.

Use this as a way to start new SvelteKit projects that require this common boilerplate!
