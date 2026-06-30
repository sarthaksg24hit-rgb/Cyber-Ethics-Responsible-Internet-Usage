const modules = [
  {
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
    quiz: [
      {
        id: 701,
        type: "true-false",
        question: "It is safe to check your bank account or make online purchases while connected to a public coffee shop Wi-Fi without a VPN.",
        correctAnswer: false,
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
  },
  {
    id: 1,
    title: "Healthy Cyber Use & Online–Offline Balance",
    shortDescription: "Learn to maintain a healthy relationship with technology and balance your digital and real-world life.",
    icon: "Scale",
    estimatedMinutes: 15,
    order: 2,
    notes: {
      introduction: "In today's hyper-connected world, technology is woven into nearly every aspect of our lives — from education and work to socialising and entertainment. While the internet offers incredible opportunities, excessive or unbalanced use can lead to negative consequences for our mental health, relationships, and academic performance.",
      keyPoints: [
        {
          heading: "Understanding Screen Time",
          content: "The average college student spends 8–10 hours per day on screens. While some of this is productive (studying, research), a significant portion may be passive scrolling or compulsive checking. Tracking your screen time is the first step toward awareness."
        },
        {
          heading: "Signs of Unhealthy Cyber Use",
          content: "Warning signs include: losing track of time online, neglecting responsibilities or sleep, feeling anxious when disconnected, using the internet to escape negative emotions, and declining academic performance."
        },
        {
          heading: "The Dopamine Loop",
          content: "Social media platforms and apps are designed to trigger dopamine releases through likes, notifications, and infinite scrolling. Understanding this design pattern helps you recognise when you're being manipulated into spending more time online."
        },
        {
          heading: "Strategies for Balance",
          content: "Set specific times for checking social media. Use app timers and 'Do Not Disturb' modes. Create tech-free zones (bedroom, dining table). Schedule offline activities — exercise, hobbies, face-to-face socialising. Practice the 20-20-20 rule: every 20 minutes, look at something 20 feet away for 20 seconds."
        },
        {
          heading: "Digital Wellness Tools",
          content: "Most devices now include built-in digital wellness features: Screen Time (iOS), Digital Wellbeing (Android), Focus modes, and website blockers. These tools can help you set boundaries and track your habits over time."
        }
      ],
      examples: [
        "A student sets a 30-minute daily limit for Instagram and uses the saved time for a gym routine.",
        "A study group agrees to keep phones face-down during sessions, improving focus and collaboration.",
        "Using Forest app to gamify staying off your phone during lectures."
      ],
      summary: "Healthy cyber use isn't about avoiding technology — it's about using it intentionally. By setting boundaries and building awareness, you can enjoy the benefits of the digital world without sacrificing your wellbeing."
    },
    videoUrl: "https://www.youtube.com/embed/RHUbOjmO7nw",
    videoTitle: "Digital Wellness: Finding Balance in a Connected World",
    quiz: [
      {
        id: 101,
        type: "mcq",
        question: "What is the 20-20-20 rule designed to help with?",
        options: [
          "Managing social media time",
          "Reducing digital eye strain",
          "Improving typing speed",
          "Organising files on your computer"
        ],
        correctIndex: 1,
        explanation: "The 20-20-20 rule (every 20 minutes, look at something 20 feet away for 20 seconds) is specifically designed to reduce digital eye strain from prolonged screen use."
      },
      {
        id: 102,
        type: "mcq",
        question: "Which of the following is a sign of unhealthy cyber use?",
        options: [
          "Using the internet for academic research",
          "Video calling family members regularly",
          "Feeling anxious when unable to check your phone",
          "Using productivity apps to manage tasks"
        ],
        correctIndex: 2,
        explanation: "Feeling anxious when disconnected from your device is a key indicator of unhealthy dependency on technology. The other options describe healthy, productive uses of technology."
      },
      {
        id: 103,
        type: "true-false",
        question: "Social media platforms are intentionally designed to maximise user engagement through dopamine-triggering features.",
        correctAnswer: true,
        explanation: "Yes — features like infinite scrolling, push notifications, likes, and algorithmic feeds are deliberately designed to trigger dopamine releases and keep users engaged for longer periods."
      },
      {
        id: 104,
        type: "mcq",
        question: "What is the average daily screen time for college students?",
        options: [
          "2–3 hours",
          "4–5 hours",
          "8–10 hours",
          "12–14 hours"
        ],
        correctIndex: 2,
        explanation: "Research shows that the average college student spends approximately 8–10 hours per day on screens, including both academic and leisure use."
      },
      {
        id: 105,
        type: "mcq",
        question: "Which strategy helps maintain a healthy online–offline balance?",
        options: [
          "Keeping your phone beside your bed while sleeping",
          "Checking social media first thing every morning",
          "Creating tech-free zones in your living space",
          "Having notifications on for all apps"
        ],
        correctIndex: 2,
        explanation: "Creating tech-free zones (like the bedroom or dining area) helps establish physical boundaries that encourage offline engagement and better sleep habits."
      },
      {
        id: 106,
        type: "true-false",
        question: "Digital wellness is about completely avoiding technology.",
        correctAnswer: false,
        explanation: "Digital wellness is not about avoidance — it's about intentional and balanced use of technology. The goal is to use tech in ways that support rather than undermine your wellbeing."
      },
      {
        id: 107,
        type: "mcq",
        question: "Which built-in feature helps track and limit your app usage on smartphones?",
        options: [
          "Airplane Mode",
          "Screen Time / Digital Wellbeing",
          "Bluetooth settings",
          "Night mode / Dark mode"
        ],
        correctIndex: 1,
        explanation: "Screen Time (iOS) and Digital Wellbeing (Android) are built-in features specifically designed to help users track their usage patterns and set app limits."
      }
    ]
  },
  {
    id: 2,
    title: "Online Identity & Digital Footprint",
    shortDescription: "Understand how your online actions create a permanent digital footprint and how to manage your digital identity.",
    icon: "Fingerprint",
    estimatedMinutes: 15,
    order: 3,
    notes: {
      introduction: "Every time you go online — posting on social media, signing up for a service, or even just browsing — you leave behind traces of information. This collection of data is your digital footprint, and it forms your online identity. Understanding and managing this footprint is crucial for your personal and professional future.",
      keyPoints: [
        {
          heading: "Active vs. Passive Digital Footprints",
          content: "Your active footprint consists of data you intentionally share: social media posts, comments, profile information. Your passive footprint is data collected without your direct input: browsing history, cookies, location data, IP addresses, and metadata from your devices."
        },
        {
          heading: "Permanence of Digital Information",
          content: "The internet has a long memory. Even deleted posts can be cached, screenshotted, or archived. The Wayback Machine, Google cache, and other tools can retrieve content long after it was removed. Always assume that anything you post online could be permanent."
        },
        {
          heading: "Impact on Future Opportunities",
          content: "70% of employers now screen candidates' social media profiles. Universities, scholarship committees, and internship programs also review online presence. A single inappropriate post from years ago can affect job prospects, professional relationships, and personal reputation."
        },
        {
          heading: "Managing Your Online Identity",
          content: "Regularly Google yourself to see what's public. Adjust privacy settings on all social media platforms. Think before you post — would you be comfortable with a future employer seeing this? Create a positive digital presence through professional profiles (LinkedIn), thoughtful content, and community involvement."
        },
        {
          heading: "Understanding Data Collection",
          content: "Companies collect vast amounts of data about you through cookies, trackers, and third-party sharing. This data is used for targeted advertising, personalised content, and sometimes sold to data brokers. Understanding what data is collected empowers you to make informed decisions about which services you use."
        }
      ],
      examples: [
        "A graduate loses a job offer because the employer found offensive tweets from their first year of college.",
        "A student builds a strong LinkedIn profile showcasing projects and volunteer work, attracting internship opportunities.",
        "Using a browser extension like Privacy Badger to visualise and block trackers on websites you visit."
      ],
      summary: "Your digital footprint is a reflection of your online identity. By being intentional about what you share and understanding how your data is collected and used, you can build a positive online presence that supports your future goals."
    },
    videoUrl: "https://www.youtube.com/embed/ixxb4BWCBwY",
    videoTitle: "What is Your Digital Footprint?",
    quiz: [
      {
        id: 201,
        type: "mcq",
        question: "What is a 'passive' digital footprint?",
        options: [
          "Information you deliberately post on social media",
          "Data collected about you without your direct input",
          "Your email address used for sign-ups",
          "Comments you leave on blogs"
        ],
        correctIndex: 1,
        explanation: "A passive digital footprint is data collected about you automatically — such as browsing history, cookies, IP addresses, and location data — without you directly and intentionally sharing it."
      },
      {
        id: 202,
        type: "true-false",
        question: "Once you delete a social media post, it is permanently removed from the internet.",
        correctAnswer: false,
        explanation: "False — deleted posts can still exist in cached versions, screenshots, archives (like the Wayback Machine), or on other people's devices. The internet has a long memory."
      },
      {
        id: 203,
        type: "mcq",
        question: "What percentage of employers reportedly screen candidates' social media profiles?",
        options: [
          "About 20%",
          "About 40%",
          "About 70%",
          "About 95%"
        ],
        correctIndex: 2,
        explanation: "Research indicates that approximately 70% of employers now review candidates' social media profiles as part of their hiring process."
      },
      {
        id: 204,
        type: "mcq",
        question: "Which of the following is the BEST way to manage your online identity?",
        options: [
          "Never use the internet",
          "Use fake names on all platforms",
          "Regularly review your privacy settings and think before you post",
          "Delete all your social media accounts"
        ],
        correctIndex: 2,
        explanation: "The most effective approach is proactive management — regularly reviewing privacy settings, being thoughtful about what you post, and building a positive online presence rather than avoiding the internet entirely."
      },
      {
        id: 205,
        type: "true-false",
        question: "Cookies are small files stored on your device that help websites track your browsing behaviour.",
        correctAnswer: true,
        explanation: "Correct — cookies are small text files stored by your browser that allow websites to remember your preferences, track your browsing activity, and enable targeted advertising."
      },
      {
        id: 206,
        type: "mcq",
        question: "Why is it recommended to regularly search for your own name online?",
        options: [
          "To boost your search engine ranking",
          "To find and address any negative or inaccurate information about you",
          "To increase your social media followers",
          "To check if your accounts have been hacked"
        ],
        correctIndex: 1,
        explanation: "Regularly Googling yourself helps you stay aware of what information about you is publicly visible, allowing you to address any negative, inaccurate, or outdated content."
      },
      {
        id: 207,
        type: "mcq",
        question: "What are data brokers?",
        options: [
          "People who fix broken computers",
          "Companies that collect and sell personal data",
          "Government agencies that regulate the internet",
          "Software programs that protect your privacy"
        ],
        correctIndex: 1,
        explanation: "Data brokers are companies that collect personal information from various sources and sell it to other businesses for marketing, advertising, and other purposes."
      }
    ]
  },
  {
    id: 3,
    title: "Cyber Relationships & Netiquette",
    shortDescription: "Navigate online relationships with respect and learn the unwritten rules of digital communication.",
    icon: "Users",
    estimatedMinutes: 15,
    order: 4,
    notes: {
      introduction: "The internet has transformed how we form and maintain relationships. From group chats and social media to email and video calls, digital communication is central to modern life. However, the lack of face-to-face cues can lead to misunderstandings, conflicts, and even harmful behaviour. Netiquette — network etiquette — provides guidelines for respectful and effective online interaction.",
      keyPoints: [
        {
          heading: "Understanding Netiquette",
          content: "Netiquette is the set of social conventions that govern polite behaviour in online environments. Core principles include: remember there's a real person behind every screen, be respectful and constructive, don't type anything you wouldn't say in person, use appropriate tone and formatting, and respect others' time and bandwidth."
        },
        {
          heading: "Tone and Misinterpretation",
          content: "Text-based communication lacks vocal tone, facial expressions, and body language — cues that account for 70–90% of in-person communication. This makes messages easily misinterpreted. Use clear language, emojis where appropriate (in informal contexts), and avoid sarcasm that might not translate well in text."
        },
        {
          heading: "Building Healthy Online Relationships",
          content: "Healthy online relationships are built on mutual respect, trust, and healthy boundaries. Be wary of oversharing personal information early on. Verify identities when possible. Maintain the same standards of respect you'd expect in person. Remember that not everyone online is who they claim to be."
        },
        {
          heading: "Professional vs. Casual Communication",
          content: "Adapt your communication style to the context. Academic and professional emails should use proper grammar, formal greetings, and clear subject lines. Casual messaging with friends allows for more informal language. Knowing when to switch between these modes is an important digital literacy skill."
        },
        {
          heading: "Group Dynamics Online",
          content: "Online groups (class chats, project teams, forums) have unique dynamics. Avoid dominating conversations, stay on topic, acknowledge others' contributions, and resolve conflicts privately rather than in public channels. Be mindful of time zones and notification fatigue."
        }
      ],
      examples: [
        "Writing a professional email to a professor: 'Dear Professor Smith, I hope this email finds you well. I have a question regarding the assignment due date...' vs. 'hey prof when is the hw due lol'",
        "A group project chat where members use @mentions for specific people and keep off-topic chat in a separate channel.",
        "Using 'I' statements in online disagreements: 'I see it differently because...' rather than 'You're wrong about...'"
      ],
      summary: "Good netiquette is about treating others online with the same respect and consideration you'd show in person. By being mindful of tone, context, and the human behind the screen, you can build positive and productive digital relationships."
    },
    videoUrl: "https://www.youtube.com/embed/CWbtbycHZok?si=U3V-e-mRIgEynyhX",
    videoTitle: "Netiquette: The Do's and Don'ts of Online Communication",
    quiz: [
      {
        id: 301,
        type: "mcq",
        question: "What does 'netiquette' refer to?",
        options: [
          "A type of internet security software",
          "The rules of polite behaviour when communicating online",
          "A social media platform",
          "The speed of an internet connection"
        ],
        correctIndex: 1,
        explanation: "Netiquette (network + etiquette) refers to the accepted social conventions and guidelines for polite, respectful behaviour in online communication."
      },
      {
        id: 302,
        type: "mcq",
        question: "Why are text messages easily misinterpreted?",
        options: [
          "Because people use too many emojis",
          "Because text lacks vocal tone, facial expressions, and body language",
          "Because of spelling errors",
          "Because messages are too short"
        ],
        correctIndex: 1,
        explanation: "Text-based communication strips away 70–90% of the nonverbal cues we rely on for understanding intent and emotion, making misinterpretation common."
      },
      {
        id: 303,
        type: "true-false",
        question: "It's acceptable to use informal language like 'hey' and abbreviations in professional emails to professors.",
        correctAnswer: false,
        explanation: "Professional and academic communication should maintain formal standards including proper greetings, complete sentences, and correct grammar. Informal language is appropriate for casual conversations with friends."
      },
      {
        id: 304,
        type: "mcq",
        question: "What is the best approach when you disagree with someone in an online discussion?",
        options: [
          "Use capital letters to make your point stronger",
          "Ignore their message completely",
          "Use 'I' statements and express your perspective respectfully",
          "Share the disagreement publicly to get others' opinions"
        ],
        correctIndex: 2,
        explanation: "Using 'I' statements (e.g., 'I see it differently because...') keeps the conversation respectful and focused on ideas rather than personal attacks."
      },
      {
        id: 305,
        type: "true-false",
        question: "In online group chats, conflicts should ideally be resolved through private messages rather than in the public channel.",
        correctAnswer: true,
        explanation: "Resolving conflicts privately prevents escalation, avoids putting others in an uncomfortable position, and allows for more thoughtful and empathetic communication."
      },
      {
        id: 306,
        type: "mcq",
        question: "Which practice demonstrates good netiquette in a group project chat?",
        options: [
          "Sending multiple messages in quick succession to get attention",
          "Using @mentions to direct messages to specific team members",
          "Sharing memes and jokes frequently to keep the mood light",
          "Replying to every message with just 'ok'"
        ],
        correctIndex: 1,
        explanation: "Using @mentions helps direct information to the right people, reduces notification noise for others, and keeps communication organized and efficient."
      },
      {
        id: 307,
        type: "mcq",
        question: "What should you be cautious about when building new online relationships?",
        options: [
          "Using proper grammar",
          "Sharing too much personal information too quickly",
          "Responding to messages promptly",
          "Using video calls instead of text"
        ],
        correctIndex: 1,
        explanation: "Oversharing personal information early in an online relationship can put you at risk, as you may not yet have verified the other person's identity or intentions."
      }
    ]
  },
  {
    id: 4,
    title: "Cyberbullying & Respectful Communication",
    shortDescription: "Recognise cyberbullying in all its forms and learn how to respond, support others, and promote respectful digital spaces.",
    icon: "ShieldAlert",
    estimatedMinutes: 15,
    order: 5,
    notes: {
      introduction: "Cyberbullying is the use of digital devices, platforms, and technologies to harass, threaten, embarrass, or target another person. Unlike traditional bullying, cyberbullying can happen 24/7, reach a wide audience instantly, and leave a permanent digital record. Understanding its forms, impact, and response strategies is essential for creating safe online communities.",
      keyPoints: [
        {
          heading: "Forms of Cyberbullying",
          content: "Cyberbullying takes many forms: harassment (repeated offensive messages), doxing (publishing private information), exclusion (deliberately leaving someone out of online groups), impersonation (creating fake profiles), outing (sharing someone's secrets publicly), cyberstalking (persistent monitoring and contact), and trolling (posting inflammatory content to provoke reactions)."
        },
        {
          heading: "The Impact of Cyberbullying",
          content: "Victims of cyberbullying can experience anxiety, depression, low self-esteem, academic decline, social withdrawal, sleep disturbances, and in severe cases, suicidal thoughts. The 24/7 nature of digital harassment means victims often feel they have no escape, as the bullying follows them home."
        },
        {
          heading: "The Bystander Effect Online",
          content: "In online spaces, the bystander effect is amplified — people may witness bullying but feel it's 'not their business' or that someone else will intervene. However, bystander intervention is one of the most effective ways to stop cyberbullying. Even a simple supportive message to the victim can make a significant difference."
        },
        {
          heading: "How to Respond to Cyberbullying",
          content: "If you're being cyberbullied: don't respond or retaliate, save evidence (screenshots, URLs), block the person, report to the platform, talk to someone you trust (friend, family, counsellor), and contact authorities if threats are involved. If you witness it: support the victim privately, report the behaviour, and don't share or amplify the harmful content."
        },
        {
          heading: "Creating Respectful Digital Spaces",
          content: "Everyone has a role in fostering positive online communities. Think before posting or commenting. Call out disrespectful behaviour when you see it. Amplify positive voices. Use platform reporting tools. Model the behaviour you want to see online. Remember that behind every username is a real person with real feelings."
        }
      ],
      examples: [
        "A student receives anonymous threatening messages through a fake social media account — this is cyberstalking and impersonation.",
        "A classmate screenshots a private conversation and shares it in a group chat to embarrass someone — this is outing.",
        "A bystander sends a private message of support to someone being trolled in a comment section, helping them feel less alone."
      ],
      summary: "Cyberbullying is a serious issue that affects millions of students. By understanding its forms, knowing how to respond, and actively choosing to promote respectful communication, you can be part of the solution and help create safer digital spaces for everyone."
    },
    videoUrl: "https://www.youtube.com/embed/qFcVyNz60a8",
    videoTitle: "Understanding Cyberbullying and Its Effects",
    quiz: [
      {
        id: 401,
        type: "mcq",
        question: "Which of the following is an example of 'doxing'?",
        options: [
          "Sending someone a funny meme",
          "Publishing someone's home address and phone number online without their consent",
          "Blocking someone on social media",
          "Unfriending someone on Facebook"
        ],
        correctIndex: 1,
        explanation: "Doxing (or doxxing) is the act of publicly revealing someone's private personal information — like their address, phone number, or real name — without their consent, often with malicious intent."
      },
      {
        id: 402,
        type: "true-false",
        question: "Cyberbullying can only happen on social media platforms.",
        correctAnswer: false,
        explanation: "Cyberbullying can happen through any digital channel: text messages, email, gaming platforms, forums, messaging apps, and even through collaborative tools like Google Docs."
      },
      {
        id: 403,
        type: "mcq",
        question: "What is the FIRST thing you should do if you're being cyberbullied?",
        options: [
          "Retaliate with similar messages",
          "Delete all your social media accounts",
          "Save evidence and don't respond to the bully",
          "Confront the bully in person"
        ],
        correctIndex: 2,
        explanation: "The recommended first steps are to not respond (which can escalate the situation) and to save evidence (screenshots, messages) which can be important for reporting to platforms or authorities."
      },
      {
        id: 404,
        type: "mcq",
        question: "Why is the bystander effect particularly strong in online spaces?",
        options: [
          "Because people don't use real names online",
          "Because it's easy to assume someone else will help and the diffusion of responsibility is stronger",
          "Because online platforms prevent intervention",
          "Because cyberbullying isn't visible to bystanders"
        ],
        correctIndex: 1,
        explanation: "In online spaces with many observers, the diffusion of responsibility is amplified — each person assumes others will intervene, leading to a situation where nobody does."
      },
      {
        id: 405,
        type: "true-false",
        question: "Sending a supportive private message to someone being cyberbullied is an effective form of bystander intervention.",
        correctAnswer: true,
        explanation: "Research shows that even a simple private message of support can significantly reduce the negative impact of cyberbullying on the victim by helping them feel less isolated."
      },
      {
        id: 406,
        type: "mcq",
        question: "What distinguishes cyberbullying from traditional bullying?",
        options: [
          "Cyberbullying is less harmful",
          "Cyberbullying can happen 24/7 and reach a large audience instantly",
          "Cyberbullying only affects adults",
          "Cyberbullying always involves violence"
        ],
        correctIndex: 1,
        explanation: "Unlike traditional bullying that typically stops at the school gate, cyberbullying can follow victims home, happen around the clock, reach a wide audience instantly, and create permanent digital records."
      },
      {
        id: 407,
        type: "mcq",
        question: "What is 'trolling' in the context of cyberbullying?",
        options: [
          "Creating educational content online",
          "Posting deliberately inflammatory or offensive content to provoke emotional reactions",
          "Using a VPN to browse anonymously",
          "Playing multiplayer games online"
        ],
        correctIndex: 1,
        explanation: "Trolling involves deliberately posting provocative, offensive, or disruptive content with the intent of upsetting others and eliciting emotional reactions for the troll's amusement."
      }
    ]
  },
  {
    id: 5,
    title: "Online Privacy & Security",
    shortDescription: "Protect yourself online by understanding passwords, phishing, scams, and essential security practices.",
    icon: "Lock",
    estimatedMinutes: 18,
    order: 6,
    notes: {
      introduction: "In an era of increasing data breaches, identity theft, and sophisticated cyber attacks, understanding online privacy and security is no longer optional — it's essential. This module covers the practical skills you need to protect your personal information, recognise threats, and stay safe online.",
      keyPoints: [
        {
          heading: "Password Security",
          content: "Strong passwords are your first line of defense. Use at least 12 characters with a mix of uppercase, lowercase, numbers, and symbols. Never reuse passwords across sites. Use a password manager (like Bitwarden or 1Password) to generate and store unique passwords. Enable two-factor authentication (2FA) wherever available — it adds a crucial second layer of security."
        },
        {
          heading: "Recognising Phishing Attacks",
          content: "Phishing is an attempt to steal sensitive information by posing as a trustworthy entity. Red flags include: urgent language ('Your account will be closed!'), suspicious sender addresses (misspellings, unfamiliar domains), requests for personal information, unexpected attachments, and links that don't match the claimed destination. Always hover over links before clicking."
        },
        {
          heading: "Common Online Scams",
          content: "Be aware of: fake shopping websites (too-good-to-be-true deals), romance scams (building fake relationships to extract money), scholarship scams (fake awards requiring fees), tech support scams (fake warnings about viruses), and social engineering (manipulating people into revealing confidential information)."
        },
        {
          heading: "Protecting Your Privacy",
          content: "Review app permissions regularly — does a flashlight app really need access to your contacts? Use privacy-focused browsers and search engines. Be selective about what personal information you share online. Read privacy policies (at least the key points). Use encrypted messaging apps for sensitive conversations. Be cautious with public Wi-Fi — use a VPN."
        },
        {
          heading: "What to Do If You're Compromised",
          content: "If you suspect a breach: change passwords immediately (starting with email and financial accounts), enable 2FA, check for unauthorised activity, report to the platform and relevant authorities, monitor your credit/financial statements, and alert contacts if your accounts were used to send malicious messages."
        }
      ],
      examples: [
        "A phishing email disguised as a university IT notice asking students to 'verify' their login credentials through a fake portal.",
        "A student uses a password manager to maintain unique 16-character passwords for all 30+ of their online accounts.",
        "Recognising a scam: receiving an email about winning a scholarship you never applied for, which asks for a 'processing fee'."
      ],
      summary: "Online privacy and security require ongoing vigilance and good habits. By using strong unique passwords, recognising phishing attempts, understanding common scams, and protecting your personal data, you significantly reduce your risk of becoming a victim of cybercrime."
    },
    videoUrl: "https://www.youtube.com/embed/aO858HyFbKI",
    videoTitle: "Cyber Security: Passwords, Phishing, and Protecting Yourself Online",
    quiz: [
      {
        id: 501,
        type: "mcq",
        question: "What is the recommended minimum length for a strong password?",
        options: [
          "6 characters",
          "8 characters",
          "12 characters",
          "4 characters"
        ],
        correctIndex: 2,
        explanation: "Security experts recommend passwords of at least 12 characters, combining uppercase, lowercase, numbers, and symbols. Longer passwords are exponentially harder to crack."
      },
      {
        id: 502,
        type: "mcq",
        question: "Which is a common red flag of a phishing email?",
        options: [
          "It comes from a known contact",
          "It has correct spelling and grammar",
          "It creates a sense of urgency and asks you to click a link",
          "It relates to a service you actually use"
        ],
        correctIndex: 2,
        explanation: "Phishing emails commonly create artificial urgency ('Act now or your account will be closed!') and include links to fake websites designed to steal your credentials."
      },
      {
        id: 503,
        type: "true-false",
        question: "Using the same strong password across multiple websites is a safe practice.",
        correctAnswer: false,
        explanation: "Even a strong password becomes a vulnerability if reused. When one site is breached, attackers try those credentials on other sites (credential stuffing). Use unique passwords for every account."
      },
      {
        id: 504,
        type: "mcq",
        question: "What does two-factor authentication (2FA) provide?",
        options: [
          "Encryption for your files",
          "A second layer of security beyond just a password",
          "Automatic virus scanning",
          "Faster internet connection"
        ],
        correctIndex: 1,
        explanation: "2FA adds a second verification step (like a code from an app, SMS, or biometric) on top of your password, making it much harder for attackers to access your account even if they know your password."
      },
      {
        id: 505,
        type: "mcq",
        question: "Why should you be cautious when using public Wi-Fi?",
        options: [
          "It's slower than home Wi-Fi",
          "It can drain your battery faster",
          "Unencrypted traffic can be intercepted by attackers on the same network",
          "It costs money to use"
        ],
        correctIndex: 2,
        explanation: "Public Wi-Fi networks are often unencrypted, meaning attackers on the same network can potentially intercept your data (man-in-the-middle attacks). Using a VPN encrypts your traffic and adds protection."
      },
      {
        id: 506,
        type: "true-false",
        question: "A password manager is a tool that securely stores and generates unique passwords for your accounts.",
        correctAnswer: true,
        explanation: "Password managers (like Bitwarden, 1Password, or LastPass) encrypt and store all your passwords, allowing you to use unique, complex passwords for every account without having to memorise them."
      },
      {
        id: 507,
        type: "mcq",
        question: "What should be your FIRST action if you suspect your email account has been hacked?",
        options: [
          "Delete the email account",
          "Post about it on social media",
          "Change your password immediately and enable 2FA",
          "Ignore it and hope it resolves itself"
        ],
        correctIndex: 2,
        explanation: "Immediately changing your password and enabling 2FA is the critical first step to regain control and prevent further unauthorised access. Then monitor for suspicious activity and alert contacts."
      },
      {
        id: 508,
        type: "mcq",
        question: "What is social engineering in the context of cybersecurity?",
        options: [
          "Building social media platforms",
          "Manipulating people into revealing confidential information",
          "Engineering software for social networks",
          "A type of encryption algorithm"
        ],
        correctIndex: 1,
        explanation: "Social engineering exploits human psychology rather than technical vulnerabilities. Attackers manipulate people into sharing passwords, clicking malicious links, or granting access through deception and trust exploitation."
      }
    ]
  },
  {
    id: 6,
    title: "Cyber Ethics & Copyright",
    shortDescription: "Understand intellectual property rights, plagiarism, fair use, and the ethics of content sharing in the digital age.",
    icon: "Copyright",
    estimatedMinutes: 15,
    order: 7,
    notes: {
      introduction: "The digital age has made it incredibly easy to copy, share, and distribute content — but ease of access doesn't equal permission. Understanding copyright, intellectual property, and the ethics of digital content is essential for academic integrity and responsible digital citizenship. This module explores what's legal, what's ethical, and how to navigate the grey areas.",
      keyPoints: [
        {
          heading: "Understanding Copyright",
          content: "Copyright is a legal right that grants the creator of original work exclusive rights to its use and distribution. Copyright applies automatically when a work is created — you don't need to register it. It covers: written works, music, art, photographs, software, videos, and more. Violating copyright can result in legal penalties, academic sanctions, and financial damages."
        },
        {
          heading: "Plagiarism in the Digital Age",
          content: "Plagiarism is presenting someone else's work, ideas, or words as your own. In the digital context, this includes: copying text from websites without attribution, submitting AI-generated content as your own work, using someone else's code without credit, and paraphrasing without citing sources. Universities take plagiarism extremely seriously — consequences range from failing grades to expulsion."
        },
        {
          heading: "Fair Use and Creative Commons",
          content: "Fair use allows limited use of copyrighted material without permission for purposes like education, criticism, commentary, and parody. However, fair use is not a blanket permission — factors considered include: purpose (commercial vs. educational), nature of the work, amount used, and effect on the market value. Creative Commons licenses provide a standardised way for creators to grant specific permissions for their work."
        },
        {
          heading: "Piracy and Illegal Downloads",
          content: "Downloading pirated movies, music, software, or textbooks is copyright infringement. Beyond being illegal, piracy hurts creators who depend on revenue from their work. Risks include: malware from pirated files, legal consequences (fines, lawsuits), university disciplinary action, and ethical implications of devaluing creative work."
        },
        {
          heading: "Ethical Content Sharing",
          content: "Share responsibly: credit original creators, use proper citations (APA, MLA, etc.), respect licensing terms, support creators by paying for content when required, and use legal alternatives (streaming services, open-source software, library resources). When in doubt, assume content is copyrighted and seek permission."
        }
      ],
      examples: [
        "A student finds a perfect code snippet on Stack Overflow and includes it in their project with proper attribution — this is ethical use.",
        "Downloading a textbook PDF from a pirate site instead of borrowing it from the university library — this is copyright infringement.",
        "Using a Creative Commons image (CC BY) in a presentation and crediting the photographer — this is proper use of openly licensed content."
      ],
      summary: "In the digital world, respecting copyright and intellectual property is both a legal obligation and an ethical responsibility. By understanding fair use, citing sources properly, avoiding piracy, and giving credit to creators, you uphold academic integrity and contribute to a culture that values and rewards creative work."
    },
    videoUrl: "https://www.youtube.com/embed/GPNWvU_IphU",
    videoTitle: "Copyright, Fair Use, and Creative Commons Explained",
    quiz: [
      {
        id: 601,
        type: "true-false",
        question: "Copyright protection is only granted when you officially register your work.",
        correctAnswer: false,
        explanation: "Copyright applies automatically as soon as an original work is created and fixed in a tangible form. Registration is not required for copyright protection, although it can provide additional legal benefits."
      },
      {
        id: 602,
        type: "mcq",
        question: "Which of the following is an example of plagiarism?",
        options: [
          "Quoting a source with proper citation",
          "Paraphrasing an article and including a reference",
          "Submitting AI-generated text as your own original writing without disclosure",
          "Using a Creative Commons image with attribution"
        ],
        correctIndex: 2,
        explanation: "Submitting AI-generated content as your own without disclosure is a form of plagiarism — you're presenting work that isn't originally yours without proper attribution."
      },
      {
        id: 603,
        type: "mcq",
        question: "What does 'fair use' allow?",
        options: [
          "Unlimited copying of any copyrighted material",
          "Limited use of copyrighted material for purposes like education, criticism, or commentary",
          "Free use of any content found on the internet",
          "The right to sell copies of copyrighted works"
        ],
        correctIndex: 1,
        explanation: "Fair use is a legal doctrine that allows limited use of copyrighted material without permission for specific purposes like education, commentary, criticism, and parody, subject to a four-factor test."
      },
      {
        id: 604,
        type: "mcq",
        question: "What is a Creative Commons license?",
        options: [
          "A type of software license for open-source code",
          "A standardised way for creators to grant specific permissions for their work",
          "A government regulation on internet content",
          "A social media platform for artists"
        ],
        correctIndex: 1,
        explanation: "Creative Commons licenses are standardised, easy-to-understand copyright licenses that allow creators to specify which rights they reserve and which they waive, enabling legal sharing and reuse of creative works."
      },
      {
        id: 605,
        type: "true-false",
        question: "Downloading pirated software is acceptable as long as you only use it for personal, non-commercial purposes.",
        correctAnswer: false,
        explanation: "Piracy is copyright infringement regardless of whether it's for personal or commercial use. It's illegal, can expose your device to malware, and deprives creators of fair compensation for their work."
      },
      {
        id: 606,
        type: "mcq",
        question: "If you find helpful code on Stack Overflow, what is the ethical way to use it?",
        options: [
          "Copy it directly without any changes or attribution",
          "Include it in your project with proper attribution to the original author",
          "Claim you wrote it yourself",
          "Avoid using it entirely"
        ],
        correctIndex: 1,
        explanation: "Stack Overflow content is licensed under Creative Commons. The ethical (and legally required) approach is to attribute the original author when you use their code."
      },
      {
        id: 607,
        type: "mcq",
        question: "What are the potential consequences of plagiarism at a university?",
        options: [
          "Only a verbal warning",
          "No consequences if it's a first offence",
          "Consequences ranging from failing grades to expulsion",
          "A small fine that can be paid online"
        ],
        correctIndex: 2,
        explanation: "Universities treat plagiarism as a serious academic offence. Consequences can include failing the assignment, failing the course, academic probation, suspension, or even expulsion depending on the severity and institution."
      }
    ]
  }
];

module.exports = { modules };
