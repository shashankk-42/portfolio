# 🚀 TaskForge - Decentralized GPU Marketplace

**TaskForge** is a peer-to-peer GPU rental marketplace that connects ML researchers and developers (borrowers) who need computational power with GPU owners (lenders) who want to monetize their idle hardware. The platform features an off-chain credits system with automated escrow payments and a 70/30 revenue split.

---

## 📋 Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Features](#features)
- [Project Structure](#project-structure)
- [Backend Documentation](#backend-documentation)
- [Frontend Documentation](#frontend-documentation)
- [Database Schema](#database-schema)
- [API Documentation](#api-documentation)
- [Credits & Escrow System](#credits--escrow-system)
- [Revenue Model](#revenue-model)
- [Installation & Setup](#installation--setup)
- [Usage Guide](#usage-guide)
- [Docker Support](#docker-support)
- [Future Roadmap](#future-roadmap)

---

## 🎯 Overview

TaskForge solves the problem of expensive and inaccessible GPU resources for ML training by creating a decentralized marketplace where:

- **Borrowers** can submit ML training jobs and rent GPUs at competitive rates
- **Lenders** can monetize their idle GPUs by accepting training jobs
- **TaskForge** facilitates secure transactions with automated escrow and takes a 30% platform fee

### Key Differentiators
- **Off-chain credits system** (1 credit = 1 rupee)
- **Automated escrow** with instant payment release
- **70/30 revenue split** (lenders get 70%, platform keeps 30%)
- **Time-based pricing** (credits per minute)
- **Docker containerization** for secure job execution
- **Real-time job tracking** with status updates

---

## 🛠️ Tech Stack

### Backend
- **Runtime**: Node.js v22.x
- **Framework**: Express.js v4.21.2
- **File Upload**: Multer v1.4.5-lts.1
- **Unique IDs**: UUID v11.0.3
- **CORS**: cors v2.8.5
- **Data Storage**: JSON files (local filesystem)

### Frontend
- **HTML5** with semantic markup
- **CSS3** with custom properties (CSS variables)
- **Vanilla JavaScript** (ES6+)
- **Font**: Google Fonts - Orbitron
- **Design**: Responsive, mobile-first approach

### DevOps
- **Containerization**: Docker
- **Python Client**: Python 3.x with requests library
- **Process Management**: PM2 (recommended for production)

### Data Storage
- **Jobs**: `jobs.json`
- **Lenders**: `lenders.json`
- **Wallets**: `wallets.json`
- **Transactions**: `transactions.json`
- **Uploads**: `uploads/` directory
- **Results**: `results/` directory

---

## 🏗️ Architecture

### System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                         FRONTEND                            │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐   │
│  │  Home    │  │Marketplace│  │ Borrower │  │  Lender  │   │
│  │  Page    │  │   Page    │  │   Page   │  │   Page   │   │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘   │
│       │              │              │              │         │
│       └──────────────┴──────────────┴──────────────┘         │
│                         │                                    │
│                    Fetch API                                 │
└─────────────────────────┼────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────────┐
│                    EXPRESS.JS SERVER                        │
│  ┌────────────────────────────────────────────────────┐    │
│  │                  API Endpoints                      │    │
│  │  /api/jobs          /api/marketplace               │    │
│  │  /api/lenders       /api/wallet                    │    │
│  └────────────────────────────────────────────────────┘    │
│                          │                                   │
│  ┌────────────────────────────────────────────────────┐    │
│  │              Business Logic Layer                   │    │
│  │  • Job Management    • Escrow System               │    │
│  │  • Wallet Operations • Revenue Split (70/30)       │    │
│  │  • File Handling     • Transaction Logging         │    │
│  └────────────────────────────────────────────────────┘    │
└─────────────────────────┼────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────────┐
│                   DATA PERSISTENCE                          │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐   │
│  │ jobs.json│  │lenders   │  │ wallets  │  │transactions│  │
│  │          │  │  .json   │  │  .json   │  │   .json    │  │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘   │
│                                                             │
│  ┌──────────────────┐  ┌──────────────────┐               │
│  │   uploads/       │  │    results/      │               │
│  │  (train.zip)     │  │  (output files)  │               │
│  └──────────────────┘  └──────────────────┘               │
└─────────────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────────┐
│                   LENDER CLIENTS                            │
│  ┌────────────────────────────────────────────────────┐    │
│  │  Python Client (lender_client.py)                  │    │
│  │  • Polls for jobs                                  │    │
│  │  • Executes in Docker container                    │    │
│  │  • Uploads results                                 │    │
│  └────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────┘
```

### Data Flow

#### Job Submission Flow
```
1. Borrower selects GPU from marketplace
2. Enters job details + uploads train.zip
3. System calculates cost (perMinute × estimatedMinutes)
4. Checks borrower's wallet balance
5. Locks credits in escrow
6. Creates job with status "pending"
7. Returns success with creditsLocked amount
```

#### Job Execution Flow
```
1. Lender client polls /api/jobs/pending
2. Accepts job (status → "in-progress")
3. Downloads train.zip
4. Executes training in Docker container
5. Uploads results
6. System releases escrow:
   - 70% to lender's balance
   - 30% to TaskForge platform fee
7. Job status → "completed"
```

---

## ✨ Features

### Core Features
- ✅ **GPU Marketplace** - Browse available GPUs with specs, pricing, and ratings
- ✅ **Job Management** - Submit, track, and download results for ML training jobs
- ✅ **Wallet System** - Off-chain credits (1 credit = 1 rupee)
- ✅ **Escrow Payments** - Automated lock/release with 70/30 split
- ✅ **Transaction History** - Complete audit trail of all credit movements
- ✅ **Lender Dashboard** - Accept jobs, track earnings, view statistics
- ✅ **Docker Execution** - Secure, isolated job execution environment
- ✅ **File Management** - Upload train.zip, download results
- ✅ **Real-time Updates** - Auto-refresh job lists and status

### Advanced Features
- ✅ **Time-based Pricing** - Lenders set per-minute rates
- ✅ **Cost Preview** - See estimated cost before job submission
- ✅ **Balance Warnings** - Insufficient credits alerts
- ✅ **Platform Fees** - Automatic 30% commission on all transactions
- ✅ **Marketplace Filters** - Search by GPU, VRAM, OS, availability
- ✅ **Lender Ratings** - Star ratings and job completion stats
- ✅ **Responsive Design** - Works on desktop, tablet, and mobile

---

## 📁 Project Structure

```
taskforge/
├── server.js                      # Main Express server (843 lines)
├── package.json                   # Node.js dependencies
├── package-lock.json              # Dependency lock file
│
├── patent-temp-fronted/           # Frontend directory
│   ├── home.html                  # Landing page
│   ├── marketplace.html           # GPU marketplace listing
│   ├── borrower.html              # Job submission & tracking
│   ├── lender.html                # Lender dashboard
│   └── wallet.html                # Wallet management page
│
├── lender_client.py               # Python client for lenders (Docker)
├── lender_client_simple.py        # Simplified Python client
├── lender_client_docker.py        # Docker-specific client
│
├── Dockerfile                     # Docker image for job execution
├── entrypoint.sh                  # Docker container entry point
├── build-docker.ps1               # PowerShell script to build image
│
├── jobs.json                      # Job database
├── lenders.json                   # Lender registry
├── wallets.json                   # User wallet balances
├── transactions.json              # Transaction history
│
├── uploads/                       # Uploaded train.zip files
├── results/                       # Job output files
│
├── example_train.py               # Sample training script
├── requirements.txt               # Python dependencies
├── QUICKSTART.md                  # Quick start guide
└── README.md                      # This file
```

---

## 🔧 Backend Documentation

### server.js (843 lines)

The main Express.js server handling all API endpoints and business logic.

#### Key Sections

**1. Dependencies & Configuration (Lines 1-40)**
```javascript
const express = require('express');
const multer = require('multer');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
```

**2. Data File Paths (Lines 14-20)**
```javascript
const JOBS_FILE = path.join(__dirname, 'jobs.json');
const LENDERS_FILE = path.join(__dirname, 'lenders.json');
const WALLETS_FILE = path.join(__dirname, 'wallets.json');
const TRANSACTIONS_FILE = path.join(__dirname, 'transactions.json');
```

**3. Helper Functions (Lines 63-240)**

| Function | Purpose | Lines |
|----------|---------|-------|
| `readWallets()` | Load wallets from JSON | 63-73 |
| `writeWallets()` | Save wallets to JSON | 75-85 |
| `readTransactions()` | Load transaction history | 87-97 |
| `writeTransactions()` | Save transactions | 99-109 |
| `getWallet(userId)` | Get or create user wallet | 111-125 |
| `createWallet(userId, userType)` | Initialize new wallet | 127-140 |
| `updateWallet(wallet)` | Persist wallet changes | 142-148 |
| `createTransaction(transaction)` | Record new transaction | 150-158 |
| `lockCreditsInEscrow()` | Lock credits for job | 160-173 |
| `releaseEscrowToLender()` | Pay lender with 70/30 split | 175-240 |
| `refundEscrowToBorrower()` | Refund failed job | 242-260 |

**4. API Endpoints**

##### Job Management Endpoints

| Endpoint | Method | Purpose | Lines |
|----------|--------|---------|-------|
| `/api/jobs` | POST | Submit new job | 262-350 |
| `/api/jobs` | GET | List all jobs | 352-360 |
| `/api/jobs/pending` | GET | Get pending jobs for lenders | 362-390 |
| `/api/jobs/:id` | GET | Get job details | 392-410 |
| `/api/jobs/:id/accept` | POST | Lender accepts job | 412-450 |
| `/api/jobs/:id/status` | PUT | Update job status | 452-490 |
| `/api/jobs/:id` | DELETE | Delete job | 492-530 |
| `/api/jobs/:id/result` | POST | Upload job results | 532-610 |
| `/api/jobs/:id/download` | GET | Download train.zip | 612-630 |
| `/api/jobs/:id/result/download` | GET | Download results | 632-650 |

##### Marketplace Endpoints

| Endpoint | Method | Purpose | Lines |
|----------|--------|---------|-------|
| `/api/marketplace` | GET | List available GPUs | 652-680 |
| `/api/lenders/:id` | GET | Get lender details | 682-702 |
| `/api/lenders/register` | POST | Register new lender | 704-740 |

##### Wallet Endpoints

| Endpoint | Method | Purpose | Lines |
|----------|--------|---------|-------|
| `/api/wallet/balance/:userId` | GET | Get wallet balance | 742-770 |
| `/api/wallet/add-credits` | POST | Add credits (simulate purchase) | 772-810 |
| `/api/wallet/transactions/:userId` | GET | Get transaction history | 812-840 |
| `/api/wallet/withdraw` | POST | Request withdrawal | 842-870 |

**5. Server Initialization (Lines 872-876)**
```javascript
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 TaskForge server running on port ${PORT}`);
});
```

#### Key Business Logic

**Job Submission with Escrow (Lines 262-350)**
```javascript
// 1. Calculate job cost
const jobCost = lender.pricing.perMinute * estimatedMinutes;

// 2. Check balance
const wallet = getWallet(borrowerId);
if (wallet.balance < jobCost) {
    return res.status(400).json({ error: 'Insufficient credits' });
}

// 3. Lock credits in escrow
lockCreditsInEscrow(borrowerId, jobCost, jobId);

// 4. Create job
const job = {
    id: jobId,
    borrowerId,
    lenderId,
    status: 'pending',
    pricing: { credits: jobCost, perMinute, estimatedMinutes },
    escrow: { amount: jobCost, status: 'locked' }
};
```

**Escrow Release with 70/30 Split (Lines 175-240)**
```javascript
function releaseEscrowToLender(borrowerId, lenderId, amount, jobId) {
    // Calculate split: 70% to lender, 30% to TaskForge
    const lenderShare = Math.floor(amount * 0.70);
    const platformFee = amount - lenderShare;
    
    // Remove from borrower escrow
    borrowerWallet.escrowBalance -= amount;
    borrowerWallet.totalSpent += amount;
    
    // Add 70% to lender
    lenderWallet.balance += lenderShare;
    lenderWallet.totalEarned += lenderShare;
    
    // Log 30% platform fee
    console.log(`💰 Platform fee: ${platformFee} credits (30%)`);
    
    // Create transactions for all parties
    createTransaction({ userId: borrowerId, type: 'escrow_release', ... });
    createTransaction({ userId: lenderId, type: 'job_payment', ... });
    createTransaction({ userId: 'taskforge-platform', type: 'platform_fee', ... });
}
```

---

## 🎨 Frontend Documentation

### Design System

**Color Palette**
```css
:root {
    --bg-color: #F5F7FA;           /* Light gray background */
    --card-bg: #FFFFFF;            /* White cards */
    --text-color: #1E293B;         /* Dark slate text */
    --accent-color: #06B6D4;       /* Cyan accent */
    --accent-secondary: #8B5CF6;   /* Purple secondary */
    --accent-hover: #22D3EE;       /* Light cyan hover */
    --success-color: #10B981;      /* Green success */
    --danger-color: #EF4444;       /* Red danger */
    --border-color: #CBD5E1;       /* Light border */
}
```

**Typography**
- Font Family: `'Orbitron', sans-serif` (Google Fonts)
- Headings: 700-900 weight
- Body: 400-600 weight

### Page Breakdown

#### 1. home.html (520 lines)
**Purpose**: Landing page with hero section and feature showcase

**Key Sections**:
- Hero section with gradient background
- Feature cards (GPU Marketplace, Submit Jobs, Lend GPU)
- Call-to-action buttons
- Responsive navbar

**JavaScript**: None (static page)

#### 2. marketplace.html (690 lines)
**Purpose**: Browse and filter available GPUs

**Key Sections**:
- Sidebar filters (GPU model, VRAM, RAM, OS, status)
- GPU instance cards with specs
- Sort controls (rating, reliability, speed)
- Real-time availability indicators

**JavaScript Functions**:
```javascript
loadInstances()           // Fetch GPUs from API
displayInstances()        // Render GPU cards
applyFilters()           // Apply search filters
resetFilters()           // Clear all filters
rentInstance(id)         // Navigate to borrower page with selected GPU
```

**API Calls**:
- `GET /api/marketplace?gpu=&vram_min=&os=&status=&sort=`

#### 3. borrower.html (776 lines)
**Purpose**: Submit jobs and track progress

**Key Sections**:
- Selected GPU display
- Job submission form (name, description, file upload)
- **Cost preview card** (GPU, rate, estimated time, total cost, balance check)
- Wallet balance in navbar
- My Jobs list with status tracking
- Download results buttons

**JavaScript Functions**:
```javascript
loadWalletBalance()       // Display wallet balance in navbar
checkUrlParams()          // Load selected GPU from URL
calculateCost()           // Show cost preview with balance check
submitJob()              // Upload job with escrow lock
loadMyJobs()             // Fetch borrower's jobs
downloadFile()           // Download train.zip or results
```

**API Calls**:
- `GET /api/wallet/balance/user-demo`
- `GET /api/lenders/:id`
- `POST /api/jobs` (with FormData)
- `GET /api/jobs?borrowerId=user-demo`
- `GET /api/jobs/:id/download`
- `GET /api/jobs/:id/result/download`

**Cost Preview Feature** (Lines 552-578):
```html
<div id="costPreview">
    <h3>💰 Estimated Cost</h3>
    <div>GPU: RTX 4060</div>
    <div>Rate: 5 credits/min</div>
    <div>Estimated Time: 10 minutes</div>
    <div>Total Cost: 50 credits</div>
    <div>Your Balance: 600 credits</div>
    <span id="costWarning">⚠️ Insufficient credits!</span>
</div>
```

#### 4. lender.html (800 lines)
**Purpose**: Lender dashboard for accepting and managing jobs

**Key Sections**:
- Lender ID display and management
- Statistics cards (jobs completed, credits earned, success rate)
- Available jobs list
- My active jobs list
- Job acceptance and status updates

**JavaScript Functions**:
```javascript
initializeLender()        // Set up lender ID
loadAvailableJobs()      // Fetch pending jobs
loadMyJobs()             // Fetch lender's active jobs
acceptJob(id)            // Accept pending job
updateJobStatus(id)      // Mark as in-progress/completed
loadStats()              // Calculate earnings and stats
```

**API Calls**:
- `GET /api/jobs/pending?lenderId=lender-rog-4060`
- `POST /api/jobs/:id/accept`
- `PUT /api/jobs/:id/status`
- `GET /api/jobs?lenderId=lender-rog-4060`

#### 5. wallet.html (410 lines)
**Purpose**: Manage credits and view transaction history

**Key Sections**:
- Balance card (total, available, escrow, earned, spent)
- Transaction history table
- Add credits modal
- Wallet link in navbar

**JavaScript Functions**:
```javascript
loadWalletBalance()       // Display all balance metrics
loadTransactions()        // Fetch and display transaction history
addCredits()             // Simulate credit purchase
formatTransactionType()   // Format transaction types with emojis
```

**API Calls**:
- `GET /api/wallet/balance/user-demo`
- `GET /api/wallet/transactions/user-demo`
- `POST /api/wallet/add-credits`

**Transaction Display**:
```javascript
const typeMap = {
    'credit_purchase': '💳 Credit Purchase',
    'escrow_lock': '🔒 Escrow Lock',
    'escrow_release': '🔓 Escrow Release',
    'job_payment': '💰 Job Payment',
    'platform_fee': '🏦 Platform Fee',
    'withdrawal': '💸 Withdrawal'
};
```

---

## 💾 Database Schema

### jobs.json
```json
{
  "jobs": [
    {
      "id": "uuid-v4",
      "borrowerId": "user-demo",
      "borrowerName": "John Doe",
      "lenderId": "lender-rog-4060",
      "description": "Train ResNet-50 model",
      "status": "pending|in-progress|completed|failed",
      "trainFile": "uploads/uuid-train.zip",
      "resultFile": "results/uuid-result.zip",
      "pricing": {
        "credits": 50,
        "perMinute": 5,
        "estimatedMinutes": 10,
        "currency": "credits"
      },
      "escrow": {
        "amount": 50,
        "status": "locked|released|refunded",
        "lockedAt": "2025-12-03T13:17:44.808Z",
        "releasedAt": "2025-12-03T13:18:07.388Z"
      },
      "createdAt": "2025-12-03T13:17:44.808Z",
      "updatedAt": "2025-12-03T13:18:07.388Z",
      "acceptedAt": "2025-12-03T13:17:50.000Z",
      "completedAt": "2025-12-03T13:18:07.388Z"
    }
  ]
}
```

### lenders.json
```json
{
  "lenders": [
    {
      "id": "lender-rog-4060",
      "name": "Shashank's ROG Strix",
      "email": "shashank@example.com",
      "gpu": "RTX 4060",
      "vram": 8,
      "cpu": "AMD Ryzen 7 5800X",
      "ram": 32,
      "os": "Ubuntu 22.04",
      "status": "online|idle|busy",
      "rating": 4.8,
      "jobsCompleted": 156,
      "avgCompletionTime": "12 mins",
      "pricing": {
        "perMinute": 5,
        "perHour": 300,
        "currency": "credits"
      },
      "createdAt": "2025-12-01T10:00:00.000Z"
    }
  ]
}
```

### wallets.json
```json
{
  "wallets": [
    {
      "userId": "user-demo",
      "userType": "borrower",
      "balance": 550,
      "escrowBalance": 0,
      "totalEarned": 0,
      "totalSpent": 50,
      "createdAt": "2025-12-03T12:00:00.000Z",
      "updatedAt": "2025-12-03T13:18:07.387Z"
    },
    {
      "userId": "lender-rog-4060",
      "userType": "lender",
      "balance": 35,
      "escrowBalance": 0,
      "totalEarned": 35,
      "totalSpent": 0,
      "pendingWithdrawal": 0,
      "createdAt": "2025-12-03T12:00:00.000Z",
      "updatedAt": "2025-12-03T13:18:07.388Z"
    }
  ]
}
```

### transactions.json
```json
{
  "transactions": [
    {
      "id": "txn-uuid",
      "userId": "user-demo",
      "type": "escrow_lock",
      "amount": -50,
      "jobId": "job-uuid",
      "status": "locked",
      "balanceBefore": 600,
      "balanceAfter": 550,
      "metadata": {
        "totalAmount": 50,
        "lenderShare": 35,
        "platformFee": 15
      },
      "createdAt": "2025-12-03T13:17:44.808Z"
    }
  ]
}
```

---

## 🔌 API Documentation

### Base URL
```
http://localhost:3000/api
```

### Authentication
Currently no authentication (MVP). User IDs are hardcoded:
- Borrower: `user-demo`
- Lender: `lender-rog-4060`

### Endpoints

#### Jobs

**POST /api/jobs**
Submit a new training job

Request:
```javascript
FormData {
    borrowerId: 'user-demo',
    borrowerName: 'John Doe',
    lenderId: 'lender-rog-4060',
    description: 'Train ResNet-50',
    estimatedMinutes: 10,
    trainFile: File (train.zip)
}
```

Response (200):
```json
{
    "message": "Job submitted successfully",
    "jobId": "uuid",
    "creditsLocked": 50
}
```

Response (400 - Insufficient Credits):
```json
{
    "error": "Insufficient credits. Required: 50, Available: 30"
}
```

**GET /api/jobs**
List all jobs (with optional filters)

Query Parameters:
- `borrowerId`: Filter by borrower
- `lenderId`: Filter by lender
- `status`: Filter by status

Response (200):
```json
{
    "jobs": [...],
    "total": 10
}
```

**GET /api/jobs/pending**
Get pending jobs for a lender

Query Parameters:
- `lenderId`: Required

Response (200):
```json
{
    "jobs": [...],
    "count": 5
}
```

**POST /api/jobs/:id/accept**
Accept a pending job

Request:
```json
{
    "lenderId": "lender-rog-4060"
}
```

Response (200):
```json
{
    "message": "Job accepted successfully",
    "job": {...}
}
```

**POST /api/jobs/:id/result**
Upload job results

Request:
```javascript
FormData {
    resultFile: File (result.zip)
}
```

Response (200):
```json
{
    "message": "Result uploaded successfully",
    "creditsReleased": 50,
    "lenderEarned": 35,
    "platformFee": 15
}
```

#### Marketplace

**GET /api/marketplace**
List available GPUs

Query Parameters:
- `gpu`: Filter by GPU model
- `vram_min`: Minimum VRAM
- `os`: Operating system
- `status`: Availability status
- `sort`: Sort by (rating, jobs, speed)

Response (200):
```json
{
    "lenders": [...],
    "total": 15
}
```

**GET /api/lenders/:id**
Get lender details

Response (200):
```json
{
    "lender": {...}
}
```

#### Wallet

**GET /api/wallet/balance/:userId**
Get wallet balance

Response (200):
```json
{
    "userId": "user-demo",
    "balance": 550,
    "escrowBalance": 0,
    "availableBalance": 550,
    "totalEarned": 0,
    "totalSpent": 50
}
```

**POST /api/wallet/add-credits**
Add credits (simulate purchase)

Request:
```json
{
    "userId": "user-demo",
    "amount": 100,
    "paymentMethod": "demo"
}
```

Response (200):
```json
{
    "message": "Credits added successfully",
    "newBalance": 650,
    "transaction": {...}
}
```

**GET /api/wallet/transactions/:userId**
Get transaction history

Response (200):
```json
{
    "transactions": [...],
    "total": 25
}
```

---

## 💰 Credits & Escrow System

### Credit Economics
- **1 Credit = 1 Rupee** (INR)
- Borrowers purchase credits to pay for jobs
- Lenders earn credits for completing jobs
- Platform takes 30% commission

### Escrow Flow

#### 1. Lock Phase (Job Submission)
```
Borrower Balance: 600 credits
Job Cost: 50 credits (5 credits/min × 10 min)

After Lock:
├─ Available Balance: 550 credits
└─ Escrow Balance: 50 credits (locked)
```

#### 2. Release Phase (Job Completion)
```
Escrow: 50 credits

Split:
├─ Lender (70%): 35 credits
├─ Platform (30%): 15 credits
└─ Borrower Escrow: 0 credits

Final Balances:
├─ Borrower: 550 credits (spent 50 total)
├─ Lender: 35 credits (earned)
└─ TaskForge: 15 credits (platform fee)
```

### Transaction Types

| Type | Description | Amount Sign |
|------|-------------|-------------|
| `credit_purchase` | User buys credits | + |
| `escrow_lock` | Credits locked for job | - |
| `escrow_release` | Escrow released after job | - |
| `job_payment` | Lender receives payment | + |
| `platform_fee` | TaskForge commission | + |
| `withdrawal` | Lender withdraws earnings | - |
| `refund` | Failed job refund | + |

---

## 💼 Revenue Model

### Platform Economics

**Per Transaction:**
```
Job Cost: 100 credits
├─ Lender Share (70%): 70 credits
└─ Platform Fee (30%): 30 credits
```

**Monthly Projections (Example):**
```
Assumptions:
- 1000 jobs/month
- Average job cost: 100 credits
- Total volume: 100,000 credits

Revenue:
├─ Lenders earn: 70,000 credits (₹70,000)
└─ Platform earns: 30,000 credits (₹30,000)
```

### Pricing Strategy
- Lenders set their own per-minute rates
- Market-driven pricing based on GPU specs
- Suggested rates:
  - RTX 3060: 3-5 credits/min
  - RTX 4060: 5-7 credits/min
  - RTX 4090: 10-15 credits/min

---

## 🚀 Installation & Setup

### Prerequisites
- Node.js v22.x or higher
- Python 3.x (for lender clients)
- Docker (optional, for job execution)
- 2GB free disk space

### Backend Setup

1. **Clone Repository**
```bash
git clone https://github.com/yourusername/taskforge.git
cd taskforge
```

2. **Install Dependencies**
```bash
npm install
```

3. **Initialize Data Files**
```bash
# Create empty data files if they don't exist
echo '{"jobs":[]}' > jobs.json
echo '{"lenders":[]}' > lenders.json
echo '{"wallets":[]}' > wallets.json
echo '{"transactions":[]}' > transactions.json
```

4. **Create Directories**
```bash
mkdir uploads results
```

5. **Start Server**
```bash
node server.js
# Server runs on http://localhost:3000
```

### Frontend Setup

1. **Set API URL**
```bash
# Windows PowerShell
$env:TASKFORGE_API_URL = "http://localhost:3000/api"

# Linux/Mac
export TASKFORGE_API_URL="http://localhost:3000/api"
```

2. **Open in Browser**
```
http://localhost:3000/home.html
```

### Lender Client Setup

1. **Install Python Dependencies**
```bash
pip install requests
```

2. **Configure Lender ID**
Edit `lender_client.py`:
```python
LENDER_ID = 'lender-rog-4060'
API_URL = 'http://localhost:3000/api'
```

3. **Run Lender Client**
```bash
python lender_client.py
```

---

## 📖 Usage Guide

### For Borrowers

1. **Add Credits**
   - Go to Wallet page
   - Click "Add Credits"
   - Enter amount (e.g., 100 credits)
   - Click "Add Credits" (demo mode - instant)

2. **Browse GPUs**
   - Visit Marketplace
   - Filter by GPU model, VRAM, OS
   - View pricing and ratings
   - Click "Rent Instance"

3. **Submit Job**
   - Enter your name
   - Describe the job
   - Upload `train.zip` file
   - Review cost preview
   - Click "Submit Job"
   - Credits locked in escrow automatically

4. **Track Progress**
   - View "My Jobs" section
   - See status: Pending → In Progress → Completed
   - Download results when completed

5. **Download Results**
   - Click "Download Results" button
   - Extract `result.zip`
   - View trained model outputs

### For Lenders

1. **Register GPU**
   - Open Lender Dashboard
   - Note your Lender ID
   - Set pricing (credits per minute)
   - Update GPU specs in `lenders.json`

2. **Run Lender Client**
   ```bash
   python lender_client.py
   ```
   - Client polls for pending jobs
   - Automatically accepts jobs
   - Downloads train.zip
   - Executes training
   - Uploads results
   - Receives 70% of job cost

3. **Monitor Earnings**
   - View dashboard statistics
   - Check wallet balance
   - Review transaction history
   - Request withdrawals

---

## 🐳 Docker Support

### Building Docker Image

```bash
# Windows PowerShell
.\build-docker.ps1

# Linux/Mac
docker build -t taskforge-worker .
```

### Dockerfile
```dockerfile
FROM python:3.9-slim
WORKDIR /workspace
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh
ENTRYPOINT ["/entrypoint.sh"]
```

### Running Jobs in Docker

```bash
docker run --rm \
  -v $(pwd)/uploads:/workspace/uploads \
  -v $(pwd)/results:/workspace/results \
  taskforge-worker \
  python train.py
```

### Security Benefits
- Isolated execution environment
- No access to host system
- Resource limits (CPU, memory)
- Automatic cleanup after completion

---

## 🗺️ Future Roadmap

### Phase 1: MVP (Completed ✅)
- [x] Basic job submission and execution
- [x] GPU marketplace
- [x] Off-chain credits system
- [x] Escrow with 70/30 split
- [x] Transaction history
- [x] Docker support

### Phase 2: Payment Integration
- [ ] Razorpay integration for credit purchases
- [ ] Automated withdrawals for lenders
- [ ] Invoice generation
- [ ] Tax reporting

### Phase 3: Advanced Features
- [ ] User authentication (JWT)
- [ ] Real-time job progress tracking
- [ ] WebSocket for live updates
- [ ] Job scheduling and queuing
- [ ] Multi-GPU support
- [ ] Spot pricing (dynamic rates)

### Phase 4: Scale & Optimize
- [ ] PostgreSQL database
- [ ] Redis caching
- [ ] Load balancing
- [ ] CDN for file uploads
- [ ] Monitoring and analytics
- [ ] Auto-scaling

### Phase 5: Ecosystem
- [ ] Mobile app (React Native)
- [ ] API for third-party integrations
- [ ] Marketplace for pre-trained models
- [ ] Reputation system
- [ ] Dispute resolution
- [ ] Insurance for failed jobs

---

## 🤝 Contributing

Contributions are welcome! Please follow these guidelines:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License.

---

## 👨‍💻 Author

**Shashank Kakad**
- GitHub: [@yourusername](https://github.com/yourusername)
- Email: shashank@taskforge.io

---

## 🙏 Acknowledgments

- Express.js team for the excellent web framework
- Multer for file upload handling
- Docker for containerization
- Google Fonts for Orbitron typeface
- The open-source community

---

## 📞 Support

For issues, questions, or feature requests:
- Open an issue on GitHub
- Email: support@taskforge.io
- Discord: [TaskForge Community](https://discord.gg/taskforge)

---

**Built with ❤️ for the ML community**

*Making GPU compute accessible to everyone, one job at a time.*
