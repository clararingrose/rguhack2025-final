// const axios = require('axios');


async function callOpenAI(prompt) {
    const apiKey = process.env.OPENAI_API_KEY;
    const url = 'https://api.openai.com/v1/chat/completions';
    alert("calling api")
    const response = await axios.post(url, {
        model: 'gpt-4o-mini',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7
    }, {
        headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json'
        }
    });
    console.log(response.data.choices[0].message.content)
    
    return response.data.choices[0].message.content;
}

module.exports = callOpenAI;

function getInput(){
    input = document.getElementById("input").value;
    conversation = document.getElementById("conversation")
    conversation.value += input
    response = callOpenAI(input)
    conversation.value += response
    

}
