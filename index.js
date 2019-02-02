const botconfig = require("./botconfig.json");
const Discord = require("discord.js");
const YTDL = require("ytdl-core");

const bot = new Discord.Client({disableEveryone: true});



function UserAction() {
    var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "http://taskinoz.com/gdq/api/", true);
    xhttp.setRequestHeader("Content-type", "text/plain");
    xhttp.send();
    var response = JSON.parse(xhttp.responseText);
    return response;
}

function play(connection, message) {
  var server = servers[message.guild.id];

  server.dispatcher = connection.playStream(YTDL(server.queue[0], {filter: "audioonly"}));

  server.queue.shift();

  server.dispatcher.on("end", function() {
    if (server.queue[0]) play(connection, message);
    else connection.disconnect();
  });
}

var servers = {};



bot.on("ready", async () => {
  console.log(`${bot.user.username} is online.`);
  bot.user.setActivity("with my nuts");
});

bot.on("message", async message => {
  if(message.author.bot) return;
  if(message.channel.type === "dm") return;

  let prefix = botconfig.prefix;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);



  //MUSIC

  if(cmd === `${prefix}play` || cmd === `${prefix}PLAY`){
    if (!args[0]){
      return message.channel.send("You have to include a youtube link!");
    }

    if (!message.member.voiceChannel){
      message.channel.send("You have to be in voice chat to play music.");
      return;
    }

    if(!servers[message.guild.id]) servers[message.guild.id] = {
      queue: []
    };

    var server = servers[message.guild.id];

    server.queue.push(args[0]);

    message.channel.send("Song added to the queue.");

    if (!message.guild.voiceConnection) message.member.voiceChannel.join().then(function(connection) {
      play(connection, message);
    });

    return;
  }

  if(cmd === `${prefix}skip` || cmd === `${prefix}SKIP`){
    var server = servers[message.guild.id];

    if (server.dispatcher) server.dispatcher.end();

    message.channel.send("Song skipped by " + message.member);

    return;
  }

  if(cmd === `${prefix}stop` || cmd === `${prefix}STOP`){
    var server = servers[message.guild.id];

    if(message.guild.voiceConnection) message.guild.voiceConnection.disconnect();

    message.channel.send(message.member + "stopped the queue.");

    return;
  }



  //TEXT

  if(cmd === `${prefix}hello` || cmd === `${prefix}HELLO`){
    return message.channel.send("I... am....... alive...........");
  }

  if(cmd === `${prefix}help` || cmd === `${prefix}HELP`){
    return message.channel.send("**Commands** \n \n __Text:__    !will    !kmart    !mike    !boe    !computer   \n \n
	 __Pics:__    !giga    !old      !yikes     !baby    !think    !aaa    !sleep   \n \n 
	__Gifs:__    !mm    !gachi\n \n
	 __Music:__    !play <youtube link>    !skip    !stop");
  }

  if(cmd === `${prefix}will` || cmd === `${prefix}WILL`){
    return message.channel.send("<@83083683044524032> <:haHAA:256674642041765888>");
  }

  if(cmd === `${prefix}kmart`|| cmd === `${prefix}KMART`){
    return message.channel.send("<@259842802727256064> <:haHAA:256674642041765888>");
  }

  if(cmd === `${prefix}boe` || cmd === `${prefix}BOE`){
    return message.channel.send("<@87345472137601024> <:haHAA:256674642041765888>");
  }

  if(cmd === `${prefix}mike` || cmd === `${prefix}MIKE`){
    return message.channel.send("<@83056338837442560> <:haHAA:256674642041765888>");
  }

  if(cmd === `${prefix}computer` || cmd === `${prefix}COMPUTER`){
    return message.channel.send("WillSpreadEm - 02/16/2017 man i forgot the computer(edited)");
  }


  if(cmd === `${prefix}donation`){
    /*let XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
    let xhr = new XMLHttpRequest();
    xhr.open("GET", "http://taskinoz.com/gdq/api", false);
    xhr.send();
    let donation = xhr.responseText;*/
    try{
      return message.channel.send(UserAction());
    }
    catch(error){
      console.error(error);
    }
  }



  //PICS

  if(cmd === `${prefix}giga` || cmd === `${prefix}GIGA`){
    return message.channel.send({files: ["hahaa/gigahahaa.png"]});
  }

  if(cmd === `${prefix}old` || cmd === `${prefix}OLD`){
    return message.channel.send({files: ["hahaa/gigaold.png"]});
  }

  if(cmd === `${prefix}yikes` || cmd === `${prefix}YIKES`){
    return message.channel.send({files: ["hahaa/gigayikes.png"]});
  }

  if(cmd === `${prefix}baby` || cmd === `${prefix}BABY`){
    return message.channel.send({files: ["hahaa/bigbaby.png"]});
  }

  if(cmd === `${prefix}think` || cmd === `${prefix}THINK`){
    return message.channel.send({files: ["hahaa/reallymakesyouthink.png"]});
  }

  if(cmd === `${prefix}aaa` || cmd === `${prefix}AAA`){
    return message.channel.send({files: ["hahaa/aaaaa.jpg"]});
  }

  if(cmd === `${prefix}sleep` || cmd === `${prefix}SLEEP`){
    return message.channel.send({files: ["hahaa/sleep.png"]});
  }



  //GIFS

  if(cmd === `${prefix}mm` || cmd === `${prefix}MM`){
    return message.channel.send({files: ["hahaa/mmm.gif"]});
  }

  if(cmd === `${prefix}gachi` || cmd === `${prefix}GACHI`){
    return message.channel.send({files: ["hahaa/gachi.gif"]});
  }

});

bot.login(botconfig.token);
