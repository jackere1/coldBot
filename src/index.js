require('dotenv').config(); 
const { Client, IntentsBitField, EmbedBuilder, InteractionCollector, Embed } = require('discord.js');
const { isDataView } = require('util/types');

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

    /* gives roles boys */
    if (interaction.isButton()) {
        const role = interaction.guild.roles.cache.get(interaction.customId);
        console.log(role.name);
        const hasRole = interaction.member.roles.cache.has(role.id)
        
        if (role != undefined) {
            if (hasRole) {
                try {
                    interaction.member.roles.remove(role);
                } catch (err) {
                    console.log(err);
                }
                interaction.reply({ content: `Your role ${role} has been removed`, ephemeral: true });
                setTimeout(() => {
                    interaction.deleteReply();
                }, 3000)
                return;
            }
            else {
                interaction.member.roles.add(role);
                interaction.reply({ content: `Your role ${role} has been added`, ephemeral: true });
                setTimeout(() => {
                    interaction.deleteReply();
                }, 3000)
                return;
            }
            
        }
        
    }

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
            .setImage('https://media.tenor.com/WFy_g97MHuQAAAAi/capoo-bug-cat.gif');

        if (bullied.user.id === '778629880980045844') {
            interaction.reply({ embeds: [new EmbedBuilder()
                .setTitle(`${bullied.user.username} is bullying ${bulliedBy.username}`)
                .setDescription(`Poor <@${bulliedBy.id}>`)
                .setColor('Purple')
                .setImage('https://media.tenor.com/WFy_g97MHuQAAAAi/capoo-bug-cat.gif')]})
            return;
        }
            
        interaction.reply({ embeds: [embed] });
    }

    else if (interaction.commandName === 'whats') {
        fetch("https://api.urbandictionary.com/v0/define?term=" + interaction.options.get('word').value)
            .then(res => res.json())
            .then(data => {
                if (!data.list.length) {
                    interaction.reply(`What the duck is ${interaction.options.get('word').value}? No one knows it\n It is an alien word bruh. Try another one.`)
                    return;
                }

                const embed = new EmbedBuilder()
                    .setTitle(interaction.options.get('word').value)
                    .setDescription("From urban dictionary👍")
                    .setColor('#083676')
                    .setURL(data.list[0].permalink)
                    .setTimestamp(Date.parse(data.list[0].written_on))
                    
                const fields = [];
                let counter = 1;
                data.list.slice(0, 2).map(elm => {
                    let definition = elm.definition;
                    let example = elm.example;
                    if (definition.length > 500)
                        definition = definition.substr(0, 500) + "...";
                    if (example.length > 500)
                        example = example.substr(0, 500) + "...";
                    example = example.replace(/[\[\]]+/g, '');
                    // console.log(elm.definition); 
                    fields.push({
                        name: "Definition no." + counter,
                        value: definition.replace(/[\[\]']+/g, '**'), inline: true
                    })
                    fields.push({ name: "Example", value: `_${example}_` })
                    counter++;
                })
                embed.addFields(...fields);
                interaction.reply({ embeds: [embed] });
            })
    }
    else if (interaction.commandName === 'explain') {
        fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${interaction.options.get('word').value}`)
            .then(res => res.json())
            .then(data => {
                if (!Array.isArray(data)) {
                    interaction.reply(`Can not find word: **${interaction.options.get('word').value}**.\nTry searching from urban dictionaries by using **/whats** command.`);
                    return;
                }

                const embed = new EmbedBuilder()
                    .setTitle(interaction.options.get('word').value)
                    .setColor("LightGrey")
                
                let desc = "";
                if (data[0].hasOwnProperty('phonetic'))
                    desc += `phonetic: ${data[0].phonetic}`;
                else if(data[0].hasOwnProperty('phonetics'))
                    for (let i = 0; i < data[0].phonetics.length; i++) {
                        if (data[0].phonetics[i].hasOwnProperty('text')) {
                            desc += 'phonetic: ' + data[0].phonetics[i].text;
                            break;
                        }
                    }
                desc && embed.setDescription(desc);

                const fields = [];                
                data[0].meanings.slice(0, 2).map(elm => {
                    fields.push({ name: elm.partOfSpeech, value: elm.definitions[0].definition })
                })
                
                embed.addFields(...fields);
                interaction.reply({ embeds: [embed] });
            })
    }
    else if (interaction.commandName === 'peepee') {
        const ppOf = interaction.user;
        let ppStr = '8';
        let ppLen;
        if (ppOf.username === 'jacker_e')
            ppLen = 10;
        else {
            ppLen = Math.abs(Math.random() * 10);
        }
        for (let i = 0; i < ppLen; i++)
            ppStr += '=';
        ppStr += 'D';

        if (ppLen >= 8)
            ppStr += "<:gigachad:986656981794312263>";
        else if (ppLen >= 4)
            ppStr += "<:cheems:986292489373761646>";
        else {
            ppStr += "<:gojo3:962627538797092914>";
        }
        const embed = new EmbedBuilder()
            .setColor('#FFC0CB')
            .setTitle(ppOf.username + `'s peepee size in inches`)
            .setDescription(ppStr);

        interaction.reply({embeds: [embed]})
    }
})

client.login(process.env.TOKEN);

//Under CTRL
