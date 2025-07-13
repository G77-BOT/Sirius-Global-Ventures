# Sirius Global Ventures Holding

## Company Overview

Sirius Global Ventures Holding is a diversified investment company focused on building and investing in cutting-edge businesses across multiple sectors including technology, e-commerce, artificial intelligence, machine learning, software and hardware development, accommodation, commodities, clubs, and entertainment.

Our flagship project is BotStream, an advanced AI trading platform providing access to 14 exchanges with integrated AI assistant chatbot functionality, giving users a competitive edge in arbitrage trading across various markets.

Website: [https://www.siriusglobalventures.com](https://www.siriusglobalventures.com)

## BotStream Platform

BotStream is our primary development focus - an AI-powered trading platform offering:

- Access to 14 major cryptocurrency exchanges
- AI assistant chatbot providing market insights and trading intelligence
- Real-time data analysis for identifying arbitrage opportunities
- Advanced algorithms for automated trading strategies
- Secure authentication and transaction processing

## Prerequisites

- Node.js 18+ and npm
- Vercel account (for deployment)

## Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/G77-BOT/Sirius-Global-Ventures.git
   cd Sirius-Global-Ventures
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Variables**
   Create a `.env.local` file in the root directory and add your environment variables:
   ```
   # Database
   DATABASE_URL=your_database_url_here
   
   # Authentication
   NEXTAUTH_SECRET=your_nextauth_secret_here
   NEXTAUTH_URL=http://localhost:3000
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment

### Vercel

1. Push your code to a GitHub, GitLab, or Bitbucket repository.
2. Import the repository to Vercel:
   - Go to [Vercel](https://vercel.com/new)
   - Click "Import Project"
   - Select your repository
   - Vercel will automatically detect the Next.js project
   - Click "Deploy"

3. Configure environment variables in the Vercel dashboard:
   - Go to your project in Vercel
   - Navigate to Settings > Environment Variables
   - Add the same variables from your `.env.local` file

4. Your site will be deployed and you'll receive a URL like `https://your-project.vercel.app`

## Project Structure

```
/
├── app/                    # App Router
│   ├── api/                # API routes
│   ├── globals.css         # Global styles
│   └── layout.tsx          # Root layout
├── components/             # Reusable components
├── lib/                    # Utility functions
├── public/                 # Static files
├── server/                 # Server utilities
├── shared/                 # Shared types and utilities
├── styles/                 # Global styles
├── .env.local              # Environment variables
├── next.config.js          # Next.js config
├── package.json            # Project dependencies
└── README.md              # This file
```

## Technology Stack

### Website Development
- [Next.js](https://nextjs.org/) - React framework for server-rendered applications
- [TypeScript](https://www.typescriptlang.org/) - Type-safe JavaScript
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [shadcn/ui](https://ui.shadcn.com/) - High-quality UI components
- [NextAuth.js](https://next-auth.js.org/) - Authentication solution
- [Vercel](https://vercel.com/) - Deployment and hosting platform

### BotStream Platform
- [Node.js](https://nodejs.org/) - Backend runtime environment
- [WebSocket](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API) - Real-time data streaming
- [TensorFlow.js](https://www.tensorflow.org/js) - Machine learning library
- [MongoDB](https://www.mongodb.com/) - NoSQL database
- [Redis](https://redis.io/) - In-memory data structure store
- [Docker](https://www.docker.com/) - Containerization
- [Kubernetes](https://kubernetes.io/) - Container orchestration

## Leadership

- **Mahmoud Abdolaziz** - Founder, CEO, and Creator of BotStream and Sirius Global Ventures Holding
- **Joseph Jackson** - Vice President, who coined the name "Sirius Global Ventures"

## License

All code, content, and intellectual property related to Sirius Global Ventures Holding and the BotStream platform are exclusively owned by Mahmoud Abdolaziz as the founder, creator, and CEO. Joseph Jackson is VP Sirius Global Ventures and recognized as a key member of the global holding company.

The proprietary license for this project prohibits unauthorized reproduction, distribution, or modification without explicit written permission from Mahmoud Abdolaziz. Terms of ownership and roles within the company are subject to exclusive contracts between Mahmoud Abdolaziz and Joseph Jackson.

© 2024 Sirius Global Ventures Holding. All Rights Reserved.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## Support

For support, please open an issue in the GitHub repository.
