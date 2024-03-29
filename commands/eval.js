const Discord = require('discord.js');

exports.run = (client, message, args, level) => {
    const code = args.join(" ");
    code.replace(client.token, "[TOKEN]");
    try {
        let evaled = eval(code)

        if (typeof evaled !== "string")
        evaled = require("util").inspect(evaled);

        if (evaled.length >= 2000) {
            var tooLong = new Discord.MessageEmbed()
            .setTitle(`Whoops! Too long!`)
            .setColor("#36393e")
            .addField(`${evaled.length} characters!`, "That's past the charcacter limit! You can find the output in the console.");
            message.channel.send({embed: tooLong});
            console.log(evaled);
            return;
        }

        const successfulEval = new Discord.MessageEmbed()
        .setTitle("Evaluated successfully")
        .addField("Input:", `\`\`\`JavaScript\n${code}\`\`\``, true)
        .addField("Output:", `\`\`\`JavaScript\n${evaled}\`\`\``, true)
        .setColor(message.settings.color)
        .setFooter("Lore Eval")
        .setTimestamp();

        message.channel.send({embed: successfulEval});
    } catch(err) {
        const failedEval = new Discord.MessageEmbed()
        .setTitle("Error during eval!")
        .setDescription("An error occured! Please review the code and the error!")
        .addField("Input:", `\`\`\`JavaScript\n${code}\`\`\``)
        .addField("Error:", `\`\`\`JavaScript\n${err}\`\`\``)
        .setColor(0xff0000)
        .setFooter("Evaluation Error")
        .setTimestamp();

        message.channel.send({embed: failedEval})
    }
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: "Bot Owner"
}

exports.help = {
    name: "eval",
    description: "Evaluate arbitrary JavaScript code.",
    usage: "<code>",
    category: "Developer"
}
