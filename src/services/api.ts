/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import Cookies from 'js-cookie';

const baseUrl = "http://localhost:5000";

const handleUnauthorized = (response: Response) => {
  if (response.url.includes("/auth/login")) return false;

  if (response.status === 401) {
      window.location.href = '/login';
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      Cookies.remove('authToken');
      return true;
  }
  return false;
};


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

      if (handleUnauthorized(response)) return;

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

        if (handleUnauthorized(response)) return;

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

        if (handleUnauthorized(response)) return;

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

        if (handleUnauthorized(response)) return;

        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }

        const data = await response.json();
        return data;
    }
}

export default api;
