// Powered by OnSpace.AI
// Static course content (mocked data source)
import { Course } from './types';

export const COURSES: Course[] = [
  {
    id: 'c1',
    title: 'Foundations of Personal Finance',
    subtitle: 'Money skills for everyday life',
    description:
      'Build strong money habits. Learn budgeting, saving, and smart spending with practical, real-world examples you can apply today.',
    category: 'free',
    level: 'Beginner',
    image:
      'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=800&q=80',
    lessons: [
      {
        id: 'c1l1',
        title: 'Building Your First Budget',
        summary: 'Understand income, expenses, and the 50/30/20 rule.',
        chapters: [
          {
            heading: 'Why Budgeting Matters',
            body: 'A budget is simply a plan for your money. Without a plan, money slips away on small purchases that add up quickly. A budget gives every birr a job, so you stay in control instead of wondering where it went at the end of the month.',
          },
          {
            heading: 'The 50/30/20 Rule',
            body: 'A simple starting framework: spend 50% of income on needs (food, rent, transport), 30% on wants (entertainment, dining out), and save 20% for the future. Adjust the percentages to fit your situation, but always pay your savings first.',
          },
          {
            heading: 'Tracking Your Spending',
            body: 'For one week, write down everything you spend. Awareness alone reduces wasteful spending. Review your list, group similar costs, and identify one category you can trim without hurting your quality of life.',
          },
        ],
        quiz: [
          {
            id: 'c1l1q1',
            question: 'What does a budget do for your money?',
            options: [
              'Gives every birr a job',
              'Doubles your income automatically',
              'Removes the need to save',
              'Hides your expenses',
            ],
            correctIndex: 0,
          },
          {
            id: 'c1l1q2',
            question: 'In the 50/30/20 rule, what is the 20% for?',
            options: ['Wants', 'Needs', 'Savings', 'Taxes'],
            correctIndex: 2,
          },
          {
            id: 'c1l1q3',
            question: 'A good first step to control spending is to:',
            options: [
              'Stop eating',
              'Track everything you spend for a week',
              'Borrow more money',
              'Ignore small purchases',
            ],
            correctIndex: 1,
          },
        ],
      },
      {
        id: 'c1l2',
        title: 'The Power of Saving Early',
        summary: 'Discover compound growth and emergency funds.',
        chapters: [
          {
            heading: 'Compound Growth',
            body: 'When you save and earn returns, those returns also start earning. This snowball effect is called compounding. Starting early, even with small amounts, beats starting late with larger amounts because time does the heavy lifting.',
          },
          {
            heading: 'Your Emergency Fund',
            body: 'Aim to set aside three to six months of essential expenses. This cushion protects you from debt when surprises happen, such as a medical bill or sudden loss of income. Keep it somewhere safe and easy to access.',
          },
        ],
        quiz: [
          {
            id: 'c1l2q1',
            question: 'Compounding means:',
            options: [
              'Returns earn more returns over time',
              'Spending more each month',
              'Paying higher taxes',
              'Saving only once',
            ],
            correctIndex: 0,
          },
          {
            id: 'c1l2q2',
            question: 'A healthy emergency fund covers:',
            options: [
              'One day of expenses',
              'Three to six months of essential expenses',
              'Ten years of luxury',
              'Nothing at all',
            ],
            correctIndex: 1,
          },
        ],
      },
    ],
  },
  {
    id: 'c2',
    title: 'Digital Productivity Essentials',
    subtitle: 'Work smarter, not harder',
    description:
      'Master focus, time-blocking, and modern tools to get more done with less stress. Perfect for students and professionals.',
    category: 'free',
    level: 'Beginner',
    image:
      'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=800&q=80',
    lessons: [
      {
        id: 'c2l1',
        title: 'Beating Distraction',
        summary: 'Learn deep work and how to protect your attention.',
        chapters: [
          {
            heading: 'Attention Is a Resource',
            body: 'Your attention is limited and valuable. Every notification pulls a small piece of it. Protecting blocks of uninterrupted time lets you do your best, most meaningful work.',
          },
          {
            heading: 'Deep Work Blocks',
            body: 'Schedule 60 to 90 minute focus blocks. Silence notifications, close extra tabs, and work on a single task. Short breaks between blocks restore energy and keep your mind sharp.',
          },
        ],
        quiz: [
          {
            id: 'c2l1q1',
            question: 'Deep work blocks should be roughly:',
            options: ['5 minutes', '60 to 90 minutes', 'All day non-stop', '1 second'],
            correctIndex: 1,
          },
          {
            id: 'c2l1q2',
            question: 'What harms your focus the most?',
            options: ['Single tasking', 'Constant notifications', 'Short breaks', 'A clear plan'],
            correctIndex: 1,
          },
        ],
      },
    ],
  },
  {
    id: 'c3',
    title: 'Entrepreneurship Masterclass',
    subtitle: 'From idea to launched business',
    description:
      'A complete blueprint for validating ideas, finding customers, and building a sustainable business. Premium content with advanced frameworks.',
    category: 'premium',
    level: 'Advanced',
    image:
      'https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&w=800&q=80',
    lessons: [
      {
        id: 'c3l1',
        title: 'Validating Your Idea',
        summary: 'Test demand before you build anything.',
        chapters: [
          {
            heading: 'The Riskiest Assumption',
            body: 'Every business idea rests on assumptions. The most dangerous one is that people actually want what you plan to build. Identify this assumption first and design a cheap, fast way to test it.',
          },
          {
            heading: 'Talking to Customers',
            body: 'Interview at least ten potential customers. Ask about their problems, not your solution. Listen for pain that is frequent, urgent, and expensive. That pain is where real opportunity lives.',
          },
        ],
        quiz: [
          {
            id: 'c3l1q1',
            question: 'The riskiest assumption is usually that:',
            options: [
              'People want what you will build',
              'Your logo looks good',
              'Your office is large',
              'You have many tabs open',
            ],
            correctIndex: 0,
          },
          {
            id: 'c3l1q2',
            question: 'When interviewing customers you should ask about:',
            options: ['Your solution', 'Their problems', 'Your salary', 'The weather'],
            correctIndex: 1,
          },
        ],
      },
      {
        id: 'c3l2',
        title: 'Finding Your First Customers',
        summary: 'Channels, messaging, and early traction.',
        chapters: [
          {
            heading: 'Go Where They Are',
            body: 'Your first customers already gather somewhere, online or offline. Find those communities and become genuinely useful before you ever sell. Trust earned early becomes revenue later.',
          },
          {
            heading: 'A Clear Message',
            body: 'State who you help, the problem you solve, and the result you deliver in one sentence. If a stranger cannot repeat it back, simplify until they can.',
          },
        ],
        quiz: [
          {
            id: 'c3l2q1',
            question: 'A strong message states:',
            options: [
              'Who you help, the problem, and the result',
              'Only your company history',
              'A list of features only',
              'Nothing specific',
            ],
            correctIndex: 0,
          },
          {
            id: 'c3l2q2',
            question: 'Before selling to a community you should:',
            options: ['Spam everyone', 'Be genuinely useful', 'Disappear', 'Raise prices'],
            correctIndex: 1,
          },
        ],
      },
    ],
  },
  {
    id: 'c4',
    title: 'Data Analysis with Spreadsheets',
    subtitle: 'Turn raw data into decisions',
    description:
      'Premium hands-on course covering formulas, pivot tables, and dashboards to make confident, data-driven decisions.',
    category: 'premium',
    level: 'Intermediate',
    image:
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
    lessons: [
      {
        id: 'c4l1',
        title: 'Thinking in Tables',
        summary: 'Clean, structured data is the foundation.',
        chapters: [
          {
            heading: 'One Fact Per Cell',
            body: 'Good analysis starts with clean data. Each column should hold one type of value and each row one record. Avoid mixing text and numbers in the same column, and never leave headers blank.',
          },
          {
            heading: 'Summaries That Matter',
            body: 'Raw rows rarely answer questions. Use simple summaries such as totals, averages, and counts to reveal patterns. Always ask what decision the number will support before you calculate it.',
          },
        ],
        quiz: [
          {
            id: 'c4l1q1',
            question: 'Clean spreadsheet data means:',
            options: [
              'One type of value per column',
              'Random values everywhere',
              'No headers ever',
              'Mixing text and numbers freely',
            ],
            correctIndex: 0,
          },
          {
            id: 'c4l1q2',
            question: 'Before calculating a number, ask:',
            options: [
              'What decision it supports',
              'Nothing at all',
              'How to hide it',
              'How to delete the data',
            ],
            correctIndex: 0,
          },
        ],
      },
    ],
  },
];

export const PREMIUM_PRICE_ETB = 1000;
export const TELEBIRR_DIAL_STRING = 'tel:*127*1*1*0911132041*1000%23';
