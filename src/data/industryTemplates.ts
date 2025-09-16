import { EmailTemplate, EmailComponent } from '../types/EmailTypes';

const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

export const industryTemplates: EmailTemplate[] = [
  // E-commerce Templates
  {
    id: 'ecommerce-welcome',
    name: 'E-commerce Welcome',
    subject: 'Welcome to Our Store! 🛍️',
    preheader: 'Get ready for amazing deals and exclusive offers',
    components: [
      {
        id: generateId(),
        type: 'header',
        content: 'ShopMart',
        styles: { backgroundColor: '#1f2937', padding: '20px', color: '#ffffff', fontSize: '28px', fontWeight: 'bold' },
        attributes: { href: 'View in browser' }
      },
      {
        id: generateId(),
        type: 'text',
        content: '<h1 style="color: #1f2937; font-size: 32px; text-align: center; margin: 20px 0;">Welcome to ShopMart!</h1>',
        styles: { padding: '20px', textAlign: 'center', backgroundColor: '#f8fafc' }
      },
      {
        id: generateId(),
        type: 'text',
        content: '<p>Thank you for joining our community! Discover thousands of products at unbeatable prices.</p>',
        styles: { padding: '20px', fontSize: '16px', lineHeight: '1.6', color: '#374151' }
      },
      {
        id: generateId(),
        type: 'button',
        content: 'Start Shopping',
        styles: { backgroundColor: '#dc2626', color: '#ffffff', padding: '15px 30px', borderRadius: '8px', fontSize: '18px', fontWeight: '600', textAlign: 'center', margin: '20px 0' },
        attributes: { href: '#', target: '_blank' }
      },
      {
        id: generateId(),
        type: 'footer',
        content: '<p>© 2024 ShopMart. All rights reserved.</p><p><a href="#" style="color: #6b7280;">Unsubscribe</a> | <a href="#" style="color: #6b7280;">Privacy Policy</a></p>',
        styles: { backgroundColor: '#f9fafb', padding: '20px', color: '#6b7280', fontSize: '12px', textAlign: 'center' }
      }
    ],
    settings: { width: '600px', backgroundColor: '#ffffff', fontFamily: 'Arial, sans-serif', responsive: true },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  
  {
    id: 'ecommerce-abandoned-cart',
    name: 'E-commerce Abandoned Cart',
    subject: 'You left something behind! 🛒',
    preheader: 'Complete your purchase and save 10%',
    components: [
      {
        id: generateId(),
        type: 'header',
        content: 'ShopMart',
        styles: { backgroundColor: '#1f2937', padding: '20px', color: '#ffffff', fontSize: '28px', fontWeight: 'bold' },
        attributes: { href: 'View in browser' }
      },
      {
        id: generateId(),
        type: 'text',
        content: '<h1 style="color: #dc2626; font-size: 28px; text-align: center; margin: 20px 0;">Don\'t Miss Out!</h1>',
        styles: { padding: '20px', textAlign: 'center' }
      },
      {
        id: generateId(),
        type: 'product',
        content: 'Complete Purchase',
        styles: { padding: '20px', textAlign: 'center', backgroundColor: '#ffffff' },
        attributes: { src: 'https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=300', title: 'Premium Headphones', price: '$89.99', href: '#' }
      },
      {
        id: generateId(),
        type: 'text',
        content: '<div style="background: #fef3c7; padding: 20px; border-radius: 8px; text-align: center; margin: 20px 0;"><h3 style="color: #92400e; margin: 0 0 10px 0;">Special Offer!</h3><p style="color: #92400e; margin: 0;">Use code <strong>SAVE10</strong> for 10% off</p></div>',
        styles: { padding: '20px' }
      },
      {
        id: generateId(),
        type: 'button',
        content: 'Complete Your Order',
        styles: { backgroundColor: '#dc2626', color: '#ffffff', padding: '15px 30px', borderRadius: '8px', fontSize: '18px', fontWeight: '600', textAlign: 'center', margin: '20px 0' },
        attributes: { href: '#', target: '_blank' }
      },
      {
        id: generateId(),
        type: 'footer',
        content: '<p>© 2024 ShopMart. All rights reserved.</p><p><a href="#" style="color: #6b7280;">Unsubscribe</a> | <a href="#" style="color: #6b7280;">Privacy Policy</a></p>',
        styles: { backgroundColor: '#f9fafb', padding: '20px', color: '#6b7280', fontSize: '12px', textAlign: 'center' }
      }
    ],
    settings: { width: '600px', backgroundColor: '#ffffff', fontFamily: 'Arial, sans-serif', responsive: true },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },

  // Technology Templates
  {
    id: 'tech-product-launch',
    name: 'Tech Product Launch',
    subject: 'Introducing Our Revolutionary New App 🚀',
    preheader: 'The future of productivity is here',
    components: [
      {
        id: generateId(),
        type: 'header',
        content: 'TechFlow',
        styles: { backgroundColor: '#1e40af', padding: '20px', color: '#ffffff', fontSize: '28px', fontWeight: 'bold' },
        attributes: { href: 'View in browser' }
      },
      {
        id: generateId(),
        type: 'text',
        content: '<h1 style="color: #1e40af; font-size: 32px; text-align: center; margin: 20px 0;">Revolutionary App Launch</h1>',
        styles: { padding: '20px', textAlign: 'center', backgroundColor: '#eff6ff' }
      },
      {
        id: generateId(),
        type: 'image',
        content: '',
        styles: { width: '100%', height: 'auto', padding: '20px 0' },
        attributes: { src: 'https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg?auto=compress&cs=tinysrgb&w=600', alt: 'App Screenshot' }
      },
      {
        id: generateId(),
        type: 'text',
        content: '<p>Experience the next generation of productivity with our AI-powered application. Streamline your workflow and boost efficiency by 300%.</p>',
        styles: { padding: '20px', fontSize: '16px', lineHeight: '1.6', color: '#374151' }
      },
      {
        id: generateId(),
        type: 'button',
        content: 'Download Now',
        styles: { backgroundColor: '#1e40af', color: '#ffffff', padding: '15px 30px', borderRadius: '8px', fontSize: '18px', fontWeight: '600', textAlign: 'center', margin: '20px 0' },
        attributes: { href: '#', target: '_blank' }
      },
      {
        id: generateId(),
        type: 'social',
        content: '',
        styles: { backgroundColor: '#1e40af', padding: '20px 0', textAlign: 'center' }
      },
      {
        id: generateId(),
        type: 'footer',
        content: '<p>© 2024 TechFlow. All rights reserved.</p><p><a href="#" style="color: #6b7280;">Unsubscribe</a> | <a href="#" style="color: #6b7280;">Privacy Policy</a></p>',
        styles: { backgroundColor: '#f9fafb', padding: '20px', color: '#6b7280', fontSize: '12px', textAlign: 'center' }
      }
    ],
    settings: { width: '600px', backgroundColor: '#ffffff', fontFamily: 'Arial, sans-serif', responsive: true },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },

  {
    id: 'tech-newsletter',
    name: 'Tech Newsletter',
    subject: 'Weekly Tech Digest - Latest Innovations',
    preheader: 'Stay updated with the latest in technology',
    components: [
      {
        id: generateId(),
        type: 'header',
        content: 'TechDigest',
        styles: { backgroundColor: '#0f172a', padding: '20px', color: '#ffffff', fontSize: '28px', fontWeight: 'bold' },
        attributes: { href: 'View in browser' }
      },
      {
        id: generateId(),
        type: 'text',
        content: '<h1 style="color: #0f172a; font-size: 28px; text-align: center; margin: 20px 0;">This Week in Tech</h1>',
        styles: { padding: '20px', textAlign: 'center' }
      },
      {
        id: generateId(),
        type: 'text',
        content: '<h2 style="color: #1e40af;">🚀 Featured Story</h2><p>AI breakthrough: New language model achieves human-level reasoning in complex problem solving.</p>',
        styles: { padding: '20px', fontSize: '16px', lineHeight: '1.6', color: '#374151' }
      },
      {
        id: generateId(),
        type: 'columns',
        content: '',
        styles: { padding: '20px 0' },
        attributes: { columns: 2 }
      },
      {
        id: generateId(),
        type: 'button',
        content: 'Read Full Newsletter',
        styles: { backgroundColor: '#1e40af', color: '#ffffff', padding: '15px 30px', borderRadius: '8px', fontSize: '18px', fontWeight: '600', textAlign: 'center', margin: '20px 0' },
        attributes: { href: '#', target: '_blank' }
      },
      {
        id: generateId(),
        type: 'footer',
        content: '<p>© 2024 TechDigest. All rights reserved.</p><p><a href="#" style="color: #6b7280;">Unsubscribe</a> | <a href="#" style="color: #6b7280;">Privacy Policy</a></p>',
        styles: { backgroundColor: '#f9fafb', padding: '20px', color: '#6b7280', fontSize: '12px', textAlign: 'center' }
      }
    ],
    settings: { width: '600px', backgroundColor: '#ffffff', fontFamily: 'Arial, sans-serif', responsive: true },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },

  // Healthcare Templates
  {
    id: 'healthcare-appointment',
    name: 'Healthcare Appointment Reminder',
    subject: 'Appointment Reminder - Dr. Smith Tomorrow',
    preheader: 'Your health appointment is scheduled for tomorrow',
    components: [
      {
        id: generateId(),
        type: 'header',
        content: 'HealthCare Plus',
        styles: { backgroundColor: '#059669', padding: '20px', color: '#ffffff', fontSize: '28px', fontWeight: 'bold' },
        attributes: { href: 'View in browser' }
      },
      {
        id: generateId(),
        type: 'text',
        content: '<h1 style="color: #059669; font-size: 28px; text-align: center; margin: 20px 0;">Appointment Reminder</h1>',
        styles: { padding: '20px', textAlign: 'center', backgroundColor: '#ecfdf5' }
      },
      {
        id: generateId(),
        type: 'text',
        content: '<div style="border: 2px solid #059669; border-radius: 8px; padding: 20px; margin: 20px 0;"><h3 style="margin: 0 0 10px 0; color: #059669;">📅 Appointment Details</h3><p><strong>Doctor:</strong> Dr. Sarah Smith</p><p><strong>Date:</strong> March 16, 2024</p><p><strong>Time:</strong> 2:00 PM</p><p><strong>Location:</strong> Main Clinic, Room 205</p></div>',
        styles: { padding: '20px' }
      },
      {
        id: generateId(),
        type: 'text',
        content: '<p>Please arrive 15 minutes early and bring your insurance card and ID. If you need to reschedule, please call us at least 24 hours in advance.</p>',
        styles: { padding: '20px', fontSize: '16px', lineHeight: '1.6', color: '#374151' }
      },
      {
        id: generateId(),
        type: 'button',
        content: 'Confirm Appointment',
        styles: { backgroundColor: '#059669', color: '#ffffff', padding: '15px 30px', borderRadius: '8px', fontSize: '18px', fontWeight: '600', textAlign: 'center', margin: '20px 0' },
        attributes: { href: '#', target: '_blank' }
      },
      {
        id: generateId(),
        type: 'footer',
        content: '<p>© 2024 HealthCare Plus. All rights reserved.</p><p><a href="#" style="color: #6b7280;">Unsubscribe</a> | <a href="#" style="color: #6b7280;">Privacy Policy</a></p>',
        styles: { backgroundColor: '#f9fafb', padding: '20px', color: '#6b7280', fontSize: '12px', textAlign: 'center' }
      }
    ],
    settings: { width: '600px', backgroundColor: '#ffffff', fontFamily: 'Arial, sans-serif', responsive: true },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },

  {
    id: 'healthcare-wellness',
    name: 'Healthcare Wellness Tips',
    subject: 'Your Weekly Wellness Guide 🌿',
    preheader: 'Simple tips for a healthier lifestyle',
    components: [
      {
        id: generateId(),
        type: 'header',
        content: 'WellnessHub',
        styles: { backgroundColor: '#16a34a', padding: '20px', color: '#ffffff', fontSize: '28px', fontWeight: 'bold' },
        attributes: { href: 'View in browser' }
      },
      {
        id: generateId(),
        type: 'text',
        content: '<h1 style="color: #16a34a; font-size: 28px; text-align: center; margin: 20px 0;">Weekly Wellness Tips</h1>',
        styles: { padding: '20px', textAlign: 'center', backgroundColor: '#f0fdf4' }
      },
      {
        id: generateId(),
        type: 'image',
        content: '',
        styles: { width: '100%', height: 'auto', padding: '20px 0' },
        attributes: { src: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=600', alt: 'Healthy Lifestyle' }
      },
      {
        id: generateId(),
        type: 'text',
        content: '<h2 style="color: #16a34a;">🥗 This Week\'s Focus: Nutrition</h2><p>Discover 5 simple ways to boost your daily nutrition intake and feel more energized throughout the day.</p>',
        styles: { padding: '20px', fontSize: '16px', lineHeight: '1.6', color: '#374151' }
      },
      {
        id: generateId(),
        type: 'button',
        content: 'Read Full Article',
        styles: { backgroundColor: '#16a34a', color: '#ffffff', padding: '15px 30px', borderRadius: '8px', fontSize: '18px', fontWeight: '600', textAlign: 'center', margin: '20px 0' },
        attributes: { href: '#', target: '_blank' }
      },
      {
        id: generateId(),
        type: 'footer',
        content: '<p>© 2024 WellnessHub. All rights reserved.</p><p><a href="#" style="color: #6b7280;">Unsubscribe</a> | <a href="#" style="color: #6b7280;">Privacy Policy</a></p>',
        styles: { backgroundColor: '#f9fafb', padding: '20px', color: '#6b7280', fontSize: '12px', textAlign: 'center' }
      }
    ],
    settings: { width: '600px', backgroundColor: '#ffffff', fontFamily: 'Arial, sans-serif', responsive: true },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },

  // Education Templates
  {
    id: 'education-course-launch',
    name: 'Education Course Launch',
    subject: 'New Course: Master Web Development in 30 Days',
    preheader: 'Transform your career with our comprehensive course',
    components: [
      {
        id: generateId(),
        type: 'header',
        content: 'EduMaster',
        styles: { backgroundColor: '#7c3aed', padding: '20px', color: '#ffffff', fontSize: '28px', fontWeight: 'bold' },
        attributes: { href: 'View in browser' }
      },
      {
        id: generateId(),
        type: 'text',
        content: '<h1 style="color: #7c3aed; font-size: 32px; text-align: center; margin: 20px 0;">New Course Launch!</h1>',
        styles: { padding: '20px', textAlign: 'center', backgroundColor: '#f3e8ff' }
      },
      {
        id: generateId(),
        type: 'image',
        content: '',
        styles: { width: '100%', height: 'auto', padding: '20px 0' },
        attributes: { src: 'https://images.pexels.com/photos/574071/pexels-photo-574071.jpeg?auto=compress&cs=tinysrgb&w=600', alt: 'Web Development Course' }
      },
      {
        id: generateId(),
        type: 'text',
        content: '<h2 style="color: #7c3aed;">Master Web Development in 30 Days</h2><p>Join thousands of students who have transformed their careers. Learn HTML, CSS, JavaScript, and React from industry experts.</p><ul><li>30 comprehensive video lessons</li><li>Hands-on projects</li><li>Certificate of completion</li><li>Lifetime access</li></ul>',
        styles: { padding: '20px', fontSize: '16px', lineHeight: '1.6', color: '#374151' }
      },
      {
        id: generateId(),
        type: 'text',
        content: '<div style="background: #fef3c7; padding: 20px; border-radius: 8px; text-align: center; margin: 20px 0;"><h3 style="color: #92400e; margin: 0 0 10px 0;">Early Bird Special!</h3><p style="color: #92400e; margin: 0;">Save 50% - Limited time offer</p></div>',
        styles: { padding: '20px' }
      },
      {
        id: generateId(),
        type: 'button',
        content: 'Enroll Now',
        styles: { backgroundColor: '#7c3aed', color: '#ffffff', padding: '15px 30px', borderRadius: '8px', fontSize: '18px', fontWeight: '600', textAlign: 'center', margin: '20px 0' },
        attributes: { href: '#', target: '_blank' }
      },
      {
        id: generateId(),
        type: 'footer',
        content: '<p>© 2024 EduMaster. All rights reserved.</p><p><a href="#" style="color: #6b7280;">Unsubscribe</a> | <a href="#" style="color: #6b7280;">Privacy Policy</a></p>',
        styles: { backgroundColor: '#f9fafb', padding: '20px', color: '#6b7280', fontSize: '12px', textAlign: 'center' }
      }
    ],
    settings: { width: '600px', backgroundColor: '#ffffff', fontFamily: 'Arial, sans-serif', responsive: true },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },

  {
    id: 'education-student-welcome',
    name: 'Education Student Welcome',
    subject: 'Welcome to Your Learning Journey! 🎓',
    preheader: 'Everything you need to get started',
    components: [
      {
        id: generateId(),
        type: 'header',
        content: 'LearnHub University',
        styles: { backgroundColor: '#1d4ed8', padding: '20px', color: '#ffffff', fontSize: '28px', fontWeight: 'bold' },
        attributes: { href: 'View in browser' }
      },
      {
        id: generateId(),
        type: 'text',
        content: '<h1 style="color: #1d4ed8; font-size: 32px; text-align: center; margin: 20px 0;">Welcome, Student!</h1>',
        styles: { padding: '20px', textAlign: 'center', backgroundColor: '#dbeafe' }
      },
      {
        id: generateId(),
        type: 'text',
        content: '<p>Congratulations on joining LearnHub University! We\'re excited to support you on your educational journey. Here\'s everything you need to get started:</p>',
        styles: { padding: '20px', fontSize: '16px', lineHeight: '1.6', color: '#374151' }
      },
      {
        id: generateId(),
        type: 'columns',
        content: '',
        styles: { padding: '20px 0' },
        attributes: { columns: 2 }
      },
      {
        id: generateId(),
        type: 'text',
        content: '<h3 style="color: #1d4ed8;">📚 Quick Start Guide:</h3><ol><li>Access your student portal</li><li>Download course materials</li><li>Join your class groups</li><li>Schedule your first meeting</li></ol>',
        styles: { padding: '20px', fontSize: '16px', lineHeight: '1.6', color: '#374151' }
      },
      {
        id: generateId(),
        type: 'button',
        content: 'Access Student Portal',
        styles: { backgroundColor: '#1d4ed8', color: '#ffffff', padding: '15px 30px', borderRadius: '8px', fontSize: '18px', fontWeight: '600', textAlign: 'center', margin: '20px 0' },
        attributes: { href: '#', target: '_blank' }
      },
      {
        id: generateId(),
        type: 'footer',
        content: '<p>© 2024 LearnHub University. All rights reserved.</p><p><a href="#" style="color: #6b7280;">Unsubscribe</a> | <a href="#" style="color: #6b7280;">Privacy Policy</a></p>',
        styles: { backgroundColor: '#f9fafb', padding: '20px', color: '#6b7280', fontSize: '12px', textAlign: 'center' }
      }
    ],
    settings: { width: '600px', backgroundColor: '#ffffff', fontFamily: 'Arial, sans-serif', responsive: true },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },

  // Finance Templates
  {
    id: 'finance-investment-update',
    name: 'Finance Investment Update',
    subject: 'Your Portfolio Performance - Q1 2024',
    preheader: 'Monthly investment summary and insights',
    components: [
      {
        id: generateId(),
        type: 'header',
        content: 'WealthGrow',
        styles: { backgroundColor: '#065f46', padding: '20px', color: '#ffffff', fontSize: '28px', fontWeight: 'bold' },
        attributes: { href: 'View in browser' }
      },
      {
        id: generateId(),
        type: 'text',
        content: '<h1 style="color: #065f46; font-size: 28px; text-align: center; margin: 20px 0;">Portfolio Update</h1>',
        styles: { padding: '20px', textAlign: 'center', backgroundColor: '#ecfdf5' }
      },
      {
        id: generateId(),
        type: 'text',
        content: '<div style="border: 2px solid #065f46; border-radius: 8px; padding: 20px; margin: 20px 0;"><h3 style="margin: 0 0 15px 0; color: #065f46;">📈 Performance Summary</h3><p><strong>Total Portfolio Value:</strong> $125,450</p><p><strong>Monthly Return:</strong> +8.2%</p><p><strong>YTD Performance:</strong> +15.7%</p><p><strong>Best Performer:</strong> Tech Stocks (+12.4%)</p></div>',
        styles: { padding: '20px' }
      },
      {
        id: generateId(),
        type: 'text',
        content: '<p>Your portfolio has shown strong performance this quarter. Our analysts recommend maintaining your current allocation while considering emerging market opportunities.</p>',
        styles: { padding: '20px', fontSize: '16px', lineHeight: '1.6', color: '#374151' }
      },
      {
        id: generateId(),
        type: 'button',
        content: 'View Full Report',
        styles: { backgroundColor: '#065f46', color: '#ffffff', padding: '15px 30px', borderRadius: '8px', fontSize: '18px', fontWeight: '600', textAlign: 'center', margin: '20px 0' },
        attributes: { href: '#', target: '_blank' }
      },
      {
        id: generateId(),
        type: 'footer',
        content: '<p>© 2024 WealthGrow. All rights reserved.</p><p><a href="#" style="color: #6b7280;">Unsubscribe</a> | <a href="#" style="color: #6b7280;">Privacy Policy</a></p>',
        styles: { backgroundColor: '#f9fafb', padding: '20px', color: '#6b7280', fontSize: '12px', textAlign: 'center' }
      }
    ],
    settings: { width: '600px', backgroundColor: '#ffffff', fontFamily: 'Arial, sans-serif', responsive: true },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },

  {
    id: 'finance-banking-alert',
    name: 'Finance Banking Alert',
    subject: 'Account Alert: Large Transaction Detected',
    preheader: 'Security notification for your account',
    components: [
      {
        id: generateId(),
        type: 'header',
        content: 'SecureBank',
        styles: { backgroundColor: '#1e40af', padding: '20px', color: '#ffffff', fontSize: '28px', fontWeight: 'bold' },
        attributes: { href: 'View in browser' }
      },
      {
        id: generateId(),
        type: 'text',
        content: '<h1 style="color: #dc2626; font-size: 28px; text-align: center; margin: 20px 0;">🔒 Security Alert</h1>',
        styles: { padding: '20px', textAlign: 'center', backgroundColor: '#fef2f2' }
      },
      {
        id: generateId(),
        type: 'text',
        content: '<div style="border: 2px solid #dc2626; border-radius: 8px; padding: 20px; margin: 20px 0; background: #fef2f2;"><h3 style="margin: 0 0 15px 0; color: #dc2626;">Transaction Details</h3><p><strong>Amount:</strong> $2,500.00</p><p><strong>Date:</strong> March 15, 2024</p><p><strong>Merchant:</strong> Online Purchase</p><p><strong>Account:</strong> ****1234</p></div>',
        styles: { padding: '20px' }
      },
      {
        id: generateId(),
        type: 'text',
        content: '<p>If you recognize this transaction, no action is needed. If you did not authorize this transaction, please contact us immediately.</p>',
        styles: { padding: '20px', fontSize: '16px', lineHeight: '1.6', color: '#374151' }
      },
      {
        id: generateId(),
        type: 'columns',
        content: '',
        styles: { padding: '20px 0' },
        attributes: { columns: 2 }
      },
      {
        id: generateId(),
        type: 'footer',
        content: '<p>© 2024 SecureBank. All rights reserved.</p><p><a href="#" style="color: #6b7280;">Unsubscribe</a> | <a href="#" style="color: #6b7280;">Privacy Policy</a></p>',
        styles: { backgroundColor: '#f9fafb', padding: '20px', color: '#6b7280', fontSize: '12px', textAlign: 'center' }
      }
    ],
    settings: { width: '600px', backgroundColor: '#ffffff', fontFamily: 'Arial, sans-serif', responsive: true },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },

  // Real Estate Templates
  {
    id: 'realestate-listing',
    name: 'Real Estate New Listing',
    subject: 'New Property Alert: Dream Home Available! 🏡',
    preheader: 'Beautiful 3BR home in your preferred area',
    components: [
      {
        id: generateId(),
        type: 'header',
        content: 'DreamHomes Realty',
        styles: { backgroundColor: '#7c2d12', padding: '20px', color: '#ffffff', fontSize: '28px', fontWeight: 'bold' },
        attributes: { href: 'View in browser' }
      },
      {
        id: generateId(),
        type: 'text',
        content: '<h1 style="color: #7c2d12; font-size: 32px; text-align: center; margin: 20px 0;">New Listing Alert!</h1>',
        styles: { padding: '20px', textAlign: 'center', backgroundColor: '#fef7ed' }
      },
      {
        id: generateId(),
        type: 'image',
        content: '',
        styles: { width: '100%', height: 'auto', padding: '20px 0' },
        attributes: { src: 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=600', alt: 'Beautiful Home' }
      },
      {
        id: generateId(),
        type: 'text',
        content: '<div style="border: 2px solid #7c2d12; border-radius: 8px; padding: 20px; margin: 20px 0;"><h3 style="margin: 0 0 15px 0; color: #7c2d12;">🏡 Property Details</h3><p><strong>Address:</strong> 123 Maple Street, Suburbia</p><p><strong>Price:</strong> $450,000</p><p><strong>Bedrooms:</strong> 3 | <strong>Bathrooms:</strong> 2</p><p><strong>Square Feet:</strong> 2,100 sq ft</p><p><strong>Lot Size:</strong> 0.25 acres</p></div>',
        styles: { padding: '20px' }
      },
      {
        id: generateId(),
        type: 'text',
        content: '<p>This stunning home features modern updates, a spacious backyard, and is located in a highly-rated school district. Perfect for families!</p>',
        styles: { padding: '20px', fontSize: '16px', lineHeight: '1.6', color: '#374151' }
      },
      {
        id: generateId(),
        type: 'button',
        content: 'Schedule Viewing',
        styles: { backgroundColor: '#7c2d12', color: '#ffffff', padding: '15px 30px', borderRadius: '8px', fontSize: '18px', fontWeight: '600', textAlign: 'center', margin: '20px 0' },
        attributes: { href: '#', target: '_blank' }
      },
      {
        id: generateId(),
        type: 'footer',
        content: '<p>© 2024 DreamHomes Realty. All rights reserved.</p><p><a href="#" style="color: #6b7280;">Unsubscribe</a> | <a href="#" style="color: #6b7280;">Privacy Policy</a></p>',
        styles: { backgroundColor: '#f9fafb', padding: '20px', color: '#6b7280', fontSize: '12px', textAlign: 'center' }
      }
    ],
    settings: { width: '600px', backgroundColor: '#ffffff', fontFamily: 'Arial, sans-serif', responsive: true },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },

  {
    id: 'realestate-market-update',
    name: 'Real Estate Market Update',
    subject: 'March Market Report: Prices Up 5% 📈',
    preheader: 'Latest trends in your local real estate market',
    components: [
      {
        id: generateId(),
        type: 'header',
        content: 'MarketInsights Realty',
        styles: { backgroundColor: '#92400e', padding: '20px', color: '#ffffff', fontSize: '28px', fontWeight: 'bold' },
        attributes: { href: 'View in browser' }
      },
      {
        id: generateId(),
        type: 'text',
        content: '<h1 style="color: #92400e; font-size: 28px; text-align: center; margin: 20px 0;">Monthly Market Report</h1>',
        styles: { padding: '20px', textAlign: 'center', backgroundColor: '#fef3c7' }
      },
      {
        id: generateId(),
        type: 'text',
        content: '<div style="border: 2px solid #92400e; border-radius: 8px; padding: 20px; margin: 20px 0;"><h3 style="margin: 0 0 15px 0; color: #92400e;">📊 Market Highlights</h3><p><strong>Average Home Price:</strong> $425,000 (+5%)</p><p><strong>Days on Market:</strong> 18 days (-3 days)</p><p><strong>Inventory:</strong> 2.1 months supply</p><p><strong>New Listings:</strong> 145 (+12%)</p></div>',
        styles: { padding: '20px' }
      },
      {
        id: generateId(),
        type: 'text',
        content: '<p>The spring market is showing strong activity with increased buyer demand. Now is an excellent time for sellers to list their properties.</p>',
        styles: { padding: '20px', fontSize: '16px', lineHeight: '1.6', color: '#374151' }
      },
      {
        id: generateId(),
        type: 'button',
        content: 'Get Home Valuation',
        styles: { backgroundColor: '#92400e', color: '#ffffff', padding: '15px 30px', borderRadius: '8px', fontSize: '18px', fontWeight: '600', textAlign: 'center', margin: '20px 0' },
        attributes: { href: '#', target: '_blank' }
      },
      {
        id: generateId(),
        type: 'footer',
        content: '<p>© 2024 MarketInsights Realty. All rights reserved.</p><p><a href="#" style="color: #6b7280;">Unsubscribe</a> | <a href="#" style="color: #6b7280;">Privacy Policy</a></p>',
        styles: { backgroundColor: '#f9fafb', padding: '20px', color: '#6b7280', fontSize: '12px', textAlign: 'center' }
      }
    ],
    settings: { width: '600px', backgroundColor: '#ffffff', fontFamily: 'Arial, sans-serif', responsive: true },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },

  // Food & Restaurant Templates
  {
    id: 'restaurant-promotion',
    name: 'Restaurant Special Offer',
    subject: 'Weekend Special: 30% Off All Pasta Dishes! 🍝',
    preheader: 'Delicious Italian cuisine at unbeatable prices',
    components: [
      {
        id: generateId(),
        type: 'header',
        content: 'Bella Vista Restaurant',
        styles: { backgroundColor: '#dc2626', padding: '20px', color: '#ffffff', fontSize: '28px', fontWeight: 'bold' },
        attributes: { href: 'View in browser' }
      },
      {
        id: generateId(),
        type: 'text',
        content: '<h1 style="color: #dc2626; font-size: 32px; text-align: center; margin: 20px 0;">Weekend Special!</h1>',
        styles: { padding: '20px', textAlign: 'center', backgroundColor: '#fef2f2' }
      },
      {
        id: generateId(),
        type: 'image',
        content: '',
        styles: { width: '100%', height: 'auto', padding: '20px 0' },
        attributes: { src: 'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=600', alt: 'Delicious Pasta' }
      },
      {
        id: generateId(),
        type: 'text',
        content: '<div style="background: #fef3c7; padding: 20px; border-radius: 8px; text-align: center; margin: 20px 0;"><h3 style="color: #92400e; margin: 0 0 10px 0;">🍝 30% Off All Pasta!</h3><p style="color: #92400e; margin: 0;">Valid Friday - Sunday only</p></div>',
        styles: { padding: '20px' }
      },
      {
        id: generateId(),
        type: 'text',
        content: '<p>Indulge in our authentic Italian pasta dishes made with fresh ingredients and traditional recipes. From classic carbonara to spicy arrabbiata, we have something for every taste!</p>',
        styles: { padding: '20px', fontSize: '16px', lineHeight: '1.6', color: '#374151' }
      },
      {
        id: generateId(),
        type: 'button',
        content: 'Make Reservation',
        styles: { backgroundColor: '#dc2626', color: '#ffffff', padding: '15px 30px', borderRadius: '8px', fontSize: '18px', fontWeight: '600', textAlign: 'center', margin: '20px 0' },
        attributes: { href: '#', target: '_blank' }
      },
      {
        id: generateId(),
        type: 'footer',
        content: '<p>© 2024 Bella Vista Restaurant. All rights reserved.</p><p><a href="#" style="color: #6b7280;">Unsubscribe</a> | <a href="#" style="color: #6b7280;">Privacy Policy</a></p>',
        styles: { backgroundColor: '#f9fafb', padding: '20px', color: '#6b7280', fontSize: '12px', textAlign: 'center' }
      }
    ],
    settings: { width: '600px', backgroundColor: '#ffffff', fontFamily: 'Arial, sans-serif', responsive: true },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },

  {
    id: 'restaurant-newsletter',
    name: 'Restaurant Newsletter',
    subject: 'New Menu Items & Chef\'s Specials 👨‍🍳',
    preheader: 'Discover our latest culinary creations',
    components: [
      {
        id: generateId(),
        type: 'header',
        content: 'Gourmet Kitchen',
        styles: { backgroundColor: '#7c2d12', padding: '20px', color: '#ffffff', fontSize: '28px', fontWeight: 'bold' },
        attributes: { href: 'View in browser' }
      },
      {
        id: generateId(),
        type: 'text',
        content: '<h1 style="color: #7c2d12; font-size: 28px; text-align: center; margin: 20px 0;">Chef\'s Monthly Update</h1>',
        styles: { padding: '20px', textAlign: 'center', backgroundColor: '#fef7ed' }
      },
      {
        id: generateId(),
        type: 'text',
        content: '<h2 style="color: #7c2d12;">🍽️ New Menu Items</h2><p>Our chef has crafted three exciting new dishes featuring seasonal ingredients and bold flavors.</p>',
        styles: { padding: '20px', fontSize: '16px', lineHeight: '1.6', color: '#374151' }
      },
      {
        id: generateId(),
        type: 'columns',
        content: '',
        styles: { padding: '20px 0' },
        attributes: { columns: 2 }
      },
      {
        id: generateId(),
        type: 'text',
        content: '<h3 style="color: #7c2d12;">🎉 Upcoming Events:</h3><ul><li>Wine Tasting - March 20th</li><li>Cooking Class - March 25th</li><li>Live Jazz Night - March 30th</li></ul>',
        styles: { padding: '20px', fontSize: '16px', lineHeight: '1.6', color: '#374151' }
      },
      {
        id: generateId(),
        type: 'button',
        content: 'View Full Menu',
        styles: { backgroundColor: '#7c2d12', color: '#ffffff', padding: '15px 30px', borderRadius: '8px', fontSize: '18px', fontWeight: '600', textAlign: 'center', margin: '20px 0' },
        attributes: { href: '#', target: '_blank' }
      },
      {
        id: generateId(),
        type: 'social',
        content: '',
        styles: { backgroundColor: '#7c2d12', padding: '20px 0', textAlign: 'center' }
      },
      {
        id: generateId(),
        type: 'footer',
        content: '<p>© 2024 Gourmet Kitchen. All rights reserved.</p><p><a href="#" style="color: #6b7280;">Unsubscribe</a> | <a href="#" style="color: #6b7280;">Privacy Policy</a></p>',
        styles: { backgroundColor: '#f9fafb', padding: '20px', color: '#6b7280', fontSize: '12px', textAlign: 'center' }
      }
    ],
    settings: { width: '600px', backgroundColor: '#ffffff', fontFamily: 'Arial, sans-serif', responsive: true },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },

  // Travel Templates
  {
    id: 'travel-booking-confirmation',
    name: 'Travel Booking Confirmation',
    subject: 'Booking Confirmed: Your Dream Vacation Awaits! ✈️',
    preheader: 'All details for your upcoming trip to Paris',
    components: [
      {
        id: generateId(),
        type: 'header',
        content: 'WanderLust Travel',
        styles: { backgroundColor: '#0369a1', padding: '20px', color: '#ffffff', fontSize: '28px', fontWeight: 'bold' },
        attributes: { href: 'View in browser' }
      },
      {
        id: generateId(),
        type: 'text',
        content: '<h1 style="color: #0369a1; font-size: 32px; text-align: center; margin: 20px 0;">Booking Confirmed!</h1>',
        styles: { padding: '20px', textAlign: 'center', backgroundColor: '#e0f2fe' }
      },
      {
        id: generateId(),
        type: 'image',
        content: '',
        styles: { width: '100%', height: 'auto', padding: '20px 0' },
        attributes: { src: 'https://images.pexels.com/photos/338515/pexels-photo-338515.jpeg?auto=compress&cs=tinysrgb&w=600', alt: 'Paris Eiffel Tower' }
      },
      {
        id: generateId(),
        type: 'text',
        content: '<div style="border: 2px solid #0369a1; border-radius: 8px; padding: 20px; margin: 20px 0;"><h3 style="margin: 0 0 15px 0; color: #0369a1;">✈️ Trip Details</h3><p><strong>Destination:</strong> Paris, France</p><p><strong>Dates:</strong> April 15-22, 2024</p><p><strong>Travelers:</strong> 2 Adults</p><p><strong>Booking Reference:</strong> WL123456</p><p><strong>Hotel:</strong> Le Grand Hotel (4 stars)</p></div>',
        styles: { padding: '20px' }
      },
      {
        id: generateId(),
        type: 'text',
        content: '<p>Your dream vacation to Paris is all set! We\'ve included your flight details, hotel information, and recommended activities in your travel package.</p>',
        styles: { padding: '20px', fontSize: '16px', lineHeight: '1.6', color: '#374151' }
      },
      {
        id: generateId(),
        type: 'button',
        content: 'View Full Itinerary',
        styles: { backgroundColor: '#0369a1', color: '#ffffff', padding: '15px 30px', borderRadius: '8px', fontSize: '18px', fontWeight: '600', textAlign: 'center', margin: '20px 0' },
        attributes: { href: '#', target: '_blank' }
      },
      {
        id: generateId(),
        type: 'footer',
        content: '<p>© 2024 WanderLust Travel. All rights reserved.</p><p><a href="#" style="color: #6b7280;">Unsubscribe</a> | <a href="#" style="color: #6b7280;">Privacy Policy</a></p>',
        styles: { backgroundColor: '#f9fafb', padding: '20px', color: '#6b7280', fontSize: '12px', textAlign: 'center' }
      }
    ],
    settings: { width: '600px', backgroundColor: '#ffffff', fontFamily: 'Arial, sans-serif', responsive: true },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },

  {
    id: 'travel-destination-guide',
    name: 'Travel Destination Guide',
    subject: 'Discover Hidden Gems in Bali 🏝️',
    preheader: 'Your complete guide to an unforgettable Bali experience',
    components: [
      {
        id: generateId(),
        type: 'header',
        content: 'ExploreWorld',
        styles: { backgroundColor: '#059669', padding: '20px', color: '#ffffff', fontSize: '28px', fontWeight: 'bold' },
        attributes: { href: 'View in browser' }
      },
      {
        id: generateId(),
        type: 'text',
        content: '<h1 style="color: #059669; font-size: 32px; text-align: center; margin: 20px 0;">Bali Travel Guide</h1>',
        styles: { padding: '20px', textAlign: 'center', backgroundColor: '#ecfdf5' }
      },
      {
        id: generateId(),
        type: 'image',
        content: '',
        styles: { width: '100%', height: 'auto', padding: '20px 0' },
        attributes: { src: 'https://images.pexels.com/photos/2474690/pexels-photo-2474690.jpeg?auto=compress&cs=tinysrgb&w=600', alt: 'Bali Beach' }
      },
      {
        id: generateId(),
        type: 'text',
        content: '<h2 style="color: #059669;">🏝️ Top 5 Hidden Gems</h2><p>Discover the secret spots that only locals know about. From secluded beaches to ancient temples, Bali has so much more to offer beyond the tourist trails.</p>',
        styles: { padding: '20px', fontSize: '16px', lineHeight: '1.6', color: '#374151' }
      },
      {
        id: generateId(),
        type: 'columns',
        content: '',
        styles: { padding: '20px 0' },
        attributes: { columns: 2 }
      },
      {
        id: generateId(),
        type: 'text',
        content: '<h3 style="color: #059669;">🍽️ Must-Try Local Cuisine:</h3><ul><li>Nasi Goreng at Warung Babi Guling</li><li>Fresh seafood at Jimbaran Beach</li><li>Traditional Balinese coffee</li><li>Tropical fruit markets</li></ul>',
        styles: { padding: '20px', fontSize: '16px', lineHeight: '1.6', color: '#374151' }
      },
      {
        id: generateId(),
        type: 'button',
        content: 'Plan Your Trip',
        styles: { backgroundColor: '#059669', color: '#ffffff', padding: '15px 30px', borderRadius: '8px', fontSize: '18px', fontWeight: '600', textAlign: 'center', margin: '20px 0' },
        attributes: { href: '#', target: '_blank' }
      },
      {
        id: generateId(),
        type: 'footer',
        content: '<p>© 2024 ExploreWorld. All rights reserved.</p><p><a href="#" style="color: #6b7280;">Unsubscribe</a> | <a href="#" style="color: #6b7280;">Privacy Policy</a></p>',
        styles: { backgroundColor: '#f9fafb', padding: '20px', color: '#6b7280', fontSize: '12px', textAlign: 'center' }
      }
    ],
    settings: { width: '600px', backgroundColor: '#ffffff', fontFamily: 'Arial, sans-serif', responsive: true },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },

  // Fitness Templates
  {
    id: 'fitness-workout-plan',
    name: 'Fitness Workout Plan',
    subject: 'Your Personalized 30-Day Fitness Challenge 💪',
    preheader: 'Transform your body with our expert-designed program',
    components: [
      {
        id: generateId(),
        type: 'header',
        content: 'FitLife Gym',
        styles: { backgroundColor: '#dc2626', padding: '20px', color: '#ffffff', fontSize: '28px', fontWeight: 'bold' },
        attributes: { href: 'View in browser' }
      },
      {
        id: generateId(),
        type: 'text',
        content: '<h1 style="color: #dc2626; font-size: 32px; text-align: center; margin: 20px 0;">30-Day Challenge!</h1>',
        styles: { padding: '20px', textAlign: 'center', backgroundColor: '#fef2f2' }
      },
      {
        id: generateId(),
        type: 'image',
        content: '',
        styles: { width: '100%', height: 'auto', padding: '20px 0' },
        attributes: { src: 'https://images.pexels.com/photos/416778/pexels-photo-416778.jpeg?auto=compress&cs=tinysrgb&w=600', alt: 'Fitness Training' }
      },
      {
        id: generateId(),
        type: 'text',
        content: '<h2 style="color: #dc2626;">💪 This Week\'s Focus: Upper Body</h2><p>Build strength and definition with our targeted upper body workouts. Each session is designed to maximize results in minimum time.</p>',
        styles: { padding: '20px', fontSize: '16px', lineHeight: '1.6', color: '#374151' }
      },
      {
        id: generateId(),
        type: 'text',
        content: '<div style="border: 2px solid #dc2626; border-radius: 8px; padding: 20px; margin: 20px 0;"><h3 style="margin: 0 0 15px 0; color: #dc2626;">🏋️ Weekly Schedule</h3><p><strong>Monday:</strong> Chest & Triceps</p><p><strong>Wednesday:</strong> Back & Biceps</p><p><strong>Friday:</strong> Shoulders & Core</p><p><strong>Weekend:</strong> Active Recovery</p></div>',
        styles: { padding: '20px' }
      },
      {
        id: generateId(),
        type: 'button',
        content: 'Start Today\'s Workout',
        styles: { backgroundColor: '#dc2626', color: '#ffffff', padding: '15px 30px', borderRadius: '8px', fontSize: '18px', fontWeight: '600', textAlign: 'center', margin: '20px 0' },
        attributes: { href: '#', target: '_blank' }
      },
      {
        id: generateId(),
        type: 'footer',
        content: '<p>© 2024 FitLife Gym. All rights reserved.</p><p><a href="#" style="color: #6b7280;">Unsubscribe</a> | <a href="#" style="color: #6b7280;">Privacy Policy</a></p>',
        styles: { backgroundColor: '#f9fafb', padding: '20px', color: '#6b7280', fontSize: '12px', textAlign: 'center' }
      }
    ],
    settings: { width: '600px', backgroundColor: '#ffffff', fontFamily: 'Arial, sans-serif', responsive: true },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },

  {
    id: 'fitness-nutrition-tips',
    name: 'Fitness Nutrition Tips',
    subject: 'Fuel Your Workouts: Nutrition Guide 🥗',
    preheader: 'Expert nutrition advice for optimal performance',
    components: [
      {
        id: generateId(),
        type: 'header',
        content: 'NutriPro Fitness',
        styles: { backgroundColor: '#16a34a', padding: '20px', color: '#ffffff', fontSize: '28px', fontWeight: 'bold' },
        attributes: { href: 'View in browser' }
      },
      {
        id: generateId(),
        type: 'text',
        content: '<h1 style="color: #16a34a; font-size: 28px; text-align: center; margin: 20px 0;">Weekly Nutrition Guide</h1>',
        styles: { padding: '20px', textAlign: 'center', backgroundColor: '#f0fdf4' }
      },
      {
        id: generateId(),
        type: 'text',
        content: '<h2 style="color: #16a34a;">🥗 Pre-Workout Nutrition</h2><p>Maximize your workout performance with the right fuel. Learn what to eat and when to eat it for optimal energy and recovery.</p>',
        styles: { padding: '20px', fontSize: '16px', lineHeight: '1.6', color: '#374151' }
      },
      {
        id: generateId(),
        type: 'columns',
        content: '',
        styles: { padding: '20px 0' },
        attributes: { columns: 2 }
      },
      {
        id: generateId(),
        type: 'text',
        content: '<h3 style="color: #16a34a;">💡 Quick Tips:</h3><ul><li>Eat 30-60 minutes before workout</li><li>Focus on complex carbohydrates</li><li>Stay hydrated throughout the day</li><li>Post-workout protein within 30 minutes</li></ul>',
        styles: { padding: '20px', fontSize: '16px', lineHeight: '1.6', color: '#374151' }
      },
      {
        id: generateId(),
        type: 'button',
        content: 'Get Meal Plan',
        styles: { backgroundColor: '#16a34a', color: '#ffffff', padding: '15px 30px', borderRadius: '8px', fontSize: '18px', fontWeight: '600', textAlign: 'center', margin: '20px 0' },
        attributes: { href: '#', target: '_blank' }
      },
      {
        id: generateId(),
        type: 'footer',
        content: '<p>© 2024 NutriPro Fitness. All rights reserved.</p><p><a href="#" style="color: #6b7280;">Unsubscribe</a> | <a href="#" style="color: #6b7280;">Privacy Policy</a></p>',
        styles: { backgroundColor: '#f9fafb', padding: '20px', color: '#6b7280', fontSize: '12px', textAlign: 'center' }
      }
    ],
    settings: { width: '600px', backgroundColor: '#ffffff', fontFamily: 'Arial, sans-serif', responsive: true },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },

  // Fashion Templates
  {
    id: 'fashion-new-collection',
    name: 'Fashion New Collection',
    subject: 'Spring Collection 2024: Fresh Styles Await! 👗',
    preheader: 'Discover the latest trends and must-have pieces',
    components: [
      {
        id: generateId(),
        type: 'header',
        content: 'StyleHub Fashion',
        styles: { backgroundColor: '#be185d', padding: '20px', color: '#ffffff', fontSize: '28px', fontWeight: 'bold' },
        attributes: { href: 'View in browser' }
      },
      {
        id: generateId(),
        type: 'text',
        content: '<h1 style="color: #be185d; font-size: 32px; text-align: center; margin: 20px 0;">Spring Collection 2024</h1>',
        styles: { padding: '20px', textAlign: 'center', backgroundColor: '#fdf2f8' }
      },
      {
        id: generateId(),
        type: 'image',
        content: '',
        styles: { width: '100%', height: 'auto', padding: '20px 0' },
        attributes: { src: 'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=600', alt: 'Spring Fashion' }
      },
      {
        id: generateId(),
        type: 'text',
        content: '<h2 style="color: #be185d;">🌸 Fresh Spring Styles</h2><p>Embrace the season with our carefully curated collection of vibrant colors, flowing fabrics, and contemporary designs that celebrate femininity and confidence.</p>',
        styles: { padding: '20px', fontSize: '16px', lineHeight: '1.6', color: '#374151' }
      },
      {
        id: generateId(),
        type: 'columns',
        content: '',
        styles: { padding: '20px 0' },
        attributes: { columns: 3 }
      },
      {
        id: generateId(),
        type: 'text',
        content: '<div style="background: #fef3c7; padding: 20px; border-radius: 8px; text-align: center; margin: 20px 0;"><h3 style="color: #92400e; margin: 0 0 10px 0;">🎉 Launch Special!</h3><p style="color: #92400e; margin: 0;">20% off entire collection - First 48 hours only</p></div>',
        styles: { padding: '20px' }
      },
      {
        id: generateId(),
        type: 'button',
        content: 'Shop Collection',
        styles: { backgroundColor: '#be185d', color: '#ffffff', padding: '15px 30px', borderRadius: '8px', fontSize: '18px', fontWeight: '600', textAlign: 'center', margin: '20px 0' },
        attributes: { href: '#', target: '_blank' }
      },
      {
        id: generateId(),
        type: 'social',
        content: '',
        styles: { backgroundColor: '#be185d', padding: '20px 0', textAlign: 'center' }
      },
      {
        id: generateId(),
        type: 'footer',
        content: '<p>© 2024 StyleHub Fashion. All rights reserved.</p><p><a href="#" style="color: #6b7280;">Unsubscribe</a> | <a href="#" style="color: #6b7280;">Privacy Policy</a></p>',
        styles: { backgroundColor: '#f9fafb', padding: '20px', color: '#6b7280', fontSize: '12px', textAlign: 'center' }
      }
    ],
    settings: { width: '600px', backgroundColor: '#ffffff', fontFamily: 'Arial, sans-serif', responsive: true },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },

  {
    id: 'fashion-style-guide',
    name: 'Fashion Style Guide',
    subject: 'Style Guide: How to Dress for Success 💼',
    preheader: 'Professional styling tips from our fashion experts',
    components: [
      {
        id: generateId(),
        type: 'header',
        content: 'Fashion Forward',
        styles: { backgroundColor: '#1f2937', padding: '20px', color: '#ffffff', fontSize: '28px', fontWeight: 'bold' },
        attributes: { href: 'View in browser' }
      },
      {
        id: generateId(),
        type: 'text',
        content: '<h1 style="color: #1f2937; font-size: 28px; text-align: center; margin: 20px 0;">Professional Style Guide</h1>',
        styles: { padding: '20px', textAlign: 'center', backgroundColor: '#f9fafb' }
      },
      {
        id: generateId(),
        type: 'text',
        content: '<h2 style="color: #1f2937;">💼 Dress for Success</h2><p>Master the art of professional dressing with our comprehensive style guide. Learn how to build a versatile wardrobe that works for any business occasion.</p>',
        styles: { padding: '20px', fontSize: '16px', lineHeight: '1.6', color: '#374151' }
      },
      {
        id: generateId(),
        type: 'text',
        content: '<h3 style="color: #1f2937;">👔 Essential Pieces:</h3><ul><li>Classic blazer in navy or black</li><li>Well-fitted dress pants</li><li>Crisp white button-down shirt</li><li>Professional dress shoes</li><li>Quality leather accessories</li></ul>',
        styles: { padding: '20px', fontSize: '16px', lineHeight: '1.6', color: '#374151' }
      },
      {
        id: generateId(),
        type: 'columns',
        content: '',
        styles: { padding: '20px 0' },
        attributes: { columns: 2 }
      },
      {
        id: generateId(),
        type: 'button',
        content: 'Shop Professional Wear',
        styles: { backgroundColor: '#1f2937', color: '#ffffff', padding: '15px 30px', borderRadius: '8px', fontSize: '18px', fontWeight: '600', textAlign: 'center', margin: '20px 0' },
        attributes: { href: '#', target: '_blank' }
      },
      {
        id: generateId(),
        type: 'footer',
        content: '<p>© 2024 Fashion Forward. All rights reserved.</p><p><a href="#" style="color: #6b7280;">Unsubscribe</a> | <a href="#" style="color: #6b7280;">Privacy Policy</a></p>',
        styles: { backgroundColor: '#f9fafb', padding: '20px', color: '#6b7280', fontSize: '12px', textAlign: 'center' }
      }
    ],
    settings: { width: '600px', backgroundColor: '#ffffff', fontFamily: 'Arial, sans-serif', responsive: true },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },

  // Non-Profit Templates
  {
    id: 'nonprofit-donation-appeal',
    name: 'Non-Profit Donation Appeal',
    subject: 'Help Us Make a Difference: Your Support Matters ❤️',
    preheader: 'Together we can create positive change in our community',
    components: [
      {
        id: generateId(),
        type: 'header',
        content: 'Hope Foundation',
        styles: { backgroundColor: '#dc2626', padding: '20px', color: '#ffffff', fontSize: '28px', fontWeight: 'bold' },
        attributes: { href: 'View in browser' }
      },
      {
        id: generateId(),
        type: 'text',
        content: '<h1 style="color: #dc2626; font-size: 32px; text-align: center; margin: 20px 0;">Make a Difference Today</h1>',
        styles: { padding: '20px', textAlign: 'center', backgroundColor: '#fef2f2' }
      },
      {
        id: generateId(),
        type: 'image',
        content: '',
        styles: { width: '100%', height: 'auto', padding: '20px 0' },
        attributes: { src: 'https://images.pexels.com/photos/6646918/pexels-photo-6646918.jpeg?auto=compress&cs=tinysrgb&w=600', alt: 'Community Help' }
      },
      {
        id: generateId(),
        type: 'text',
        content: '<p>Your generosity has already helped us provide meals to 500 families this month. But there are still many more who need our help. With your continued support, we can reach even more people in need.</p>',
        styles: { padding: '20px', fontSize: '16px', lineHeight: '1.6', color: '#374151' }
      },
      {
        id: generateId(),
        type: 'text',
        content: '<div style="border: 2px solid #dc2626; border-radius: 8px; padding: 20px; margin: 20px 0;"><h3 style="margin: 0 0 15px 0; color: #dc2626;">💝 Your Impact</h3><p><strong>$25</strong> provides meals for a family of 4</p><p><strong>$50</strong> supplies school materials for 10 children</p><p><strong>$100</strong> funds medical care for those in need</p></div>',
        styles: { padding: '20px' }
      },
      {
        id: generateId(),
        type: 'button',
        content: 'Donate Now',
        styles: { backgroundColor: '#dc2626', color: '#ffffff', padding: '15px 30px', borderRadius: '8px', fontSize: '18px', fontWeight: '600', textAlign: 'center', margin: '20px 0' },
        attributes: { href: '#', target: '_blank' }
      },
      {
        id: generateId(),
        type: 'footer',
        content: '<p>© 2024 Hope Foundation. All rights reserved.</p><p><a href="#" style="color: #6b7280;">Unsubscribe</a> | <a href="#" style="color: #6b7280;">Privacy Policy</a></p>',
        styles: { backgroundColor: '#f9fafb', padding: '20px', color: '#6b7280', fontSize: '12px', textAlign: 'center' }
      }
    ],
    settings: { width: '600px', backgroundColor: '#ffffff', fontFamily: 'Arial, sans-serif', responsive: true },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },

  {
    id: 'nonprofit-volunteer-recruitment',
    name: 'Non-Profit Volunteer Recruitment',
    subject: 'Join Our Team: Volunteers Needed! 🤝',
    preheader: 'Make a difference in your community - volunteer with us',
    components: [
      {
        id: generateId(),
        type: 'header',
        content: 'Community Helpers',
        styles: { backgroundColor: '#059669', padding: '20px', color: '#ffffff', fontSize: '28px', fontWeight: 'bold' },
        attributes: { href: 'View in browser' }
      },
      {
        id: generateId(),
        type: 'text',
        content: '<h1 style="color: #059669; font-size: 32px; text-align: center; margin: 20px 0;">Volunteers Needed!</h1>',
        styles: { padding: '20px', textAlign: 'center', backgroundColor: '#ecfdf5' }
      },
      {
        id: generateId(),
        type: 'text',
        content: '<p>Join our amazing team of volunteers and help make a real difference in your community. Whether you have an hour a week or a day a month, your time and skills are valuable to us.</p>',
        styles: { padding: '20px', fontSize: '16px', lineHeight: '1.6', color: '#374151' }
      },
      {
        id: generateId(),
        type: 'text',
        content: '<h3 style="color: #059669;">🤝 Volunteer Opportunities:</h3><ul><li>Food bank assistance</li><li>Tutoring and mentoring</li><li>Event planning and coordination</li><li>Administrative support</li><li>Community outreach</li></ul>',
        styles: { padding: '20px', fontSize: '16px', lineHeight: '1.6', color: '#374151' }
      },
      {
        id: generateId(),
        type: 'columns',
        content: '',
        styles: { padding: '20px 0' },
        attributes: { columns: 2 }
      },
      {
        id: generateId(),
        type: 'button',
        content: 'Sign Up to Volunteer',
        styles: { backgroundColor: '#059669', color: '#ffffff', padding: '15px 30px', borderRadius: '8px', fontSize: '18px', fontWeight: '600', textAlign: 'center', margin: '20px 0' },
        attributes: { href: '#', target: '_blank' }
      },
      {
        id: generateId(),
        type: 'footer',
        content: '<p>© 2024 Community Helpers. All rights reserved.</p><p><a href="#" style="color: #6b7280;">Unsubscribe</a> | <a href="#" style="color: #6b7280;">Privacy Policy</a></p>',
        styles: { backgroundColor: '#f9fafb', padding: '20px', color: '#6b7280', fontSize: '12px', textAlign: 'center' }
      }
    ],
    settings: { width: '600px', backgroundColor: '#ffffff', fontFamily: 'Arial, sans-serif', responsive: true },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },

  // Event Templates
  {
    id: 'event-conference-invitation',
    name: 'Event Conference Invitation',
    subject: 'You\'re Invited: Tech Innovation Summit 2024 🚀',
    preheader: 'Join industry leaders for two days of innovation and networking',
    components: [
      {
        id: generateId(),
        type: 'header',
        content: 'Tech Summit 2024',
        styles: { backgroundColor: '#1e40af', padding: '20px', color: '#ffffff', fontSize: '28px', fontWeight: 'bold' },
        attributes: { href: 'View in browser' }
      },
      {
        id: generateId(),
        type: 'text',
        content: '<h1 style="color: #1e40af; font-size: 32px; text-align: center; margin: 20px 0;">You\'re Invited!</h1>',
        styles: { padding: '20px', textAlign: 'center', backgroundColor: '#eff6ff' }
      },
      {
        id: generateId(),
        type: 'image',
        content: '',
        styles: { width: '100%', height: 'auto', padding: '20px 0' },
        attributes: { src: 'https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg?auto=compress&cs=tinysrgb&w=600', alt: 'Conference Hall' }
      },
      {
        id: generateId(),
        type: 'text',
        content: '<div style="border: 2px solid #1e40af; border-radius: 8px; padding: 20px; margin: 20px 0;"><h3 style="margin: 0 0 15px 0; color: #1e40af;">📅 Event Details</h3><p><strong>Date:</strong> April 15-16, 2024</p><p><strong>Time:</strong> 9:00 AM - 6:00 PM</p><p><strong>Location:</strong> Convention Center, Downtown</p><p><strong>Speakers:</strong> 20+ Industry Leaders</p></div>',
        styles: { padding: '20px' }
      },
      {
        id: generateId(),
        type: 'text',
        content: '<p>Join 500+ tech professionals for two days of cutting-edge presentations, hands-on workshops, and valuable networking opportunities. Don\'t miss this chance to stay ahead of the curve!</p>',
        styles: { padding: '20px', fontSize: '16px', lineHeight: '1.6', color: '#374151' }
      },
      {
        id: generateId(),
        type: 'text',
        content: '<div style="background: #fef3c7; padding: 20px; border-radius: 8px; text-align: center; margin: 20px 0;"><h3 style="color: #92400e; margin: 0 0 10px 0;">🎟️ Early Bird Special!</h3><p style="color: #92400e; margin: 0;">Register by March 1st and save 30%</p></div>',
        styles: { padding: '20px' }
      },
      {
        id: generateId(),
        type: 'button',
        content: 'Register Now',
        styles: { backgroundColor: '#1e40af', color: '#ffffff', padding: '15px 30px', borderRadius: '8px', fontSize: '18px', fontWeight: '600', textAlign: 'center', margin: '20px 0' },
        attributes: { href: '#', target: '_blank' }
      },
      {
        id: generateId(),
        type: 'footer',
        content: '<p>© 2024 Tech Summit. All rights reserved.</p><p><a href="#" style="color: #6b7280;">Unsubscribe</a> | <a href="#" style="color: #6b7280;">Privacy Policy</a></p>',
        styles: { backgroundColor: '#f9fafb', padding: '20px', color: '#6b7280', fontSize: '12px', textAlign: 'center' }
      }
    ],
    settings: { width: '600px', backgroundColor: '#ffffff', fontFamily: 'Arial, sans-serif', responsive: true },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },

  {
    id: 'event-webinar-reminder',
    name: 'Event Webinar Reminder',
    subject: 'Reminder: Webinar Starts in 1 Hour! ⏰',
    preheader: 'Don\'t miss our expert session on digital marketing',
    components: [
      {
        id: generateId(),
        type: 'header',
        content: 'WebinarPro',
        styles: { backgroundColor: '#7c3aed', padding: '20px', color: '#ffffff', fontSize: '28px', fontWeight: 'bold' },
        attributes: { href: 'View in browser' }
      },
      {
        id: generateId(),
        type: 'text',
        content: '<h1 style="color: #dc2626; font-size: 32px; text-align: center; margin: 20px 0;">Starting Soon!</h1>',
        styles: { padding: '20px', textAlign: 'center', backgroundColor: '#fef2f2' }
      },
      {
        id: generateId(),
        type: 'text',
        content: '<div style="border: 2px solid #dc2626; border-radius: 8px; padding: 20px; margin: 20px 0; background: #fef2f2;"><h3 style="margin: 0 0 15px 0; color: #dc2626;">⏰ Webinar Reminder</h3><p><strong>Topic:</strong> Digital Marketing Mastery</p><p><strong>Time:</strong> Today at 2:00 PM EST</p><p><strong>Duration:</strong> 60 minutes + Q&A</p><p><strong>Speaker:</strong> Sarah Johnson, Marketing Expert</p></div>',
        styles: { padding: '20px' }
      },
      {
        id: generateId(),
        type: 'text',
        content: '<p>Get ready to learn the latest digital marketing strategies that will transform your business. Make sure you have a stable internet connection and a quiet space for the session.</p>',
        styles: { padding: '20px', fontSize: '16px', lineHeight: '1.6', color: '#374151' }
      },
      {
        id: generateId(),
        type: 'button',
        content: 'Join Webinar',
        styles: { backgroundColor: '#7c3aed', color: '#ffffff', padding: '15px 30px', borderRadius: '8px', fontSize: '18px', fontWeight: '600', textAlign: 'center', margin: '20px 0' },
        attributes: { href: '#', target: '_blank' }
      },
      {
        id: generateId(),
        type: 'text',
        content: '<p style="text-align: center; font-size: 14px; color: #6b7280;">Can\'t make it? Don\'t worry - all registered attendees will receive a recording.</p>',
        styles: { padding: '20px' }
      },
      {
        id: generateId(),
        type: 'footer',
        content: '<p>© 2024 WebinarPro. All rights reserved.</p><p><a href="#" style="color: #6b7280;">Unsubscribe</a> | <a href="#" style="color: #6b7280;">Privacy Policy</a></p>',
        styles: { backgroundColor: '#f9fafb', padding: '20px', color: '#6b7280', fontSize: '12px', textAlign: 'center' }
      }
    ],
    settings: { width: '600px', backgroundColor: '#ffffff', fontFamily: 'Arial, sans-serif', responsive: true },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },

  // SaaS Templates
  {
    id: 'saas-trial-expiry',
    name: 'SaaS Trial Expiry',
    subject: 'Your Free Trial Expires Tomorrow ⏰',
    preheader: 'Upgrade now to continue enjoying all premium features',
    components: [
      {
        id: generateId(),
        type: 'header',
        content: 'CloudApp Pro',
        styles: { backgroundColor: '#0369a1', padding: '20px', color: '#ffffff', fontSize: '28px', fontWeight: 'bold' },
        attributes: { href: 'View in browser' }
      },
      {
        id: generateId(),
        type: 'text',
        content: '<h1 style="color: #dc2626; font-size: 28px; text-align: center; margin: 20px 0;">Trial Ending Soon!</h1>',
        styles: { padding: '20px', textAlign: 'center', backgroundColor: '#fef2f2' }
      },
      {
        id: generateId(),
        type: 'text',
        content: '<p>Your 14-day free trial of CloudApp Pro expires tomorrow. Don\'t lose access to the powerful features that have been helping you boost productivity!</p>',
        styles: { padding: '20px', fontSize: '16px', lineHeight: '1.6', color: '#374151' }
      },
      {
        id: generateId(),
        type: 'text',
        content: '<h3 style="color: #0369a1;">✨ What you\'ll keep with Pro:</h3><ul><li>Unlimited projects and storage</li><li>Advanced analytics and reporting</li><li>Priority customer support</li><li>Team collaboration tools</li><li>API access and integrations</li></ul>',
        styles: { padding: '20px', fontSize: '16px', lineHeight: '1.6', color: '#374151' }
      },
      {
        id: generateId(),
        type: 'text',
        content: '<div style="background: #fef3c7; padding: 20px; border-radius: 8px; text-align: center; margin: 20px 0;"><h3 style="color: #92400e; margin: 0 0 10px 0;">🎉 Special Offer!</h3><p style="color: #92400e; margin: 0;">Upgrade now and get 2 months free</p></div>',
        styles: { padding: '20px' }
      },
      {
        id: generateId(),
        type: 'button',
        content: 'Upgrade to Pro',
        styles: { backgroundColor: '#0369a1', color: '#ffffff', padding: '15px 30px', borderRadius: '8px', fontSize: '18px', fontWeight: '600', textAlign: 'center', margin: '20px 0' },
        attributes: { href: '#', target: '_blank' }
      },
      {
        id: generateId(),
        type: 'footer',
        content: '<p>© 2024 CloudApp Pro. All rights reserved.</p><p><a href="#" style="color: #6b7280;">Unsubscribe</a> | <a href="#" style="color: #6b7280;">Privacy Policy</a></p>',
        styles: { backgroundColor: '#f9fafb', padding: '20px', color: '#6b7280', fontSize: '12px', textAlign: 'center' }
      }
    ],
    settings: { width: '600px', backgroundColor: '#ffffff', fontFamily: 'Arial, sans-serif', responsive: true },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },

  {
    id: 'saas-feature-announcement',
    name: 'SaaS Feature Announcement',
    subject: 'New Feature Alert: AI-Powered Analytics! 🤖',
    preheader: 'Discover insights like never before with our latest update',
    components: [
      {
        id: generateId(),
        type: 'header',
        content: 'DataInsights Pro',
        styles: { backgroundColor: '#7c3aed', padding: '20px', color: '#ffffff', fontSize: '28px', fontWeight: 'bold' },
        attributes: { href: 'View in browser' }
      },
      {
        id: generateId(),
        type: 'text',
        content: '<h1 style="color: #7c3aed; font-size: 32px; text-align: center; margin: 20px 0;">New Feature Launch!</h1>',
        styles: { padding: '20px', textAlign: 'center', backgroundColor: '#f3e8ff' }
      },
      {
        id: generateId(),
        type: 'image',
        content: '',
        styles: { width: '100%', height: 'auto', padding: '20px 0' },
        attributes: { src: 'https://images.pexels.com/photos/590020/pexels-photo-590020.jpeg?auto=compress&cs=tinysrgb&w=600', alt: 'AI Analytics Dashboard' }
      },
      {
        id: generateId(),
        type: 'text',
        content: '<h2 style="color: #7c3aed;">🤖 AI-Powered Analytics</h2><p>Our new AI engine analyzes your data patterns and provides actionable insights automatically. No more manual report generation - let AI do the heavy lifting!</p>',
        styles: { padding: '20px', fontSize: '16px', lineHeight: '1.6', color: '#374151' }
      },
      {
        id: generateId(),
        type: 'text',
        content: '<h3 style="color: #7c3aed;">🚀 Key Benefits:</h3><ul><li>Automated insight generation</li><li>Predictive trend analysis</li><li>Custom recommendation engine</li><li>Real-time anomaly detection</li></ul>',
        styles: { padding: '20px', fontSize: '16px', lineHeight: '1.6', color: '#374151' }
      },
      {
        id: generateId(),
        type: 'button',
        content: 'Try AI Analytics',
        styles: { backgroundColor: '#7c3aed', color: '#ffffff', padding: '15px 30px', borderRadius: '8px', fontSize: '18px', fontWeight: '600', textAlign: 'center', margin: '20px 0' },
        attributes: { href: '#', target: '_blank' }
      },
      {
        id: generateId(),
        type: 'footer',
        content: '<p>© 2024 DataInsights Pro. All rights reserved.</p><p><a href="#" style="color: #6b7280;">Unsubscribe</a> | <a href="#" style="color: #6b7280;">Privacy Policy</a></p>',
        styles: { backgroundColor: '#f9fafb', padding: '20px', color: '#6b7280', fontSize: '12px', textAlign: 'center' }
      }
    ],
    settings: { width: '600px', backgroundColor: '#ffffff', fontFamily: 'Arial, sans-serif', responsive: true },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },

  // Automotive Templates
  {
    id: 'automotive-service-reminder',
    name: 'Automotive Service Reminder',
    subject: 'Service Reminder: Your Car Needs Attention 🚗',
    preheader: 'Keep your vehicle running smoothly with regular maintenance',
    components: [
      {
        id: generateId(),
        type: 'header',
        content: 'AutoCare Service',
        styles: { backgroundColor: '#1f2937', padding: '20px', color: '#ffffff', fontSize: '28px', fontWeight: 'bold' },
        attributes: { href: 'View in browser' }
      },
      {
        id: generateId(),
        type: 'text',
        content: '<h1 style="color: #1f2937; font-size: 28px; text-align: center; margin: 20px 0;">Service Reminder</h1>',
        styles: { padding: '20px', textAlign: 'center', backgroundColor: '#f9fafb' }
      },
      {
        id: generateId(),
        type: 'text',
        content: '<div style="border: 2px solid #1f2937; border-radius: 8px; padding: 20px; margin: 20px 0;"><h3 style="margin: 0 0 15px 0; color: #1f2937;">🚗 Vehicle Information</h3><p><strong>Vehicle:</strong> 2020 Honda Accord</p><p><strong>License:</strong> ABC-1234</p><p><strong>Last Service:</strong> December 15, 2023</p><p><strong>Mileage:</strong> 45,230 miles</p></div>',
        styles: { padding: '20px' }
      },
      {
        id: generateId(),
        type: 'text',
        content: '<p>It\'s time for your vehicle\'s scheduled maintenance. Regular service helps ensure optimal performance, safety, and longevity of your car.</p>',
        styles: { padding: '20px', fontSize: '16px', lineHeight: '1.6', color: '#374151' }
      },
      {
        id: generateId(),
        type: 'text',
        content: '<h3 style="color: #1f2937;">🔧 Recommended Services:</h3><ul><li>Oil change and filter replacement</li><li>Tire rotation and pressure check</li><li>Brake inspection</li><li>Fluid level check</li><li>Battery test</li></ul>',
        styles: { padding: '20px', fontSize: '16px', lineHeight: '1.6', color: '#374151' }
      },
      {
        id: generateId(),
        type: 'button',
        content: 'Schedule Service',
        styles: { backgroundColor: '#1f2937', color: '#ffffff', padding: '15px 30px', borderRadius: '8px', fontSize: '18px', fontWeight: '600', textAlign: 'center', margin: '20px 0' },
        attributes: { href: '#', target: '_blank' }
      },
      {
        id: generateId(),
        type: 'footer',
        content: '<p>© 2024 AutoCare Service. All rights reserved.</p><p><a href="#" style="color: #6b7280;">Unsubscribe</a> | <a href="#" style="color: #6b7280;">Privacy Policy</a></p>',
        styles: { backgroundColor: '#f9fafb', padding: '20px', color: '#6b7280', fontSize: '12px', textAlign: 'center' }
      }
    ],
    settings: { width: '600px', backgroundColor: '#ffffff', fontFamily: 'Arial, sans-serif', responsive: true },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },

  {
    id: 'automotive-new-model',
    name: 'Automotive New Model Launch',
    subject: 'Introducing the All-New 2024 Model! 🚙',
    preheader: 'Experience the future of driving with our latest innovation',
    components: [
      {
        id: generateId(),
        type: 'header',
        content: 'FutureAuto',
        styles: { backgroundColor: '#dc2626', padding: '20px', color: '#ffffff', fontSize: '28px', fontWeight: 'bold' },
        attributes: { href: 'View in browser' }
      },
      {
        id: generateId(),
        type: 'text',
        content: '<h1 style="color: #dc2626; font-size: 32px; text-align: center; margin: 20px 0;">2024 Model Launch!</h1>',
        styles: { padding: '20px', textAlign: 'center', backgroundColor: '#fef2f2' }
      },
      {
        id: generateId(),
        type: 'image',
        content: '',
        styles: { width: '100%', height: 'auto', padding: '20px 0' },
        attributes: { src: 'https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg?auto=compress&cs=tinysrgb&w=600', alt: 'New Car Model' }
      },
      {
        id: generateId(),
        type: 'text',
        content: '<h2 style="color: #dc2626;">🚙 Revolutionary Features</h2><p>Experience the perfect blend of performance, efficiency, and technology. Our 2024 model sets new standards in automotive excellence.</p>',
        styles: { padding: '20px', fontSize: '16px', lineHeight: '1.6', color: '#374151' }
      },
      {
        id: generateId(),
        type: 'text',
        content: '<h3 style="color: #dc2626;">⚡ Key Highlights:</h3><ul><li>Advanced hybrid engine technology</li><li>Autonomous driving capabilities</li><li>Premium interior with smart features</li><li>Enhanced safety systems</li><li>Best-in-class fuel efficiency</li></ul>',
        styles: { padding: '20px', fontSize: '16px', lineHeight: '1.6', color: '#374151' }
      },
      {
        id: generateId(),
        type: 'text',
        content: '<div style="background: #fef3c7; padding: 20px; border-radius: 8px; text-align: center; margin: 20px 0;"><h3 style="color: #92400e; margin: 0 0 10px 0;">🎁 Launch Special!</h3><p style="color: #92400e; margin: 0;">0% financing for qualified buyers</p></div>',
        styles: { padding: '20px' }
      },
      {
        id: generateId(),
        type: 'button',
        content: 'Schedule Test Drive',
        styles: { backgroundColor: '#dc2626', color: '#ffffff', padding: '15px 30px', borderRadius: '8px', fontSize: '18px', fontWeight: '600', textAlign: 'center', margin: '20px 0' },
        attributes: { href: '#', target: '_blank' }
      },
      {
        id: generateId(),
        type: 'footer',
        content: '<p>© 2024 FutureAuto. All rights reserved.</p><p><a href="#" style="color: #6b7280;">Unsubscribe</a> | <a href="#" style="color: #6b7280;">Privacy Policy</a></p>',
        styles: { backgroundColor: '#f9fafb', padding: '20px', color: '#6b7280', fontSize: '12px', textAlign: 'center' }
      }
    ],
    settings: { width: '600px', backgroundColor: '#ffffff', fontFamily: 'Arial, sans-serif', responsive: true },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];