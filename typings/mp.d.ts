export interface MP {
  name: string | null;
  constituency: string | null;
  addressAs: string | null;
  party: string | null;
  email: string | null;
  twitter: {
    handler: string | null;
    url: string | null;
  };
  website: string | null;
}
