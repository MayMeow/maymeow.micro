import fetch from "node-fetch";
import fs from "fs";
import path from "path";

let apiKey = process.env.OMG_API_KEY;
let headers = {
    "Authorization": `Token ${apiKey}`,
    "Content-Type": "application/json"
}

function getStatuses(address)
{
    let outputFolder = path.join("content", "p");
    let url = `https://api.omg.lol/address/${address}/statuses/`;

    fetch(url)
    .then(response => response.json())
    .then(json => {
        if (!fs.existsSync(outputFolder))
        {
            fs.mkdirSync(outputFolder);
        }

        //console.log(json.response.statuses);

        json.response.statuses.forEach(status => {
            if (!fs.existsSync(path.join(outputFolder, `${status.id}`)))
            {
                fs.mkdirSync(path.join(outputFolder, `${status.id}`));
            }

            let date = new Date(status.created * 1000);
            //console.log(date.toISOString());
            let fileContent = `---
                title: "${status.id}"
                date: ${date.toISOString()}
                draft: false
                emoji: "${status.emoji}"
                external_url: "${status.external_url}"
                id: "${status.id}"
                ---

                ${status.content}
            `;

            let filename = path.join(outputFolder, `${status.id}`, `index.md`);
            fs.writeFileSync(filename, fileContent.replace(/^\s+/gm, ""));
        });
    })
    .catch(error => console.log(error));
}

export default { getStatuses };