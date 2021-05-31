import fetch from "node-fetch";
import {User} from "../../src/entities";

interface Response {
    status: number,
    body: any;
}

export const usersBaseUrl = "http://localhost:3000/users/";
export const todolistsBaseUrl = "http://localhost:3000/todolists/";
export const clearUrl = "http://localhost:3000/clear/";

const validDate = new Date();
validDate.setFullYear(validDate.getFullYear() - 15);
export const validUser = User.build({
    name: "Adem",
    lastname: "Mrizak",
    mail: "adem@mrizak.com",
    password: "ademmrizak",
    birthdate: validDate
}).getValue();

export const clearDatabase = async () => {
    await fetch(clearUrl, {method: "DELETE"});
};

export const sendGetRequest = async (url: string): Promise<Response> => {
    const response = await fetch(url);
    const status = response.status;
    try {
        return {status, body: await response.json()};
    } catch {
        return {status, body: {}};
    }
};

export const sendPostRequest = async (url: string, requestBody: string): Promise<Response> => {
    const init = {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: requestBody
    };
    const response = await fetch(url, init);
    const status = response.status;
    try {
        return {status, body: await response.json()};
    } catch {
        return {status, body: {}};
    }
};
