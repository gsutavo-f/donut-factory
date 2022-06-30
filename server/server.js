import app from './src/app.js';

const PORT = 3001;

app.listen(process.env.PORT || PORT, () => {
   console.log(`Server running on port ${PORT}`);
});