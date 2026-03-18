# Link Vault

A modern, responsive web application built with React and TypeScript for storing, managing, and organizing your favorite links. Save your bookmarks locally in your browser and access them anytime with a sleek, professional interface.

## Features

### User Authentication
- **Sign Up**: Create a new account with email and password
- **Login**: Secure authentication using localStorage
- **User Management**: Each user can manage their own links

### Link Management
- **Add Links**: Save new links with title, URL, description, and tags
- **Edit Links**: Update existing link information
- **Delete Links**: Remove links you no longer need
- **Auto URL Formatting**: Automatically adds `https://` if missing

### Search & Filter
- **Real-time Search**: Search links by title, URL, description, or tags
- **Instant Filtering**: Results update as you type
- **Clear Search**: Easy search reset functionality

### Modern UI/UX
- **Polished Design**: Professional styling with smooth animations
- **Toast Notifications**: Beautiful success/error feedback instead of alerts
- **Form Validation**: Real-time validation with visual feedback
- **Loading States**: Spinner indicators during operations
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Smooth Transitions**: Elegant animations throughout the app

### User Experience
- **Empty States**: Helpful messages when no links are found
- **Link Count**: See how many links you have saved
- **Tag System**: Organize links with custom tags
- **External Links**: Open links in new tabs with proper security attributes

## Tech Stack

### Frontend
- **React 19.1.1** - UI library
- **TypeScript 5.8.3** - Type safety
- **React Router DOM 7.8.2** - Client-side routing
- **Vite 7.1.2** - Build tool and dev server

### Styling
- **Plain CSS** - Custom styling with modern CSS features
- **CSS Animations** - Smooth transitions and effects
- **Responsive Design** - Mobile-first approach

### Data Storage
- **localStorage** - Browser-based data persistence

### Development Tools
- **ESLint** - Code linting
- **TypeScript ESLint** - TypeScript-specific linting rules

## Installation

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or yarn package manager

### Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd React-TS-Task-2---Links-Vault
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   - Navigate to `http://localhost:5173` (or the port shown in terminal)

## Usage

### Getting Started

1. **Sign Up**: Create a new account on the homepage
   - Enter your full name, email, and password
   - Password must be at least 6 characters

2. **Login**: Sign in with your credentials

3. **Add Links**: 
   - Click "Save a New Link" or navigate to `/linkpage`
   - Fill in the form:
     - **Title** (required): Name of the link
     - **URL** (required): Web address (https:// will be added automatically)
     - **Description** (optional): Additional notes
     - **Tags** (optional): Comma-separated tags for organization

4. **View All Links**: 
   - Click "View All Links" to see your saved links
   - Use the search bar to filter links
   - Click on any link to open it in a new tab

5. **Edit/Delete Links**:
   - Click "Edit" to modify a link
   - Click "Delete" to remove a link permanently

## Project Structure

```
React-TS-Task-2---Links-Vault/
├── public/                 # Static assets (images, logos)
├── src/
│   ├── assets/
│   │   ├── Components/     # React components
│   │   │   ├── Aboutpage/  # About page component
│   │   │   ├── Homepage/   # Landing page component
│   │   │   ├── Linklist/   # Link list component
│   │   │   ├── LinkOutcome/# Links display page
│   │   │   ├── Linkpage/   # Add/Edit link form
│   │   │   ├── Loginpage/  # Login component
│   │   │   ├── SignUpPage/ # Sign up component
│   │   │   └── Toast/      # Toast notification component
│   │   ├── hooks/          # Custom React hooks
│   │   │   └── useToast.ts # Toast notification hook
│   │   ├── types.ts        # TypeScript type definitions
│   │   └── Utils/          # Utility functions
│   │       └── LocalStorage.ts # localStorage helpers
│   ├── App.tsx             # Main app component with routing
│   ├── App.css             # Global app styles
│   ├── index.css           # Base styles
│   └── main.tsx            # Application entry point
├── index.html              # HTML template
├── package.json            # Dependencies and scripts
├── tsconfig.json           # TypeScript configuration
├── vite.config.ts          # Vite configuration
└── README.md               # This file
```

## Key Components

### Authentication
- **SignUp**: User registration with form validation
- **Login**: User authentication with error handling

### Link Management
- **LinkPage**: Form for adding/editing links
- **LinkOutcome**: Grid view of all saved links with search
- **LinkList**: Reusable link card component

### UI Components
- **Toast**: Notification system for user feedback
- **Homepage**: Landing page with navigation
- **About**: Information about the application

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Features in Detail

### Form Validation
- Real-time validation with error messages
- Visual feedback for invalid inputs
- Required field indicators
- URL format validation

### Toast Notifications
- Success notifications for successful operations
- Error notifications for failures
- Auto-dismiss after 3 seconds
- Manual dismiss option

### Responsive Design
- Mobile-first approach
- Breakpoints for tablet and desktop
- Optimized layouts for all screen sizes

## Data Storage

All data is stored locally in the browser's `localStorage`:
- **Users**: Stored under `users` key
- **Links**: Stored under `links` key

**Note**: Data is browser-specific and will not sync across devices or browsers.

## Future Enhancements

Potential features for future versions:
-  Cloud sync across devices
-  Enhanced user profiles
-  Link analytics and statistics
-  Folder/category organization
-  Browser extension
-  Mobile app
-  Link previews/thumbnails
-  Export/Import functionality

##  Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request
