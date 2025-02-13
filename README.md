
OpenQase is a curation of quantum computing business case studies. The resource is organised by multiple contexts to showcase case studies, quantum algorithms, and associated research papers relevant to industry or user persona.


-----

## Development notes

- OpenQase is build on top of a [Next.js](https://nextjs.org) and uses Shadcdn UI componenets. 

- NextJS 15 has breaking changes. New components may need [this async await codemod](https://nextjs.org/docs/app/building-your-application/upgrading/codemods) to fix linter issues.

- Deployment is currently on Vercel (internal [link here](https://vercel.com/ddris-projects/openqase/9XVBdfF5RmdBKR6zCrwrdQ5W4CgK)). 

- Data is currently locally represented. Will likely move to MongoDB Atlas for document storage.




## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

