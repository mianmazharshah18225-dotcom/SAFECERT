export const COMPANY = {
  name: 'SafeCert Skills Ltd',
  tagline: "Get Trained, Get Certified",
  subtitle: "Professional Training & Certification Provider in Luton",
  phone: '0800 123 4567',
  whatsapp: '+44 7918 428115',
  email: 'info@safecertskill.co.uk',
  supportEmail: 'support@safecertskill.co.uk',
  address: 'Luton, United Kingdom',
  location: 'Luton',
  duration: '1.5 Years',
  timing: '8:00 AM to 6:00 PM',
  trustpilot: {
    rating: 4.9,
    reviews: 12847,
    label: 'Excellent',
  },
  stats: [
    { value: '5,000+', label: 'Students Trained' },
    { value: 'Luton', label: 'Training Location' },
    { value: '1.5 Years', label: 'Program Duration' },
    { value: '98%', label: 'Pass Rate' },
  ],
}

export const CATEGORIES = [
  { id: 'firstaid', name: 'First Aid', icon: '🏥', href: '/courses?cat=firstaid', color: 'from-red-500 to-red-700' },
  { id: 'foodhygiene', name: 'Food & Hygiene', icon: '🍽️', href: '/courses?cat=foodhygiene', color: 'from-green-500 to-green-700' },
  { id: 'healthsafety', name: 'Health & Safety', icon: '⚠️', href: '/courses?cat=healthsafety', color: 'from-orange-500 to-orange-700' },
]

export const COURSES = [
  {
    id: 'first-aid',
    category: 'firstaid',
    title: 'First Aid Training',
    duration: '1.5 Years',
    price: '£1,200',
    originalPrice: '£1,500',
    level: 'Level 3',
    icon: '🏥',
    image: 'https://images.unsplash.com/photo-1584432810601-6c7f27d2362b?w=800&q=80',
    description: 'Comprehensive first aid training course. Learn essential life-saving skills including CPR, emergency response, and patient care. Perfect for those seeking a career in healthcare or emergency services.',
    features: ['CPR & AED Training', 'Emergency Response', 'Patient Care', 'Wound Management', 'Nationally Recognised Certificate'],
    popular: true,
    href: '/courses/first-aid',
  },
  {
    id: 'food-hygiene',
    category: 'foodhygiene',
    title: 'Food & Hygiene',
    duration: '1.5 Years',
    price: '£1,100',
    originalPrice: '£1,400',
    level: 'Level 2',
    icon: '🍽️',
    image: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800&q=80',
    description: 'Professional food safety and hygiene certification. Learn food handling, safety regulations, and hygiene standards essential for working in the food industry.',
    features: ['Food Safety Standards', 'Hygiene Practices', 'HACCP Principles', 'Allergen Awareness', 'Industry Recognised Certificate'],
    popular: true,
    href: '/courses/food-hygiene',
  },
  {
    id: 'health-safety',
    category: 'healthsafety',
    title: 'Health & Safety',
    duration: '1.5 Years',
    price: '£1,150',
    originalPrice: '£1,450',
    level: 'Level 3',
    icon: '⚠️',
    image: 'https://images.unsplash.com/photo-1565688534245-05d6b5be184a?w=800&q=80',
    description: 'Complete health and safety training program. Master workplace safety, risk assessment, and safety management to become a qualified health and safety professional.',
    features: ['Risk Assessment', 'Safety Management', 'Accident Investigation', 'Legal Compliance', 'Professional Certification'],
    popular: true,
    href: '/courses/health-safety',
  },
]

export const CAREERS = [
  { title: 'First Aid Instructor', salary: '£28,000 – £42,000', category: 'firstaid', icon: '🏥' },
  { title: 'Emergency Care Assistant', salary: '£22,000 – £30,000', category: 'firstaid', icon: '🚑' },
  { title: 'Food Safety Officer', salary: '£25,000 – £38,000', category: 'foodhygiene', icon: '🍽️' },
  { title: 'Environmental Health Officer', salary: '£28,000 – £45,000', category: 'foodhygiene', icon: '🏢' },
  { title: 'Health & Safety Advisor', salary: '£30,000 – £48,000', category: 'healthsafety', icon: '⚠️' },
  { title: 'Safety Manager', salary: '£35,000 – £55,000', category: 'healthsafety', icon: '📋' },
]

