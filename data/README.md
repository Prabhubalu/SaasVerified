# SaasVerify Data

This directory contains the complete list of software categories and verified vendors for SaasVerify.

## File Structure

- `saasverify-categories.ts` - TypeScript file containing all 575+ categories and utility functions
- `saasverify-vendors.ts` - TypeScript file containing all verified vendors and utility functions

## Usage

```typescript
import { 
  saasverifyCategories, 
  getAllCategories, 
  getCategoryCount,
  searchCategories 
} from '@/data/saasverify-categories';

// Get all categories
const allCategories = getAllCategories();

// Get total count
const count = getCategoryCount(); // Returns 575

// Search categories
const crmCategories = searchCategories('CRM');
// Returns: ["CRM Software", "Real Estate CRM Software", "Pharma CRM Software", ...]

// Access directly
console.log(saasverifyCategories[0]); // "Accounting Software"
```

## Category Count

**Total Categories:** 575

The categories include:
- Main software categories (e.g., "CRM Software", "HR Software")
- Subcategories (e.g., "Payroll Software", "Attendance Management Software")
- Industry-specific software (e.g., "Hospital Management Software", "School Management Software")
- Hardware categories (e.g., "Barcode Scanners", "POS Machine")
- Specialized tools (e.g., "AI Tools", "Blockchain Platform")

## Categories Include

- Business Software (Accounting, CRM, HR, etc.)
- Industry-Specific Software (Healthcare, Education, Real Estate, etc.)
- Development Tools (IDE, API Management, etc.)
- Security Software (Cybersecurity, Data Protection, etc.)
- Cloud Services (IaaS, SaaS, etc.)
- Hardware Devices (Scanners, Servers, etc.)
- And many more...

## Vendors Usage

```typescript
import { 
  saasverifyVendors, 
  getAllVendors, 
  getVendorCount,
  searchVendors,
  getVendorsByCategory,
  getVendorById
} from '@/data/saasverify-vendors';

// Get all vendors
const allVendors = getAllVendors();

// Get total count
const count = getVendorCount(); // Returns 11

// Search vendors
const crmVendors = searchVendors('CRM');
// Returns vendors matching CRM in name, description, or category

// Get vendors by category
const projectMgmtVendors = getVendorsByCategory('Project Management');
// Returns: [Asana, Monday.com, EasyProjects, ...]

// Get vendor by ID
const vendor = getVendorById('hubspot');
// Returns: HubSpot vendor object

// Access directly
console.log(saasverifyVendors[0]); // Pipedrive vendor object
```

## Vendor Count

**Total Verified Vendors:** 11

The vendors include:
- CRM Software (Pipedrive, HubSpot, ActiveCampaign)
- Project Management (Monday.com, Asana, EasyProjects)
- Marketing Automation (HubSpot, ActiveCampaign)
- Cloud Telephony (Twilio)
- Document Management (DocuSign)
- Remote Access (RealVNC)
- Compliance & Legal (Wolters Kluwer)
- Customer Experience (Survey2Connect)

## Sources

- Categories extracted from: https://www.techjockey.com/categories
- Vendors extracted from: https://partnerhorsepower.com/saas-company/

Last updated: December 2024

