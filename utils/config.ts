export const config = {
    API_URL:
        process.env.NODE_ENV !== "development"
            ? process.env.VERCEL_URL
            : "http://localhost:3001",
};
