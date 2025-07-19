# Mobile UI Project

This project is designed specifically for mobile devices, with a focus on optimizing the UI for mobile viewing.

## Technology Stack

- Next.js 15.3.5
- React 19
- TypeScript
- Redux (@reduxjs/toolkit, react-redux)
- Tailwind CSS
- Shadcn UI components

## Design Theme

The design follows a minimalist, coder/vim-inspired aesthetic with:

- Black and white/gray color scheme for good contrast
- Thin borders and buttons
- Clean, simple layouts

## State Management

The application uses Redux for centralized state management:

- UI state (image/text toggle, alignment mode)
- Content state (sample image, text)
- Alignment state (selection coordinates)

## Navigation

- All screens have a navigation bar at the bottom
- Currently, there are 2 screens: Home and Settings
- Screens do not scroll but adapt to the device height

## Implemented Screens

### 1. Home Screen

The Home screen is divided vertically in a 50/50 ratio:

#### Top Section

- Displays an image that can be clicked to toggle to text view
- When in Align mode, shows a visual overlay of the selected area

#### Bottom Section

- Contains buttons that expand to fill the entire bottom section
- Buttons automatically resize based on the number of buttons displayed
- Buttons maintain appropriate spacing to prevent accidental clicks
- Buttons are arranged in two rows:
  - Row 1: Capture | Align
  - Row 2: ASK RAG | ASK
- Only the Align button has special functionality

#### Align Functionality

When the Align button is clicked:

- The bottom section changes to display 4 sliders
- These sliders control the selection area of the image (in percentages)
- There are 2 vertical sliders and 2 horizontal sliders
- The sliders are designed for easy touch interaction:
  - Larger, more visible slider controls
  - Percentage values displayed at both ends for better readability
  - Clear visual feedback when interacting with sliders
- Constraints are enforced:
  - The right slider value cannot be less than the left slider value
  - The bottom slider value cannot be less than the top slider value
- The selected area is visualized on the image
- Below the sliders, there are Save and Cancel buttons:
  - Save: Saves the current alignment and returns to the Home screen
  - Cancel: Discards changes and returns to the Home screen
  - Buttons are well-spaced to prevent accidental taps
  - Full-width buttons with larger size for easier interaction
  - Increased font size for better readability
- The percentage values are saved for later use

### 2. Settings Screen

The Settings screen provides configuration options and displays job-related information:

#### Job State Display

- Shows a formatted JSON representation of the current job state
- Includes all values from the JobState Redux store
- Provides a quick overview of the current job configuration and status

#### Image Providers Display

- Displays a two-column grid of images from job.data
- Filters keys that start with "IMAGE_PROVIDER"
- Each image is displayed with its provider key as a caption
- If an image is not available, shows a placeholder
- Images are fetched using CommonValue.getCurrentJobImage(imageName)

#### Configuration Options

- **Capture Mode**: Select between "specific" and "all" modes
- **Capture With Provider**: Select "DirectX" or "None"
- **Runtime Mode**: Select between "CLI" and "SERVICE" modes
- All configuration changes are immediately updated in the Redux store

## Component Structure

- `ReduxProvider`: Wraps the application to provide Redux store access
- `NavigationBar`: Bottom navigation with Home and Settings tabs
- `ImageTextToggle`: Toggles between image and text view using Redux
- `ActionButton`: Styled buttons for actions
- `ImageAlignment`: Sliders for image area selection
- `ImageWithSelection`: Displays image with selection overlay
- `Select`: Custom select component for configuration options in the Settings screen

## How to Use

1. The Home screen initially shows an image in the top half and action buttons in the bottom half
2. Click on the image to toggle between image and text view
3. Click the Align button to enter alignment mode
4. Use the sliders to select a specific area of the image
5. The selected area is visualized on the image
6. Click the **Capture** button to trigger an API call to capture an image based on the current settings (capture mode and provider)
7. Navigate to the Settings screen using the bottom navigation bar
8. View the current job state in the Job State Display section
9. Browse captured images in the Image Providers Display section
10. Configure capture settings using the dropdown selects:
    - Set Capture Mode to "specific" or "all"
    - Set Capture With Provider to "DirectX" or "None"
    - Set Runtime Mode to "CLI" or "SERVICE"

## Development

To run the development server: