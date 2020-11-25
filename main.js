const Bot = require('./Shiori');
const Shiori = new Bot();
Shiori.reply('Hello');
Shiori.reply('I love you');
Shiori.reply('I want to tell you something about me');
Shiori.reply('I want a waifu');
Shiori.reply('nah. nevermind I want an onee-san');

const stories = Shiori.getStories();
for (let story of stories) {
    console.log(story.input);
    console.log(' >> ', story.output);
}