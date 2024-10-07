/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
const baseUrl = "http://localhost:5000";

const api = {
    get: async (endpoint: string) => {
      const token = localStorage.getItem('token');

      const response = await fetch(baseUrl + endpoint, {
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
      })

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();
      return data;
    },

    post: async (endpoint: string, body: any) => {
      const token = localStorage.getItem('token');

      const response = await fetch(baseUrl + endpoint, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(body)
        })

        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }

        const data = await response.json();
        return data;
    },

    put: async (endpoint: string, body: any) => {
      const token = localStorage.getItem('token');

      const response = await fetch(baseUrl + endpoint, {
            method: "PUT",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(body)
        })

        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }

        const data = await response.json();
        return data;
    },

    delete: async (endpoint: string) => {
      const token = localStorage.getItem('token');

      const response = await fetch(baseUrl + endpoint, {
            method: "DELETE",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`
            },
        })

        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }

        const data = await response.json();
        return data;
    }
}

export default api;
