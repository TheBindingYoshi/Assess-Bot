const Discord = require('discord.js');
const client = new Discord.Client();
const { token } = require('./config.json');
let prefix = 'a/';


client.on("messageUpdate", async(oldMessage, newMessage) =>{
    if(oldMessage.content === newMessage.content){
        return;
    }
    var logchannel= client.channels.get("592961394677252097"); 
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



client.on('message',async message => {
    if(message.content.startsWith(`${prefix}createchannel announcements`)) {
        const args = message.content.slice(15);
        if(!message.member.roles.find(r => r.name === "Staff"))
        return;
        message.guild.createChannel(`${args}`).then(channel => {
            channel.setTopic('')
        })
    }
})

client.on('message',async message => {
    if(message.content.startsWith(`${prefix}createchannel log channel edits`)) {
        const args = message.content.slice(15);
        if(!message.member.roles.find(r => r.name === "Staff"))
        return;
        message.guild.createChannel(`${args}`).then(channel => {
            channel.setTopic('for logging edits')
        })
    }
})

client.on('message',async message => {
    if(message.content.startsWith(`${prefix}createchannel rules`)) {
        const args = message.content.slice(15);
        if(!message.member.roles.find(r => r.name === "Staff"))
        return;
        message.guild.createChannel(`${args}`).then(channel => {
            channel.setTopic('')
        })
    }
})

client.on('message',async message => {
    if(message.content.startsWith(`${prefix}createchannel bot channel`)) {
        const args = message.content.slice(15);
        if(!message.member.roles.find(r => r.name === "Staff"))
        return;
        message.guild.createChannel(`${args}`).then(channel => {
            channel.setTopic('for using commands')
        })
    }
})


client.on('message',async message => {
    if(message.content.startsWith(`${prefix}createchannel log channel deletion`)) {
        const args = message.content.slice(15);
        if(!message.member.roles.find(r => r.name === "Staff"))
        return;
        message.guild.createChannel(`${args}`).then(channel => {
            channel.setTopic('Were assess bot logs deleted messages')
        })
    }
})

client.login(token);