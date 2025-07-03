const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Inventory App is running!');
});

// ✅ Change from localhost to 0.0.0.0
app.listen(port, '0.0.0.0', () => {
  console.log(`App listening at http://0.0.0.0:${port}`);
});

