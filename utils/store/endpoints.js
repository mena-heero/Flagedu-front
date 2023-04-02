export const PUBLIC_AUTH_ENDPOINT = `/api/v1/auth/public`;
export const PUBLIC_UTILITY_ENDPOINT = `/api/v1/utility/public`;
export const PUBLIC_COMPANY_ENDPOINT = `/api/v1/company/public`;
export const PUBLIC_HOME_ENDPOINT = `/api/v1/home/public`;
export const PAGE_API_ROOT = `/api/v2/pages`;

export const USERS_ENDPOINT = PUBLIC_AUTH_ENDPOINT + `/users`;
export const SETTINGS_ENDPOINT = PUBLIC_UTILITY_ENDPOINT + `/settings`;
export const STORY_ENDPOINT = PUBLIC_UTILITY_ENDPOINT + `/stories/`;
export const COMPANY_ENDPOINT = PUBLIC_COMPANY_ENDPOINT + `/companies`;
export const RATING_ENDPOINT = PUBLIC_COMPANY_ENDPOINT + `/ratings`;
export const FIND_BROKER_COMPANY_ENDPOINT = PUBLIC_HOME_ENDPOINT + `/companies`;
export const FETCH_COMPANY_FINDER_RATING_ENDPOINT =
  PUBLIC_HOME_ENDPOINT + `/company-finder-rating`;

export const FETCH_COUNTRY_ENDPOINT = PUBLIC_UTILITY_ENDPOINT + `/all-country/`;
