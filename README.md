This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

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

Database Schema:
"First, let's discuss our database schema. We have two main models: Question and Option.

The Question model includes:

An ID (automatically generated by MongoDB)
A title (string)
An array of references to Option documents

The Option model includes:

An ID (automatically generated)
Text content (string)
A vote count (number)
A reference to its parent Question

This structure allows us to efficiently store and retrieve poll data."

Project Structure:

src/
├── components/
│   ├── QuestionForm.js
│   ├── OptionForm.js
│   └── QuestionList.js
├── lib/
│   ├── mongodb.js
│   └── models/
│       ├── Question.js
│       └── Option.js
├── pages/
│   ├── api/
│   │   ├── questions/
│   │   │   ├── index.js
│   │   │   ├── [id].js
│   │   │   └── [id]/
│   │   │       └── options.js
│   │   └── options/
│   │       ├── [id].js
│   │       └── [id]/
│   │           └── add_vote.js
│   ├── questions/
│   │   └── [id].js
│   ├── create.js
│   └── index.js
└── styles/
└── globals.css
This structure separates our components, API routes, and pages, making the project easy to navigate and maintain."

Key Components:

a) QuestionForm (src/components/QuestionForm.js):
This component renders a form for creating new questions. It uses React's useState hook to manage the form state and sends a POST request to our API when submitted.
b) OptionForm (src/components/OptionForm.js):
Similar to QuestionForm, this component allows users to add new options to an existing question.
c) QuestionList (src/components/QuestionList.js):
This component fetches and displays a list of all questions, with links to individual question pages."

API Routes:
"Our API routes handle the server-side logic:

a) src/pages/api/questions/index.js:
Handles GET requests to fetch all questions and POST requests to create new questions.
b) src/pages/api/questions/[id].js:
Manages operations on individual questions, including fetching, updating, and deleting.
c) src/pages/api/options/[id]/add_vote.js:
Handles the voting mechanism, incrementing the vote count for a specific option."

Pages:
"Our main pages include:

a) src/pages/index.js:
The home page, displaying a list of questions and a link to create new ones.
b) src/pages/create.js:
Contains the QuestionForm for creating new polls.
c) src/pages/questions/[id].js:
Displays individual questions, their options, and voting buttons."

Database Connection:
"In src/lib/mongodb.js, we set up our MongoDB connection using Mongoose. This file exports a dbConnect function that we use in our API routes to ensure we're connected to the database before performing operations."
Styling:
"We've kept styling simple with a globals.css file, but you could expand this using CSS modules or a styling framework like Tailwind CSS."

