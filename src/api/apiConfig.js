const apiConfig = {
    baseUrl: 'https://api.themoviedb.org/3/',
    apiKey: '318ccce4ff9504a67859e2fbe54b33d2',
    originalImage: (imgPath) => `https://image.tmdb.org/t/p/original/${imgPath}`,
    w500Image: (imgPath) => `https://image.tmdb.org/t/p/w500/${imgPath}`,
};

export default apiConfig;