export const TESTIMONIALS = [
  {
    name: 'Mohammed Ali',
    rating: 5,
    date: '2 weeks ago',
    text: 'Absolutely brilliant training! The instructors were knowledgeable and supportive. The First Aid course was comprehensive and practical. I feel confident in my skills now!',
    course: 'First Aid Training',
    verified: true,
  },
  {
    name: 'Sarah Johnson',
    rating: 5,
    date: '1 month ago',
    text: 'Excellent course, very well structured. The Food & Hygiene training was thorough and the staff were always available to answer questions. Highly recommend SafeCert!',
    course: 'Food & Hygiene',
    verified: true,
  },
  {
    name: 'David Brown',
    rating: 5,
    date: '3 weeks ago',
    text: 'I did my Health & Safety training here and it was fantastic. Professional environment, great trainers, and I felt fully prepared for my career. Got 100% pass!',
    course: 'Health & Safety',
    verified: true,
  },
  {
    name: 'Emma Wilson',
    rating: 5,
    date: '2 months ago',
    text: 'The First Aid course was amazing. Covered everything I needed to know and the practical training was excellent. Now working as an Emergency Care Assistant with full confidence.',
    course: 'First Aid Training',
    verified: true,
  },
  {
    name: 'James Williams',
    rating: 5,
    date: '1 week ago',
    text: 'Food & Hygiene training was excellent. Quick, efficient, and covered all the essential standards. I passed with flying colours. Will definitely recommend!',
    course: 'Food & Hygiene',
    verified: true,
  },
  {
    name: 'Fatima Hassan',
    rating: 5,
    date: '3 months ago',
    text: 'Great Health & Safety course, very hands-on and practical. The trainer made everything easy to understand. Certificate arrived quickly too. Would recommend SafeCert.',
    course: 'Health & Safety',
    verified: true,
  },
]

export const UK_LOCATIONS = [
  'Luton',
]

export const STEPS = [
  {
    number: '01',
    title: 'Choose Your Course',
    description: 'Browse our wide range of accredited courses. Filter by category, location, or qualification level to find the right fit.',
    icon: '🎯',
  },
  {
    number: '02',
    title: 'Book & Pay Online',
    description: 'Secure your place with our easy online booking system. Flexible payment options including pay monthly available.',
    icon: '💳',
  },
  {
    number: '03',
    title: 'Attend Training',
    description: 'Train with our expert instructors at one of our 120+ UK locations or join our online courses from anywhere.',
    icon: '📚',
  },
  {
    number: '04',
    title: 'Get Certified',
    description: 'Pass your assessment and receive your nationally recognised qualification. We guide you through every step.',
    icon: '🏆',
  },
]

export const FAQS_HOME = [
  {
    q: 'Do I need any previous experience to enrol?',
    a: 'No prior experience is needed for any of our courses. Our First Aid, Food & Hygiene, and Health & Safety courses are open to anyone aged 18+ who wants to develop professional skills.',
  },
  {
    q: 'How long does training take?',
    a: 'All our courses run for 1.5 years with classes scheduled from 8:00 AM to 6:00 PM at our Luton training centre.',
  },
  {
    q: 'Are your courses accredited?',
    a: 'Yes. All our courses are nationally accredited and recognised by employers across the UK. You will receive professional certification upon completion.',
  },
  {
    q: 'What career opportunities are available after completing these courses?',
    a: 'Our courses open doors to various careers including First Aid Instructor, Food Safety Officer, Health & Safety Advisor, and many other professional roles in healthcare, hospitality, and safety management.',
  },
  {
    q: 'Do you offer payment plans?',
    a: 'Yes! We offer flexible payment plans including monthly instalments for all courses. Contact us to discuss your options.',
  },
  {
    q: 'Where is your training centre located?',
    a: 'Our training centre is located in Luton, United Kingdom. Classes run from 8:00 AM to 6:00 PM.',
  },
]

