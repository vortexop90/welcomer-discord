require("dotenv").config();

const Discord = require("discord.js");

const Canvas = require("canvas");

const config = require("./config.json");

const client = new Discord.Client();

client.on("ready", () => {
  console.log("Welcomer Ready");
});

client.on("guildMemberAdd", async (member) => {
  console.log("joined");
  const wecomeChannelID = config.channelId;

  const welcomeChannel = member.guild.channels.cache.get(wecomeChannelID);
  const welcomeImage = Canvas.createCanvas(1200, 250);
  const ctx = welcomeImage.getContext("2d");
  const welcomeBg = await Canvas.loadImage("https://i.ibb.co/rMFMccP/bg.png");
  ctx.drawImage(welcomeBg, 0, 0, welcomeImage.width, welcomeImage.height);
  ctx.strokeStyle = "white";
  ctx.strokeRect(0, 0, welcomeImage.width, welcomeImage.height);

  ctx.fillStyle = "white";

  let size1 = 60;
  let size2 = 50;
  let size3 = 40;

  let name = member.user.tag;
  do {
    ctx.font = `${(size1 -= 5)}px snas`;
  } while (ctx.measureText(name).width > welcomeImage - 225);
  ctx.fillText(name, 300, 130);
  let nam = "Welcome";
  do {
    ctx.font = `${(size2 -= 5)}px snas`;
  } while (ctx.measureText(name).width > welcomeImage - 225);
  ctx.fillText(nam, 480, 52);
  let namee = "To";
  do {
    ctx.font = `${(size3 -= 5)}px snas`;
  } while (ctx.measureText(name).width > welcomeImage - 225);
  ctx.fillText(namee, 530, 180);

  let nameee = "Apex Legends Mobile INDIA Server";
  do {
    ctx.font = `${(size3 -= 5)}px snas`;
  } while (ctx.measureText(name).width > welcomeImage - 225);
  ctx.fillText(nameee, 330, 220);

  ctx.beginPath();
  ctx.arc(100, 100, 75, 0, Math.PI * 2, true);
  ctx.closePath();
  ctx.clip();
  const welcomeAv = await Canvas.loadImage(
    member.user.displayAvatarURL({ format: "png" })
  );
  ctx.drawImage(welcomeAv, 25, 25, 150, 150);
  const attachment = new Discord.MessageAttachment(
    welcomeImage.toBuffer(),
    "welcome.png"
  );
  member.roles.add(config.roleId);
  const disE = ">";
  const eS = " ";

  welcomeChannel.send(
    `
${disE} Hey <@${member.id}>,
${disE} ━━━━━━━━━━━━━━━━━━━━━━━━━━━
${disE} <a:t5:772831156059242516> Welcome To **Apex Legends Mobile India** Server <a:t5:772831156059242516> 
${disE} Thanks For Joining Us, Let Me Walk you Through Some Steps,<a:2628_rainbowdown:769389381894275082>
${disE} ━━━━━━━━━━━━━━━━━━━━━━━━━━━
${disE}   <a:r_O:772721283532062740>  Read Server Rules here <#${config.channels.rules}>
${disE}   <a:r_O:772721283532062740>  Read Some FAQ's About Us <#${config.channels.faq}>
${disE}   <a:r_O:772721283532062740>  Get Your Desired roles for extra Benifits <#${config.channels.rxnR}>
${disE}   <a:r_O:772721283532062740>  Chat With Others Here <#${config.channels.genChat}>
${disE} ━━━━━━━━━━━━━━━━━━━━━━━━━━━
${disE} These Were Some Get Started Things, Now Eplore Server..
${disE} Have A Great Time!
    `,
    attachment
  );
});

client.login(process.env.TOKEN);
