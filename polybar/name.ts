import { execSync } from 'child_process';
import * as fs from 'fs';
import * as os from 'os';

const replacementNames = [
    {
        old: 'VSCodium - URL Handler',
        new: 'VSCodium'
    },
    {
        old: 'kitty URL Launcher',
        new: 'kitty'
    }
]

function scanInLocal(activeWindowId: string) {
    if (activeWindowId.includes('xprop: error')) return "Finder";
    if (activeWindowId == "") return "Finder";
    const applications = fs.readdirSync(`${os.homedir()}/.local/share/applications`);
    for (let i = 0; i < applications.length; i++) {
        const application = fs.readFileSync(`${os.homedir()}/.local/share/applications/${applications[i]}`)
        if (applications[i].toLowerCase().includes(activeWindowId.toLowerCase())) {
            return application.toString()
        }
    }
}

function scanInGlobal(activeWindowId: string) {
    if (activeWindowId.includes('xprop: error')) return "Finder";
    if (activeWindowId == "") return "Finder";
    const applications = fs.readdirSync(`/usr/share/applications/`);
    for (let i = 0; i < applications.length; i++) {
        const application = fs.readFileSync(`/usr/share/applications/${applications[i]}`)
        if (applications[i].toLowerCase().includes(activeWindowId.toLowerCase())) {
            return application.toString()
        }
    }
}

function handleEmptyWindow(activeWindowId: string) {
    if (activeWindowId.includes('Invalid window id format')) return "Finder";
    if (activeWindowId == "") return "Finder";
    return activeWindowId;
}

function getPrettyName(file: string) {
    const lines = file.split('\n');
    let name = lines.filter(l => l.startsWith('Name='))[0].replace('Name=', '');
    replacementNames.forEach(element => {
        if (element.old === name) {
            name = element.new;
            return false;
        }
    });
    console.log(name);
}

setInterval(() => {
    const activeWindowId = execSync("xprop -id $(xprop -root _NET_ACTIVE_WINDOW | cut -d ' ' -f 5) WM_CLASS | awk -F '\"' '{print $4}'", {
        stdio: ['pipe', 'pipe', 'ignore']
    }).toString().trim();
    const local = scanInLocal(activeWindowId)
    const global = scanInGlobal(activeWindowId)
    try {
        getPrettyName(local || global!);
    } catch(e) {
        console.log(handleEmptyWindow(activeWindowId));
    }
}, 25)