export const TRAINERS = [
  {
    name: 'Johnny Pirate',
    rating: 5,
    image: '/trainers/johnny.jpg',
    specialty: 'First Aid & Emergency Response',
  },
  {
    name: 'Claudette Stewart',
    rating: 5,
    image: '/trainers/claudette.jpg',
    specialty: 'Food Safety & Hygiene',
  },
  {
    name: 'Zowie Jennings',
    rating: 5,
    image: '/trainers/zowie.jpg',
    specialty: 'Health & Safety Management',
  },
  {
    name: 'Dave Watts',
    rating: 5,
    image: '/trainers/dave.jpg',
    specialty: 'Professional Certification & Compliance',
  },
]

export const BLOG_POSTS = [
  {
    id: 'first-aid-essentials',
    title: '10 Essential First Aid Skills Everyone Should Know',
    slug: 'first-aid-essentials',
    category: 'First Aid',
    image: 'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=800&q=80',
    excerpt: 'Learn the fundamental first aid skills that could save a life. From CPR to treating burns, these are the essential techniques everyone should master.',
    date: '2025-03-15',
    readTime: '5 min read',
    author: 'Johnny Pirate',
    content: `First aid knowledge is invaluable and can be the difference between life and death in emergency situations. Here are the 10 essential skills everyone should know...`,
  },
  {
    id: 'food-hygiene-restaurant',
    title: 'Food Hygiene Best Practices for Restaurant Owners',
    slug: 'food-hygiene-restaurant',
    category: 'Food Hygiene',
    image: 'https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?w=800&q=80',
    excerpt: 'Running a restaurant requires strict adherence to food safety standards. Discover the best practices to maintain hygiene and pass inspections.',
    date: '2025-03-10',
    readTime: '7 min read',
    author: 'Claudette Stewart',
    content: `Food safety is paramount in the restaurant industry. Understanding and implementing proper hygiene practices protects your customers and your business...`,
  },
  {
    id: 'workplace-safety-tips',
    title: 'Top 15 Workplace Safety Tips for UK Businesses',
    slug: 'workplace-safety-tips',
    category: 'Health & Safety',
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&q=80',
    excerpt: 'Workplace safety should be a top priority for all businesses. Learn the most important safety measures to implement in your workplace.',
    date: '2025-03-05',
    readTime: '6 min read',
    author: 'Zowie Jennings',
    content: `Creating a safe workplace environment is not just a legal requirement—it's essential for employee wellbeing and productivity...`,
  },
  {
    id: 'cpr-guide-beginners',
    title: 'CPR Guide: Step-by-Step for Beginners',
    slug: 'cpr-guide-beginners',
    category: 'First Aid',
    image: 'https://images.unsplash.com/photo-1530497610245-94d3c16cda28?w=800&q=80',
    excerpt: 'Cardiopulmonary resuscitation (CPR) can save lives. This comprehensive guide walks you through the proper CPR technique step by step.',
    date: '2025-02-28',
    readTime: '8 min read',
    author: 'Johnny Pirate',
    content: `CPR is a life-saving technique that everyone should know. In this guide, we'll walk through the correct steps to perform CPR effectively...`,
  },
  {
    id: 'haccp-principles-explained',
    title: 'HACCP Principles Explained: A Complete Guide',
    slug: 'haccp-principles-explained',
    category: 'Food Hygiene',
    image: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?w=800&q=80',
    excerpt: 'HACCP is crucial for food safety management. Understand the seven principles and how to implement them in your food business.',
    date: '2025-02-20',
    readTime: '10 min read',
    author: 'Claudette Stewart',
    content: `HACCP (Hazard Analysis and Critical Control Points) is a systematic approach to food safety. Let's explore each principle in detail...`,
  },
  {
    id: 'risk-assessment-workplace',
    title: 'How to Conduct a Workplace Risk Assessment',
    slug: 'risk-assessment-workplace',
    category: 'Health & Safety',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80',
    excerpt: 'Risk assessments are essential for workplace safety. Learn how to identify hazards, evaluate risks, and implement control measures.',
    date: '2025-02-15',
    readTime: '9 min read',
    author: 'Zowie Jennings',
    content: `A thorough risk assessment is the foundation of workplace safety. Here's how to conduct one effectively in your organization...`,
  },
]
