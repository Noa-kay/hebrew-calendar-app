# Deployment to GitHub

To upload this project to GitHub, follow these steps:

## Manual Setup (Recommended)

1. **Create a new repository on GitHub**:
   - Go to https://github.com/new
   - Repository name: `calendar-app`
   - Description: Hebrew Calendar App with Redux
   - Public or Private (your choice)
   - Do NOT initialize with README (we already have one)
   - Click "Create repository"

2. **Add remote and push to GitHub**:
   ```bash
   cd /tmp/calendar-app
   git remote add origin https://github.com/YOUR_USERNAME/calendar-app.git
   git branch -M main
   git push -u origin main
   ```

3. **Replace YOUR_USERNAME with your GitHub username**

## What's Included

- **4 Meaningful Commits**:
  1. Initial setup: React + Redux with calendar structure
  2. Add Calendar and Day components with API integration
  3. Add routing with React Router - bonus feature
  4. Update gitignore

- **All Requirements Met**:
  - ✅ Redux with Redux Toolkit
  - ✅ Feature-based folder structure (features/app, features/calendar)
  - ✅ Calendar and Day components
  - ✅ API integration with hebcal.com
  - ✅ Add event functionality
  - ✅ Event display with alerts
  - ✅ Async thunk for API calls
  - ✅ Proper week alignment in calendar display
  - ✅ CSS Grid layout
  - ✅ Bonus: React Router implementation

## Project Status

All features have been implemented and tested:
- Calendar displays correctly with Hebrew dates
- Events can be added to any date
- API integration working with hebcal.com
- Redux state management fully functional
- Routing allows viewing specific months
- Project builds successfully without errors

