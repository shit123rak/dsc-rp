const wss = new WebSocket('ws://localhost:8080');

async function getCurrentTab() {
    let queryOptions = { active: true, currentWindow: true };
    let [tab] = await chrome.tabs.query(queryOptions);
    return tab;
}

chrome.alarms.create("refresh", { delayInMinutes: 0.1, periodInMinutes: 0.1 });

chrome.alarms.onAlarm.addListener(async function (alarm) {
    getCurrentTab().then(tab => {
        if (typeof tab === 'object') {
            const info = {}
            info['title'] = tab.title
            info['url'] = tab.url
            console.log(tab.title)
            wss.send(JSON.stringify(info))
        } else {
            wss.send('No tab')
        }
    });
});