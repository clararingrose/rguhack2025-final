var express = require('express');
var app = express();
const bodyParser = require('body-parser');
app.use(express.static('public'));

//routing class pages
app.set('view engine', 'ejs')

app.get('/', function(req, res){
 res.render('pages/index');
});
app.use(bodyParser.json());

// get data from file
const resourcesJSON = require('./service-data.json')

async function filterJSON(categoryPASSED){
    return resourcesJSON.filter(resource => resource.category.includes(categoryPASSED));
}

async function getJSONFromName(name){
    return resourcesJSON.filter(resource => resource.Name === name);
}

// routes for each category
app.get('/abuse', async function(req, res){
    const abuseResources = await filterJSON('Abuse');
    res.render('pages/abuse', {resources: abuseResources});
});

app.get('/employment', async function(req, res){
    const employmentResources = await filterJSON('Employment');
    res.render('pages/employment', {resources: employmentResources});
});

app.get('/finance', async function(req, res){
    const financeResources = await filterJSON('Finance');
    res.render('pages/finance', {resources: financeResources});
});

app.get('/health', async function(req, res){
    const healthResources = await filterJSON('Health');
    res.render('pages/health', {resources: healthResources});
});

app.get('/housing', async function(req, res){
    const housingResources = await filterJSON('Housing');
    res.render('pages/housing', {resources: housingResources});
});

// route for homepage
app.post('/', async (req, res) => {
    console.log(req.body);
    const prompt = req.body.prompt;
    const role = req.body.role;
    
    try {
        const response = await callOpenAI(prompt, role);
        res.json({ response: response});
    } catch (error) {
        console.error('Error calling OpenAI:', error);
        res.status(500).json({ error: 'Failed to get response from OpenAI' });
    }
});
app.listen(8080, function () {
    console.log('Listening on http://localhost:8080/');
});

const axios = require('axios');
const apiKey = process.env.OPENAI_API_KEY;

// function to call OpenAI API
async function callOpenAI(prompt, role) {
    const url = 'https://api.openai.com/v1/chat/completions';

    citAdvice = await getJSONFromName("Citizens Advice Scotland")
    citAdvice = citAdvice[0].Extended
    breathingSpace = await getJSONFromName("Breathing Space")
    breathingSpace = breathingSpace[0].Extended
    abz = await getJSONFromName("ABZWorks")
    abz = abz[0].Extended
    samh = await getJSONFromName("SAMH Information Service")
    samh = samh[0].Extended
    swf = await getJSONFromName("Scottish Welfare Fund")
    swf = swf[0].Extended

    console.log(typeof(citAdvice))

    if(role == "user"){
        
        console.log(role)
        const response = await axios.post(url, {
            model: 'gpt-4o-mini',
            messages: [{role: 'system', content: "you are an assistant who focuses on homelessness. Only refer to organisations that i mention. your goal is to assist the end user with finding valid information to the aberdeen area. Your response should prioritise income; then mental health; then family; then jobs/education. DO NOT REFER TO ANY SITES OR SERVICES WHICH ARE NOT SPECIFIED IN THIS PROMPT. if the user mentions financial issues, you should refer to the citizens advice data, and the scottish welfare fund data. if they mention anything mental health related, all information should be derived from the breathing space data or the samh data, if the user mentions employment you must refer to the abzworks data. regardless of the users root issue, you should also make sure their financial and mental wellbeing is ok as well. here is the citizens advice data" + citAdvice + " heres the breathing space data: " + breathingSpace + "here is the samh data:" + samh +  " heres the abzworks data " + abz + " and herre is the scottish welfare fund data: " + swf + " If the user is some with a conflict at home, including domestic abuse and or violence, you should redirect them to scottishconflictresolution, specifically this segment of their site: sk Andy After you submit a question we will get back in touch by email straight away. If you provide permission we may also post the question and answer anonymously in the Community Discussion part of the website to help others who may be in a similar situation. This service is confidential and we will not pass on your email address to anyone."}, 
                { role: 'user', content: prompt }],
                temperature: 0.7
            }, {
                headers: {
                    'Authorization': `Bearer ${apiKey}`,
                    'Content-Type': 'application/json'
                }
            });
        console.log(response.data.choices[0].message.content)
    
        return response.data.choices[0].message.content;

    }else{
        console.log("role " + role)
        console.log(prompt)
        const response = await axios.post(url, {
            model: 'gpt-4o-mini',
            messages: [{role: 'system', content: "you are an assistant who focuses on homelessness. The user is enquiring on behalf on someone they know, your answer should help them redirect the person they know. Only refer to organisations that i mention. your goal is to assist the end user with finding valid information to the aberdeen area. Your response should prioritise income; then mental health; then family; then jobs/education. DO NOT REFER TO ANY SITES OR SERVICES WHICH ARE NOT SPECIFIED IN THIS PROMPT. if the user mentions financial issues, you should refer to the citizens advice data, and the scottish welfare fund data. if they mention anything mental health related, all information should be derived from the breathing space data or the samh data, if the user mentions eployment you must refer to the abzworks data. here is the citizens advice data" + citAdvice + " heres the breathing space data: " + breathingSpace + "here is the samh data:" + samh +  " heres the abzworks data " + abz + " and herre is the scottish welfare fund data: " + swf + " If the user if a young person with a conflict at home, you should redirect them to scottishconflictresolution, specifically this segment of their site: sk Andy After you submit a question we will get back in touch by email straight away. If you provide permission we may also post the question and answer anonymously in the Community Discussion part of the website to help others who may be in a similar situation. This service is confidential and we will not pass on your email address to anyone."}, 
                { role: 'user', content: prompt }],
                temperature: 0.7
            }, {
                headers: {
                    'Authorization': `Bearer ${apiKey}`,
                    'Content-Type': 'application/json'
                }
            });
        console.log(citAdvice)
        console.log(response.data.choices[0].message.content)
        
        return response.data.choices[0].message.content;
    }
            
}

module.exports = callOpenAI;

