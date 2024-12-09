import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

const sanityCredentials = {
   projectId: process.env.REACT_APP_SANITY_PROJECT_ID,
   dataset: 'production',
   apiVersion: '2024-12-09',
   useCdn: true,
   token: process.env.REACT_APP_SANITY_TOKEN
};

export const client = createClient(sanityCredentials);

const builder = imageUrlBuilder(client);

export const urlFor = (source) => builder.image(source);
