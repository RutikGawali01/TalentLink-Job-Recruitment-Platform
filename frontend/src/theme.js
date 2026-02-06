// # Job Portal Color System

// This document contains all the color codes and configuration for the Job Portal project.

// ## 🎨 Primary Colors

// ### Blue Shades
// - **Blue 400** (Light): `#60A5FA` - Used for hover states and accents in dark mode
// - **Blue 500** (Main): `#3B82F6` - Primary brand color
// - **Blue 600** (Dark): `#2563EB` - Used for darker variations and light mode

// ### Purple Shades
// - **Purple 600**: `#9333EA` - Used in gradients and accent elements

// ### Primary Gradient
// ```css
// background: linear-gradient(to right, #3B82F6, #9333EA);
// ```

// ---

// ## 🌙 Dark Theme Colors

// ### Backgrounds
// - **Primary Background**: `#111827` (gray-900)
// - **Secondary Background**: `#1F2937` (gray-800) - Cards, sections
// - **Tertiary Background**: `#374151` (gray-700) - Input fields

// ### Text
// - **Primary Text**: `#FFFFFF` (white)
// - **Secondary Text**: `#9CA3AF` (gray-400)
// - **Accent Text**: `#60A5FA` (blue-400)

// ### Borders
// - **Default Border**: `#1F2937` (gray-800)
// - **Accent Border**: `#3B82F6` (blue-500)

// ---

// ## ☀️ Light Theme Colors

// ### Backgrounds
// - **Primary Background**: `#FFFFFF` (white)
// - **Secondary Background**: `#F9FAFB` (gray-50) - Sections
// - **Tertiary Background**: `#F3F4F6` (gray-100) - Input fields

// ### Text
// - **Primary Text**: `#111827` (gray-900)
// - **Secondary Text**: `#4B5563` (gray-600)
// - **Accent Text**: `#2563EB` (blue-600)

// ### Borders
// - **Default Border**: `#E5E7EB` (gray-200)
// - **Accent Border**: `#60A5FA` (blue-400)

// ---

// ## 📦 Complete Gray Scale

// ```javascript
// gray: {
//   50:  '#F9FAFB',  // Lightest
//   100: '#F3F4F6',
//   200: '#E5E7EB',
//   300: '#D1D5DB',
//   400: '#9CA3AF',
//   500: '#6B7280',
//   600: '#4B5563',
//   700: '#374151',
//   800: '#1F2937',
//   900: '#111827',  // Darkest
// }
// ```

// ---

// ## 🎯 Usage Examples

// ### In Tailwind CSS

// ```jsx
// // Gradient text
// <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
//   Dream Job
// </span>

// // Primary button
// <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg px-6 py-3">
//   Search
// </button>

// // Dark theme card
// <div className="bg-gray-800 border-2 border-blue-500 rounded-2xl p-6">
//   Card content
// </div>

// // Light theme card
// <div className="bg-white border-2 border-blue-400 rounded-2xl p-6 shadow-lg">
//   Card content
// </div>
// ```

// ### In CSS

// ```css
// /* Using custom properties */
// .primary-button {
//   background: linear-gradient(to right, #3B82F6, #9333EA);
//   color: #FFFFFF;
// }

// .dark-card {
//   background-color: #1F2937;
//   border: 2px solid #3B82F6;
// }

// .light-card {
//   background-color: #FFFFFF;
//   border: 2px solid #60A5FA;
// }
// ```

// ### In JavaScript/React

// ```javascript
// import { colors } from './colors';

// // Using color constants
// const buttonStyle = {
//   background: colors.gradients.primary,
//   color: colors.light.text.primary,
// };

// // Theme-based styling
// const cardStyle = (isDark) => ({
//   backgroundColor: isDark ? colors.dark.background.secondary : colors.light.background.primary,
//   borderColor: isDark ? colors.primary.blue[500] : colors.primary.blue[400],
// });
// ```

// ---

// ## 🔧 Component-Specific Colors

// ### Navigation Bar
// - Dark: `bg-gray-900/80` with `border-gray-800`
// - Light: `bg-white/80` with `border-gray-200`

// ### Search Button
// - Gradient: `from-blue-500 to-purple-600`
// - Shadow: `shadow-blue-500/30` on hover

// ### Category Cards
// - Dark: `bg-gray-800 border-blue-500`
// - Light: `bg-white border-blue-400`
// - Icon background: `from-blue-500 to-purple-600`

// ### Testimonial Cards
// - Dark: `bg-gray-800 border-blue-500`
// - Light: `bg-white border-blue-400`
// - Stars: `fill-blue-400 text-blue-400`

// ### Footer
// - Dark: `bg-gray-900` with `border-gray-800`
// - Light: `bg-gray-50` with `border-gray-200`
// - Social icons hover: `hover:bg-blue-500`

// ---

// ## 🎨 Shadow System

// ```css
// /* Blue-tinted shadows */
// shadow-blue-sm:  0 1px 2px 0 rgba(59, 130, 246, 0.05)
// shadow-blue-md:  0 4px 6px -1px rgba(59, 130, 246, 0.1)
// shadow-blue-lg:  0 10px 15px -3px rgba(59, 130, 246, 0.3)
// shadow-blue-xl:  0 20px 25px -5px rgba(59, 130, 246, 0.3)
// shadow-blue-2xl: 0 25px 50px -12px rgba(59, 130, 246, 0.4)
// ```

// ---

// ## 📱 Responsive Considerations

// All colors maintain their values across breakpoints. Only opacity and shadow intensity may vary for better mobile UX.

// ---

// ## 🔄 Theme Toggle Implementation

// ```jsx
// // Toggle between themes
// const [theme, setTheme] = useState('dark');
// const isDark = theme === 'dark';

// // Apply conditional classes
// className={`${isDark ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}
// ```

// ---

// ## ✨ Accessibility Notes

// - **Contrast Ratios**: All text/background combinations meet WCAG AA standards
// - **Focus States**: Blue accent colors used for keyboard navigation
// - **Color Blind Safe**: Blue and purple combination is distinguishable

// ---

// ## 📋 Quick Reference Card

// | Element | Dark Mode | Light Mode |
// |---------|-----------|------------|
// | **Background** | `#111827` | `#FFFFFF` |
// | **Text** | `#FFFFFF` | `#111827` |
// | **Accent** | `#60A5FA` | `#2563EB` |
// | **Border** | `#1F2937` | `#E5E7EB` |
// | **Card BG** | `#1F2937` | `#FFFFFF` |
// | **Card Border** | `#3B82F6` | `#60A5FA` |
// | **Button** | Blue→Purple Gradient | Blue→Purple Gradient |

// ---

// ## 🚀 Getting Started

// 1. Import the color configuration:
//    ```javascript
//    import { colors } from './colors';
//    ```

// 2. Use the Tailwind config:
//    ```javascript
//    // tailwind.config.js already includes all colors
//    ```

// 3. Apply theme context:
//    ```jsx
//    import { ThemeProvider } from './ThemeContext';
   
//    <ThemeProvider>
//      <App />
//    </ThemeProvider>
//    ```

// ---

// ## 📄 Files Included

// - `colors.js` - Complete color configuration with exports
// - `tailwind.config.js` - Tailwind CSS configuration
// - `ThemeContext.js` - React theme management
// - `JobPortalHome.jsx` - Main component with all colors applied

// ---

// **Note**: All hex codes are provided. RGB equivalents can be obtained using standard conversion tools if needed.