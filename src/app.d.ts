declare global {
	// https://kit.svelte.dev/docs/types#app
	namespace App {
		// interface Error {}
		interface Locals {
			user: import('lucia').User | null;
			session: import('lucia').Session | null;
		}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
	namespace NodeJS {
		interface ProcessEnv {
			NODE_ENV: 'development' | 'production';
			TURSO_DB_URL: string;
			TURSO_DB_SECRET: string;
			GOOGLE_CLIENT_ID: string;
			GOOGLE_CLIENT_SECRET: string;
		}
	}
}

export {};
