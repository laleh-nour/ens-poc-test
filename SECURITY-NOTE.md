

**Title:** ENS ETHRegistrarController – Public `withdraw()` may cause unauthorized sweep timing (Operational Risk)

**Severity:** High (Operational / Governance Risk)
**Category:** Unexpected fund movement (timing/frequency control)

---

### ✅ Summary

The `withdraw()` function in the ENS **ETHRegistrarController** contract is publicly accessible. While funds are always transferred to a fixed DAO wallet (not to an arbitrary recipient), this design choice enables **any external account** to trigger the sweep at any time.

This does not directly result in theft of funds, since the destination is fixed. However, it introduces **operational and governance risks**, as unauthorized actors can unilaterally control **when** funds are moved, which may interfere with treasury accounting, governance processes, or operational planning.

---

### ✅ Technical Details

The vulnerable code snippet:

```solidity
function withdraw() public {
    payable(msg.sender).transfer(address(this).balance);
}
```

* Lacks `onlyOwner` or equivalent authorization modifiers.
* Can be executed by any external caller.
* Triggers full contract balance sweep immediately.

---

### ✅ Proof of Concept

A Hardhat-based simulation was executed:

* Deployed mock contract with the same logic.
* Funded contract with 1 ETH.
* Non-owner account successfully called `withdraw()`.
* Funds were transferred to the configured recipient address.

📂 Full repo: [https://github.com/laleh-nour/ens-test](https://github.com/laleh-nour/ens-test)
📸 Screenshots: [screenbug evidence](https://github.com/laleh-nour/ens-test/tree/master/screenbug)

Mainnet callStatic test confirmed that the real deployed contract allows execution without revert.

---

### ✅ Impact

While the recipient cannot be changed (funds always go to DAO wallet), the lack of access control creates risks:

* **Timing control risk**: Any third party can sweep funds at arbitrary times, overriding expected treasury/gov schedules.
* **Operational disruption**: Unexpected sweeps can complicate accounting, audits, or coordinated upgrades.
* **Governance bypass**: Treasury transfers typically require explicit DAO or multisig authorization; public sweeping bypasses this layer.

---

### ✅ Recommendation

* Introduce an authorization check (e.g., `onlyOwner`, multisig, or DAO-controlled role) to restrict sweep initiation.
* Alternatively, implement **rate-limiting** or **governance-triggered sweep** to mitigate timing risks.
* If left intentionally open, ENS should **document the rationale** in its threat model and clearly state that arbitrary sweep timing is considered safe and acceptable.

---

### ✅ Conclusion

This behavior is likely **“by design”** but should be explicitly documented as part of the ENS threat model. From a security perspective, the risk is not direct theft, but rather **loss of control over timing and governance** regarding treasury funds.

This report is therefore submitted as a **Security Note** to highlight operational and governance implications, not as a critical theft bug.

# 🛡️ Security Research Note – ENS ETHRegistrarController `withdraw()`

## 📌 Overview
Independent security research on the `ETHRegistrarController` contract of ENS.  
Submitted to the [ENS Bug Bounty Program](https://immunefi.com/bug-bounty/ens/) via Immunefi under **Report ID: 51435**.  
This document captures the technical reasoning, Proof of Concept (PoC), and final outcome.

---

## 🔍 Vulnerability Summary
- **Function:** `withdraw()`  
- **Behavior:** Public; anyone can trigger a sweep.  
- **Recipient:** Hard-coded DAO wallet (not attacker-controlled).  
- **Risk Type:** Operational/Governance (timing/frequency of treasury sweeps).  
- **Not direct theft**, but may affect accounting, governance cadence, or operational planning.

---

## 🧪 Proof of Concept (PoC)
- Created a Hardhat local + mainnet-fork test environment.  
- Funded a mock contract with 1 ETH.  
- Called `withdraw()` from a **non-owner** account.  
- Verified that funds were swept successfully to the configured DAO recipient address.  

### PoC Repositories
- 🔗 [ens-test (initial experiments)](https://github.com/laleh-nour/ens-test)  
- 🔗 [PoC Gist – poc-withdraw.js](https://gist.github.com/laleh-nour/8f85e8c98818f6fac1880dcaaac0cf61)  
- 🔗 [ens-poc-test (final structured repo)](https://github.com/laleh-nour/ens-poc-test)  

---

## 📊 Discussion
The ENS team clarified that this behavior is **intentional (by design)**:  
- `withdraw()` is public so that *anyone* can help sweep funds into the DAO wallet.  
- The recipient is a **fixed DAO address**, meaning attackers cannot redirect funds.  

This removes the risk of **theft**, but introduces **operational/security considerations**:  
- External parties can control *when* sweeps occur.  
- This may interfere with treasury accounting, governance cadence, or automated financial workflows.  
- In many other contexts, unrestricted sweeping would typically be flagged as a vulnerability.

---

## ✅ Outcome
- **Report submitted:** August 2025  
- **Reviewed via Immunefi:** Escalated to ENS team  
- **Final resolution:** *By Design*, no bounty awarded.  

> 🔒 All testing was performed in local and forked environments.  
> 💰 No real funds were touched.  

---

## 🌍 Notes in Persian (توضیحات فارسی)

### خلاصه
در این پژوهش امنیتی، تابع `withdraw()` در قرارداد `ETHRegistrarController` بررسی شد.  
این تابع به صورت عمومی (`public`) قابل فراخوانی است و هیچ محدودیت دسترسی ندارد.  

### آزمایش‌ها
- یک قرارداد تست مشابه قرارداد اصلی دیپلوی شد.  
- پس از واریز 1 ETH، تابع `withdraw()` توسط یک حساب غیرمالک اجرا شد.  
- مشاهده شد که کل موجودی به آدرس DAO (که از پیش تعیین شده بود) منتقل شد.  

### نتیجه
- تیم ENS تأیید کرد که این رفتار **عمداً طراحی شده** است.  
- از دید آن‌ها هیچ ریسک مستقیم برای سرقت وجود ندارد، چون آدرس مقصد ثابت است.  
- با این حال، کنترل زمان و تعداد دفعات برداشت دست هر کاربر است که می‌تواند در عملیات خزانه‌داری و حسابداری اختلال ایجاد کند.  

---

## 👤 Researcher
- **Author:** LaleH (Whitehat)  
- **Wallet (verified with Immunefi):** `0xD1A26Dee9FBb673DfEf875Ed9c7b55e0393889CB`  

---

⚠️ **Disclaimer:**  
This repository and documentation are for research and educational purposes only.  
No exploit was executed on mainnet, and no real funds were impacted.
