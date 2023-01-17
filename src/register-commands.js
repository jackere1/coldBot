require('dotenv').config();
const { REST, Routes, ApplicationCommandOptionType } = require('discord.js');

const commands = [
    {
        name: 'add',
        description: 'add 2 numbers',
        options: [
            {
                name: 'first-number',
                description: 'Enter first number',
                type: ApplicationCommandOptionType.Number,
                choices: [
                    {
                        name: 'hundred',
                        value: 100
                    },
                    {
                        name: 'thousand',
                        value: 1000
                    }
                ],
                required: true
            },
            {
                name: 'second-number',
                description: 'Enter second number',
                type: ApplicationCommandOptionType.Number,
                required: true
            }
        ]
    },    
    {
        name: 'bully',
        description: 'Bullies someone with gif',
        options: [
            {
                name: 'person-id',
                description: '@ to mention',
                type: ApplicationCommandOptionType.Mentionable,
                required: true
            }
        ]
    },
    {
        name: 'gif',
        description: 'Sends an embed.'
    },
    {
        name: 'whats',
        description: 'Will search the word you asking from whole internet.',
        options: [
            {
                name: 'word',
                description: 'word you want to look up',
                type: ApplicationCommandOptionType.String,
                required: true
            }
        ]
    }

];

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

(async () => {
    try {
        console.log("registering");

        await rest.put(
            Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
            {
                body: commands
            }
        )

        console.log(`'/' commands are added successfully.`)
    } catch (err) {
        console.log(err);
    }
})();