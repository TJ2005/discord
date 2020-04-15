"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const wcp_1 = require("./thirdparty/wcp/wcp");
const mongoAdapter_1 = require("./database/mongoAdapter");
const database_1 = require("./database/database");
const util_1 = require("./util/util");
const commandHandler_1 = require("./bot/commandHandler");
const databaseManager_1 = require("./bot/databaseManager");
const messageDistributor_1 = require("./bot/messageDistributor");
const adminCommandHandler_1 = require("./bot/adminCommandHandler");
const dbStats_1 = require("./database/dbStats");
const gitParser_1 = require("./util/gitParser");
const chalk = require("chalk");
const DBL = require("dblapi.js");
const dotenv_1 = require("dotenv");
const settings = require('../config/settings.json');
class FreeStuffBot extends discord_js_1.Client {
    constructor(options) {
        super(options);
        dotenv_1.config();
        // const data = {
        //   store: 'Steam',
        //   name: 'Cool Game',
        //   'oldprice.eur': '2.99€',
        //   trash: false,
        //   'steam.subids': '4124 24124'
        // }
        // function test(a: string) {
        //   console.log(a);
        //   console.log(parseAstr(a, data));
        //   console.log(' ');
        // }
        // test('=name= is free on =store=');
        // test('The game =name= costed =oldprice.eur= before!');
        // test('{trash? YES}{NO}');
        // test('This game {trash? is}{is not} trash!');
        // test('{steam.subids? =steam.subids=}{Game not from Steam}');
        // test('{abc? ABC!}{def? DEF}{store? STORE!}{xyz? XYZ}');
        // test('{trash?}{Ok boomerino}');
        // test('{ok}');
        // WebScraper.init();
        // // WebScraper.fetch('https://store.steampowered.com/app/680360/Regions_Of_Ruin/').then(d => {
        // //   console.log(d);
        // // });
        // // SteamdbScraper.fetchFreeGames().then(console.log);
        // (async () => {
        //   SteamdbScraper.fetchSubids('822540').then(console.log)
        //   // let ids = await SteamdbScraper.fetchFreeGames();
        //   // let subids = ids.map(SteamdbScraper.fetchSubids).map(async a => await a);
        //   // let flatted = Array.prototype.concat.apply([], subids);
        //   // console.log(flatted);
        // })();
        // return;
        this.devMode = process.env.ENVIRONMENT == 'dev';
        if (this.devMode) {
            console.log(chalk.bgRedBright.black(' RUNNING DEV MODE '));
        }
        gitParser_1.logVersionDetails();
        // fixReactionEvent(this);
        util_1.Util.init();
        wcp_1.default.init(false);
        // Pastebin.init();
        mongoAdapter_1.default.connect(settings.mongodb.url)
            .catch(err => {
            console.error(err);
            wcp_1.default.send({ status_mongodb: '-Connection failed' });
        })
            .then(() => __awaiter(this, void 0, void 0, function* () {
            console.log('Connected to Mongo');
            wcp_1.default.send({ status_mongodb: '+Connected' });
            yield database_1.default.init();
            this.commandHandler = new commandHandler_1.default(this);
            this.databaseManager = new databaseManager_1.default(this);
            this.messageDistributor = new messageDistributor_1.default(this);
            this.adminCommandHandler = new adminCommandHandler_1.default(this);
            dbStats_1.DbStats.startMonitoring(this);
            if (!this.devMode) {
                this.dbl = new DBL(settings.thirdparty.topgg.apitoken, this);
            }
            this.on('ready', () => {
                console.log('Bot ready! Logged in as ' + chalk.yellowBright(this.user.tag));
                wcp_1.default.send({ status_discord: '+Connected' });
                this.user.setActivity('@FreeStuff ​ ​ ​ ​ ​ ​ ​ ​ ​ ​ ​ ​ ​ ​ ​ ​ ​ ​ ​ ​ ​ ​ ​ ​https://freestuffbot.xyz/', { type: 'WATCHING' });
                // WebScraper.fetch('https://store.steampowered.com/app/442070/Drawful_2/').then(d => {
                //   // this.messageDistributor.distribute(d);
                //   console.log(d);
                // });
            });
            this.login(settings.bot.token);
        }));
    }
}
exports.FreeStuffBot = FreeStuffBot;
exports.Core = new FreeStuffBot({
    disabledEvents: [
        // 'READY',
        // 'RESUMED',
        // 'GUILD_SYNC',
        // 'GUILD_CREATE',
        // 'GUILD_DELETE',
        // 'GUILD_UPDATE',
        'GUILD_MEMBER_ADD',
        'GUILD_MEMBER_REMOVE',
        // 'GUILD_MEMBER_UPDATE',
        'GUILD_MEMBERS_CHUNK',
        'GUILD_INTEGRATIONS_UPDATE',
        // 'GUILD_ROLE_CREATE',
        // 'GUILD_ROLE_DELETE',
        // 'GUILD_ROLE_UPDATE',
        'GUILD_BAN_ADD',
        'GUILD_BAN_REMOVE',
        // 'CHANNEL_CREATE',
        // 'CHANNEL_DELETE',
        // 'CHANNEL_UPDATE',
        'CHANNEL_PINS_UPDATE',
        // 'MESSAGE_CREATE',
        'MESSAGE_DELETE',
        'MESSAGE_UPDATE',
        'MESSAGE_DELETE_BULK',
        'MESSAGE_REACTION_ADD',
        'MESSAGE_REACTION_REMOVE',
        'MESSAGE_REACTION_REMOVE_ALL',
        // 'USER_UPDATE',
        'USER_NOTE_UPDATE',
        'USER_SETTINGS_UPDATE',
        'PRESENCE_UPDATE',
        'VOICE_STATE_UPDATE',
        'TYPING_START',
        'VOICE_SERVER_UPDATE',
        'RELATIONSHIP_ADD',
        'RELATIONSHIP_REMOVE',
        'WEBHOOKS_UPDATE'
    ],
    messageSweepInterval: 5,
    messageCacheLifetime: 5,
    messageCacheMaxSize: 5,
});
function fixReactionEvent(bot) {
    const events = {
        MESSAGE_REACTION_ADD: 'messageReactionAdd',
        MESSAGE_REACTION_REMOVE: 'messageReactionRemove',
    };
    bot.on('raw', (event) => __awaiter(this, void 0, void 0, function* () {
        const ev = event;
        if (!events.hasOwnProperty(ev.t))
            return;
        const data = ev.d;
        const user = bot.users.get(data.user_id);
        const channel = bot.channels.get(data.channel_id) || (yield user.createDM());
        if (channel.messages.has(data.message_id))
            return;
        const message = yield channel.fetchMessage(data.message_id);
        const emojiKey = (data.emoji.id) ? `${data.emoji.name}:${data.emoji.id}` : data.emoji.name;
        const reaction = message.reactions.get(emojiKey);
        bot.emit(events[ev.t], reaction, user);
    }));
}
//# sourceMappingURL=index.js.map