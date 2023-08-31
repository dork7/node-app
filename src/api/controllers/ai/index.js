
const { Configuration, OpenAI } = require("openai");
const { openAIKey } = require("../../../config/vars");


// const configuration = new Configuration({
//     apiKey: openAIKey,
//   });
const openai = new OpenAI({
    apiKey: openAIKey // This is also the default, can be omitted
});

exports.askAI = async (req, res, next) => {
    try {

        const completion = await openai.chat.completions.create({
            messages: [{ role: 'user', content: 'Say this is a test' }],
            model: 'davinci-002',
        });

        console.log(completion.choices);

        return res.status(200).json({
            success: true, completion
        });
    } catch (error) {
        return next(error);
    }
};
exports.getDataById = async (req, res, next) => {
    try {
        return res.status(200).json({
            success: true,
        });
    } catch (error) {
        return next(error);
    }
};