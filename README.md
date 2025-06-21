# Sirius Global Ventures

A modern crypto streaming platform built with Next.js, TypeScript, and Tailwind CSS.

## Features

- Modern React with TypeScript
- Serverless API routes
- Responsive design with Tailwind CSS
- Built-in authentication (coming soon)
- Real-time data streaming (coming soon)

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

## Technologies Used

- [Next.js](https://nextjs.org/) - React framework
- [TypeScript](https://www.typescriptlang.org/) - Type checking
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [shadcn/ui](https://ui.shadcn.com/) - UI components
- [NextAuth.js](https://next-auth.js.org/) - Authentication
- [Vercel](https://vercel.com/) - Deployment

## License

MIT

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## Support

For support, please open an issue in the GitHub repository.
