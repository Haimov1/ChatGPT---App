async function getResponse() {
    try {
        // Get elements:
        const languageBox = document.getElementById("languageBox");
        const difficultyBox = document.getElementById("difficultyBox");
        const countBox = document.getElementById("countBox");
        const responseDiv = document.getElementById("responseDiv");

        // Extract variables:
        const language = languageBox.value;
        const difficulty = difficultyBox.value;
        const count = countBox.value;

        const prompt = promptEngineering(language, difficulty, count);

        // Get completion:
        const completion = await getCompletion(prompt);

        // Display:
        displayHumanLikeWriting(completion);
    }
    catch (err) {
        alert(err.message);
    }
}

async function displayHumanLikeWriting(completion) {
    for (let i = 0; i < completion.length; i++) {
        responseDiv.innerHTML += completion[i];
        await delay(30);
    }
}

function delay(ms) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve();
        }, ms);
    });
}

function promptEngineering(language, difficulty, count) {
    let prompt = `
        Write ${count} job interview questions for ${language} programming language.
        Suitable for ${difficulty} difficulty level.
        Arrange each question in a different HTML paragraph.
    `;
    return prompt;
}

async function getCompletion(prompt) {

    // API key:
    const apiKey = "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";

    // URL:
    const url = "https://api.openai.com/v1/completions";

    // Request body:
    const body = {
        prompt,
        model: "text-davinci-003",
        max_tokens: 2500, // Max token in completion (returned answer).
    };

    // POST Options:
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": "Bearer " + apiKey
        },
        body: JSON.stringify(body)
    };

    // Get response:
    const response = await fetch(url, options);

    // Extract JSON:
    const json = await response.json();

    // If there is an error:
    if (response.status >= 400) throw new Error(json.error.message);

    // Extract completion:
    const completion = json.choices[0].text;

    // Return:
    return completion;
}

// Prompt - The text we send to ChatGPT.
// Completion - The text ChatGPT return from the prompt.

// Prompt Engineering - הטכניקה לבניית prompt שיביא את התשובה הטובה ביותר.
