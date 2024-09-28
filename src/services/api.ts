/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
const baseUrl = "http://localhost:5000";

const api = {
    get: (endpoint: string) => {
        const p = fetch(baseUrl + endpoint, {
            credentials: "include"
        })

        return p;
    },

    post: (endpoint: string, body: any) => {
      const p = fetch(baseUrl + endpoint, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        })

        return p;
    },

    put: (endpoint: string, body: any) => {
      const p = fetch(baseUrl + endpoint, {
            method: "PUT",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        })

        return p;
    },

    delete: (endpoint: string) => {
      const p = fetch(baseUrl + endpoint, {
            method: "DELETE",
            credentials: "include"
        })

        return p;
    }
}

export default api;
