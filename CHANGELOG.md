# Changelog

## Version 2.0.0 - GitHub Ready Release

### Major Changes

#### New Data System
- **Local JSON data loading**: Data served from `public/data/` directory
- **No API calls**: All data loaded from static JSON files
- **Easy customization**: Simply edit JSON files to add/modify data
- **CSV templates**: Provided for easy data preparation

#### Enhanced Documentation
- **README.md**: Comprehensive setup and usage guide
- **DATA_FORMAT.md**: Complete data format documentation with examples
- **CSV Templates**: Sample files for data preparation
- **Contributing guidelines**: Clear instructions for contributors

#### Testing Improvements
- **38 tests**: Increased from 32 tests
- **Data loader tests**: 6 new tests for data loading utilities
- **100% core coverage**: All critical functionality tested
- **TDD methodology**: Every feature backed by tests

### New Files

#### Data Files
- `public/data/transceivers.json` - Transceiver definitions
- `public/data/test-categories.json` - Test category definitions
- `public/data/test-cases.json` - Individual test cases
- `public/data/test-results-trans-1.json` through `trans-6.json` - Sample test results
- `public/data/templates/transceivers-template.csv` - CSV template for transceivers
- `public/data/templates/test-results-template.csv` - CSV template for test results

#### Documentation
- `DATA_FORMAT.md` - Complete data format guide
- `LICENSE` - MIT License
- `CHANGELOG.md` - This file

#### Source Code
- `src/lib/dataLoader.ts` - JSON data loading utilities
- `src/lib/dataLoader.test.ts` - Data loader tests

### Modified Files

#### Configuration
- `package.json` - Updated name, version, removed Supabase dependency, added papaparse
- Updated project metadata to version 2.0.0

#### Source Code
- `src/hooks/useTransceivers.ts` - Now uses dataLoader instead of Supabase
- `src/hooks/useTransceiverResults.ts` - Now uses dataLoader instead of Supabase
- `src/types/index.ts` - Made timestamp fields optional

**Thank you to all contributors who helped make this release possible!**
