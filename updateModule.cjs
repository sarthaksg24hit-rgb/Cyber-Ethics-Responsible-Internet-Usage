const fs = require('fs');
const file = 'server/data/modules.js';
let content = fs.readFileSync(file, 'utf8');

const newNotes = `    notes: {
      introduction: "For college students, mastering cybersecurity is essential to protect your digital footprint and avoid academic or financial pitfalls.",
      keyPoints: [
        {
          heading: "Cyber/Internet Usage Rules",
          table: {
            headers: ["The Do's", "The Don'ts"],
            rows: [
              ["Use Strong, Unique Passwords & MFA", "Never Use Public Wi-Fi for Finances"],
              ["Maintain Strict Privacy Settings", "Avoid Clicking Suspicious Links"],
              ["Keep Software Updated", "Don't Share Credentials or OTPs"],
              ["Backup Your Data", "Don't Over-Share Personal Data"],
              ["Use Trusted Password Managers", "Don't Ignore Cyber Ethics (e.g. piracy)"]
            ]
          }
        }
      ],
      examples: [
        "Example 1: You receive an email claiming your tuition payment failed with a link. Instead of clicking the link, you log in to your student portal directly to check your balance.",
        "Example 2: While at a local coffee shop, you use a VPN before logging into your bank account on their public Wi-Fi.",
        "Example 3: Setting your social media profiles to 'Friends Only' to ensure future employers or scammers cannot scrape your personal information."
      ]
    },
    quiz: [`;

// The first module in the file is id: 7. We want to replace its notes section.
const replaced = content.replace(/notes:\s*{[\s\S]*?quiz: \[/, newNotes);
fs.writeFileSync(file, replaced);
console.log('Modified modules.js successfully');
