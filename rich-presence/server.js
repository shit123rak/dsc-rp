const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });
const clientId = '946764701990285423';
const DiscordRPC = require('discord-rpc');
const RPC = new DiscordRPC.Client({ transport: 'ipc' });
DiscordRPC.register(clientId);

// load json file from current directory
const fs = require('fs');
const file = fs.readFileSync('./settings.json');
const settings = JSON.parse(file);

const bannedSites = settings.bannedSites;
const extraSites = settings.extraSites;
const githubUsername = settings.githubUsername;
const workingRepo = settings.workingRepo;
let noUrl = settings.noUrl;

noUrl = noUrl === 'rickroll' || noUrl === '' ? 'https://bit.ly/3CSPJO2' : noUrl;

try {
    wss.on('connection', socket => {
        socket.onmessage = async ({ data }) => {
            if (data === 'No tab') {
                RPC.removeAllListeners();
                RPC.on('ready', async () => {
                    setActivity('no chrome', 'Out of Chrome', noUrl, 'None', 'nochrome');
                });
                RPC.login({ clientId }).catch(err => console.error(err));
            } else {
                data = typeof data === 'string' ? JSON.parse(data) : data;
                if (data.url.length >= 512) data.url = data.url.slice(0, 512);
                if (data.title.length >= 128) data.title = data.title.slice(0, 128);
                if (data.url.includes('youtube.com') && !bannedSites.includes('youtube.com')) {
                    if (data.url.includes('watch?')) {
                        RPC.removeAllListeners();
                        RPC.on('ready', async () => {
                            setActivity('watching', data.title, data.url, 'Watch', 'youtube');
                        });
                        RPC.login({ clientId }).catch(err => console.error(err));

                    } else if (data.url.includes('results?search_query')) {
                        let search = data.url.split('=')[1].split('+').join(' ');
                        RPC.removeAllListeners();
                        RPC.on('ready', async () => {
                            setActivity('searching', search, data.url, 'Search', 'youtube');
                        });
                        RPC.login({ clientId }).catch(err => console.error(err));
                    } else {
                        RPC.removeAllListeners();
                        RPC.on('ready', async () => {
                            setActivity('surfing', 'Surfing', 'https://www.youtube.com', 'Surf', 'youtube');
                        });
                        RPC.login({ clientId }).catch(err => console.error(err));
                    }
                } else if ((data.url.includes('stackoverflow.com') || data.url.includes('w3schools.com') || data.url.includes('codepen.io') || data.url.includes('geeksforgeeks.org') || data.url.includes('quora.com')) && (!bannedSites.includes('stackoverflow.com') || !bannedSites.includes('w3schools.com') || !bannedSites.includes('codepen.io') || !bannedSites.includes('geeksforgeeks.org') || !bannedSites.includes('quora.com'))) {
                    let thumbnail = ''
                    if (data.url.includes('stackoverflow.com')) thumbnail = 'stack'
                    if (data.url.includes('w3schools.com')) thumbnail = 'w3s'
                    if (data.url.includes('codepen.io')) thumbnail = 'codepen'
                    if (data.url.includes('geeksforgeeks.org')) thumbnail = 'geeks'
                    if (data.url.includes('quora.com')) thumbnail = 'quora'
                    RPC.removeAllListeners();
                    RPC.on('ready', async () => {
                        setActivity('finding answers', data.title, data.url, 'Search', thumbnail);
                    });
                    RPC.login({ clientId }).catch(err => console.error(err));
                } else if (data.url.includes('github.com') && !bannedSites.includes('github.com')) {
                    RPC.removeAllListeners();
                    RPC.on('ready', async () => {
                        setActivity('surfing', data.title, data.url, 'Search', 'github');
                    });
                    RPC.login({ clientId }).catch(err => console.error(err));
                } else if (data.url.includes('reddit.com') && !bannedSites.includes('reddit.com')) {
                    RPC.removeAllListeners();
                    RPC.on('ready', async () => {
                        setActivity('memeing', data.title, data.url, 'Meme', 'reddit');
                    });
                    RPC.login({ clientId }).catch(err => console.error(err));
                } else if (data.url.includes('twitter.com') && !bannedSites.includes('twitter.com')) {
                    RPC.removeAllListeners();
                    RPC.on('ready', async () => {
                        setActivity('tweeting', data.title, data.url, 'Tweet', 'twitter');
                    });
                    RPC.login({ clientId }).catch(err => console.error(err));
                } else if ((data.url.includes('discord.gg') || data.url.includes('discord.com')) && (!bannedSites.includes('discord.gg') || !bannedSites.includes('discord.com'))) {
                    RPC.removeAllListeners();
                    RPC.on('ready', async () => {
                        setActivity('discord', data.title, data.url, 'Search', 'discord');
                    });
                    RPC.login({ clientId }).catch(err => console.error(err));
                } else if (data.url.includes('google.com') && !bannedSites.includes('google.com')) {
                    RPC.removeAllListeners();
                    RPC.on('ready', async () => {
                        setActivity('searching', data.title, data.url, 'Search', 'google');
                    });
                    RPC.login({ clientId }).catch(err => console.error(err));
                } else if (data.url.includes('facebook.com') && !bannedSites.includes('facebook.com')) {
                    RPC.removeAllListeners();
                    RPC.on('ready', async () => {
                        setActivity('facebook', data.title, data.url, 'Go', 'facebook');
                    });
                    RPC.login({ clientId }).catch(err => console.error(err));
                } else if (data.url.includes('instagram.com') && !bannedSites.includes('instagram.com')) {
                    RPC.removeAllListeners();
                    RPC.on('ready', async () => {
                        setActivity('instagram', data.title, data.url, 'Go', 'instagram');
                    });
                    RPC.login({ clientId }).catch(err => console.error(err));
                } else if (data.url.includes('wikipedia.org') && !bannedSites.includes('wikipedia.org')) {
                    RPC.removeAllListeners();
                    RPC.on('ready', async () => {
                        setActivity('reading', data.title, data.url, 'Read', 'wiki');
                    });
                    RPC.login({ clientId }).catch(err => console.error(err));
                } else {
                    if (data.url.includes('aot') || data.url.includes('attackontitan') || data.url.includes('attack-on-titan') || data.url.includes('shingeki-no-kyojin')) {
                        RPC.removeAllListeners();
                        RPC.on('ready', async () => {
                            setActivity('watching', 'Aot', data.url, 'Watch', 'aot');
                        });
                        RPC.login({ clientId }).catch(err => console.error(err));
                    } else if (data.url.includes('127.0.0.1')) {
                        RPC.removeAllListeners();
                        RPC.on('ready', async () => {
                            setActivity('editing', data.title, `https://github.com/${githubUsername}${workingRepo}`, 'Repos', 'code');
                        });
                        RPC.login({ clientId }).catch(err => console.error(err));
                    } else {
                        let extraSiteIncludes = false;
                        for (let i = 0; i < extraSites.length; i++) {
                            if (data.url.includes(extraSites[i])) {
                                extraSiteIncludes = true;
                                RPC.removeAllListeners();
                                RPC.on('ready', async () => {
                                    setActivity('surfing', data.title, data.url, 'Search', 'chrome');
                                });
                                RPC.login({ clientId }).catch(err => console.error(err));
                            }
                        }
                        if (!extraSiteIncludes) {
                            RPC.removeAllListeners();
                            RPC.on('ready', async () => {
                                setActivity('unreachable site', 'Somewhere in Chrome', noUrl, 'None', 'chrome');
                            });
                            RPC.login({ clientId }).catch(err => console.error(err));
                        }
                    }
                }
            }
        }
    })
} catch (e) {
    console.log('error', e)
    DiscordRPC.register(clientId);
}


// discord rpc
async function setActivity(state, title, btnurl, btn, key) {
    if (!RPC) return;
    RPC.setActivity({
        details: `${title}`,
        state: state,
        largeImageKey: key,
        largeImageText: key,
        smallImageKey: 'chrome',
        smallImageText: 'Chrome',
        instance: false,
        buttons: [
            {
                label: btn,
                url: `${btnurl}`
            }
        ]
    });
}