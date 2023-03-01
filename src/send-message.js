require('dotenv').config();
const { Client, IntentsBitField, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent
    ]
})

const roles = [
    {
        id: '957634181909872680',
        label: 'Troll Squad'
    },
    {
        id: '957928303967223839',
        label: 'Anime Squad'
    },
    {
        id: '925805048552910899',
        label: 'Тархигүй'
    }
]

client.on('ready', async (c) => {
    try {
        const channel = await client.channels.cache.get('989163458849300490');
        if (!channel) return;
        console.log(`✔ ${c.user.tag} is ready to give send message.`);
        
        const row = new ActionRowBuilder();
        row.components.push(
            new ButtonBuilder().setCustomId('957634181909872680').setEmoji('<:9949a6794c7a498a97e064856a515837:836598491546648636>').setLabel('Troll Squad').setStyle(ButtonStyle.Secondary)
        );

        row.components.push(
            new ButtonBuilder().setCustomId('957928303967223839').setEmoji('<:5d068d804a8d4a309db973b41279db94:836600536437358592>').setLabel('Anime Squad').setStyle(ButtonStyle.Primary)
        );

        row.components.push(
            new ButtonBuilder().setCustomId('925805048552910899').setEmoji('<:pureglare:1005416142929662074>').setLabel('Тархигүй').setStyle(ButtonStyle.Success)
        );

        await channel.send({
            content: 'Just for fun',
            components: [row]
        });
        process.exit();


    } catch (error) {
        console.log(error)
        
    }
})

client.login(process.env.TOKEN);