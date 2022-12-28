import { Composer, Markup } from 'telegraf'
import { message, editedMessage, channelPost, editedChannelPost, callbackQuery } from "telegraf/filters";
import { logger } from '../../utils/logger'
import { aiAnswer } from '../../utils/ai'

const openai = new Composer()

openai.command('ask', async ctx => {
    try {
        const prompt = ctx.message.text.replace(/^\/ask(@\w+)?\s+/, '')
        if (prompt.length > 5) {
            const response = await aiAnswer(prompt)
            if (response) {
                ctx.sendMessage(response)
            } else {
                ctx.sendMessage('Unknown error! Try again.')
            }
        } else {
            ctx.sendMessage('Question was too short or empty.')
        }
    } catch (error) {
        logger.error(error)
    }
})

openai.on(message('text'), async (ctx, next) => {
    if (ctx.chat.type === 'private') {
        try {
            const prompt = ctx.message.text
            if (prompt.length > 5) {
                const response = await aiAnswer(prompt)
                if (response) {
                    ctx.sendMessage(response)
                } else {
                    ctx.sendMessage('Unknown error! Try again.')
                }
            } else {
                ctx.sendMessage('Question was too short or empty.')
            }
        } catch (error) {
            logger.error(error)
        }
    }
    await next()
})

export default openai