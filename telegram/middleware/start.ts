import { Composer, Markup } from "telegraf";
import { signatureFunc } from "../../utils/functions";
import { prisma } from "../../db/prisma";
import { localDB } from "../../db/local";
import { logger } from "../../utils/logger";
import { domain } from "../../config/constants";

const start = new Composer()

start.start(async ctx => {
    if (ctx.chat.type === 'private') {
        const url = `https://${domain}/`
        await ctx.replyWithHTML('This bot uses OpenAI to unveil the unknown (or something like that)', Markup.inlineKeyboard([
            Markup.button.webApp('WebApp', url)
        ])).catch((e) => logger.error(e))
    } else {
        await ctx.replyWithHTML('This bot uses OpenAI to unveil the unknown (or something like that)').catch((e) => logger.error(e))
    }
})

export default start
