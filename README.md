# 🔐 Cybersecurity Web Security Project

![Node.js](https://img.shields.io/badge/Node.js-20.x-green?style=flat-square&logo=node.js)
![Express](https://img.shields.io/badge/Express.js-4.x-lightgrey?style=flat-square&logo=express)
![MongoDB](https://img.shields.io/badge/MongoDB-6.x-green?style=flat-square&logo=mongodb)
![Docker](https://img.shields.io/badge/Docker-Secured-blue?style=flat-square&logo=docker)
![OWASP](https://img.shields.io/badge/OWASP-Top%2010%20Compliant-red?style=flat-square)
![License](https://img.shields.io/badge/License-Educational-orange?style=flat-square)

> **DevelopersHub Corporation (DHC) — Cybersecurity Internship | Weeks 4–6**
> Internship ID: DHC-4661 | Muhammad Azfar Waqas | University of Wah — BS Cybersecurity

---

## 📌 Overview

This project was completed as part of the **DevelopersHub Corporation Cybersecurity Internship (Weeks 4–6)**. Starting from a basic Node.js/Express authentication application, a complete security lifecycle was carried out — from vulnerability assessment through implementation, ethical hacking, and penetration testing.

The project demonstrates real-world application of:
- Advanced threat detection & API security hardening
- Ethical hacking & vulnerability exploitation in a test environment
- Security auditing, compliance checks & secure Docker deployment

---

## 🎯 Objectives

| # | Objective | Status |
|---|-----------|--------|
| 1 | Implement secure authentication (JWT + bcrypt) | ✅ Done |
| 2 | Protect APIs against brute-force (rate limiting) | ✅ Done |
| 3 | Prevent XSS, NoSQL Injection, and CSRF attacks | ✅ Done |
| 4 | Add intrusion detection & security monitoring | ✅ Done |
| 5 | Perform ethical hacking & penetration testing | ✅ Done |
| 6 | Security auditing — OWASP ZAP, Nikto, Lynis | ✅ Done |
| 7 | Secure Docker deployment + Trivy image scan | ✅ Done |
| 8 | OWASP Top 10 compliance verification | ✅ Done |

---

## 🛠 Technologies & Tools

### Backend Stack
| Technology | Version | Purpose |
|---|---|---|
| Node.js | 20.x | Runtime |
| Express.js | 4.x | Web framework |
| MongoDB + Mongoose | 6.x / 8.x | Database |

### Security Libraries (npm)
| Library | Purpose |
|---|---|
| `helmet` | Secure HTTP response headers (CSP, HSTS, X-Frame-Options) |
| `express-rate-limit` | Brute-force protection — 429 Too Many Requests |
| `express-mongo-sanitize` | NoSQL injection prevention |
| `bcryptjs` | Password hashing with salt rounds |
| `jsonwebtoken` | Stateless JWT authentication |
| `csurf` | CSRF token protection |
| `cors` | Restrict cross-origin requests |
| `winston` | Structured security event logging |
| `cookie-parser` | Secure cookie handling |

### Security & Penetration Testing Tools
| Tool | Used For |
|---|---|
| **OWASP ZAP** | Automated vulnerability scanning |
| **Burp Suite** | CSRF testing, request interception, brute-force simulation |
| **Nmap** | Port scanning & service detection |
| **Nikto** | Web server misconfiguration scanning |
| **Gobuster** | Directory & route enumeration |
| **SQLMap** | SQL/NoSQL injection testing |
| **Metasploit** | Auxiliary web scanning modules |
| **Trivy** | Docker image vulnerability scanning |
| **Lynis** | Linux system hardening audit |
| **Fail2Ban** | Real-time intrusion detection & IP banning |

---

## 📁 Project Structure

```
Cybersecurity-WebSecurity-Project/
│
├── app.js                      # Main application entry point
├── package.json
├── Dockerfile                  # Hardened Docker image
├── .env.example                # Environment variable template
├── .gitignore
├── README.md
│
├── config/
│   └── db.js                   # MongoDB connection
│
├── middleware/
│   ├── apiKeyAuth.js           # API key authentication middleware
│   ├── auth.js                 # JWT verification middleware
│   └── csrfProtection.js       # CSRF token middleware
│
├── models/
│   └── User.js                 # Mongoose user schema
│
├── routes/
│   ├── users.js                # Register / Login routes
│   └── api.js                  # Protected API routes
│
├── logs/
│   └── security.log            # Winston security event log
│
├── screenshots/                # Penetration testing evidence
│   ├── fail2ban.png
│   ├── zap_scan.png
│   ├── csrf_test.png
│   ├── rate_limit_429.png
│   ├── nmap_scan.png
│   ├── nikto_scan.png
│   ├── docker_trivy.png
│   └── burp_suite.png
│
└── reports/
    └── internship_report.docx  # Full Week 4–6 report
```

---

## ⚙️ Installation & Setup

### Prerequisites
- Node.js 20.x
- MongoDB running locally
- Git

### Step 1 — Clone the Repository
```bash
git clone https://github.com/MAK554267/Cybersecurity-WebSecurity-Project.git
cd Cybersecurity-WebSecurity-Project
```

### Step 2 — Install Dependencies
```bash
npm install
```

### Step 3 — Configure Environment Variables

Copy the example file and fill in your values:
```bash
cp .env.example .env
```

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/nodeauth
JWT_SECRET=your_strong_secret_here
API_KEYS=your_api_key_here
SESSION_SECRET=your_session_secret_here
```

> ⚠️ Never commit your real `.env` file. It is listed in `.gitignore`.

### Step 4 — Start the Application
```bash
node app.js
```

Application runs at: **http://localhost:5000**

---

## 🔐 Security Features

### 1. Password Hashing — bcrypt
Passwords are hashed with **10 salt rounds** before storing in the database. Plain text passwords are never stored.
```js
const hashedPassword = await bcrypt.hash(password, 10);
```

### 2. JWT Authentication
Stateless authentication using signed JSON Web Tokens, valid for 1 hour.
```js
const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
```

### 3. API Key Authentication
Protected routes require a valid `x-api-key` header. Invalid keys receive `401 Unauthorized`.
```
GET /api/protected
Headers: x-api-key: your_api_key
```

### 4. Rate Limiting
Brute-force protection using `express-rate-limit`. Auth routes are limited to **10 requests per 15 minutes**. Exceeded requests receive `429 Too Many Requests`.
```js
const authLimiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 10 });
```

### 5. NoSQL Injection Prevention
`express-mongo-sanitize` strips MongoDB operators (`$`, `.`) from all user input before it reaches the database.
```js
app.use(mongoSanitize({ replaceWith: '_' }));
```

### 6. CSRF Protection
Every state-changing form includes a hidden CSRF token validated server-side via `csurf`. Requests without a valid token receive `403 Forbidden`.
```html
<input type="hidden" name="_csrf" value="<%= csrfToken %>">
```

### 7. Security Headers — Helmet.js
Helmet sets the following headers on every response:
- `Content-Security-Policy` — prevents script injection
- `Strict-Transport-Security` — enforces HTTPS (1 year + preload)
- `X-Frame-Options: DENY` — prevents clickjacking
- `X-Content-Type-Options: nosniff` — prevents MIME sniffing

### 8. CORS Restriction
Only whitelisted origins can make cross-origin requests. All others receive a CORS error.
```js
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
```

### 9. Security Logging — Winston
All security events are logged to `logs/security.log` in JSON format with timestamps and IP addresses.
```
{"level":"warn","message":"Failed login attempt","email":"x@x.com","ip":"127.0.0.1","timestamp":"2026-05-24T..."}
```

### 10. Intrusion Detection — Fail2Ban
Fail2Ban monitors the Winston log file and automatically bans IPs after **5 failed login attempts within 5 minutes** (ban duration: 15 minutes).

---

## 🔍 Ethical Hacking & Penetration Testing

### Reconnaissance
```bash
# Port & service scan
nmap -A -sV 127.0.0.1

# Web server vulnerability scan
nikto -h http://localhost:5000

# Directory enumeration
gobuster dir -u http://localhost:5000 -w /usr/share/wordlists/dirb/common.txt
```

### Injection Testing
```bash
# SQLMap automated scan
sqlmap -u 'http://localhost:5000/users/login' --data='email=x&password=y' --method=POST

# NoSQL injection payload (tested in Postman)
{ "email": { "$gt": "" }, "password": { "$gt": "" } }
# Result after fix: BLOCKED by express-mongo-sanitize
```

### CSRF Testing — Burp Suite
1. Intercept POST `/users/login` in Burp Suite
2. Remove or modify the `_csrf` token in Repeater
3. Expected result: `403 Forbidden`

### Brute-Force Simulation — Burp Intruder
```
Attack type: Sniper | Payload: password field | List: common-passwords.txt
Attempts 1–10  → 200 OK / 302 Redirect
Attempt 11+    → 429 Too Many Requests (rate limiter triggered)
```

### OWASP ZAP Automated Scan
```bash
zap-baseline.py -t http://localhost:5000 -r zap_report.html
```
Post-fix result: **0 High-risk alerts**

---

## 🐳 Docker Secure Deployment

The Docker image follows security best practices:
- **Alpine base** — minimal attack surface
- **Non-root user** — runs as `appuser`, not root
- **Production deps only** — `npm ci --only=production`
- **Health check** — automatic container health monitoring

```bash
# Build image
docker build -t nodeauth .

# Run container
docker run -p 5000:5000 nodeauth

# Scan image for vulnerabilities
trivy image nodeauth
```

---

## 📊 Security Audit Results

| Security Check | Tool Used | Status |
|---|---|---|
| XSS Protection | OWASP ZAP + Manual | ✅ Fixed |
| NoSQL Injection Prevention | SQLMap + Postman | ✅ Fixed |
| CSRF Protection | Burp Suite | ✅ Fixed |
| Rate Limiting | Burp Intruder | ✅ Verified |
| Helmet Security Headers | Nikto + DevTools | ✅ Enabled |
| JWT Authentication | Manual Testing | ✅ Working |
| API Key Authentication | Postman | ✅ Working |
| Docker Image Hardening | Trivy | ✅ Scanned |
| OWASP ZAP Full Scan | OWASP ZAP | ✅ 0 High Alerts |
| System Hardening | Lynis | ✅ Audited |
| Intrusion Detection | Fail2Ban | ✅ Active |

---

## 📸 Screenshots

All penetration testing evidence is in the `/screenshots` folder:

| File | Contents |
|---|---|
| `nmap_scan.png` | Port & service discovery results |
| `nikto_scan.png` | Web server vulnerability findings |
| `zap_scan.png` | OWASP ZAP post-fix scan (0 High alerts) |
| `rate_limit_429.png` | 429 response after brute-force attempt |
| `csrf_test.png` | Burp Suite 403 on missing CSRF token |
| `fail2ban.png` | Fail2Ban jail status showing banned IP |
| `docker_trivy.png` | Trivy container scan results |
| `burp_suite.png` | Burp Intruder brute-force simulation |

---

## 🚀 Git Commands — Push Updates

```bash
git add .
git commit -m "Your commit message"
git push
```

---

## 📚 Learning Outcomes

Through this project, the following skills were developed:

- Identifying and exploiting OWASP Top 10 vulnerabilities in a real codebase
- Implementing defense-in-depth security controls in a Node.js application
- Using industry-standard penetration testing tools (ZAP, Burp, Metasploit, Nmap)
- Writing secure, production-ready code with logging and monitoring
- Containerizing applications securely using Docker best practices

---

## 👨‍💻 Author

**Muhammad Azfar Waqas**
BS Cybersecurity (6th Semester) — University of Wah
Internship ID: DHC-4661 — DevelopersHub Corporation

[![GitHub](https://img.shields.io/badge/GitHub-MAK554267-black?style=flat-square&logo=github)](https://github.com/MAK554267)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-blue?style=flat-square&logo=linkedin)](https://linkedin.com/in/YOUR_LINKEDIN)

---

## 📄 License

This project is developed for **educational and internship purposes only**.
All penetration testing was performed exclusively on locally hosted test environments.
No external systems were targeted.
