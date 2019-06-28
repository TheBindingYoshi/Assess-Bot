const Discord = require('discord.js');
const client = new Discord.Client();
const { token } = require('./config.json');
let prefix = 'a/';

//Console Log Message
client.on('ready', () =>{
    console.log('Online');
})


//Welcome Message
client.on('guildMemberAdd', member => {
    const channel = member.guild.channels.find(channel => channel.name === "welcome")
    if (!channel) return;
    channel.send(`Welcome to the server ${member}! Please read the rules!`)

})

//Help Command
client.on('message', msg => {
    if (msg.content === `${prefix}help`) {
        msg.reply('Hello! This bot is in Early Access so please contact Yoshi#2203 to set it up. This bot is a Moderation Bot to make Staff Jobs Easier. The prefix to the bot is a/  There are kick, ban and suggest Commands. Edited and Deleted Messages get logged (If you have contacted Yoshi for Set-Up) and the bot creates channels. You can choose from the list if you do a/List and you can copy and paste them one at a time to create channels.');
    }
})

//List Command
client.on('message', msg => {
    if (msg.content === `${prefix}list`) {
        msg.reply('a/createchannel announcements , a/createchannel log channel , a/createchannel rules , a/createchannel bot channel , a/createchannel rules , More are being added soon and if you have any suggestions send them to Yoshi#2203 ');
    }
})

//suggest command
client.on('message', msg => {
    if (msg.content === `${prefix}suggest`) {
        msg.reply('Send a DM to Yoshi#2203 to suggest features and commands that could be added to improve this bot')
    }
})


//Logging edited messages
client.on("messageUpdate", async (oldMessage, newMessage) => {
    if (oldMessage.content === newMessage.content) {
        return;
    }
    var logchannel = client.channels.get("593332819904823302");
    let logembed = new Discord.RichEmbed()
        .setAuthor(oldMessage.author.tag, oldMessage.author.avatarURL)
        .setThumbnail(oldMessage.author.avatarURL)
        .setColor("BLUE")
        .setDescription("Message Edited")
        .addField("Before", oldMessage.content, true)
        .addField("after", newMessage.content, true)
        .setTimestamp()
    logchannel.send(logembed)
})



//Logging deleted messages
client.on("messageDelete", async message => {
    var logchannel = client.channels.get("593332819904823302");
    let logembed = new Discord.RichEmbed()
        .setAuthor(message.author.tag, message.author.avatarURL)
        .setThumbnail(message.author.avatarURL)
        .setColor("PURPLE")
        .setDescription("This Message Has Been Deleted")
        .addField("Message", message.content, true)
        .setTimestamp()
    logchannel.send(logembed)
})

//Kick Command
client.on('message', message => {
    let args = message.content.substring(prefix.length).split(" ");
    switch (args[0]) {
        case 'kick':

            const user = message.mentions.users.first();

            if (user) {
                const member = message.guild.member(user);
                if (member) {
                    member.kick('you have been kicked').then(() => {
                        message.reply(`${user.tag} has been kicked`);
                    }).catch(err => {
                        message.reply('Unable to kick');
                        console.log(err);
                    });
                } else {
                    message.reply("User not found")
                }
            } else {
                message.reply('User not found')
            }
            break;
    }
});

//Ban command
client.on('message', message => {
    let args = message.content.substring(prefix.length).split(" ");
    switch (args[0]) {
        case 'Ban':

            const user = message.mentions.users.first();

            if (user) {
                const member = message.guild.member(user);
                if (member) {
                    member.ban({
                        reason: 'You broke the rules'
                    }).then(() => {
                        message.reply(`${user.tag} has been banned`)
                    })
                } else {
                    message.reply("User not found")
                }
            } else {
                message.reply('User not found')
            }
            break;
    }
});



//Creates an announcements channel
client.on('message', async message => {
    if (message.content.startsWith(`${prefix}createchannel announcements`)) {
        const args = message.content.slice(15);
        if (!message.member.roles.find(r => r.name === "Staff"))
            return;
        message.guild.createChannel(`${args}`).then(channel => {
            channel.setTopic('')
        })
    }
})

//Creates a log channel
client.on('message', async message => {
    if (message.content.startsWith(`${prefix}createchannel log channel`)) {
        const args = message.content.slice(15);
        if (!message.member.roles.find(r => r.name === "Staff"))
            return;
        message.guild.createChannel(`${args}`).then(channel => {
            channel.setTopic('where Assess Bot logs Edited and Deleted Messages')
            then.get.channel.ID
        })
    }
})

//creates a rules channel
client.on('message', async message => {
    if (message.content.startsWith(`${prefix}createchannel rules`)) {
        const args = message.content.slice(15);
        if (!message.member.roles.find(r => r.name === "Staff"))
            return;
        message.guild.createChannel(`${args}`).then(channel => {
            channel.setTopic('')
        })
    }
})

//creates a bot channel
client.on('message', async message => {
    if (message.content.startsWith(`${prefix}createchannel bot channel`)) {
        const args = message.content.slice(15);
        if (!message.member.roles.find(r => r.name === "Staff"))
            return;
        message.guild.createChannel(`${args}`).then(channel => {
            channel.setTopic('for using commands')
        })
    }
})

//creates a bot channel
client.on('message', async message => {
    if (message.content.startsWith(`${prefix}createchannel welcome`)) {
        const args = message.content.slice(15);
        if (!message.member.roles.find(r => r.name === "Staff"))
            return;
        message.guild.createChannel(`${args}`).then(channel => {
            channel.setTopic('Welcoming people to the server')
        })
    }
})

client.login(token);