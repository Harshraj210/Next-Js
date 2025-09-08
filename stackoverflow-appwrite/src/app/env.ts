const env = {
  appwrite: String(process.env.NEXT_PUBLIC_APPWRITE_HOST_URL),

  projectId: process.env.NEXT_PUBLIC_APPWRITE_PUBLIC_ID,
  apikey: process.env.APPWRITE_API_KEY,
};
export default env