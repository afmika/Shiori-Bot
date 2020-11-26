const Bot = require('./Shiori');
const Shiori = new Bot();
Shiori.reply('Hello');
Shiori.reply('I love you');
Shiori.reply('I want to tell you something about me');
Shiori.reply('I want a waifu');
Shiori.reply('nah. nevermind I want an onee-san');
Shiori.reply('I would like to know who are you?');
Shiori.reply('Who was your creator');
Shiori.reply('is it true that your name is Shiori?');
Shiori.reply('Who made you?');

Shiori.replyAsync('Does it work?', 2000)
    .then(resp => {
        console.log('Promise => ', resp);
    })
    .catch(err => {
        console.error(err);
    });

const stories = Shiori.getStories();
for (let story of stories) {
    console.log('----', story.input);
    console.log(' >> ', story.output);
}