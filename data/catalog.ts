/**
 * Catalog data from MASTER SOFTWARE CATALOG
 * Contains categories and vendors with their details
 */

export interface Vendor {
  name: string;
  url: string;
  description: string;
}

export interface CategoryData {
  [category: string]: Vendor[];
}

export const catalogData: CategoryData = {
  "Project Management": [
    {
      "name": "Jira",
      "url": "https://www.atlassian.com/software/jira",
      "description": "Agile project & issue tracking for software teams to manage sprints, bugs, and workflows."
    },
    {
      "name": "Asana",
      "url": "https://asana.com",
      "description": "Task and workflow management to organize work, timelines, and team responsibilities."
    },
    {
      "name": "Trello",
      "url": "https://trello.com",
      "description": "Simple Kanban-based boards for visual task tracking and collaboration."
    },
    {
      "name": "ClickUp",
      "url": "https://clickup.com",
      "description": "All-in-one productivity platform combining tasks, docs, goals, and reporting."
    },
    {
      "name": "Monday.com",
      "url": "https://monday.com",
      "description": "Visual work management tool to track workflows across teams using customizable boards."
    },
    {
      "name": "Wrike",
      "url": "https://www.wrike.com",
      "description": "Enterprise-level project planning and reporting for large and complex teams."
    },
    {
      "name": "Smartsheet",
      "url": "https://www.smartsheet.com",
      "description": "Spreadsheet-style project management with automation and tracking features."
    },
    {
      "name": "Basecamp",
      "url": "https://basecamp.com",
      "description": "Team collaboration and planning focused on communication, to-dos, and file sharing."
    },
    {
      "name": "Zoho Projects",
      "url": "https://www.zoho.com/projects",
      "description": "Affordable project tracking tool for SMBs with Zoho ecosystem integration."
    },
    {
      "name": "Microsoft Project",
      "url": "https://www.microsoft.com/project",
      "description": "Advanced project scheduling and resource planning for large-scale projects."
    }
  ],
  "CRM": [
    {
      "name": "Salesforce",
      "url": "https://www.salesforce.com",
      "description": "Enterprise CRM platform for managing sales, marketing, service, and customer data at scale."
    },
    {
      "name": "Zoho CRM",
      "url": "https://www.zoho.com/crm",
      "description": "CRM for sales teams to track leads, deals, and customer interactions efficiently."
    },
    {
      "name": "HubSpot CRM",
      "url": "https://www.hubspot.com",
      "description": "Free CRM with built-in marketing, sales, and customer support tools."
    },
    {
      "name": "Freshsales",
      "url": "https://www.freshworks.com/crm",
      "description": "AI-powered sales CRM focused on lead scoring, automation, and pipeline management."
    },
    {
      "name": "Pipedrive",
      "url": "https://www.pipedrive.com",
      "description": "Deal-focused CRM designed to help sales teams close deals faster."
    },
    {
      "name": "Microsoft Dynamics CRM",
      "url": "https://dynamics.microsoft.com",
      "description": "Microsoft CRM suite for sales, service, and operations with deep Microsoft ecosystem integration."
    },
    {
      "name": "SugarCRM",
      "url": "https://www.sugarcrm.com",
      "description": "Highly customizable CRM tailored for complex sales processes."
    },
    {
      "name": "Insightly",
      "url": "https://www.insightly.com",
      "description": "CRM with built-in project tracking for managing customers beyond the sale."
    },
    {
      "name": "Vtiger CRM",
      "url": "https://www.vtiger.com",
      "description": "CRM with integrated helpdesk, sales, and marketing modules."
    },
    {
      "name": "Close",
      "url": "https://close.com",
      "description": "CRM built for inside sales teams with strong calling and email automation."
    }
  ],
  "Accounting": [
    {
      "name": "Tally Prime",
      "url": "https://tallysolutions.com",
      "description": "Accounting and GST software widely used for compliance, taxation, and bookkeeping."
    },
    {
      "name": "Zoho Books",
      "url": "https://www.zoho.com/books",
      "description": "Cloud-based accounting for invoicing, GST, and financial tracking."
    },
    {
      "name": "QuickBooks",
      "url": "https://quickbooks.intuit.com",
      "description": "Small business accounting for expenses, invoicing, and financial reporting."
    },
    {
      "name": "Busy",
      "url": "https://www.busy.in",
      "description": "Accounting and inventory management focused on Indian businesses."
    },
    {
      "name": "Marg ERP",
      "url": "https://www.margerp.com",
      "description": "Trade-focused accounting with billing, inventory, and GST support."
    },
    {
      "name": "Xero",
      "url": "https://www.xero.com",
      "description": "Online accounting platform for real-time financial management and collaboration."
    },
    {
      "name": "Sage",
      "url": "https://www.sage.com",
      "description": "Accounting solutions designed for small and mid-sized businesses."
    },
    {
      "name": "Wave",
      "url": "https://www.waveapps.com",
      "description": "Free accounting software for invoicing and basic financial management."
    },
    {
      "name": "FreshBooks",
      "url": "https://www.freshbooks.com",
      "description": "Invoicing and accounting tailored for freelancers and service businesses."
    },
    {
      "name": "Odoo Accounting",
      "url": "https://www.odoo.com",
      "description": "ERP-based accounting integrated with sales, inventory, and operations."
    }
  ],
  "ERP": [
    {
      "name": "SAP Business One",
      "url": "https://www.sap.com",
      "description": "ERP for small and mid-sized businesses covering finance, sales, and operations."
    },
    {
      "name": "Oracle NetSuite",
      "url": "https://www.netsuite.com",
      "description": "Cloud-based ERP for finance, inventory, and business management at scale."
    },
    {
      "name": "Odoo ERP",
      "url": "https://www.odoo.com",
      "description": "Modular ERP offering flexible apps for sales, accounting, inventory, and operations."
    },
    {
      "name": "Microsoft Dynamics 365",
      "url": "https://dynamics.microsoft.com",
      "description": "Business ERP suite integrated with Microsoft tools for finance and operations."
    },
    {
      "name": "ERPNext",
      "url": "https://erpnext.com",
      "description": "Open-source ERP for accounting, HR, manufacturing, and supply chain."
    },
    {
      "name": "Infor ERP",
      "url": "https://www.infor.com",
      "description": "Industry-specific ERP solutions for manufacturing, healthcare, and distribution."
    },
    {
      "name": "Tally ERP",
      "url": "https://tallysolutions.com",
      "description": "ERP for Indian businesses focused on accounting, GST, and compliance."
    },
    {
      "name": "Acumatica",
      "url": "https://www.acumatica.com",
      "description": "Cloud ERP with flexible licensing for finance, distribution, and manufacturing."
    },
    {
      "name": "Syspro",
      "url": "https://www.syspro.com",
      "description": "Manufacturing-focused ERP for production, inventory, and supply chain."
    },
    {
      "name": "Sage X3",
      "url": "https://www.sage.com",
      "description": "Enterprise ERP for complex finance, manufacturing, and distribution needs."
    }
  ],
  "HRMS": [
    {
      "name": "Keka",
      "url": "https://www.keka.com",
      "description": "HR and payroll platform for attendance, payroll, and compliance."
    },
    {
      "name": "Zoho People",
      "url": "https://www.zoho.com/people",
      "description": "HR management tool for employee records, leave, and performance."
    },
    {
      "name": "GreytHR",
      "url": "https://www.greythr.com",
      "description": "Payroll and HR software focused on Indian compliance and processes."
    },
    {
      "name": "Darwinbox",
      "url": "https://darwinbox.com",
      "description": "Enterprise HRMS covering core HR, payroll, and employee experience."
    },
    {
      "name": "BambooHR",
      "url": "https://www.bamboohr.com",
      "description": "HR platform for SMBs focused on employee data and hiring."
    },
    {
      "name": "Freshteam",
      "url": "https://www.freshworks.com/hrms",
      "description": "Recruitment and HR tool for hiring and onboarding."
    },
    {
      "name": "Workday",
      "url": "https://www.workday.com",
      "description": "Enterprise HCM for HR, finance, and workforce planning."
    },
    {
      "name": "SAP SuccessFactors",
      "url": "https://www.sap.com",
      "description": "Talent management suite for performance, learning, and succession."
    },
    {
      "name": "Rippling",
      "url": "https://www.rippling.com",
      "description": "Unified platform for HR, payroll, and IT management."
    },
    {
      "name": "PeopleStrong",
      "url": "https://www.peoplestrong.com",
      "description": "HR automation platform for talent and workforce management."
    }
  ],
  "Payroll": [
    {
      "name": "Zoho Payroll",
      "url": "https://www.zoho.com/payroll",
      "description": "Cloud-based payroll for salary processing and statutory compliance."
    },
    {
      "name": "Keka Payroll",
      "url": "https://www.keka.com",
      "description": "Payroll processing with attendance, leave, and compliance integration."
    },
    {
      "name": "GreytHR Payroll",
      "url": "https://www.greythr.com",
      "description": "Payroll automation focused on Indian HR and statutory needs."
    },
    {
      "name": "Razorpay Payroll",
      "url": "https://razorpay.com/payroll",
      "description": "Payroll and compliance with automated salary payouts and filings."
    },
    {
      "name": "ADP",
      "url": "https://www.adp.com",
      "description": "Global payroll solutions for enterprises across multiple countries."
    },
    {
      "name": "Paychex",
      "url": "https://www.paychex.com",
      "description": "Payroll services for small and mid-sized businesses."
    },
    {
      "name": "QuickBooks Payroll",
      "url": "https://quickbooks.intuit.com",
      "description": "Payroll for SMBs integrated with accounting workflows."
    },
    {
      "name": "Gusto",
      "url": "https://gusto.com",
      "description": "Payroll and benefits management for growing companies."
    },
    {
      "name": "ZingHR",
      "url": "https://www.zinghr.com",
      "description": "Payroll and HR platform for workforce management."
    },
    {
      "name": "SumHR",
      "url": "https://sumhr.com",
      "description": "Simple payroll and HR solution for small teams."
    }
  ],
  "Helpdesk": [
    {
      "name": "Freshdesk",
      "url": "https://www.freshworks.com/helpdesk",
      "description": "Ticketing support system for managing customer queries across channels."
    },
    {
      "name": "Zendesk",
      "url": "https://www.zendesk.com",
      "description": "Customer service platform for scalable support, automation, and analytics."
    },
    {
      "name": "Zoho Desk",
      "url": "https://www.zoho.com/desk",
      "description": "Multichannel support tool for tickets, SLAs, and customer satisfaction."
    },
    {
      "name": "Jira Service Management",
      "url": "https://www.atlassian.com",
      "description": "ITSM tool for incident, change, and service request management."
    },
    {
      "name": "Help Scout",
      "url": "https://www.helpscout.com",
      "description": "Email-based support focused on simple, human customer conversations."
    },
    {
      "name": "Kayako",
      "url": "https://www.kayako.com",
      "description": "Helpdesk software for customer support and live chat."
    },
    {
      "name": "HappyFox",
      "url": "https://www.happyfox.com",
      "description": "Support ticketing system with automation and reporting."
    },
    {
      "name": "Spiceworks",
      "url": "https://www.spiceworks.com",
      "description": "Free IT helpdesk for small teams and IT departments."
    },
    {
      "name": "ManageEngine ServiceDesk",
      "url": "https://www.manageengine.com",
      "description": "ITSM tool for asset, incident, and service management."
    },
    {
      "name": "Freshservice",
      "url": "https://www.freshworks.com/freshservice",
      "description": "IT helpdesk for IT operations and service delivery."
    }
  ],
  "Inventory Management": [
    {
      "name": "Zoho Inventory",
      "url": "https://www.zoho.com/inventory",
      "description": "Inventory and order management for growing businesses."
    },
    {
      "name": "inFlow",
      "url": "https://www.inflowinventory.com",
      "description": "Inventory tracking for stock, orders, and warehouses."
    },
    {
      "name": "Unleashed",
      "url": "https://www.unleashedsoftware.com",
      "description": "Inventory control with purchasing and reporting."
    },
    {
      "name": "Fishbowl",
      "url": "https://www.fishbowlinventory.com",
      "description": "Manufacturing inventory with production and warehouse management."
    },
    {
      "name": "TradeGecko",
      "url": "https://quickbooks.intuit.com",
      "description": "Inventory management for ecommerce and multichannel sales."
    },
    {
      "name": "StockIQ",
      "url": "https://www.stockiqtech.com",
      "description": "Stock optimization and demand planning."
    },
    {
      "name": "Odoo Inventory",
      "url": "https://www.odoo.com",
      "description": "Inventory module integrated with sales and manufacturing."
    },
    {
      "name": "Cin7",
      "url": "https://www.cin7.com",
      "description": "Inventory and POS for retail and wholesale."
    },
    {
      "name": "Katana",
      "url": "https://katanamrp.com",
      "description": "Inventory and production planning for manufacturers."
    },
    {
      "name": "SAP Inventory",
      "url": "https://www.sap.com",
      "description": "Enterprise inventory management for large organizations."
    }
  ],
  "POS": [
    {
      "name": "Square",
      "url": "https://squareup.com",
      "description": "POS for retail with payments and inventory."
    },
    {
      "name": "GoFrugal",
      "url": "https://www.gofrugal.com",
      "description": "Retail POS tailored for Indian businesses."
    },
    {
      "name": "Lightspeed",
      "url": "https://www.lightspeedhq.com",
      "description": "Cloud POS for retail and hospitality."
    },
    {
      "name": "Toast",
      "url": "https://pos.toasttab.com",
      "description": "Restaurant POS for ordering and payments."
    },
    {
      "name": "Shopify POS",
      "url": "https://www.shopify.com",
      "description": "POS for ecommerce and omnichannel selling."
    },
    {
      "name": "Vend",
      "url": "https://www.vendhq.com",
      "description": "Retail POS with inventory and customer management."
    },
    {
      "name": "RetailGraph",
      "url": "https://www.retailgraph.com",
      "description": "Indian POS for retail billing and inventory."
    },
    {
      "name": "Paytm POS",
      "url": "https://paytm.com",
      "description": "POS for Indian merchants with payment integration."
    },
    {
      "name": "Loyverse",
      "url": "https://loyverse.com",
      "description": "Free POS for small retail stores."
    },
    {
      "name": "Clover",
      "url": "https://www.clover.com",
      "description": "POS hardware and software for businesses."
    }
  ],
  "Marketing Automation": [
    {
      "name": "HubSpot",
      "url": "https://www.hubspot.com",
      "description": "Marketing automation with CRM and analytics."
    },
    {
      "name": "Marketo",
      "url": "https://www.adobe.com",
      "description": "Enterprise marketing automation for lead management."
    },
    {
      "name": "ActiveCampaign",
      "url": "https://www.activecampaign.com",
      "description": "Email automation with customer journeys."
    },
    {
      "name": "Mailchimp",
      "url": "https://mailchimp.cttps://www.druva.com",
      "description": "SaaS-based cloud backup and recovery."
    },
    {
      "name": "IDrive",
      "url": "https://www.idrive.com",
      "description": "Cloud backup for PCs, servers, and mobiles."
    },
    {
      "name": "Commvault",
      "url": "https://www.commvault.com",
      "description": "Enterprise data protection and recovery."
    },
    {
      "name": "Rubrik",
      "url": "https://www.rubrik.com",
      "description": "Cloud data management and ransomware recovery."
    },
    {
      "name": "Veritas",
      "url": "https://www.veritas.com",
      "description": "Enterprise backup and data resilience."
    },
    {
      "name": "AWS Backup",
      "url": "https://aws.amazon.com/backup",
      "description": "Managed backup for AWS services."
    },
    {
      "name": "Zoho Marketing Automation",
      "url": "https://www.zoho.com",
      "description": "Marketing suite for campaigns and lead nurturing."
    },
    {
      "name": "Pardot",
      "url": "https://www.salesforce.com",
      "description": "B2B marketing automation for Salesforce users."
    },
    {
      "name": "Sendinblue",
      "url": "https://www.sendinblue.com",
      "description": "Email and SMS marketing automation."
    },
    {
      "name": "Drip",
      "url": "https://www.drip.com",
      "description": "Ecommerce-focused marketing automation."
    },
    {
      "name": "Keap",
      "url": "https://keap.com",
      "description": "CRM with marketing automation for small businesses."
    },
    {
      "name": "ConvertKit",
      "url": "https://convertkit.com",
      "description": "Marketing automation for creators and content businesses."
    }
  ],
  "Email Marketing": [
    {
      "name": "Mailchimp",
      "url": "https://mailchimp.com",
      "description": "Email campaigns with automation, templates, and audience management."
    },
    {
      "name": "Zoho Campaigns",
      "url": "https://www.zoho.com/campaigns",
      "description": "Email marketing for SMBs with Zoho CRM integration."
    },
    {
      "name": "Sendinblue",
      "url": "https://www.sendinblue.com",
      "description": "Email and SMS marketing with transactional messaging."
    },
    {
      "name": "Constant Contact",
      "url": "https://www.constantcontact.com",
      "description": "Simple email marketing for small businesses and nonprofits."
    },
    {
      "name": "GetResponse",
      "url": "https://www.getresponse.com",
      "description": "Email marketing with funnels, landing pages, and automation."
    },
    {
      "name": "ConvertKit",
      "url": "https://convertkit.com",
      "description": "Creator-focused email marketing with audience segmentation."
    },
    {
      "name": "Moosend",
      "url": "https://moosend.com",
      "description": "Marketing automation with advanced email workflows."
    },
    {
      "name": "Campaign Monitor",
      "url": "https://www.campaignmonitor.com",
      "description": "Professional email campaigns with strong design tools."
    },
    {
      "name": "Klaviyo",
      "url": "https://www.klaviyo.com",
      "description": "Ecommerce email and SMS marketing driven by customer data."
    },
    {
      "name": "Benchmark Email",
      "url": "https://www.benchmarkemail.com",
      "description": "Easy-to-use email marketing for small teams."
    }
  ],
  "SEO": [
    {
      "name": "SEMrush",
      "url": "https://www.semrush.com",
      "description": "All-in-one SEO, keyword research, and competitor analysis."
    },
    {
      "name": "Ahrefs",
      "url": "https://ahrefs.com",
      "description": "Powerful backlink analysis and SEO research platform."
    },
    {
      "name": "Moz",
      "url": "https://moz.com",
      "description": "SEO tools for rankings, audits, and insights."
    },
    {
      "name": "Ubersuggest",
      "url": "https://neilpatel.com/ubersuggest",
      "description": "Keyword research and basic SEO analytics."
    },
    {
      "name": "Screaming Frog",
      "url": "https://www.screamingfrog.co.uk",
      "description": "Technical SEO crawler for website audits."
    },
    {
      "name": "Serpstat",
      "url": "https://serpstat.com",
      "description": "SEO and PPC analytics with competitor tracking."
    },
    {
      "name": "SpyFu",
      "url": "https://www.spyfu.com",
      "description": "Competitive SEO and keyword intelligence."
    },
    {
      "name": "KWFinder",
      "url": "https://kwfinder.com",
      "description": "Keyword research tool for SEO planning."
    },
    {
      "name": "Google Search Console",
      "url": "https://search.google.com/search-console",
      "description": "Website performance and SEO monitoring by Google."
    },
    {
      "name": "Yoast SEO",
      "url": "https://yoast.com",
      "description": "WordPress plugin for on-page SEO optimization."
    }
  ],
  "Social Media Management": [
    {
      "name": "Hootsuite",
      "url": "https://www.hootsuite.com",
      "description": "Schedule, manage, and monitor social media channels."
    },
    {
      "name": "Buffer",
      "url": "https://buffer.com",
      "description": "Simple social media publishing and planning tool."
    },
    {
      "name": "Sprout Social",
      "url": "https://sproutsocial.com",
      "description": "Social media analytics, engagement, and reporting."
    },
    {
      "name": "Zoho Social",
      "url": "https://www.zoho.com/social",
      "description": "Social media management integrated with Zoho CRM."
    },
    {
      "name": "Later",
      "url": "https://later.com",
      "description": "Visual content scheduling, mainly for Instagram."
    },
    {
      "name": "SocialPilot",
      "url": "https://www.socialpilot.co",
      "description": "Affordable social media management for teams."
    },
    {
      "name": "Agorapulse",
      "url": "https://www.agorapulse.com",
      "description": "Social inbox, scheduling, and analytics."
    },
    {
      "name": "Loomly",
      "url": "https://www.loomly.com",
      "description": "Content calendar and publishing workflows."
    },
    {
      "name": "Sendible",
      "url": "https://www.sendible.com",
      "description": "Social media management built for agencies."
    },
    {
      "name": "Metricool",
      "url": "https://metricool.com",
      "description": "Social media analytics and performance tracking."
    }
  ],
  "Content Management System (CMS)": [
    {
      "name": "WordPress",
      "url": "https://wordpress.org",
      "description": "Open-source CMS for blogs and business websites."
    },
    {
      "name": "Drupal",
      "url": "https://www.drupal.org",
      "description": "Enterprise-grade CMS for complex content needs."
    },
    {
      "name": "Joomla",
      "url": "https://www.joomla.org",
      "description": "Flexible CMS between WordPress and Drupal."
    },
    {
      "name": "Webflow CMS",
      "url": "https://webflow.com",
      "description": "Visual CMS for designers and marketers."
    },
    {
      "name": "Ghost",
      "url": "https://ghost.org",
      "description": "Publishing platform focused on content creators."
    },
    {
      "name": "Contentful",
      "url": "https://www.contentful.com",
      "description": "Headless CMS for modern applications."
    },
    {
      "name": "Strapi",
      "url": "https://strapi.io",
      "description": "Open-source headless CMS with APIs."
    },
    {
      "name": "Wix CMS",
      "url": "https://www.wix.com",
      "description": "Easy CMS for small business websites."
    },
    {
      "name": "HubSpot CMS",
      "url": "https://www.hubspot.com",
      "description": "CMS tightly integrated with CRM and marketing."
    },
    {
      "name": "Squarespace",
      "url": "https://www.squarespace.com",
      "description": "CMS for visually polished websites."
    }
  ],
  "Website Builder": [
    {
      "name": "Wix",
      "url": "https://www.wix.com",
      "description": "Drag-and-drop website builder for quick setup."
    },
    {
      "name": "Squarespace",
      "url": "https://www.squarespace.com",
      "description": "Design-focused website creation platform."
    },
    {
      "name": "Webflow",
      "url": "https://webflow.com",
      "description": "No-code website builder with full design control."
    },
    {
      "name": "Weebly",
      "url": "https://www.weebly.com",
      "description": "Simple website builder for beginners."
    },
    {
      "name": "Shopify",
      "url": "https://www.shopify.com",
      "description": "Website builder focused on ecommerce."
    },
    {
      "name": "Zyro",
      "url": "https://zyro.com",
      "description": "AI-powered website creation tool."
    },
    {
      "name": "Jimdo",
      "url": "https://www.jimdo.com",
      "description": "Small business website builder."
    },
    {
      "name": "Elementor",
      "url": "https://elementor.com",
      "description": "Visual page builder for WordPress."
    },
    {
      "name": "Carrd",
      "url": "https://carrd.co",
      "description": "One-page websites and landing pages."
    },
    {
      "name": "Duda",
      "url": "https://www.duda.co",
      "description": "Website builder for agencies and teams."
    }
  ],
  "Document Management": [
    {
      "name": "DocuWare",
      "url": "https://www.docuware.com",
      "description": "Document automation and workflow management."
    },
    {
      "name": "M-Files",
      "url": "https://www.m-files.com",
      "description": "Intelligent document organization and search."
    },
    {
      "name": "SharePoint",
      "url": "https://www.microsoft.com/sharepoint",
      "description": "Enterprise document storage and collaboration."
    },
    {
      "name": "Google Drive",
      "url": "https://drive.google.com",
      "description": "Cloud file storage and sharing."
    },
    {
      "name": "Dropbox Business",
      "url": "https://www.dropbox.com/business",
      "description": "Secure file sharing for teams."
    },
    {
      "name": "OpenDocMan",
      "url": "https://www.opendocman.com",
      "description": "Open-source document management system."
    },
    {
      "name": "Alfresco",
      "url": "https://www.alfresco.com",
      "description": "Enterprise content services platform."
    },
    {
      "name": "LogicalDOC",
      "url": "https://www.logicaldoc.com",
      "description": "Document control and versioning."
    },
    {
      "name": "eFileCabinet",
      "url": "https://www.efilecabinet.com",
      "description": "Cloud document storage and workflows."
    },
    {
      "name": "Zoho WorkDrive",
      "url": "https://www.zoho.com/workdrive",
      "description": "Team file management within Zoho suite."
    }
  ],
  "Cloud Storage": [
    {
      "name": "Google Drive",
      "url": "https://drive.google.com",
      "description": "Cloud storage with easy sharing and collaboration."
    },
    {
      "name": "Dropbox",
      "url": "https://www.dropbox.com",
      "description": "File storage and syncing for teams and individuals."
    },
    {
      "name": "OneDrive",
      "url": "https://www.microsoft.com/onedrive",
      "description": "Microsoft cloud storage integrated with Office apps."
    },
    {
      "name": "Box",
      "url": "https://www.box.com",
      "description": "Secure cloud storage for enterprises and compliance needs."
    },
    {
      "name": "iCloud",
      "url": "https://www.apple.com/icloud",
      "description": "Cloud storage for Apple ecosystem users."
    },
    {
      "name": "MEGA",
      "url": "https://mega.io",
      "description": "Encrypted cloud storage with privacy focus."
    },
    {
      "name": "pCloud",
      "url": "https://www.pcloud.com",
      "description": "Secure file storage with lifetime plans."
    },
    {
      "name": "Sync.com",
      "url": "https://www.sync.com",
      "description": "Privacy-first cloud storage with encryption."
    },
    {
      "name": "Tresorit",
      "url": "https://tresorit.com",
      "description": "End-to-end encrypted cloud storage for businesses."
    },
    {
      "name": "Amazon S3",
      "url": "https://aws.amazon.com/s3",
      "description": "Scalable object storage for applications and backups."
    }
  ],
  "Cybersecurity": [
    {
      "name": "Palo Alto Networks",
      "url": "https://www.paloaltonetworks.com",
      "description": "Network security and advanced threat protection."
    },
    {
      "name": "Fortinet",
      "url": "https://www.fortinet.com",
      "description": "Cybersecurity solutions including firewalls and SD-WAN."
    },
    {
      "name": "Cisco Secure",
      "url": "https://www.cisco.com",
      "description": "Enterprise security across network and cloud."
    },
    {
      "name": "CrowdStrike",
      "url": "https://www.crowdstrike.com",
      "description": "Endpoint protection using AI-driven threat detection."
    },
    {
      "name": "Sophos",
      "url": "https://www.sophos.com",
      "description": "Endpoint and network security solutions."
    },
    {
      "name": "Check Point",
      "url": "https://www.checkpoint.com",
      "description": "Cyber defense for networks and cloud."
    },
    {
      "name": "Darktrace",
      "url": "https://www.darktrace.com",
      "description": "AI-based cybersecurity and anomaly detection."
    },
    {
      "name": "Rapid7",
      "url": "https://www.rapid7.com",
      "description": "Vulnerability management and security analytics."
    },
    {
      "name": "Trend Micro",
      "url": "https://www.trendmicro.com",
      "description": "Cloud and endpoint security platform."
    },
    {
      "name": "McAfee",
      "url": "https://www.mcafee.com",
      "description": "Enterprise security and threat protection."
    }
  ],
  "Antivirus": [
    {
      "name": "Quick Heal",
      "url": "https://www.quickheal.com",
      "description": "Antivirus widely used by Indian consumers and SMBs."
    },
    {
      "name": "Kaspersky",
      "url": "https://www.kaspersky.com",
      "description": "Global antivirus with strong malware protection."
    },
    {
      "name": "Avast",
      "url": "https://www.avast.com",
      "description": "Free and paid antivirus for personal use."
    },
    {
      "name": "Bitdefender",
      "url": "https://www.bitdefender.com",
      "description": "Advanced malware and ransomware protection."
    },
    {
      "name": "Norton",
      "url": "https://us.norton.com",
      "description": "Security suite with antivirus and identity protection."
    },
    {
      "name": "AVG",
      "url": "https://www.avg.com",
      "description": "Antivirus with real-time threat protection."
    },
    {
      "name": "ESET",
      "url": "https://www.eset.com",
      "description": "Endpoint security for businesses."
    },
    {
      "name": "McAfee Antivirus",
      "url": "https://www.mcafee.com",
      "description": "Virus protection for devices and systems."
    },
    {
      "name": "Sophos Home",
      "url": "https://home.sophos.com",
      "description": "Home antivirus with parental controls."
    },
    {
      "name": "Microsoft Defender",
      "url": "https://www.microsoft.com",
      "description": "Built-in antivirus for Windows devices."
    }
  ],
  "Backup & Recovery": [
    {
      "name": "Veeam",
      "url": "https://www.veeam.com",
      "description": "Backup and recovery for virtual and cloud systems."
    },
    {
      "name": "Acronis",
      "url": "https://www.acronis.com",
      "description": "Cyber protection with backup and security."
    },
    {
      "name": "Carbonite",
      "url": "https://www.carbonite.com",
      "description": "Cloud backup for businesses and individuals."
    },
    {
      "name": "Backblaze",
      "url": "https://www.backblaze.com",
      "description": "Simple online backup for endpoints."
    },
    {
      "name": "Druva",
      "url": "https://www.druva.com",
      "description": "SaaS-based cloud backup and recovery."
    },
    {
      "name": "IDrive",
      "url": "https://www.idrive.com",
      "description": "Cloud backup for PCs, servers, and mobiles."
    },
    {
      "name": "Commvault",
      "url": "https://www.commvault.com",
      "description": "Enterprise data protection and recovery."
    },
    {
      "name": "Rubrik",
      "url": "https://www.rubrik.com",
      "description": "Cloud data management and ransomware recovery."
    },
    {
      "name": "Veritas",
      "url": "https://www.veritas.com",
      "description": "Enterprise backup and data resilience."
    },
    {
      "name": "AWS Backup",
      "url": "https://aws.amazon.com/backup",
      "description": "Managed backup for AWS services."
    }
  ],
  "Business Intelligence (BI)": [
    {
      "name": "Power BI",
      "url": "https://powerbi.microsoft.com",
      "description": "Business analytics with dashboards and Microsoft integration."
    },
    {
      "name": "Tableau",
      "url": "https://www.tableau.com",
      "description": "Data visualization for deep analytical insights."
    },
    {
      "name": "Looker",
      "url": "https://looker.com",
      "description": "BI and analytics built on modern data models."
    },
    {
      "name": "Qlik Sense",
      "url": "https://www.qlik.com",
      "description": "Interactive data analytics and discovery."
    },
    {
      "name": "Zoho Analytics",
      "url": "https://www.zoho.com/analytics",
      "description": "BI and reporting for SMBs and Zoho users."
    },
    {
      "name": "Sisense",
      "url": "https://www.sisense.com",
      "description": "Embedded analytics for applications."
    },
    {
      "name": "Domo",
      "url": "https://www.domo.com",
      "description": "Cloud BI with real-time business insights."
    },
    {
      "name": "MicroStrategy",
      "url": "https://www.microstrategy.com",
      "description": "Enterprise BI and analytics platform."
    },
    {
      "name": "SAP Analytics Cloud",
      "url": "https://www.sap.com",
      "description": "BI, planning, and predictive analytics."
    },
    {
      "name": "Yellowfin",
      "url": "https://www.yellowfinbi.com",
      "description": "Analytics with storytelling and dashboards."
    }
  ],
  "Low-Code / No-Code Platforms": [
    {
      "name": "Zoho Creator",
      "url": "https://www.zoho.com/creator",
      "description": "Low-code platform for building business apps."
    },
    {
      "name": "Bubble",
      "url": "https://bubble.io",
      "description": "No-code app builder for web applications."
    },
    {
      "name": "OutSystems",
      "url": "https://www.outsystems.com",
      "description": "Enterprise low-code application development."
    },
    {
      "name": "Mendix",
      "url": "https://www.mendix.com",
      "description": "Low-code platform for scalable apps."
    },
    {
      "name": "Appgyver",
      "url": "https://www.appgyver.com",
      "description": "No-code apps for mobile and web."
    },
    {
      "name": "Glide",
      "url": "https://www.glideapps.com",
      "description": "App builder using spreadsheets as backend."
    },
    {
      "name": "Retool",
      "url": "https://retool.com",
      "description": "Internal tools built quickly with low-code."
    },
    {
      "name": "Power Apps",
      "url": "https://powerapps.microsoft.com",
      "description": "Microsoft low-code apps for business workflows."
    },
    {
      "name": "Betty Blocks",
      "url": "https://www.bettyblocks.com",
      "description": "No-code platform for enterprise apps."
    },
    {
      "name": "Appian",
      "url": "https://www.appian.com",
      "description": "Low-code automation and process apps."
    }
  ],
  "Workflow Automation": [
    {
      "name": "Zapier",
      "url": "https://zapier.com",
      "description": "App automation connecting thousands of tools."
    },
    {
      "name": "Kissflow",
      "url": "https://kissflow.com",
      "description": "Workflow automation for business processes."
    },
    {
      "name": "Make",
      "url": "https://www.make.com",
      "description": "Visual automation for complex workflows."
    },
    {
      "name": "Nintex",
      "url": "https://www.nintex.com",
      "description": "Process automation and document workflows."
    },
    {
      "name": "Zoho Flow",
      "url": "https://www.zoho.com/flow",
      "description": "Workflow automation within Zoho ecosystem."
    },
    {
      "name": "ProcessMaker",
      "url": "https://www.processmaker.com",
      "description": "Business process management and workflows."
    },
    {
      "name": "Pipefy",
      "url": "https://www.pipefy.com",
      "description": "Workflow management for operations teams."
    },
    {
      "name": "Workato",
      "url": "https://www.workato.com",
      "description": "Enterprise automation and integrations."
    },
    {
      "name": "Integrately",
      "url": "https://integrately.com",
      "description": "One-click automation between apps."
    },
    {
      "name": "IBM Automation",
      "url": "https://www.ibm.com",
      "description": "Enterprise workflow and automation tools."
    }
  ],
  "RPA": [
    {
      "name": "UiPath",
      "url": "https://www.uipath.com",
      "description": "Robotic process automation for enterprise workflows."
    },
    {
      "name": "Automation Anywhere",
      "url": "https://www.automationanywhere.com",
      "description": "Cloud-native RPA platform."
    },
    {
      "name": "Blue Prism",
      "url": "https://www.blueprism.com",
      "description": "Enterprise-grade robotic automation."
    },
    {
      "name": "Pega",
      "url": "https://www.pega.com",
      "description": "Automation combined with decision management."
    },
    {
      "name": "WorkFusion",
      "url": "https://www.workfusion.com",
      "description": "Intelligent automation using AI and RPA."
    },
    {
      "name": "Microsoft Power Automate",
      "url": "https://powerautomate.microsoft.com",
      "description": "RPA and workflow automation from Microsoft."
    },
    {
      "name": "NICE RPA",
      "url": "https://www.nice.com",
      "description": "Automation solutions for operations teams."
    },
    {
      "name": "AntWorks",
      "url": "https://www.ant.works",
      "description": "AI-powered document and process automation."
    },
    {
      "name": "Kryon",
      "url": "https://www.kryon.com",
      "description": "Process discovery and automation."
    },
    {
      "name": "Redwood",
      "url": "https://www.redwood.com",
      "description": "Automation for IT and business processes."
    }
  ],
  "Field Service Management": [
    {
      "name": "ServiceNow FSM",
      "url": "https://www.servicenow.com",
      "description": "Enterprise field service and operations management."
    },
    {
      "name": "Zoho FSM",
      "url": "https://www.zoho.com/fsm",
      "description": "Field service automation for scheduling and invoicing."
    },
    {
      "name": "Salesforce Field Service",
      "url": "https://www.salesforce.com",
      "description": "Field service management within CRM."
    },
    {
      "name": "Freshservice",
      "url": "https://www.freshworks.com/freshservice",
      "description": "IT service and field operations management."
    },
    {
      "name": "Jobber",
      "url": "https://getjobber.com",
      "description": "FSM for small service businesses."
    },
    {
      "name": "Housecall Pro",
      "url": "https://www.housecallpro.com",
      "description": "Home service scheduling and billing."
    },
    {
      "name": "ServiceTitan",
      "url": "https://www.servicetitan.com",
      "description": "Field service for trade and contractor businesses."
    },
    {
      "name": "Skedulo",
      "url": "https://www.skedulo.com",
      "description": "Mobile workforce scheduling."
    },
    {
      "name": "FieldAware",
      "url": "https://www.fieldaware.com",
      "description": "Field service execution platform."
    },
    {
      "name": "Oracle FSM",
      "url": "https://www.oracle.com",
      "description": "Enterprise field service suite."
    }
  ],
  "Asset Management": [
    {
      "name": "ManageEngine AssetExplorer",
      "url": "https://www.manageengine.com",
      "description": "IT asset tracking with lifecycle and compliance management."
    },
    {
      "name": "Freshservice",
      "url": "https://www.freshworks.com",
      "description": "Asset management integrated with IT service management."
    },
    {
      "name": "ServiceNow Asset",
      "url": "https://www.servicenow.com",
      "description": "Enterprise asset lifecycle and configuration management."
    },
    {
      "name": "Asset Panda",
      "url": "https://www.assetpanda.com",
      "description": "Cloud-based asset tracking with mobile access."
    },
    {
      "name": "Snipe-IT",
      "url": "https://snipeitapp.com",
      "description": "Open-source asset management for IT teams."
    },
    {
      "name": "EZOfficeInventory",
      "url": "https://www.ezofficeinventory.com",
      "description": "Asset tracking with maintenance and audits."
    },
    {
      "name": "Ivanti",
      "url": "https://www.ivanti.com",
      "description": "IT asset management and endpoint security."
    },
    {
      "name": "BMC Helix",
      "url": "https://www.bmc.com",
      "description": "Asset and IT service management for enterprises."
    },
    {
      "name": "Lansweeper",
      "url": "https://www.lansweeper.com",
      "description": "Network asset discovery and inventory."
    },
    {
      "name": "UpKeep",
      "url": "https://www.onupkeep.com",
      "description": "Asset maintenance and CMMS platform."
    }
  ],
  "Facility Management": [
    {
      "name": "IBM Maximo",
      "url": "https://www.ibm.com",
      "description": "Enterprise facility and asset management system."
    },
    {
      "name": "FMX",
      "url": "https://www.gofmx.com",
      "description": "Facilities and maintenance management platform."
    },
    {
      "name": "Hippo CMMS",
      "url": "https://www.hippocmms.com",
      "description": "Facility maintenance and work order tracking."
    },
    {
      "name": "Archibus",
      "url": "https://www.archibus.com",
      "description": "Real estate and facility management software."
    },
    {
      "name": "Planon",
      "url": "https://planonsoftware.com",
      "description": "Integrated workplace and facility management."
    },
    {
      "name": "Facilio",
      "url": "https://facilio.com",
      "description": "Smart facility management with IoT integration."
    },
    {
      "name": "eMaint",
      "url": "https://www.emaint.com",
      "description": "CMMS for maintenance and facility operations."
    },
    {
      "name": "Fiix",
      "url": "https://www.fiixsoftware.com",
      "description": "Maintenance management for assets and facilities."
    },
    {
      "name": "iOffice",
      "url": "https://www.iofficecorp.com",
      "description": "Workplace and space management platform."
    },
    {
      "name": "Maintenance Care",
      "url": "https://www.maintenancecare.com",
      "description": "CMMS for facilities and maintenance teams."
    }
  ],
  "Visitor Management": [
    {
      "name": "Envoy",
      "url": "https://envoy.com",
      "description": "Visitor sign-in and workplace experience."
    },
    {
      "name": "Vizitor",
      "url": "https://www.vizitorapp.com",
      "description": "Visitor tracking for offices."
    },
    {
      "name": "Proxyclick",
      "url": "https://www.proxyclick.com",
      "description": "Visitor management with security compliance."
    },
    {
      "name": "iLobby",
      "url": "https://www.ilobby.com",
      "description": "Enterprise visitor and security management."
    },
    {
      "name": "Lobbytrack",
      "url": "https://www.lobbytrack.com",
      "description": "Visitor logs and access tracking."
    },
    {
      "name": "Visitly",
      "url": "https://visitly.io",
      "description": "Visitor management for schools and offices."
    },
    {
      "name": "Traction Guest",
      "url": "https://tractionguest.com",
      "description": "Visitor security and compliance platform."
    },
    {
      "name": "Greetly",
      "url": "https://www.greetly.com",
      "description": "Reception and visitor automation."
    },
    {
      "name": "SwipedOn",
      "url": "https://www.swipedon.com",
      "description": "Visitor and employee sign-in management."
    },
    {
      "name": "VizMan",
      "url": "https://www.vizman.com",
      "description": "Visitor management for organizations."
    }
  ],
  "Learning Management Software (LMS)": [
    {
      "name": "Moodle",
      "url": "https://moodle.org",
      "description": "Open-source learning management system."
    },
    {
      "name": "TalentLMS",
      "url": "https://www.talentlms.com",
      "description": "Corporate LMS for employee training."
    },
    {
      "name": "Docebo",
      "url": "https://www.docebo.com",
      "description": "Enterprise learning and training platform."
    },
    {
      "name": "SAP Litmos",
      "url": "https://www.litmos.com",
      "description": "Online training and compliance learning."
    },
    {
      "name": "iSpring Learn",
      "url": "https://www.ispringsolutions.com",
      "description": "LMS with authoring tools."
    },
    {
      "name": "LearnUpon",
      "url": "https://www.learnupon.com",
      "description": "Corporate training and onboarding LMS."
    },
    {
      "name": "Absorb LMS",
      "url": "https://www.absorblms.com",
      "description": "Learning platform for employee development."
    },
    {
      "name": "Canvas",
      "url": "https://www.instructure.com",
      "description": "Education-focused LMS for institutions."
    },
    {
      "name": "Blackboard",
      "url": "https://www.blackboard.com",
      "description": "Academic learning management system."
    },
    {
      "name": "Zoho Learn",
      "url": "https://www.zoho.com/learn",
      "description": "Knowledge management and LMS for teams."
    }
  ],
  "Survey & Feedback": [
    {
      "name": "SurveyMonkey",
      "url": "https://www.surveymonkey.com",
      "description": "Online surveys and data analysis."
    },
    {
      "name": "Typeform",
      "url": "https://www.typeform.com",
      "description": "Conversational surveys and forms."
    },
    {
      "name": "Zoho Survey",
      "url": "https://www.zoho.com/survey",
      "description": "Online surveys with Zoho integration."
    },
    {
      "name": "SurveySparrow",
      "url": "https://surveysparrow.com",
      "description": "Experience and feedback surveys."
    },
    {
      "name": "Qualtrics",
      "url": "https://www.qualtrics.com",
      "description": "Enterprise experience and feedback management."
    },
    {
      "name": "Google Forms",
      "url": "https://forms.google.com",
      "description": "Free surveys and form creation."
    },
    {
      "name": "Jotform",
      "url": "https://www.jotform.com",
      "description": "Online forms and data collection."
    },
    {
      "name": "Alchemer",
      "url": "https://www.alchemer.com",
      "description": "Feedback and survey analytics platform."
    },
    {
      "name": "Formstack",
      "url": "https://www.formstack.com",
      "description": "Forms, surveys, and workflows."
    },
    {
      "name": "QuestionPro",
      "url": "https://www.questionpro.com",
      "description": "Research-grade survey platform."
    }
  ],
  "Chatbot": [
    {
      "name": "Drift",
      "url": "https://www.drift.com",
      "description": "Conversational marketing chatbots for sales and lead conversion."
    },
    {
      "name": "Intercom",
      "url": "https://www.intercom.com",
      "description": "Customer messaging with chatbots and automation."
    },
    {
      "name": "Tidio",
      "url": "https://www.tidio.com",
      "description": "AI chatbot with live chat for small businesses."
    },
    {
      "name": "Botpress",
      "url": "https://botpress.com",
      "description": "Developer-friendly platform to build custom chatbots."
    },
    {
      "name": "ManyChat",
      "url": "https://manychat.com",
      "description": "Chatbots for Messenger and social platforms."
    },
    {
      "name": "Freshchat",
      "url": "https://www.freshworks.com",
      "description": "Chat automation for customer support teams."
    },
    {
      "name": "Landbot",
      "url": "https://landbot.io",
      "description": "No-code chatbot builder for websites."
    },
    {
      "name": "Chatfuel",
      "url": "https://chatfuel.com",
      "description": "Facebook and Instagram chatbot platform."
    },
    {
      "name": "Ada",
      "url": "https://www.ada.cx",
      "description": "AI-powered customer support chatbots."
    },
    {
      "name": "Yellow.ai",
      "url": "https://yellow.ai",
      "description": "Enterprise AI bots for customer experience."
    }
  ],
  "Live Chat": [
    {
      "name": "LiveChat",
      "url": "https://www.livechat.com",
      "description": "Website live chat for sales and support."
    },
    {
      "name": "Tawk.to",
      "url": "https://www.tawk.to",
      "description": "Free live chat for websites."
    },
    {
      "name": "Freshchat",
      "url": "https://www.freshworks.com",
      "description": "Live chat with automation and bots."
    },
    {
      "name": "Olark",
      "url": "https://www.olark.com",
      "description": "Live chat focused on sales conversations."
    },
    {
      "name": "Crisp",
      "url": "https://crisp.chat",
      "description": "Customer messaging with chat and inbox."
    },
    {
      "name": "Zendesk Chat",
      "url": "https://www.zendesk.com",
      "description": "Live chat integrated with Zendesk support."
    },
    {
      "name": "Intercom Chat",
      "url": "https://www.intercom.com",
      "description": "Messaging platform for customer engagement."
    },
    {
      "name": "Smartsupp",
      "url": "https://www.smartsupp.com",
      "description": "Live chat with visitor tracking."
    },
    {
      "name": "Pure Chat",
      "url": "https://www.purechat.com",
      "description": "Simple live chat for small teams."
    },
    {
      "name": "Chaport",
      "url": "https://www.chaport.com",
      "description": "Multichannel live chat solution."
    }
  ],
  "VoIP": [
    {
      "name": "RingCentral",
      "url": "https://www.ringcentral.com",
      "description": "Cloud phone system for businesses."
    },
    {
      "name": "8x8",
      "url": "https://www.8x8.com",
      "description": "Business VoIP and communications platform."
    },
    {
      "name": "Vonage",
      "url": "https://www.vonage.com",
      "description": "Cloud communications and calling services."
    },
    {
      "name": "Aircall",
      "url": "https://aircall.io",
      "description": "VoIP for sales and support teams."
    },
    {
      "name": "Dialpad",
      "url": "https://www.dialpad.com",
      "description": "AI-powered voice and calling platform."
    },
    {
      "name": "Nextiva",
      "url": "https://www.nextiva.com",
      "description": "Business VoIP with CRM features."
    },
    {
      "name": "Grasshopper",
      "url": "https://grasshopper.com",
      "description": "Virtual phone system for small businesses."
    },
    {
      "name": "Ooma",
      "url": "https://www.ooma.com",
      "description": "Business calling and VoIP services."
    },
    {
      "name": "Ringover",
      "url": "https://www.ringover.com",
      "description": "Cloud telephony for teams."
    },
    {
      "name": "JustCall",
      "url": "https://justcall.io",
      "description": "Sales calling and SMS platform."
    }
  ],
  "Call Center": [
    {
      "name": "Freshcaller",
      "url": "https://www.freshworks.com",
      "description": "Cloud call center for support teams."
    },
    {
      "name": "Five9",
      "url": "https://www.five9.com",
      "description": "Enterprise cloud contact center."
    },
    {
      "name": "Genesys",
      "url": "https://www.genesys.com",
      "description": "Customer experience and call center platform."
    },
    {
      "name": "Talkdesk",
      "url": "https://www.talkdesk.com",
      "description": "Cloud contact center with automation."
    },
    {
      "name": "NICE CXone",
      "url": "https://www.nice.com",
      "description": "Call center suite for large enterprises."
    },
    {
      "name": "Aircall",
      "url": "https://aircall.io",
      "description": "Cloud call center for inbound and outbound calls."
    },
    {
      "name": "CloudTalk",
      "url": "https://www.cloudtalk.io",
      "description": "VoIP-based call center software."
    },
    {
      "name": "RingCentral Contact Center",
      "url": "https://www.ringcentral.com",
      "description": "Contact center within RingCentral suite."
    },
    {
      "name": "DialerHQ",
      "url": "https://dialerhq.com",
      "description": "Call center dialer software."
    },
    {
      "name": "Ameyo",
      "url": "https://www.ameyo.com",
      "description": "Omnichannel contact center platform."
    }
  ],
  "Logistics Management": [
    {
      "name": "FarEye",
      "url": "https://fareye.com",
      "description": "Logistics automation and last-mile delivery."
    },
    {
      "name": "Locus",
      "url": "https://locus.sh",
      "description": "Route optimization and logistics planning."
    },
    {
      "name": "Shiprocket",
      "url": "https://www.shiprocket.in",
      "description": "Ecommerce shipping and logistics platform."
    },
    {
      "name": "Easyship",
      "url": "https://www.easyship.com",
      "description": "Global shipping and fulfillment software."
    },
    {
      "name": "SAP Logistics",
      "url": "https://www.sap.com",
      "description": "Enterprise logistics and supply chain management."
    },
    {
      "name": "Oracle Logistics",
      "url": "https://www.oracle.com",
      "description": "Logistics and transportation management suite."
    },
    {
      "name": "ShipBob",
      "url": "https://www.shipbob.com",
      "description": "Ecommerce fulfillment and warehousing."
    },
    {
      "name": "LogiNext",
      "url": "https://loginextsolutions.com",
      "description": "Logistics intelligence and tracking."
    },
    {
      "name": "Fleetx",
      "url": "https://www.fleetx.io",
      "description": "Logistics visibility and fleet analytics."
    },
    {
      "name": "Descartes",
      "url": "https://www.descartes.com",
      "description": "Supply chain and logistics solutions."
    }
  ],
  "Fleet Management": [
    {
      "name": "Samsara",
      "url": "https://www.samsara.com",
      "description": "Fleet tracking"
    },
    {
      "name": "Fleet Complete",
      "url": "https://www.fleetcomplete.com",
      "description": "Vehicle management"
    },
    {
      "name": "Verizon Connect",
      "url": "https://www.verizonconnect.com",
      "description": "GPS tracking"
    },
    {
      "name": "Wheels",
      "url": "https://www.wheels.com",
      "description": "Fleet services"
    },
    {
      "name": "Teletrac Navman",
      "url": "https://www.teletracnavman.com",
      "description": "GPS fleet mgmt"
    },
    {
      "name": "Geotab",
      "url": "https://www.geotab.com",
      "description": "Fleet analytics"
    },
    {
      "name": "Fleetio",
      "url": "https://www.fleetio.com",
      "description": "Fleet operations"
    },
    {
      "name": "Azuga",
      "url": "https://www.azuga.com",
      "description": "Fleet safety"
    },
    {
      "name": "Omnitracs",
      "url": "https://www.omnitracs.com",
      "description": "Fleet intelligence"
    },
    {
      "name": "GPS Trackit",
      "url": "https://www.gpstrackit.com",
      "description": "Fleet GPS"
    }
  ],
  "Manufacturing": [
    {
      "name": "Katana",
      "url": "https://katanamrp.com",
      "description": "Manufacturing ERP"
    },
    {
      "name": "Odoo Manufacturing",
      "url": "https://www.odoo.com",
      "description": "Manufacturing module"
    },
    {
      "name": "Fishbowl Manufacturing",
      "url": "https://www.fishbowlinventory.com",
      "description": "Manufacturing inventory"
    },
    {
      "name": "Epicor",
      "url": "https://www.epicor.com",
      "description": "Manufacturing ERP"
    },
    {
      "name": "Plex",
      "url": "https://www.plex.com",
      "description": "Smart manufacturing"
    },
    {
      "name": "NetSuite Manufacturing",
      "url": "https://www.netsuite.com",
      "description": "Manufacturing ERP"
    },
    {
      "name": "JobBOSS",
      "url": "https://www.jobboss.com",
      "description": "Job shop software"
    },
    {
      "name": "MRPeasy",
      "url": "https://www.mrpeasy.com",
      "description": "Manufacturing planning"
    },
    {
      "name": "SAP Manufacturing",
      "url": "https://www.sap.com",
      "description": "Manufacturing suite"
    },
    {
      "name": "Deskera Manufacturing",
      "url": "https://www.deskera.com",
      "description": "Manufacturing ERP"
    }
  ],
  "Healthcare Management": [
    {
      "name": "Practo",
      "url": "https://www.practo.com",
      "description": "Healthcare platform"
    },
    {
      "name": "Kareo",
      "url": "https://www.kareo.com",
      "description": "Medical practice mgmt"
    },
    {
      "name": "Athenahealth",
      "url": "https://www.athenahealth.com",
      "description": "Healthcare IT"
    },
    {
      "name": "eClinicalWorks",
      "url": "https://www.eclinicalworks.com",
      "description": "EHR software"
    },
    {
      "name": "NextGen",
      "url": "https://www.nextgen.com",
      "description": "Healthcare solutions"
    },
    {
      "name": "AdvancedMD",
      "url": "https://www.advancedmd.com",
      "description": "Practice mgmt"
    },
    {
      "name": "DrChrono",
      "url": "https://www.drchrono.com",
      "description": "EHR & billing"
    },
    {
      "name": "Cerner",
      "url": "https://www.cerner.com",
      "description": "Hospital software"
    },
    {
      "name": "Allscripts",
      "url": "https://www.allscripts.com",
      "description": "Healthcare IT"
    },
    {
      "name": "CareCloud",
      "url": "https://www.carecloud.com",
      "description": "Practice mgmt"
    }
  ],
  "Education / School Management": [
    {
      "name": "Fedena",
      "url": "https://fedena.com",
      "description": "School ERP"
    },
    {
      "name": "Teachmint",
      "url": "https://www.teachmint.com",
      "description": "School management"
    },
    {
      "name": "OpenSIS",
      "url": "https://www.opensis.com",
      "description": "Student information system"
    },
    {
      "name": "PowerSchool",
      "url": "https://www.powerschool.com",
      "description": "Education software"
    },
    {
      "name": "Ellucian",
      "url": "https://www.ellucian.com",
      "description": "Higher education ERP"
    },
    {
      "name": "Blackbaud",
      "url": "https://www.blackbaud.com",
      "description": "Education management"
    },
    {
      "name": "ThinkWave",
      "url": "https://www.thinkwave.com",
      "description": "School admin"
    },
    {
      "name": "Schoology",
      "url": "https://www.schoology.com",
      "description": "Learning platform"
    },
    {
      "name": "Classter",
      "url": "https://www.classter.com",
      "description": "School ERP"
    },
    {
      "name": "MyClassCampus",
      "url": "https://www.myclasscampus.com",
      "description": "School software"
    }
  ],
  "Compliance & Risk Management": [
    {
      "name": "LogicGate",
      "url": "https://www.logicgate.com",
      "description": "Risk & compliance"
    },
    {
      "name": "NAVEX",
      "url": "https://www.navex.com",
      "description": "Compliance software"
    },
    {
      "name": "MetricStream",
      "url": "https://www.metricstream.com",
      "description": "GRC platform"
    },
    {
      "name": "Riskonnect",
      "url": "https://riskonnect.com",
      "description": "Risk management"
    },
    {
      "name": "ZenGRC",
      "url": "https://www.zengrc.com",
      "description": "GRC software"
    },
    {
      "name": "RSA Archer",
      "url": "https://www.rsa.com",
      "description": "Governance & risk"
    },
    {
      "name": "SAI360",
      "url": "https://www.sai360.com",
      "description": "Risk & compliance"
    },
    {
      "name": "Diligent",
      "url": "https://www.diligent.com",
      "description": "Governance platform"
    },
    {
      "name": "Hyperproof",
      "url": "https://hyperproof.io",
      "description": "Compliance automation"
    },
    {
      "name": "OneTrust",
      "url": "https://www.onetrust.com",
      "description": "Privacy & compliance"
    }
  ]
};

export const getCategories = (): string[] => {
  return Object.keys(catalogData);
};

export const getVendorsForCategory = (category: string): Vendor[] => {
  return catalogData[category] || [];
};

export const getAllVendors = (): Vendor[] => {
  const allVendors: Vendor[] = [];
  Object.values(catalogData).forEach(vendors => {
    allVendors.push(...vendors);
  });
  return allVendors;
};

export interface VendorWithCategory extends Vendor {
  category: string;
}

export const getAllVendorsWithCategory = (): VendorWithCategory[] => {
  const allVendors: VendorWithCategory[] = [];
  Object.entries(catalogData).forEach(([category, vendors]) => {
    vendors.forEach(vendor => {
      allVendors.push({ ...vendor, category });
    });
  });
  return allVendors;
};

export const getVendorDetailById = (id: string): Vendor | undefined => {
  const allVendors = getAllVendors();
  return allVendors.find(v => v.name.toLowerCase().replace(/\s+/g, '-') === id);
};