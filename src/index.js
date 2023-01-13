require('dotenv').config(); 
const { Client, IntentsBitField, EmbedBuilder, InteractionCollector } = require('discord.js');

//jacker: 778629880980045844
//Cold bot: 1062011166177644576

const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent
    ]
});

client.on('ready', (c) => {
    console.log(`✔ ${c.user.tag} is online.`);
})

client.on('messageCreate', (msg) => {

    if (msg.author.bot) return;

    if (msg.content === "Hi <@1062011166177644576>") {
        if (msg.author == '778629880980045844')
            msg.reply("Sup bro. Tell me everything. <:stronk:986297598598086726>");
        else
            msg.reply(`What you want ${msg.author}?`);
    }
    else if (msg.content === "Say sth <@1062011166177644576>") {
        msg.reply("Welcome King<:gosdamin:836600183907024926>");
    }

    else if (msg.content.includes('<@1062011166177644576> say')) {
        msg.channel.send(msg.content.replace("<@1062011166177644576> say", ""));
    }
    
    else if (msg.content === 'paak memu')
        msg.channel.send("PAAK MEMU <:peepoGun:986292511217692693>");

    else if (msg.content.toLowerCase().includes('sugmadig'))
        msg.reply('U DON HAVE DIG. POOR DAKIE <:kekw:984274899973599242>.')
    
    else if (msg.content.toLowerCase().includes('get lost'))
        msg.reply('like a Zoro <:kekw:984274899973599242>');  
    
    else if (msg.content.toLowerCase().includes('paak cold'))
        msg.reply(`Paak urself <:peepoGun:986292511217692693> ${msg.author}`);
        
    else if(msg.content === 'gal2')
        msg.channel.send('gal gal <:stronk:986297598598086726>')    
    else if (msg.content.includes('<@1062011166177644576>'))
        msg.reply("WHAT??");
    console.log(msg.author.username + ": " + msg.content)    
})


client.on('interactionCreate', (interaction) => {
    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName === 'add') {
        const first_number = interaction.options.get('first-number');
        const second_number = interaction.options.get('second-number');
        interaction.reply(`${first_number.value} + ${second_number.value}\nResult: ` + (first_number.value + second_number.value));
    } 
    else if (interaction.commandName === 'gif') {
        const embed = new EmbedBuilder()
            .setTitle('GIF for you')
            .setDescription('Description bla3')
            .setColor('Random')
            .addFields({ name: 'Doggo dancing', value: 'clickme', inline: true },
                { name: 'field 2', value: 'bla333', inline: true })
            .setImage('https://media.tenor.com/sQXkvagqfWYAAAAM/lol-funny-memes.gif')
        interaction.channel.send({ embeds: [embed] });
        interaction.reply('Random GIF generated');
    }

    else if (interaction.commandName === 'bully') {
        const bullied = interaction.options.get('person-id');
        const bulliedBy = interaction.user;
        
        const embed = new EmbedBuilder()
            .setTitle(`${bulliedBy.username} is bullying ${bullied.user.username}`)
            .setDescription(`Poor <@${bullied.user?.id}>`)
            .setColor('Purple')
            .setImage('https://media0.giphy.com/media/3o7abw6pxR0swnRrUY/200w.gif?cid=6c09b952y0fk75unsh5vioy4dqjocc4lkyxp1srcit2c9l9b&rid=200w.gif&ct=g');

        if (bullied.user.id === '778629880980045844')
            return;
        interaction.reply({ embeds: [embed] });
    }
})

client.login(process.env.TOKEN);
