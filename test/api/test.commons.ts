import fetch from "node-fetch";

interface Response {
    status: number,
    body: any;
}

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
