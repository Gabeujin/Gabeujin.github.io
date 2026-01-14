# GitHub Copilot Instructions

## Project Overview
This is a personal homepage project showcasing various web applications and projects. The site is built with Vite and deployed to GitHub Pages.

## Team Structure
- **Team Size**: 30 developers
- **Roles**: Front-end and Back-end developers working collaboratively
- **Focus**: UI/UX optimization

## Development Guidelines

### Code Style & Best Practices
- Use modern JavaScript (ES6+) features
- Follow consistent naming conventions (camelCase for variables/functions, PascalCase for classes)
- Write clean, readable, and maintainable code
- Add comments for complex logic
- Keep functions small and focused on a single responsibility

### HTML/CSS Guidelines
- Use semantic HTML5 elements
- Follow BEM (Block Element Modifier) naming convention for CSS classes when appropriate
- Maintain responsive design principles (mobile-first approach)
- Use CSS custom properties (variables) for theming
- Ensure accessibility standards (ARIA labels, semantic elements)

### JavaScript Guidelines
- Use `const` and `let` instead of `var`
- Prefer arrow functions for callbacks
- Use async/await for asynchronous operations
- Handle errors appropriately with try-catch blocks
- Validate user input to prevent XSS and other security issues

### UI/UX Optimization
- Prioritize user experience in all features
- Ensure fast load times and smooth animations
- Implement progressive enhancement
- Test across different devices and browsers
- Follow accessibility guidelines (WCAG 2.1 Level AA)

### File Organization
- Place all source code in the `/src` directory
- Keep styles in separate CSS files
- Use modular JavaScript files for different features
- Store static assets in the `/public` directory

### Documentation
- Create work summary documents in the `/docs` folder
- Document all major features and changes
- Include step-by-step implementation plans
- Review documentation before starting new work

### Git Workflow
- Write clear, descriptive commit messages
- Use conventional commit format when possible
- Keep commits small and focused
- Test changes before committing

### Testing
- Test all features manually before deployment
- Ensure backward compatibility
- Verify responsive design on multiple screen sizes
- Check browser compatibility

### Build & Deployment
- Use `npm run dev` for development server
- Use `npm run build` to create production build
- Preview production build with `npm run preview`
- Deployment is automated via GitHub Actions on push to main branch

## Feature-Specific Guidelines

### Search Functionality
- Implement real-time search with debouncing
- Provide auto-completion suggestions
- Support fuzzy/similar search
- Display results immediately as user types
- Optimize for performance with large datasets

### Easter Eggs
- Keep easter eggs subtle and fun
- Don't interfere with main functionality
- Document easter egg triggers in code comments
- Ensure they enhance rather than distract from user experience

## Security Considerations
- Sanitize all user inputs
- Avoid inline event handlers
- Use Content Security Policy where applicable
- Keep dependencies up to date
- Never commit sensitive information

## Performance Optimization
- Minimize DOM manipulations
- Use event delegation for dynamic elements
- Lazy load images and heavy resources
- Optimize asset sizes (compress images, minify code)
- Use browser caching effectively

## Before You Code
1. Read the relevant documentation in `/docs`
2. Understand the existing code structure
3. Plan your approach step-by-step
4. Consider edge cases and error scenarios
5. Think about the user experience impact
