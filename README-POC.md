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
