
import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = 3000;

app.use(express.json());

const YOUR_API_KEY = process.env.PERPLEXITY_API_KEY;

var nameSchoolWork = "Nicholas Choi, who studies in University of Michigan, works in Alliance Bank";
var nameSchoolWork2 = "Oleg Viatkin, who studies in University of California, Berkeley, works in Stealth Startup";


const messages = [
  {
    "role": "system",
    "content": "You are to gather information about users on Linkedin and craft summarised profiles on them"
  },
  {
    "role": "user",
    "content": `Start a search on Linkedin and find me everything you can on LinkedIn about ${nameSchoolWork} . Summarise it to its most key points - School, Industry, Interests, and a short summary. Then, do the same for ${nameSchoolWork2}. Then, create a chat message that the first person can send the second which creates a friendly but engaging first connection message. The message should be based from common aspects found in both LinkedIn profiles. `
  }
];


app.get('/chat', async (req, res) => {
  try {
    const response = await axios.post('https://api.perplexity.ai/chat/completions', {
      model: "llama-3-sonar-large-32k-online",
      messages: messages
    }, {
      headers: {
        'Authorization': `Bearer ${YOUR_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    console.log('API Response:', JSON.stringify(response.data, null, 2));
    res.json(response.data);
  } catch (error) {
    console.error('Error:', error.response ? error.response.data : error.message);
    res.status(500).json({ error: 'An error occurred while processing your request.' });
  }
});


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});