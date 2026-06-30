const fs = require('fs');
const file = 'server/data/modules.js';
let content = fs.readFileSync(file, 'utf8');

const newModule = `  {
    id: 7,
    order: 1,
    title: "Do's and Don'ts of Cyber/Internet Usage",
    shortDescription: "Essential cybersecurity rules to protect your digital footprint and avoid academic or financial pitfalls.",
    icon: "Shield",
    estimatedMinutes: 10,
    videoUrl: "https://www.youtube.com/embed/inWWh25S2M0",
    videoTitle: "Cybersecurity Basics for Students",
    notes: {
      introduction: "For college students, mastering cybersecurity is essential to protect your digital footprint and avoid academic or financial pitfalls.",
      keyPoints: [
        {
          heading: "The Do's",
          content: "• Use Strong, Unique Passwords: Create complex passwords for every account. Consider using a trusted password manager.\\n• Enable MFA: Always activate Multi-Factor Authentication (MFA) across your university accounts, emails, and social media platforms.\\n• Maintain Strict Privacy Settings: Audit your social media accounts so that your posts, location, and personal details are visible only to close friends.\\n• Keep Software Updated: Regularly install the latest updates and security patches for your PC/laptop, web browsers, and antivirus software.\\n• Backup Your Data: Keep copies of important academic files on an external hard drive or an encrypted cloud storage service."
        },
        {
          heading: "The Don'ts",
          content: "• Never Use Public Wi-Fi for Finances: Avoid making online purchases or checking sensitive portals on unsecured public networks.\\n• Avoid Clicking Suspicious Links: Do not click on unsolicited links or download email attachments from unknown sources.\\n• Don't Share Credentials or OTPs: Never share your One-Time Passwords (OTPs), PINs, or login details with anyone.\\n• Don't Over-Share Personal Data: Limit the amount of personal information you post openly on social media to avoid identity theft.\\n• Don't Ignore Cyber Ethics: Never share, copy, or distribute copyrighted materials, and refrain from downloading unauthorized pirated programs."
        }
      ],
      summary: "By following these simple Do's and Don'ts, you can significantly reduce your risk of falling victim to cyberattacks and maintain a positive, secure digital presence."
    },
    quiz: [
      {
        id: 701,
        type: "true-false",
        question: "It is safe to check your bank account or make online purchases while connected to a public coffee shop Wi-Fi without a VPN.",
        options: ["True", "False"],
        correctAnswer: "False",
        explanation: "Never use public Wi-Fi for finances. Unsecured public networks make it easy for hackers to intercept your sensitive data."
      },
      {
        id: 702,
        type: "mcq",
        question: "Which of the following is a recommended 'Do' for cybersecurity?",
        options: [
          "Reusing the same password for all accounts.",
          "Activating Multi-Factor Authentication (MFA) across your accounts.",
          "Sharing your OTP with friends if they need it.",
          "Keeping your social media profiles completely public."
        ],
        correctIndex: 1,
        explanation: "Always activate MFA across your university accounts, emails, and social media platforms to add an extra layer of security."
      }
    ]
  },`;

content = content.replace('const modules = [\n', 'const modules = [\n' + newModule + '\n');

// Safely bump the order: parse the file with regex, replacing only 'order: x'
content = content.replace(/order:\s*(\d+)/g, (match, p1) => {
  const oldOrder = parseInt(p1, 10);
  // since the new module is added, the original 1-6 are now matched. 
  // Wait! The new module is ALSO matched. Let's fix the order of the new module manually after.
  return `order: ${oldOrder + 1}`;
});

// The new module's order was 1, so it became 2. Let's find it by id: 7 and fix it.
content = content.replace(/id: 7,\s*order: 2/, 'id: 7,\n    order: 1');

fs.writeFileSync(file, content);
console.log('Modified modules.js');
