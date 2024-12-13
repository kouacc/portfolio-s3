export async function useDiscordWebhook(content: Array<Object>) {
    await $fetch(process.env.DISCORD_WEBHOOK as string, {
      method: "POST",
      body: {
        username: "Portfolio",
        embeds: content
      },
    });
}