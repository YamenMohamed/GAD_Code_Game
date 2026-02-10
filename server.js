import express from 'express';

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files
app.use(express.static('public'));

// Fallback to index.html
app.get('*', (req, res) => {
  res.sendFile(new URL('./public/index.html', import.meta.url));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});