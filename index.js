const { Client, GatewayIntentBits, REST, Routes } = require("discord.js");
const axios = require("axios");
require("dotenv").config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});
const prefix = "/"; // Command prefix
const forumApiUrl = process.env.FORUM_API_URL;
// Replace with your forum API URL
const questionsChannelId = process.env.CHANNEL_ID; // Replace with your channel ID

let latestQuestionId = null;

client.once("ready", async () => {
  console.log("Bot is ready!");
  await fetchAndNotifyQuestions();
  setInterval(fetchAndNotifyQuestions, 6000); // Check for new questions every 60 seconds
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;

  const { commandName } = interaction;

  if (commandName === "listquestions") {
    await listAllQuestions(interaction);
  }
});

async function fetchAndNotifyQuestions() {
  try {
    const response = await axios.get(forumApiUrl);
    const questions = response.data.questions;
    console.log("Fetched questions:", questions);
    // Check if questions is an array
    if (!Array.isArray(questions)) {
      console.error("Questions is not an array:", questions);
      return;
    }
    const n = questions.length;

    if (!latestQuestionId && questions.length > 0) {
      latestQuestionId = questions[n - 2].id;
    }

    for (let question of questions) {
      if (question.id > latestQuestionId) {
        latestQuestionId = question.id;
        notifyNewQuestion(question);
      }
    }
  } catch (error) {
    console.error("Error fetching questions:", error);
  }
}

async function listAllQuestions(interaction) {
  try {
    const response = await axios.get(forumApiUrl);
    const questions = response.data.questions;

    // Check if questions is an array
    if (!Array.isArray(questions)) {
      console.error("Questions is not an array:", questions);
      await interaction.reply(
        "Error: Questions data is not in the expected format."
      );
      return;
    }

    if (questions.length === 0) {
      await interaction.reply("No questions found.");
      return;
    }

    let responseMessage = "List of all questions:\n";
    questions.forEach((question) => {
      responseMessage += `**${question.title}**\n${question.content}\n`;
    });

    await interaction.reply(responseMessage);
  } catch (error) {
    console.error("Error fetching questions:", error);
    await interaction.reply("Error fetching questions.");
  }
}

function notifyNewQuestion(question) {
  const channel = client.channels.cache.get(questionsChannelId);
  if (channel) {
    channel.send(
      `**New Question Added:**\n**${question.title}**\n${question.content}\n`
    );
  }
}

// Replace 'YOUR_DISCORD_BOT_TOKEN' with your actual Discord bot token
client.login(process.env.DISCORD_BOT_TOKEN);

const rest = new REST({ version: "10" }).setToken(
  process.env.DISCORD_BOT_TOKEN
);

(async () => {
  try {
    console.log("Started refreshing application (/) commands.");

    await rest.put(
      Routes.applicationGuildCommands(
        process.env.CLIENT_ID,
        process.env.GUILD_ID
      ),
      {
        body: [
          {
            name: "listquestions",
            description: "List all questions from the forum",
          },
        ],
      }
    );

    console.log("Successfully reloaded application (/) commands.");
  } catch (error) {
    console.error(error);
  }
})();
