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