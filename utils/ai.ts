import { Configuration, OpenAIApi } from "openai";
import { OPENAI_API_KEY } from "../config/constants";
import { logger } from "./logger";

const configuration = new Configuration({
    apiKey: OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export const aiAnswer = async (prompt: string) => {
    try {
        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: prompt,
            max_tokens: 1000
        });
        logger.debug(response.data.choices)
        return response.data.choices[0].text
    } catch (error) {
        logger.error('aiAnswer error')
        logger.error(error)
        return 'Error with completion!'
    }
}

export const imgGen = async (prompt: string) => {
    try {
        const response = await openai.createImage({
            prompt,
            n: 1,
            size: '1024x1024'
        })
        return response.data.data[0].url ?? 'Error in url'
    } catch (error) {
        logger.error('imgGen error')
        logger.error(error)
        return 'Error with image generation!'
    }
}