const model = require('./datas/model');
const default_model = require('./datas/default');
const props = [1, 2, 3, 4, 5, 6, 7, 8, 9].map(n => '$' + n);

/**
 * Randomly picks an item inside arr
 * @param {any[]} arr 
 */
function pickRandomly( arr ) {
    return arr[ Math.floor(Math.random() * arr.length) ];
}

class Story {
    /**
     * @constructor
     * @param {string} input 
     * @param {string} output 
     */
    constructor(input, output) {
        this.input = input;
        this.output = output;
    }
}

module.exports = class Shiori {
    /**
     * Constructs a new Shiori bot
     * @constructor
     * @public
     * @param {JSON?} model 
     * @param {string[]?} default_model 
     */
    constructor(_model, _default_model) {
        this.model = _model || model;
        this.default_model = _default_model || default_model;
        this.stories = [];
        this.default_message_processor = ((response, captured) => {
            
            if (response)
                for (let val in captured)
                    response = response.replace(val, captured[val]);
            else
                response = pickRandomly(this.default_model);

            // console.log(captured)
            return response;
        });
    }

    /**
     * Changes the default user input processor
     * @param {Function} msgProcessor (response : string and captured : {$1 : .., ... $9 : } as inputs)  
     */
    use(msgProcessor) {
        this.default_message_processor = msgProcessor;
    }

    /**
     * @public
     * @param {string} user_input 
     */
    reply (user_input) {
        const messageProcessor = this.default_message_processor;
        let response = '';

        for (let key in this.model) {
            if (RegExp(key, 'i').test(user_input)){
                const captured = {};
                for (let prop of props)
                    captured[prop] = RegExp[prop];
                response = messageProcessor(pickRandomly(this.model[key]), captured);
                break;
            }
        }

        if (response == '' )
            response = messageProcessor(null, {});
        
        this.stories.push(new Story(user_input, response));

        return response;
    }

    /**
     * @public
     * @param {string} user_input 
     * @param {number} delay 
     * @returns {Promise<string>}
     */
    async replyAsync (user_input, delay) {
        if (!delay || delay < 0)
            throw new Error("Delay must be positive");

        return await new Promise((resolve, reject) => {
            setTimeout(() => {
                try {
                    let response = this.reply(user_input);
                    resolve(response);
                } catch(err) {
                    reject(err);
                }
            }, delay);
        });
    }

    /**
     * @protected
     * @param {Story} story 
     */
    appendStories (story) {
        if (story instanceof Story)
            this.stories.push(story);
        else
            throw new Error('story must be an instance of Story');
    }

    /**
     * @public
     * @returns {void}
     */
    clearStories() {
        this.stories = [];
    }

    /**
     * @public
     * @returns {Story[]}
     */
    getStories() {
        return this.stories;
    }
}