import { FaHeadphones, FaRobot, FaUsers, FaComments, FaStar, FaFire, FaDownload, FaBookmark } from 'react-icons/fa';
import style from './WhyBookVoice.module.css';

const WhyBookVoice = () => {
  const features = [
    {
      id: 1,
      icon: <FaHeadphones />,
      title: "Audio Reading",
      badge: null,
      description: "Experience books with natural voice using advanced AI technology. Adjust speed, tone, and enjoy a personalized reading experience.",
      highlights: ["Natural AI Voice", "Speed Control", "Tone Adjustment", "Personalized Experience"]
    },
    {
      id: 2,
      icon: <FaRobot />,
      title: "AI Smart Summaries",
      badge: "NEW",
      badgeType: "new",
      description: "Quickly grasp main ideas with AI-powered summaries. Save time with detailed analysis and never miss important points.",
      highlights: ["AI-Powered Analysis", "Quick Insights", "Key Points", "Time Saving"]
    },
    {
      id: 3,
      icon: <FaUsers />,
      title: "Reader Community",
      badge: "POPULAR",
      badgeType: "popular",
      description: "Connect with thousands of readers. Discover book recommendations, share reviews, and join reading groups.",
      highlights: ["Thousands of Readers", "Book Recommendations", "Share Reviews", "Reading Groups"]
    },
    {
      id: 4,
      icon: <FaComments />,
      title: "Instant Chat",
      badge: null,
      description: "Real-time chat with book enthusiasts. Share your reading experiences and build new friendships instantly.",
      highlights: ["Real-time Messaging", "Book Discussions", "Share Experiences", "New Connections"]
    },
    {
      id: 5,
      icon: <FaDownload />,
      title: "Offline Reading",
      badge: null,
      description: "Download your favorite books and read them anywhere, anytime. No internet? No problem. Your library travels with you.",
      highlights: ["Download Books", "Read Anywhere", "No Internet Required", "Unlimited Access"]
    },
    {
      id: 6,
      icon: <FaBookmark />,
      title: "Smart Bookmarks",
      badge: null,
      description: "Never lose your place again. Add notes, highlights, and bookmarks that sync across all your devices seamlessly.",
      highlights: ["Cross-device Sync", "Add Notes", "Highlight Text", "Smart Organization"]
    },

  ];

  return (
    <section className={style.container}>
      <div className={style.content}>
        <div className={style.header}>
          <h2 className={style.title}>Why BookVoice?</h2>
          <p className={style.subtitle}>Experience the power of AI-enhanced features</p>
        </div>
        
        <div className={style.featuresGrid}>
          {features.map((feature) => (
            <div key={feature.id} className={style.featureCard}>
              {feature.badge && (
                <div className={`${style.badge} ${style[feature.badgeType]}`}>
                  {feature.badgeType === 'new' && <FaStar />}
                  {feature.badgeType === 'popular' && <FaFire />}
                  {feature.badge}
                </div>
              )}
              
              <div className={style.cardIcon}>
                {feature.icon}
              </div>
              
              <h3 className={style.cardTitle}>{feature.title}</h3>
              <p className={style.cardDescription}>{feature.description}</p>
              
              <div className={style.highlights}>
                {feature.highlights.map((highlight, index) => (
                  <span key={index} className={style.highlight}>
                    {highlight}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyBookVoice; 