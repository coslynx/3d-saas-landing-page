/// <reference types="vite/client" />

interface ImportMetaEnv {
  /**
   *  Base URL for the API endpoints.
   *  @default '/api'
   */
  readonly VITE_API_BASE_URL: string;
  /**
   * API key for accessing the third-party service.
   * @default 'abcdef123456'
   */
  readonly VITE_API_KEY: string;
  /**
   * Flag indicating whether to enable experimental features.
   * @default 'false'
   */
  readonly VITE_FEATURE_FLAG_ENABLED: string;
  /**
   * Environment-specific configuration setting.
   * @default 'development'
   */
  readonly VITE_APP_ENVIRONMENT: string;
  /**
   * The URL for contacting the backend to send form data.
   * @default '/submit'
   */
  readonly VITE_CONTACT_FORM_API_ENDPOINT: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}