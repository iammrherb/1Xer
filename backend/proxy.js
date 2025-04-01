const express = require('express');
const axios = require('axios');
const app = express();
app.use(express.json());

const API_KEY = process.env.OPENAI_API_KEY || 'your-api-key-here';

app.post('/api/proxy', async (req, res) => {
  const { type, data } = req.body;
  let prompt;
  switch (type) {
    case 'analysis':
      prompt = `Analyze this configuration:\n${JSON.stringify(data.config)}`;
      break;
    case 'chat':
      prompt = data.messages.map(msg => `${msg.role}: ${msg.content}`).join('\n');
      break;
    case 'environmental':
      prompt = `Analyze environment:\nLocations: ${data.locations}\nSwitches: ${data.switches}`;
      break;
    case 'poc':
      prompt = `Generate POC template:\nProject: ${data.projectName}\nGoals: ${data.goals}`;
      break;
    default:
      return res.status(400).json({ error: 'Invalid query type' });
  }
  try {
    const response = await axios.post('https://api.openai.com/v1/completions', {
      model: 'text-davinci-003',
      prompt: prompt,
      max_tokens: 500
    }, {
      headers: { 'Authorization': `Bearer ${API_KEY}` }
    });
    res.json(response.data.choices[0].text.trim());
  } catch (error) {
    res.status(500).json({ error: 'API request failed: ' + error.message });
  }
});

app.listen(3000, () => console.log('Proxy running on port 3000'));
