const fs = require("fs");
const { promises } = require("fs");
const LEADS_FOLDER_PATH = "./LEADS/";

console.time("read_files");

interface User {
    facebook_id: String;
    full_name: String;
    email: String;
}

const getFilesList = async () => {
    const filesList: string[] = await promises.readdir(LEADS_FOLDER_PATH);
    return filesList;
};

const readFiles = async () => {
    try {
        let filesList = await getFilesList();
        console.log(filesList);

        // read files to Promise Buffer
        const bufferPromiseList = await filesList.map((file) =>
            promises.readFile(LEADS_FOLDER_PATH + file)
        );

        // promise buffer to string
        let fileUsersStrArray: string[] = [];
        for (const bufferPromise of bufferPromiseList) {
            const buff = await bufferPromise;
            const fileUsersBuffer = buff.toString().split("\r\n");
            fileUsersStrArray = [...fileUsersStrArray, ...fileUsersBuffer];
        }

        return fileUsersStrArray;
    } catch (error) {
        console.log(error);
    }

    return [];
};

const strArrayToMap = (strArray: string[]) => {
    let map = new Map<String, User>();
    return new Promise<Map<String, User>>((res, rej) => {
        for (const userStr of strArray) {
            let [facebook_id, full_name, email] = userStr.split(",");
            map.set(facebook_id, {
                facebook_id,
                full_name: full_name.replace(/['"]+/g, ""),
                email
            });
        }

        res(map);
    });
};

const mapToUsersArray = (map: Map<String, User>) => {
    const users: User[] = [];
    return new Promise<User[]>((res, rej) => {
        for (let entry of Array.from(map.entries())) {
            let key = entry[0];
            let value = entry[1];

            users.push(value);
        }

        res(users);
    });
};

const strArrayToUsersArray = (strArray: string[]) => {
    const unique: any = {};
    const users: User[] = [];
    return new Promise<User[]>((res, rej) => {
        for (const userStr of strArray) {
            let [facebook_id, full_name, email] = userStr.split(",");

            if (!unique[facebook_id]) {
                unique[facebook_id] = true;
                users.push({
                    facebook_id,
                    full_name: full_name.replace(/['"]+/g, ""),
                    email
                });
            }
        }
        res(users);
    });
};

const filesToJsonFile = async () => {
    try {
        const filesUsersStrArray = await readFiles();
        // Map Solution
        //const map = await strArrayToMap(filesUsersStrArray);
        // Counter Array
        const users = await strArrayToUsersArray(filesUsersStrArray);
        console.log(`Number of Users: ${users.length}`);
        await promises.writeFile("results.json", JSON.stringify(users));
    } catch (error) {
        console.log(error);
    }
};

filesToJsonFile();

console.timeEnd("read_files");
