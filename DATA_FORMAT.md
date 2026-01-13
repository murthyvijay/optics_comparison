# Data Format Guide

This document explains how to add your own transceiver test data to the application.

## Overview

All data is stored as JSON files in the `public/data/` directory. The application reads these files at runtime, making it easy to add, modify, or update test data without changing any code.

## File Structure

```
public/data/
├── transceivers.json              # List of all transceivers
├── test-categories.json           # Test category definitions
├── test-cases.json                # Individual test definitions
├── test-results-trans-1.json      # Test results for transceiver 1
├── test-results-trans-2.json      # Test results for transceiver 2
└── ...                            # Additional test result files
```

## Data Files

### 1. transceivers.json

Defines the transceivers available for comparison.

**Format:**
```json
[
  {
    "id": "unique-id",
    "name": "Transceiver Model Name",
    "manufacturer": "Manufacturer Name",
    "type": "Transceiver Type (e.g., 100G QSFP28)"
  }
]
```

**Example:**
```json
[
  {
    "id": "trans-1",
    "name": "QSFP28-100G-SR4",
    "manufacturer": "VendorA",
    "type": "100G QSFP28"
  }
]
```

**Fields:**
- `id` (required): Unique identifier used to link test results
- `name` (required): Display name of the transceiver
- `manufacturer` (required): Company that manufactured the transceiver
- `type` (required): Technical specification or category

### 2. test-categories.json

Defines the categories that organize tests.

**Format:**
```json
[
  {
    "id": "unique-category-id",
    "name": "Category Name",
    "description": "Category description",
    "display_order": 0
  }
]
```

**Example:**
```json
[
  {
    "id": "cat-signal",
    "name": "Signal Integrity",
    "description": "Tests measuring signal quality and transmission characteristics",
    "display_order": 0
  }
]
```

**Fields:**
- `id` (required): Unique identifier for the category
- `name` (required): Display name
- `description` (required): Brief description
- `display_order` (required): Number determining display order (0 = first)

### 3. test-cases.json

Defines individual test cases within categories.

**Format:**
```json
[
  {
    "id": "unique-test-id",
    "category_id": "category-id-reference",
    "name": "Test Name",
    "description": "What this test measures",
    "pass_criteria": "Criteria for passing",
    "display_order": 0
  }
]
```

**Example:**
```json
[
  {
    "id": "tc-sig-1",
    "category_id": "cat-signal",
    "name": "Eye Diagram Opening",
    "description": "Measures the eye diagram opening height",
    "pass_criteria": "Eye height > 100mV",
    "display_order": 0
  }
]
```

**Fields:**
- `id` (required): Unique identifier for the test case
- `category_id` (required): Must match an id from test-categories.json
- `name` (required): Test name
- `description` (required): What the test measures
- `pass_criteria` (required): Conditions for a passing result
- `display_order` (required): Order within the category

### 4. test-results-{transceiver-id}.json

Contains test results for a specific transceiver.

**Naming Convention:** `test-results-{transceiver-id}.json` where `{transceiver-id}` matches the `id` field from transceivers.json.

**Format:**
```json
[
  {
    "test_case_id": "test-case-id-reference",
    "passed": true,
    "value": "measured value",
    "notes": "additional notes"
  }
]
```

**Example:**
```json
[
  {
    "test_case_id": "tc-sig-1",
    "passed": true,
    "value": "135mV",
    "notes": "Excellent eye opening"
  }
]
```

**Fields:**
- `test_case_id` (required): Must match an id from test-cases.json
- `passed` (required): Boolean - true if test passed, false if failed
- `value` (required): The measured value as a string
- `notes` (required): Additional context or observations

## Adding Your Own Data

### Step 1: Define Your Transceivers

1. Open `public/data/transceivers.json`
2. Add your transceiver with a unique `id`:

```json
{
  "id": "my-transceiver-1",
  "name": "Your Transceiver Model",
  "manufacturer": "Your Manufacturer",
  "type": "Transceiver Type"
}
```

### Step 2: Define Test Categories (Optional)

If you want custom categories:

1. Open `public/data/test-categories.json`
2. Add or modify categories
3. Ensure each category has a unique `id`

### Step 3: Define Test Cases (Optional)

If you want custom tests:

1. Open `public/data/test-cases.json`
2. Add or modify test cases
3. Ensure `category_id` matches your category
4. Give each test a unique `id`

### Step 4: Add Test Results

1. Create a new file: `public/data/test-results-{your-transceiver-id}.json`
2. Add test results for each test case:

```json
[
  {
    "test_case_id": "tc-sig-1",
    "passed": true,
    "value": "120mV",
    "notes": "Good performance"
  },
  {
    "test_case_id": "tc-sig-2",
    "passed": false,
    "value": "65ps",
    "notes": "Slightly above threshold"
  }
]
```

## CSV Import (Coming Soon)

For easier data entry, you can prepare data in CSV format and convert it to JSON using the provided conversion script.

### CSV Template

See `public/data/templates/` for CSV templates:
- `transceivers-template.csv`
- `test-results-template.csv`

## Grading System

The application automatically calculates grades based on pass rates:

- **Grade A**: 80% or more tests passed
- **Grade B**: 70-79% tests passed
- **Grade C**: 60-69% tests passed
- **Grade D**: 50-59% tests passed
- **Grade F**: Less than 50% tests passed

Grades are calculated at two levels:
1. **Category Grade**: Based on tests within that category
2. **Overall Grade**: Based on all tests across all categories

## Best Practices

1. **Consistent IDs**: Use a consistent naming pattern (e.g., `trans-1`, `trans-2`)
2. **Complete Data**: Include results for all test cases for accurate grading
3. **Meaningful Values**: Use actual measured values, not just "pass" or "fail"
4. **Detailed Notes**: Add context that helps understand why a test passed or failed
5. **Validation**: After adding data, load the application to verify it displays correctly

## Troubleshooting

**Transceiver doesn't appear in dropdown:**
- Check that the transceiver is in `transceivers.json`
- Verify the JSON syntax is valid
- Clear browser cache and reload

**Test results don't show:**
- Verify filename matches pattern: `test-results-{transceiver-id}.json`
- Ensure `test_case_id` values match IDs in `test-cases.json`
- Check browser console for errors

**Invalid JSON:**
- Use a JSON validator (many available online)
- Check for missing commas, brackets, or quotes
- Ensure no trailing commas in arrays or objects

## Example: Complete Workflow

1. Add transceiver to `transceivers.json`:
```json
{
  "id": "custom-1",
  "name": "Custom Transceiver",
  "manufacturer": "Custom Corp",
  "type": "100G Custom"
}
```

2. Create `test-results-custom-1.json`:
```json
[
  {
    "test_case_id": "tc-sig-1",
    "passed": true,
    "value": "125mV",
    "notes": "Excellent"
  }
]
```

3. Save files and refresh the application
4. Select "Custom Transceiver" from the dropdown
5. View your test results with automatic grading

## Support

For questions or issues with data format, please open an issue on the GitHub repository.
