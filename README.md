# ADmyBRAND Insights - Analytics Dashboard

A modern, AI-powered analytics dashboard built for digital marketing agencies. This project showcases beautiful UI design, interactive data visualizations, and smooth user experience.

## 🚀 Features

### Core Dashboard Features
- **📊 Overview Page** - Key metrics cards showing Revenue, Users, Conversions, and Growth %
- **📈 Interactive Charts** - Line charts, bar charts, and pie/donut charts with real-time data
- **📋 Data Table** - Advanced table with sorting, filtering, and pagination
- **📱 Responsive Design** - Perfect experience across desktop, tablet, and mobile devices

### UI/UX Features
- **🎨 Modern Design System** - Consistent colors, typography, and spacing
- **✨ Beautiful Animations** - Smooth micro-interactions and hover effects
- **🌙 Dark/Light Mode** - Complete theme switching capability
- **⚡ Loading States** - Beautiful skeleton loaders and smooth transitions

### Technical Features
- **⚛️ Next.js 14+** - Built with App Router for optimal performance
- **🎯 shadcn/ui** - Modern, accessible component library
- **📊 Recharts** - Interactive and responsive chart library
- **🎭 Framer Motion** - Smooth animations and transitions
- **📱 Mobile-First** - Responsive design with Tailwind CSS

## 🛠️ Installation

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Setup Instructions

1. **Clone the repository**
   \`\`\`bash
   git clone <repository-url>
   cd admybrand-analytics-dashboard
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   # or
   yarn install
   \`\`\`

3. **Run the development server**
   \`\`\`bash
   npm run dev
   # or
   yarn dev
   \`\`\`

## 📁 Project Structure

\`\`\`
├── app/
│   ├── globals.css          # Global styles and theme variables
│   ├── layout.tsx           # Root layout with theme provider
│   └── page.tsx             # Main dashboard page
├── components/
│   ├── ui/                  # shadcn/ui components
│   ├── analytics-charts.tsx # Interactive chart components
│   ├── data-table.tsx       # Advanced data table with filtering
│   ├── metrics-cards.tsx    # Animated metrics cards
│   ├── overview.tsx         # Main overview chart
│   ├── recent-sales.tsx     # Recent sales component
│   ├── theme-toggle.tsx     # Dark/light mode toggle
│   └── ...                  # Other reusable components
├── lib/
│   └── utils.ts             # Utility functions
└── README.md
\`\`\`

## 🎨 Design System

### Color Palette
- **Primary**: Modern dark tones for professional look
- **Secondary**: Subtle grays for supporting elements
- **Accent**: Vibrant colors for data visualization
- **Status Colors**: Green (success), Red (error), Orange (warning)

### Typography
- **Font**: Inter - Clean, modern, and highly readable
- **Hierarchy**: Clear heading structure (h1-h6)
- **Body Text**: Optimized for readability across devices

### Components
- **Cards**: Elevated surfaces with subtle shadows
- **Buttons**: Multiple variants (primary, secondary, outline, ghost)
- **Tables**: Clean, sortable with hover states
- **Charts**: Colorful, interactive with smooth animations

## 📊 Data & Analytics

### Mock Data
The dashboard uses realistic mock data including:
- **Revenue Metrics**: Monthly revenue tracking
- **User Analytics**: Active users, conversions, growth rates
- **Campaign Performance**: Multi-channel marketing data
- **Sales Data**: Recent transactions and customer information

### Real-time Updates
- Simulated real-time data updates every 30 seconds
- Smooth transitions when data changes
- Loading states during data fetching

## 🔧 Customization

### Adding New Charts
1. Create a new component in \`components/\`
2. Use Recharts library for consistency
3. Follow the existing color scheme
4. Add proper TypeScript types

### Modifying Themes
1. Update CSS variables in \`globals.css\`
2. Modify the theme configuration in \`tailwind.config.ts\`
3. Test both light and dark modes

### Adding New Data Sources
1. Create data fetching functions in \`lib/\`
2. Update TypeScript interfaces
3. Implement loading and error states

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy with zero configuration

### Other Platforms
The app can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean App Platform

## 📈 Performance Optimizations

- **Code Splitting**: Automatic with Next.js App Router
- **Image Optimization**: Next.js Image component
- **Lazy Loading**: Components loaded on demand
- **Bundle Analysis**: Use \`npm run analyze\` to check bundle size

## 🧪 Testing

\`\`\`bash
# Run tests
npm run test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage
\`\`\`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (\`git checkout -b feature/amazing-feature\`)
3. Commit your changes (\`git commit -m 'Add amazing feature'\`)
4. Push to the branch (\`git push origin feature/amazing-feature\`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **shadcn/ui** - For the beautiful component library
- **Recharts** - For the interactive chart components
- **Next.js Team** - For the amazing React framework
- **Tailwind CSS** - For the utility-first CSS framework

## 📞 Support

If you have any questions or need help with setup, please open an issue on GitHub or contact the development team.

---

**Built with ❤️ for digital marketing agencies**
\`\`\`
