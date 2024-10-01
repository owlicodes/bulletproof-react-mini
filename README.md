# bulletproof-react-mini

![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![React](https://img.shields.io/badge/-ReactJs-61DAFB?logo=react&logoColor=white&style=for-the-badge)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-0F172A?style=for-the-badge&logo=tailwindcss&logoColor=white)
![React Router](https://img.shields.io/badge/-React%20Router-CA4245?style=for-the-badge&logo=react-router)
![React Hook Form](https://img.shields.io/badge/react--hook--form-EC5990?style=for-the-badge&logo=reacthookform&logoColor=white)
![Zod](https://img.shields.io/badge/-Zod-3E67B1?style=for-the-badge&logo=zod&logoColor=white)
![React Query](https://img.shields.io/badge/-React%20Query-FF4154?style=for-the-badge&logo=react%20query&logoColor=white)
![Axios](https://img.shields.io/badge/axios.js-854195?style=for-the-badge&logo=axios&logoColor=5A29E4)
![Vitest](https://img.shields.io/badge/vitest-6E9F18?style=for-the-badge&logo=vitest&logoColor=white)
![React Testing Library](https://img.shields.io/badge/React%20Testing%20Library-0062FF?style=for-the-badge&logoColor=white)

Over the years of building React applications, one thing I've learned for certain is that if you don't set hard rules or establish a good structure, scaling your React application becomes incredibly difficult.

Without a proper structure, you'll end up with "spaghetti imports," and each developer will have their own way of naming, placing, and organizing files, leading to inconsistencies and chaos.

This is where [Bulletproof React](https://github.com/alan2207/bulletproof-react) by [alan2207](https://github.com/alan2207) comes in.

Bulletproof React offers a simple, scalable, and powerful architecture for building production-ready React applications. It comes packed with many advanced features, some of which you might not need in the early stages of your development.

To make it easier to get started, I created a mini version of Bulletproof React, which serves as a solid base for any new application. I’ve removed some features that you can always add later if needed. I've removed Storybook, Playwright, and the implementation of Mock Service Worker (MSW) on the client side, though we will still use MSW for unit testing.

Full credit goes to [alan2207](https://github.com/alan2207) for providing this gem. All I've done is make it less daunting for new React developers.

## Backend

I have modified the api client here just a bit to work with my [nestjs-starter-kit](https://github.com/owlicodes/nestjs-start-prisma). You can use the project to serve as your backend.
