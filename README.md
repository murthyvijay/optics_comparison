# Interconnect Transceiver Resiliency Testing Dashboard

A comprehensive, data-driven dashboard for comparing interconnect transceiver performance and generating resiliency reports. Built with React, TypeScript, and Test-Driven Development (TDD) principles.

![Version](https://img.shields.io/badge/version-2.0.0-blue.svg)
![Tests](https://img.shields.io/badge/tests-39%20passing-brightgreen.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

## Features

- **Compare Up to 4 Transceivers**: Side-by-side comparison with real-time grading
- **Comprehensive Test Categories**:
  - Signal Integrity (5 tests)
  - Power Consumption (4 tests)
  - Thermal Performance (5 tests)
  - Reliability (4 tests)
- **Automated Grading System**: A-F grading based on pass rates
- **Expandable Test Details**: Click to view individual test results, criteria, and measured values
- **CSV Export**: Export all comparison data for external analysis
- **Fully Tested**: 39 passing tests with 100% coverage of core functionality
- **Zero External Dependencies**: No databases or APIs required - runs entirely on local data

## Quick Start

### Prerequisites

- Node.js 18+ (recommended: use latest LTS version)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/interconnect-transceiver-testing.git
   cd interconnect-transceiver-testing
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
   Navigate to `http://localhost:5173`

That's it! The application comes pre-loaded with 6 sample transceivers and test data.

## Adding Your Own Test Data

### Quick Method

1. Navigate to `public/data/`
2. Edit the JSON files to add your transceivers and test results
3. Refresh the application

### Detailed Instructions

See [DATA_FORMAT.md](./DATA_FORMAT.md) for complete documentation on:
- Data file structure
- Field definitions
- Step-by-step guides
- CSV templates
- Best practices

### Example: Adding a New Transceiver

1. Add to `public/data/transceivers.json`:
```json
{
  "id": "my-transceiver",
  "name": "Custom QSFP-100G",
  "manufacturer": "Your Company",
  "type": "100G QSFP28"
}
```

2. Create `public/data/test-results-my-transceiver.json`:
```json
[
  {
    "test_case_id": "tc-sig-1",
    "passed": true,
    "value": "125mV",
    "notes": "Excellent performance"
  }
]
```

3. Refresh and select your transceiver from the dropdown

## Project Structure

```
├── public/
│   └── data/                      # All test data (JSON files)
│       ├── transceivers.json      # Transceiver definitions
│       ├── test-categories.json   # Test category definitions
│       ├── test-cases.json        # Individual test definitions
│       ├── test-results-*.json    # Test results per transceiver
│       └── templates/             # CSV templates for reference
├── src/
│   ├── components/                # React components
│   │   ├── ComparisonView.tsx     # Main comparison interface
│   │   ├── TransceiverCard.tsx    # Individual transceiver display
│   │   └── TestCategorySection.tsx # Expandable test category
│   ├── hooks/                     # Custom React hooks
│   │   ├── useTransceivers.ts     # Load transceiver data
│   │   └── useTransceiverResults.ts # Load and process test results
│   ├── lib/                       # Core libraries
│   │   └── dataLoader.ts          # JSON data loading utilities
│   ├── types/                     # TypeScript type definitions
│   │   └── index.ts               # All type interfaces
│   ├── utils/                     # Utility functions
│   │   ├── grading.ts             # Grade calculation logic
│   │   └── export.ts              # CSV export functionality
│   └── test/                      # Test configuration
│       └── setup.ts               # Vitest setup
├── DATA_FORMAT.md                 # Data format documentation
└── README.md                      # This file
```

## Technology Stack

- **Frontend Framework**: React 18
- **Language**: TypeScript 5
- **Build Tool**: Vite 5
- **Styling**: Tailwind CSS 3
- **Icons**: Lucide React
- **Testing**: Vitest + React Testing Library
- **Data Parsing**: PapaParse (for future CSV support)

## Grading System

The application automatically calculates grades based on pass rates:

| Grade | Pass Rate |
|-------|-----------|
| **A** | ≥ 80%     |
| **B** | ≥ 70%     |
| **C** | ≥ 60%     |
| **D** | ≥ 50%     |
| **F** | < 50%     |

Grades are calculated at two levels:
1. **Category Grade**: Based on tests within that specific category
2. **Overall Grade**: Based on all tests across all categories

## Testing

This project follows Test-Driven Development (TDD) methodology. Every feature is backed by comprehensive tests.

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test

# Run tests with UI
npm run test:ui

# Run tests with coverage report
npm run test:coverage
```

### Test Coverage

- **39 tests** across 7 test suites
- Unit tests for grading logic
- Unit tests for data loading
- Component tests for UI elements (including Compare button)
- Integration tests for full workflows

## Building for Production

```bash
# Build the application
npm run build

# Preview the production build
npm run preview
```

The built files will be in the `dist/` directory, ready to deploy to any static hosting service.

## Sample Data

The application includes 6 pre-configured sample transceivers demonstrating different performance levels:

1. **VendorA QSFP28-100G-SR4** - Grade A (94% pass rate)
2. **VendorB QSFP-DD-400G-DR4** - Grade B (78% pass rate)
3. **VendorC CFP2-100G-LR4** - Grade C (61% pass rate)
4. **VendorD QSFP28-100G-CWDM4** - Grade D (50% pass rate)
5. **VendorE SFP28-25G-SR** - Grade F (17% pass rate)
6. **VendorF QSFP-DD-400G-SR8** - Grade B (78% pass rate)

## Deployment

This is a static site that can be deployed to any hosting service:

### Netlify
```bash
npm run build
# Deploy the dist/ folder
```

### Vercel
```bash
npm run build
# Deploy the dist/ folder
```

### GitHub Pages
1. Build: `npm run build`
2. Push the `dist/` folder to the `gh-pages` branch

## Contributing

Contributions are welcome! Here's how you can help:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Write tests for your changes
4. Ensure all tests pass (`npm test`)
5. Commit your changes (`git commit -m 'Add amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

### Development Guidelines

- Follow the existing code style
- Write tests for all new features
- Update documentation as needed
- Keep commits atomic and well-described
- Ensure the build passes before submitting PR

## Use Cases

This dashboard is ideal for:

- **Hardware Testing Labs**: Compare transceiver performance across vendors
- **Network Engineers**: Evaluate transceivers for deployment
- **Quality Assurance**: Track testing progress and results
- **Procurement Teams**: Make data-driven purchasing decisions
- **Research**: Analyze performance trends and patterns
- **Education**: Learn about transceiver testing methodologies

## Customization

### Test Categories

Want different test categories? Edit `public/data/test-categories.json`:

```json
{
  "id": "custom-category",
  "name": "Your Category",
  "description": "Description of your tests",
  "display_order": 4
}
```

### Test Cases

Need different tests? Edit `public/data/test-cases.json`:

```json
{
  "id": "custom-test",
  "category_id": "custom-category",
  "name": "Your Test",
  "description": "What it measures",
  "pass_criteria": "Pass conditions",
  "display_order": 0
}
```

### Styling

The application uses Tailwind CSS. Customize colors and styles in:
- `tailwind.config.js` - Theme configuration
- Component files - Individual component styles

## Troubleshooting

### Transceiver doesn't appear
- Check JSON syntax in `transceivers.json`
- Ensure all required fields are present
- Clear browser cache and reload

### Test results not displaying
- Verify filename: `test-results-{transceiver-id}.json`
- Ensure `test_case_id` matches IDs in `test-cases.json`
- Check browser console for errors

### Build fails
- Delete `node_modules` and `package-lock.json`
- Run `npm install` again
- Ensure Node.js version is 18+

### Tests failing
- Run `npm test` to see specific errors
- Ensure all dependencies are installed
- Check that no files were accidentally modified

## Performance

- **Browser Support**: All modern browsers (Chrome, Firefox, Safari, Edge)

## License

MIT License - feel free to use this project for any purpose.

## Support

- **Issues**: GitHub Issues
- **Discussions**: GitHub Discussions
- **Documentation**: See [DATA_FORMAT.md](./DATA_FORMAT.md)

## Acknowledgments

- Built with React and TypeScript
- Icons by [Lucide](https://lucide.dev/)
- Testing with Vitest
- Styled with Tailwind CSS

---

**Thank You for contributing to the project**
