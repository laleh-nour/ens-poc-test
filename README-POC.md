🛡️ Security Research – Bug Bounty Case Study (ENS via Immunefi)
# 🛡️ Security Research – Bug Bounty Case Study (ENS via Immunefi)

This repository documents a **security assessment and Proof-of-Concept (PoC)**
related to the `withdraw()` function in the ENS **ETHRegistrarController** contract.

- **Platform:** [Immunefi](https://immunefi.com)  
- **Report ID:** 51435  
- **Researcher:** LaleH (@laleh-nour)  
- **Status:** Closed by project (classified as *by design*)  
- **Original Severity Claimed:** Critical (unauthorized withdrawal)  
- **Final Assessment:** Operational / Governance Risk  

---

## 📌 Summary
The `withdraw()` function is publicly accessible.  
Funds are always swept to a fixed DAO wallet, meaning **no theft of user funds** occurs.  
However, **any external account** can trigger the sweep at arbitrary times.  

This creates **operational and governance risks**:
- Third parties control **timing/frequency** of treasury sweeps  
- Potential interference with **accounting, audits, or governance processes**  

---

## 🧪 Proof-of-Concept (PoC)
- Developed and executed in **Hardhat**  
- Simulated using both **local contracts** and **mainnet-fork**  
- Demonstrated successful triggering of `withdraw()` by a **non-owner account**  

📂 Repository contents:
- `scripts/` → PoC code  
- `screenbug/` → screenshots of execution  
- `artifacts/` → logs and results  

Full write-up in [SECURITY-NOTE.md](SECURITY-NOTE.md)

---

## 🎯 Lessons Learned
- Always verify **threat model** of the project before claiming severity  
- Not all unrestricted functions are vulnerabilities; sometimes they are **design choices**  
- Still, documenting **risks beyond intended design** adds value to the security ecosystem  

---

## 📚 References
- [ENS Official Contracts](https://github.com/ensdomains/ens-contracts)  
- [Immunefi Program for ENS](https://immunefi.com/bug-bounty/ens)  
- [Researcher GitHub](https://github.com/laleh-nour)  

---
# 🛡️ Security Research – Bug Bounty Case Study (ENS via Immunefi)
# 🛡️ پژوهش امنیتی – مطالعه موردی باگ باونتی (ENS از طریق Immunefi)

---

## 🌍 English Version

This repository documents a **security assessment and Proof-of-Concept (PoC)**
related to the `withdraw()` function in the ENS **ETHRegistrarController** contract.

- **Platform:** Immunefi  
- **Report ID:** 51435  
- **Researcher:** LaleH (@laleh-nour)  
- **Status:** Closed by project (classified as *by design*)  
- **Original Severity Claimed:** Critical (unauthorized withdrawal)  
- **Final Assessment:** Operational / Governance Risk  

### 📌 Summary
The `withdraw()` function is public. Funds are always swept to a fixed DAO wallet
(so no direct theft), but **any external account** can trigger the sweep at arbitrary times.
This creates **operational/governance risks** (timing & frequency control).

### 🧪 PoC
- Implemented with **Hardhat** (local + mainnet-fork)
- Non-owner successfully triggered `withdraw()`
- Evidence: scripts, logs, screenshots

**Detailed write-up:** see [SECURITY-NOTE.md](./SECURITY-NOTE.md)

### 📚 References
- ENS Contracts: https://github.com/ensdomains/ens-contracts  
- Immunefi ENS Program: https://immunefi.com/bug-bounty/ens  
- Researcher GitHub: https://github.com/laleh-nour  
- Initial Experiments: https://github.com/laleh-nour/ens-test  
- PoC Gist: https://gist.github.com/laleh-nour/8f85e8c98818f6fac1880dcaaac0cf61

---

## 🌐 نسخه فارسی

این ریپو شامل **ارزیابی امنیتی و PoC** برای تابع `withdraw()` در قرارداد
**ETHRegistrarController** پروژه ENS است.

- **پلتفرم:** Immunefi  
- **شماره گزارش:** 51435  
- **پژوهشگر:** LaleH (@laleh-nour)  
- **وضعیت:** بسته‌شده توسط پروژه (به عنوان *by design*)  
- **شدت اولیه ادعاشده:** Critical  
- **ارزیابی نهایی:** ریسک عملیاتی/حاکمیتی

### 📌 خلاصه
تابع `withdraw()` عمومی است. وجوه همیشه به آدرس ثابت DAO منتقل می‌شود (پس سرقت مستقیم رخ نمی‌دهد) اما
**هر حساب خارجی** می‌تواند در هر زمانی این انتقال را آغاز کند.
این موضوع **ریسک‌های عملیاتی/حاکمیتی** (کنترل زمان/تعداد دفعات) ایجاد می‌کند.

### 🧪 PoC
- پیاده‌سازی با **Hardhat** (محلی + mainnet-fork)
- اجرای موفق `withdraw()` توسط حساب غیرمالک
- شواهد: اسکریپت‌ها، لاگ‌ها، اسکرین‌شات‌ها

**توضیح کامل:** فایل [SECURITY-NOTE.md](./SECURITY-NOTE.md)

### 📚 منابع
- ENS Contracts: https://github.com/ensdomains/ens-contracts  
- باگ باونتی ENS در Immunefi: https://immunefi.com/bug-bounty/ens  
- GitHub پژوهشگر: https://github.com/laleh-nour  
- آزمایش‌های اولیه: https://github.com/laleh-nour/ens-test  
- PoC Gist: https://gist.github.com/laleh-nour/8f85e8c98818f6fac1880dcaaac0cf61
