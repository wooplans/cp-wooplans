import { useEffect, useRef, useState } from 'react';
import './App.css';
import { 
  AlertTriangle, 
  Check, 
  X, 
  Home, 
  Calculator, 
  Lock, 
  Shield, 
  Clock, 
  Gift, 
  Layout, 
  Star,
  Users,
  Award,
  MapPin,
  Zap,
  ChevronRight,
  Sparkles,
  TrendingUp,
  Timer,
  MessageCircle,
  Percent
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

// Video testimonies URLs with poster frames
const videoTestimonies = [
  { url: 'https://wooplans.b-cdn.net/VID-20250121-WA0013-original.mp4', name: 'M. Mamadou', poster: 'https://wooplans.b-cdn.net/VID-20250121-WA0013-original.mp4#t=0.1' },
  { url: 'https://wooplans.b-cdn.net/temoignage%20audio%20video.mp4', name: 'M. Renaud', poster: 'https://wooplans.b-cdn.net/temoignage%20audio%20video.mp4#t=0.1' },
  { url: 'https://wooplans.b-cdn.net/T%C3%A9moignage_Ibrahim-original%20(1).mp4', name: 'M. Ibrahim', poster: 'https://wooplans.b-cdn.net/T%C3%A9moignage_Ibrahim-original%20(1).mp4#t=0.1' },
  { url: 'https://wooplans.b-cdn.net/T%C3%A9moignages_Francis-original%20(1).mp4', name: 'M. Francis', poster: 'https://wooplans.b-cdn.net/T%C3%A9moignages_Francis-original%20(1).mp4#t=0.1' },
];

// Hero video URL
const heroVideoUrl = 'https://wooplans.b-cdn.net/lv_0_20251214190017.mp4';

// House data for gallery - Using uploaded images
const houses = [
  { id: 1, name: 'Duplex D4-006', type: 'Duplex', image: '/house-1.jpg' },
  { id: 2, name: 'Duplex D4-016', type: 'Duplex', image: '/house-2.jpg' },
  { id: 3, name: 'Duplex D4-026', type: 'Duplex', image: '/house-3.jpg' },
  { id: 4, name: 'Duplex D4-035', type: 'Duplex', image: '/house-4.jpg' },
  { id: 5, name: 'Duplex D5-020', type: 'Duplex', image: '/house-5.jpg' },
  { id: 6, name: 'Villa V3-030', type: 'Villa', image: '/house-6.jpg' },
  { id: 7, name: 'Villa V3-037', type: 'Villa', image: '/house-7.jpg' },
  { id: 8, name: 'Villa V3-038', type: 'Villa', image: '/house-8.jpg' },
  { id: 9, name: 'Villa V4-005', type: 'Villa', image: '/house-9.jpg' },
  { id: 10, name: 'Villa V4-030', type: 'Villa', image: '/house-10.jpg' },
];

// Testimonials data
const testimonials = [
  { name: 'Mamadou B.', location: 'Yaoundé', text: 'Je recommande à 100%', rating: 5 },
  { name: 'Renaud K.', location: 'Abidjan', text: 'Très professionel !', rating: 5 },
  { name: 'Ibrahim D.', location: 'Ouagadougou', text: 'Satisfait !', rating: 5 },
  { name: 'Francis T.', location: 'Dakar', text: 'Je recommande', rating: 5 },
  { name: 'Alain K.', location: 'Douala', text: 'Service exceptionnel', rating: 5 },
  { name: 'Sarah M.', location: 'Cotonou', text: 'Excellente qualité', rating: 5 },
];

// Reviews data
const reviews = [
  { 
    name: 'Alain K.', 
    location: 'Douala, Cameroun', 
    text: 'Je voulais un duplex pour ma famille. Le catalogue est une mine d\'or, je recommande vivement à tous ceux qui veulent construire sans se ruiner.',
    rating: 5 
  },
  { 
    name: 'Sarah M.', 
    location: 'Cotonou, Benin', 
    text: 'Vous faites un travail formidable pour nous aider. Les devis sont précis et m\'ont permis de bien planifier mon budget. Merci WooPlans !',
    rating: 5 
  },
  { 
    name: 'Jean-Pierre T.', 
    location: 'Abidjan, Côte d\'Ivoire', 
    text: 'C\'est une équipe professionnelle et sérieuse. Le Catalogue vaut vraiment son prix. J\'ai trouvé le plan parfait pour ma villa.',
    rating: 5 
  },
];

// FAQ data - All questions from original website
const faqItems = [
  {
    question: "Est-ce que je peux télécharger les plans du Catalogue ?",
    answer: "Non. Le Catalogue Premium se consulte en ligne. Une fois que vous avez trouvé votre modèle coup de cœur, vous pourrez le personnaliser selon vos besoins quand vous commanderez les plans techniques complets. Votre accès au Catalogue Premium vous donne droit à -50 000 FCFA de réduction sur les plans complets."
  },
  {
    question: "L'accès est-il limité dans le temps ? Y a-t-il un abonnement ?",
    answer: "Non, c'est un paiement unique à vie. Une fois que vous payez, vous gardez l'accès pour toujours. Votre projet est retardé dans 1 ou même 5 ans ? Pas de souci, votre accès sera toujours là."
  },
  {
    question: "Ça se passe comment après le paiement ?",
    answer: "Immédiatement après votre paiement, vous recevez un email avec vos identifiants d'accès au Catalogue Premium. Vous pouvez commencer à explorer les 50+ modèles de maisons instantanément."
  },
  {
    question: "Que se passe-t-il si je n'aime pas le catalogue ? (Garantie)",
    answer: "Nous sommes tellement sûrs que le Catalogue Premium va sécuriser votre budget que nous prenons tous les risques. Si vous n'êtes pas satisfait, envoyez-nous un simple email dans les 30 jours et nous vous remboursons intégralement. Aucune question posée."
  },
  {
    question: "Comment puis-je consulter les modèles de maisons ?",
    answer: "Après votre achat, vous recevez un accès à notre plateforme en ligne où vous pouvez consulter tous les modèles de villas et duplex. Chaque modèle comprend des photos, les plans de distribution et un devis estimatif détaillé."
  },
  {
    question: "Les devis sont-ils précis ?",
    answer: "Les devis sont des estimations basées sur nos 10+ années d'expérience dans le BTP. Ils incluent le gros œuvre et les finitions. Cependant, les prix peuvent varier selon votre localisation et les matériaux choisis."
  },
  {
    question: "Puis-je personnaliser les plans ?",
    answer: "Oui ! Une fois que vous avez trouvé un modèle qui vous plaît, vous pouvez commander les plans complets avec 50 000 FCFA de réduction. Nos architectes pourront alors personnaliser le plan selon vos besoins spécifiques."
  },
  {
    question: "Quels types de maisons sont inclus dans le catalogue ?",
    answer: "Le catalogue comprend plus de 50 modèles de villas et duplex modernes, adaptés au climat africain. Vous trouverez des modèles de 2 à 5 chambres, avec différents styles architecturaux."
  },
  {
    question: "Y a-t-il des mises à jour gratuites ?",
    answer: "Oui ! Nous ajoutons régulièrement de nouveaux modèles au catalogue. En tant que membre, vous avez accès à toutes les mises à jour gratuitement et à vie."
  },
  {
    question: "Comment fonctionne le Support VIP WhatsApp ?",
    answer: "Vous avez accès à une ligne directe avec notre équipe d'architectes pour toutes vos questions. Réponse garantie sous 24 heures ouvrables."
  },
  {
    question: "Puis-je partager mon accès avec quelqu'un d'autre ?",
    answer: "L'accès est personnel et nominatif. Il ne peut pas être partagé ou revendu. Chaque compte est limité à un utilisateur."
  },
  {
    question: "Quels sont les modes de paiement acceptés ?",
    answer: "Nous acceptons les paiements par carte bancaire, Mobile Money (Orange Money, MTN Money, Wave), et virement bancaire. Tous les paiements sont sécurisés."
  },
];

// 50 Social proof popups - Only MEN names from Francophone African countries
const socialProofMessages = [
  'M. Kegne du Cameroun vient d\'acheter le Catalogue Premium',
  'M. Koné de Côte d\'Ivoire vient d\'acheter le Catalogue Premium',
  'M. Ouattara du Burkina Faso vient d\'acheter le Catalogue Premium',
  'M. Bamba du Togo vient d\'acheter le Catalogue Premium',
  'M. Yao de Côte d\'Ivoire vient d\'acheter le Catalogue Premium',
  'M. Sall du Sénégal vient d\'acheter le Catalogue Premium',
  'M. Traoré du Mali vient d\'acheter le Catalogue Premium',
  'M. Cissé du Mali vient d\'acheter le Catalogue Premium',
  'M. Issoufou du Niger vient d\'acheter le Catalogue Premium',
  'M. Bedié de Côte d\'Ivoire vient d\'acheter le Catalogue Premium',
  'M. Compaoré du Burkina Faso vient d\'acheter le Catalogue Premium',
  'M. Keïta du Mali vient d\'acheter le Catalogue Premium',
  'M. Condé de Guinée vient d\'acheter le Catalogue Premium',
  'M. Bazoum du Niger vient d\'acheter le Catalogue Premium',
  'M. Gnassingbé du Togo vient d\'acheter le Catalogue Premium',
  'M. Bédié de Côte d\'Ivoire vient d\'acheter le Catalogue Premium',
  'M. Sankara du Burkina Faso vient d\'acheter le Catalogue Premium',
  'M. Doucouré du Mali vient d\'acheter le Catalogue Premium',
  'M. Barry de Guinée vient d\'acheter le Catalogue Premium',
  'M. Ousmane du Niger vient d\'acheter le Catalogue Premium',
  'M. Kpodar du Togo vient d\'acheter le Catalogue Premium',
  'M. Achi de Côte d\'Ivoire vient d\'acheter le Catalogue Premium',
  'M. Zida du Burkina Faso vient d\'acheter le Catalogue Premium',
  'M. Maïga du Mali vient d\'acheter le Catalogue Premium',
  'M. Kourouma de Guinée vient d\'acheter le Catalogue Premium',
  'M. Ouhoumoudou du Niger vient d\'acheter le Catalogue Premium',
  'M. Olympio du Togo vient d\'acheter le Catalogue Premium',
  'M. Bakayoko de Côte d\'Ivoire vient d\'acheter le Catalogue Premium',
  'M. Kafando du Burkina Faso vient d\'acheter le Catalogue Premium',
  'M. Nkoulou du Cameroun vient d\'acheter le Catalogue Premium',
  'M. Touré de Guinée vient d\'acheter le Catalogue Premium',
  'M. Fofana du Niger vient d\'acheter le Catalogue Premium',
  'M. Mensah du Ghana vient d\'acheter le Catalogue Premium',
  'M. Ndiaye du Sénégal vient d\'acheter le Catalogue Premium',
  'M. Muna du Cameroun vient d\'acheter le Catalogue Premium',
  'M. Eto\'o du Cameroun vient d\'acheter le Catalogue Premium',
  'M. Njoya du Cameroun vient d\'acheter le Catalogue Premium',
  'M. Nguele du Cameroun vient d\'acheter le Catalogue Premium',
  'M. Seck du Sénégal vient d\'acheter le Catalogue Premium',
  'M. Ibrahim du Niger vient d\'acheter le Catalogue Premium',
  'M. Francis du Sénégal vient d\'acheter le Catalogue Premium',
  'M. Mamadou du Mali vient d\'acheter le Catalogue Premium',
  'M. Alain du Cameroun vient d\'acheter le Catalogue Premium',
  'M. Jean-Pierre de Côte d\'Ivoire vient d\'acheter le Catalogue Premium',
  'M. Renaud du Bénin vient d\'acheter le Catalogue Premium',
  'M. Kaboré du Burkina Faso vient d\'acheter le Catalogue Premium',
  'M. Dramane du Mali vient d\'acheter le Catalogue Premium',
  'M. Soumah de Guinée vient d\'acheter le Catalogue Premium',
  'M. Amadou du Niger vient d\'acheter le Catalogue Premium',
];

// Bonus items - Updated from image
const bonusItems = [
  {
    icon: Percent,
    title: 'Réduction Plans Complets',
    value: '50 000 FCFA',
    desc: 'Quand vous trouvez votre modèle coup de cœur, commandez les plans complets avec 50 000 FCFA de réduction'
  },
  {
    icon: Shield,
    title: 'Guide Anti-Arnaque Terrain (PDF)',
    value: '20 000 FCFA',
    desc: 'Les 5 arnaques foncières les plus courantes et comment les éviter'
  },
  {
    icon: Calculator,
    title: 'Guide Négociation Devis (PDF)',
    value: '15 000 FCFA',
    desc: '5 techniques pour réduire de 20-30% les devis des maçons'
  },
  {
    icon: TrendingUp,
    title: 'Guide Économies Chantier (PDF)',
    value: '15 000 FCFA',
    desc: 'Le guide ultime qui vous montre en 5 étapes comment réduire les dépenses de votre construction et faire des économies'
  },
  {
    icon: MessageCircle,
    title: 'Support VIP WhatsApp',
    value: 'Inestimable',
    desc: 'Une ligne directe et prioritaire avec notre équipe d\'architectes'
  },
];

// Function to calculate time until next midnight in Central Africa Time (UTC+1)
function getTimeUntilMidnightCAT() {
  const now = new Date();
  // Central Africa Time is UTC+1
  const catOffset = 1 * 60 * 60 * 1000; // 1 hour in milliseconds
  const utc = now.getTime() + (now.getTimezoneOffset() * 60 * 1000);
  const catTime = new Date(utc + catOffset);
  
  const tomorrow = new Date(catTime);
  tomorrow.setHours(24, 0, 0, 0);
  
  const diff = tomorrow.getTime() - catTime.getTime();
  
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);
  
  return { hours, minutes, seconds };
}

function App() {
  const [isVisible, setIsVisible] = useState<Record<string, boolean>>({});
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [timeLeft, setTimeLeft] = useState(getTimeUntilMidnightCAT());
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  // Countdown timer that resets at midnight CAT (Central Africa Time)
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getTimeUntilMidnightCAT());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible((prev) => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { threshold: 0.05, rootMargin: '0px 0px -30px 0px' }
    );

    Object.values(sectionRefs.current).forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  // Social proof popup effect - 15 second intervals
  useEffect(() => {
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * socialProofMessages.length);
      setPopupMessage(socialProofMessages[randomIndex]);
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 5000);
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  const checkoutUrl = 'https://wooplans.mychariow.shop/prd_kufwer/checkout';

  return (
    <div className="min-h-screen bg-wooplans-background overflow-x-hidden">
      {/* Fixed Alert Bar with Countdown - Resets at midnight CAT */}
      <div className="fixed top-0 left-0 right-0 bg-wooplans-secondary text-white py-2 sm:py-3 overflow-hidden z-50 shadow-lg">
        <div className="flex items-center justify-center gap-2 sm:gap-4 px-2">
          <AlertTriangle className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 animate-pulse" />
          <span className="text-xs sm:text-sm font-bold whitespace-nowrap">
            OFFRE FLASH -50% : SE TERMINE DANS
          </span>
          <div className="flex items-center gap-1 bg-white/20 rounded-lg px-2 py-1">
            <Timer className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="text-xs sm:text-sm font-mono font-bold">
              {String(timeLeft.hours).padStart(2, '0')}:{String(timeLeft.minutes).padStart(2, '0')}:{String(timeLeft.seconds).padStart(2, '0')}
            </span>
          </div>
          <span className="hidden sm:inline text-sm">•</span>
          <span className="hidden sm:inline text-sm">Plus que quelques places disponibles !</span>
        </div>
      </div>

      {/* Spacer for fixed header */}
      <div className="h-10 sm:h-14" />

      {/* Hero Section with Video */}
      <section 
        id="hero"
        ref={(el) => { sectionRefs.current['hero'] = el; }}
        className="relative bg-wooplans-primary min-h-[auto] sm:min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-10 sm:py-16 grain-overlay"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-wooplans-primary via-wooplans-primary to-[#0a3d3b]" />
        
        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <div 
            className={`transition-all duration-500 ${isVisible['hero'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
          >
            <span className="inline-flex items-center gap-1.5 sm:gap-2 bg-wooplans-accent/20 text-wooplans-accent px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium mb-4 sm:mb-6">
              <Home className="w-3 h-3 sm:w-4 sm:h-4" />
              CATALOGUE PREMIUM : VERSION 2026
            </span>
          </div>
          
          <h1 
            className={`font-display text-[1.65rem] sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.15] sm:leading-tight mb-4 sm:mb-6 transition-all duration-500 delay-100 ${isVisible['hero'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
          >
            ACCÉDEZ À <span className="text-wooplans-accent">50+ PLANS</span> DE MAISONS AVEC LEURS <span className="text-wooplans-accent underline decoration-2 sm:decoration-4 underline-offset-2 sm:underline-offset-4">VRAIS DEVIS</span>.
          </h1>
          
          <p 
            className={`text-sm sm:text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-6 sm:mb-8 px-2 sm:px-0 transition-all duration-500 delay-200 ${isVisible['hero'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
          >
            Obtenez le Catalogue Premium pour <strong className="text-white">ÉVITER</strong> de perdre votre temps à chercher les plans sur internet
          </p>
          
          {/* Hero Video */}
          <div 
            className={`relative max-w-lg sm:max-w-2xl lg:max-w-3xl mx-auto mb-6 sm:mb-10 transition-all duration-700 delay-300 ${isVisible['hero'] ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
          >
            <div className="relative rounded-xl sm:rounded-2xl overflow-hidden shadow-xl sm:shadow-2xl">
              <video 
                src={heroVideoUrl}
                poster={`${heroVideoUrl}#t=0.1`}
                controls
                className="w-full h-auto"
                preload="metadata"
              >
                Votre navigateur ne supporte pas la lecture vidéo.
              </video>
            </div>
          </div>
          
          {/* Pricing & CTA */}
          <div 
            className={`transition-all duration-500 delay-400 ${isVisible['hero'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
          >
            <div className="flex items-center justify-center gap-3 sm:gap-4 mb-3 sm:mb-4">
              <span className="text-white/60 line-through text-sm sm:text-lg">60 000 FCFA</span>
              <span className="bg-wooplans-accent text-white px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs sm:text-sm font-bold">-50%</span>
            </div>
            
            <Button 
              size="lg"
              className="w-full sm:w-auto bg-wooplans-accent hover:bg-wooplans-accent/90 text-white text-sm sm:text-lg px-4 sm:px-8 py-5 sm:py-6 h-auto rounded-lg sm:rounded-xl font-semibold shadow-glow sheen-effect animate-pulse-glow"
              onClick={() => window.open(checkoutUrl, '_blank')}
            >
              <Zap className="w-4 h-4 sm:w-5 sm:h-5 mr-2 flex-shrink-0" />
              <span className="whitespace-nowrap">J'ACCÈDE AU CATALOGUE - 29 900 FCFA</span>
            </Button>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-6 mt-3 sm:mt-4 text-white/70 text-xs sm:text-sm">
              <span className="flex items-center gap-1">
                <Lock className="w-3 h-3 sm:w-4 sm:h-4" /> Paiement unique
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3 sm:w-4 sm:h-4" /> Accès à vie
              </span>
              <span className="flex items-center gap-1">
                <Shield className="w-3 h-3 sm:w-4 sm:h-4" /> Satisfait ou Remboursé
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Pain Point Section */}
      <section 
        id="pain-point"
        ref={(el) => { sectionRefs.current['pain-point'] = el; }}
        className="bg-red-50 py-6 sm:py-10 px-4"
      >
        <div className="max-w-4xl mx-auto text-center">
          <div 
            className={`transition-all duration-500 ${isVisible['pain-point'] ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
          >
            <div className="inline-flex items-center gap-2 sm:gap-3 text-wooplans-secondary text-base sm:text-xl font-bold">
              <X className="w-5 h-5 sm:w-8 sm:h-8 animate-pulse flex-shrink-0" />
              <span className="text-left sm:text-center">ARRÊTEZ DE CHERCHER LES PLANS SANS DEVIS ET SANS DIMENSIONS SUR INTERNET</span>
            </div>
          </div>
        </div>
      </section>

      {/* What's Included Section */}
      <section 
        id="included"
        ref={(el) => { sectionRefs.current['included'] = el; }}
        className="bg-white py-12 sm:py-20 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-6xl mx-auto">
          <h2 
            className={`font-display text-xl sm:text-3xl md:text-4xl font-bold text-wooplans-neutral text-center mb-8 sm:mb-12 transition-all duration-500 ${isVisible['included'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
          >
            <span className="inline-flex items-center gap-2">
              <Check className="w-5 h-5 sm:w-8 sm:h-8 text-green-600 flex-shrink-0" />
              Inclus dans le catalogue
            </span>
          </h2>
          
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mb-10 sm:mb-16">
            {[
              { icon: Home, title: 'Galerie en ligne de 50+ modèles de maisons', desc: 'Villas et duplex de tous styles' },
              { icon: Layout, title: 'Plans de distribution pour chaque modèle', desc: 'Agencement détaillé des pièces' },
              { icon: Calculator, title: 'Devis estimatifs détaillés', desc: 'Gros œuvre + finitions inclus' },
            ].map((item, index) => (
              <div 
                key={index}
                className={`bg-wooplans-background backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-md sm:shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-wooplans-accent/10 group ${isVisible['included'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
                style={{ transitionDelay: `${index * 100 + 200}ms` }}
              >
                <div className="w-10 h-10 sm:w-14 sm:h-14 bg-wooplans-accent/10 rounded-lg sm:rounded-xl flex items-center justify-center mb-3 sm:mb-4 group-hover:bg-wooplans-accent/20 transition-all">
                  <item.icon className="w-5 h-5 sm:w-7 sm:h-7 text-wooplans-accent" />
                </div>
                <h3 className="font-display text-sm sm:text-lg font-semibold text-wooplans-neutral mb-1 sm:mb-2">{item.title}</h3>
                <p className="text-wooplans-small text-xs sm:text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
          
          {/* What's NOT included */}
          <div 
            className={`bg-wooplans-primary rounded-xl sm:rounded-2xl p-5 sm:p-8 transition-all duration-500 delay-500 ${isVisible['included'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
          >
            <h3 className="font-display text-base sm:text-xl font-bold text-white mb-4 sm:mb-6 flex items-center gap-2">
              <X className="w-5 h-5 sm:w-6 sm:h-6 text-red-400 flex-shrink-0" />
              CE QUE CE N'EST PAS :
            </h3>
            <div className="grid sm:grid-cols-3 gap-3 sm:gap-4">
              {[
                'Pas les plans techniques complets (dispo après avec -50k)',
                'Pas un PDF à télécharger',
                'Pas un service de construction'
              ].map((text, index) => (
                <div key={index} className="flex items-start gap-2 text-white/80">
                  <X className="w-4 h-4 sm:w-5 sm:h-5 text-red-400 flex-shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm">{text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section 
        id="gallery"
        ref={(el) => { sectionRefs.current['gallery'] = el; }}
        className="bg-wooplans-primary py-12 sm:py-20 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <span className="text-wooplans-accent font-medium text-xs sm:text-sm uppercase tracking-wider">La Solution Ultime</span>
            <h2 
              className={`font-display text-xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mt-1 sm:mt-2 mb-3 sm:mb-4 transition-all duration-500 ${isVisible['gallery'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
            >
              Le Catalogue Premium
            </h2>
            <p className="text-white/70 text-sm sm:text-base max-w-2xl mx-auto px-2 sm:px-0">
              Vérifier et comparer les devis de plus de 50 modèles de duplex et villa avant de vous engager davantage.
            </p>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-4">
            {houses.map((house, index) => (
              <div 
                key={house.id}
                className={`group relative overflow-hidden rounded-lg sm:rounded-xl aspect-[4/3] cursor-pointer transition-all duration-500 ${isVisible['gallery'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
                style={{ transitionDelay: `${index * 75}ms` }}
              >
                <img 
                  src={house.image} 
                  alt={house.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-wooplans-primary/90 via-wooplans-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <span className="text-wooplans-accent text-[10px] sm:text-xs font-medium uppercase">{house.type}</span>
                  <h4 className="text-white font-display font-semibold text-sm sm:text-base">{house.name}</h4>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-6 sm:mt-10">
            <Button 
              className="w-full sm:w-auto bg-wooplans-accent hover:bg-wooplans-accent/90 text-white px-6 sm:px-8 py-5 sm:py-6 h-auto rounded-lg sm:rounded-xl font-semibold text-sm sm:text-base"
              onClick={() => window.open(checkoutUrl, '_blank')}
            >
              Voir tous les modèles
            </Button>
          </div>
        </div>
      </section>

      {/* Video Testimonies Section */}
      <section 
        id="video-testimonies"
        ref={(el) => { sectionRefs.current['video-testimonies'] = el; }}
        className="bg-wooplans-primary py-12 sm:py-20 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <span className="text-wooplans-accent font-medium text-xs sm:text-sm uppercase tracking-wider">Témoignages Vidéo</span>
            <h2 
              className={`font-display text-2xl sm:text-4xl md:text-5xl font-bold text-white mt-2 mb-4 transition-all duration-500 ${isVisible['video-testimonies'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
            >
              Ils Ont Transformé Leur Projet Grâce au <span className="text-wooplans-accent">Catalogue Premium</span>
            </h2>
            <p className="text-white/70 text-sm sm:text-lg max-w-2xl mx-auto">
              Écoutez ce que nos clients satisfaits disent de leur expérience
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
            {videoTestimonies.map((video, index) => (
              <div 
                key={index}
                className={`relative rounded-xl sm:rounded-2xl overflow-hidden bg-wooplans-primary/50 border border-white/10 transition-all duration-500 ${isVisible['video-testimonies'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="aspect-video">
                  <video 
                    src={video.url}
                    poster={video.poster}
                    controls
                    className="w-full h-full object-cover"
                    preload="metadata"
                  >
                    Votre navigateur ne supporte pas la lecture vidéo.
                  </video>
                </div>
                <div className="p-3 sm:p-4 bg-white/5">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-wooplans-accent rounded-full flex items-center justify-center">
                      <Users className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-white font-semibold text-sm sm:text-base">{video.name}</p>
                    </div>
                    <div className="ml-auto flex gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400 fill-yellow-400" />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* CTA under video testimonies */}
          <div className="text-center mt-8 sm:mt-10">
            <Button 
              size="lg"
              className="w-full sm:w-auto bg-wooplans-accent hover:bg-wooplans-accent/90 text-white text-base sm:text-xl px-6 sm:px-10 py-5 sm:py-6 h-auto rounded-lg sm:rounded-xl font-bold shadow-glow-lg sheen-effect"
              onClick={() => window.open(checkoutUrl, '_blank')}
            >
              <Zap className="w-5 h-5 sm:w-6 sm:h-6 mr-2" />
              JE VEUX AVOIR LES MÊMES RÉSULTATS
            </Button>
            <p className="text-white/50 text-xs sm:text-sm mt-3">
              Rejoignez plus de 500 propriétaires satisfaits
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials Marquee */}
      <section 
        id="testimonials"
        ref={(el) => { sectionRefs.current['testimonials'] = el; }}
        className="bg-wooplans-background py-8 sm:py-12 overflow-hidden"
      >
        <div className="text-center mb-6 sm:mb-8 px-4">
          <h2 className="font-display text-lg sm:text-2xl font-bold text-wooplans-neutral">
            Ils construisent intelligemment grâce à WooPlans
          </h2>
        </div>
        
        <div className="relative">
          <div className="flex animate-marquee-fast">
            {[...testimonials, ...testimonials, ...testimonials].map((testimonial, index) => (
              <div 
                key={index}
                className="flex-shrink-0 w-64 sm:w-72 mx-2 sm:mx-4 bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-md"
              >
                <div className="flex gap-0.5 sm:gap-1 mb-2 sm:mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-wooplans-neutral font-medium mb-2 sm:mb-3 text-sm sm:text-base">"{testimonial.text}"</p>
                <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-wooplans-small">
                  <span className="font-semibold">{testimonial.name}</span>
                  <span>•</span>
                  <MapPin className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                  <span>{testimonial.location}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Reviews */}
      <section 
        id="reviews"
        ref={(el) => { sectionRefs.current['reviews'] = el; }}
        className="bg-white py-12 sm:py-20 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-6xl mx-auto">
          <h2 
            className={`font-display text-xl sm:text-3xl md:text-4xl font-bold text-wooplans-neutral text-center mb-8 sm:mb-12 px-2 sm:px-0 transition-all duration-500 ${isVisible['reviews'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
          >
            Rejoignez des centaines de propriétaires qui ont sécurisé leur projet
          </h2>
          
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
            {reviews.map((review, index) => (
              <div 
                key={index}
                className={`group relative overflow-hidden rounded-xl sm:rounded-2xl transition-all duration-500 ${isVisible['reviews'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <img 
                  src="/review-bg.jpg" 
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-wooplans-primary/95 via-wooplans-primary/70 to-wooplans-primary/40" />
                <div className="relative p-4 sm:p-6 min-h-[220px] sm:min-h-[280px] flex flex-col justify-end">
                  <div className="flex gap-0.5 sm:gap-1 mb-2 sm:mb-3">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>
                  <p className="text-white/90 text-xs sm:text-sm mb-3 sm:mb-4 italic">"{review.text}"</p>
                  <div>
                    <div className="text-white font-semibold text-sm sm:text-base">{review.name}</div>
                    <div className="text-white/60 text-xs sm:text-sm flex items-center gap-1">
                      <MapPin className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                      {review.location}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section 
        id="pricing"
        ref={(el) => { sectionRefs.current['pricing'] = el; }}
        className="bg-wooplans-background py-12 sm:py-20 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-xl sm:max-w-2xl mx-auto text-center">
          <div 
            className={`bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 shadow-xl sm:shadow-2xl transition-all duration-500 ${isVisible['pricing'] ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
          >
            <div className="text-wooplans-small text-xs sm:text-sm uppercase tracking-wider mb-2">Prix public</div>
            <div className="relative inline-block mb-4 sm:mb-6">
              <span className="text-2xl sm:text-3xl md:text-4xl text-wooplans-small/60 line-through font-display font-bold">
                60 000 FCFA
              </span>
              <div className="absolute top-1/2 left-0 w-full h-0.5 sm:h-1 bg-wooplans-secondary -rotate-6" />
            </div>
            
            <div className="mb-6 sm:mb-8">
              <div className="text-wooplans-accent text-xs sm:text-sm uppercase tracking-wider mb-1 sm:mb-2">Offre Flash -50%</div>
              <div className="text-4xl sm:text-5xl md:text-6xl font-display font-bold text-wooplans-neutral">
                29 900 <span className="text-lg sm:text-2xl">FCFA</span>
              </div>
            </div>
            
            <Button 
              size="lg"
              className="w-full bg-wooplans-accent hover:bg-wooplans-accent/90 text-white text-base sm:text-xl px-6 sm:px-8 py-5 sm:py-7 h-auto rounded-lg sm:rounded-xl font-bold shadow-glow sheen-effect mb-4 sm:mb-6"
              onClick={() => window.open(checkoutUrl, '_blank')}
            >
              <Lock className="w-4 h-4 sm:w-5 sm:h-5 mr-2 flex-shrink-0" />
              DÉBLOQUER MON ACCÈS
            </Button>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-6 text-wooplans-small text-xs sm:text-sm">
              <span className="flex items-center gap-1">
                <Shield className="w-3 h-3 sm:w-4 sm:h-4" /> Paiement sécurisé
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3 sm:w-4 sm:h-4" /> Accès immédiat
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section 
        id="about"
        ref={(el) => { sectionRefs.current['about'] = el; }}
        className="bg-white py-12 sm:py-20 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center">
            <div 
              className={`transition-all duration-500 ${isVisible['about'] ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-6'}`}
            >
              <span className="text-wooplans-accent font-medium text-xs sm:text-sm uppercase tracking-wider">Depuis 2015</span>
              <h2 className="font-display text-xl sm:text-3xl md:text-4xl font-bold text-wooplans-neutral mt-1 sm:mt-2 mb-4 sm:mb-6">
                Qui sommes-nous ?
              </h2>
              <p className="text-wooplans-small mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base">
                Derrière ce Catalogue il y'a tout une équipe à votre écoute. Nous sommes <strong className="text-wooplans-neutral">WooPlans</strong>, une équipe d'architectes et de constructeurs avec plus de <strong className="text-wooplans-neutral">10 ans d'expérience terrain</strong>.
              </p>
              <p className="text-wooplans-small mb-6 sm:mb-8 leading-relaxed text-sm sm:text-base">
                Le Catalogue Premium est né d'un constat simple : trop de projets de construction échouent à cause de mauvaises décisions prises dès le départ. En tant que professionnels de l'architecture et du BTP, nous avons créé le Catalogue Premium pour permettre aux futurs propriétaires de visualiser, comparer et choisir leur maison en toute sérénité.
              </p>
              
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                <div className="bg-wooplans-background rounded-lg sm:rounded-xl p-3 sm:p-4 shadow-md">
                  <div className="text-2xl sm:text-3xl font-bold text-wooplans-accent mb-1">100+</div>
                  <div className="text-wooplans-small text-xs sm:text-sm">Projets Réalisés</div>
                </div>
                <div className="bg-wooplans-background rounded-lg sm:rounded-xl p-3 sm:p-4 shadow-md">
                  <div className="flex items-center gap-2 text-wooplans-accent mb-1">
                    <Award className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <div className="text-wooplans-small text-xs sm:text-sm">Expertise Foncier & BTP</div>
                </div>
              </div>
            </div>
            
            <div 
              className={`relative transition-all duration-500 delay-200 ${isVisible['about'] ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-6'}`}
            >
              <div className="relative rounded-xl sm:rounded-2xl overflow-hidden shadow-xl sm:shadow-2xl">
                <img 
                  src="/about-team.jpg" 
                  alt="WooPlans Architecture Team"
                  className="w-full h-auto"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-wooplans-primary/40 to-transparent" />
              </div>
              <div className="absolute -bottom-4 sm:-bottom-6 left-2 sm:-left-6 bg-wooplans-accent text-white rounded-lg sm:rounded-xl p-3 sm:p-4 shadow-lg sm:shadow-xl">
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 sm:w-6 sm:h-6" />
                  <div>
                    <div className="font-bold text-sm sm:text-base">500+</div>
                    <div className="text-xs text-white/80">Clients satisfaits</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BONUS SECTION - Moved under About */}
      <section 
        id="bonus"
        ref={(el) => { sectionRefs.current['bonus'] = el; }}
        className="bg-wooplans-primary py-12 sm:py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
      >
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-wooplans-accent/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-wooplans-accent/5 rounded-full blur-2xl" />
        
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-8 sm:mb-12">
            <span className="inline-flex items-center gap-2 bg-wooplans-accent text-white px-4 py-2 rounded-full text-sm font-bold mb-4">
              <Sparkles className="w-4 h-4" />
              BONUS EXCLUSIFS
            </span>
            <h2 
              className={`font-display text-2xl sm:text-4xl md:text-5xl font-bold text-white mt-2 mb-4 transition-all duration-500 ${isVisible['bonus'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
            >
              Recevez les Bonus d'une valeur de <span className="text-wooplans-accent">+100 000 FCFA</span>
            </h2>
            <p className="text-white/70 text-sm sm:text-lg max-w-2xl mx-auto">
              Offerts gratuitement avec votre accès au Catalogue Premium aujourd'hui
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {bonusItems.map((bonus, index) => (
              <div 
                key={index}
                className={`group bg-white/10 backdrop-blur-sm border border-wooplans-accent/30 rounded-xl sm:rounded-2xl p-4 sm:p-6 hover:bg-white/15 hover:border-wooplans-accent/60 transition-all duration-300 ${isVisible['bonus'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center justify-between mb-3 sm:mb-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-wooplans-accent rounded-lg sm:rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <bonus.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <span className="text-wooplans-accent font-bold text-xs sm:text-sm bg-wooplans-accent/20 px-2 py-1 rounded-full line-through">
                    {bonus.value}
                  </span>
                </div>
                <h3 className="font-display text-sm sm:text-lg font-bold text-white mb-1 sm:mb-2">{bonus.title}</h3>
                <p className="text-white/60 text-xs sm:text-sm">{bonus.desc}</p>
                <div className="mt-3 sm:mt-4 flex items-center gap-1 text-green-400 text-xs sm:text-sm font-medium">
                  <Check className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span>GRATUIT</span>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-8 sm:mt-10">
            <Button 
              className="bg-wooplans-accent hover:bg-wooplans-accent/90 text-white px-6 sm:px-8 py-5 sm:py-6 h-auto rounded-lg sm:rounded-xl font-bold shadow-glow sheen-effect"
              onClick={() => window.open(checkoutUrl, '_blank')}
            >
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
              RÉCLAMER MES BONUS MAINTENANT
            </Button>
          </div>
        </div>
      </section>

      {/* Features Grid with Title */}
      <section 
        id="features"
        ref={(el) => { sectionRefs.current['features'] = el; }}
        className="bg-wooplans-primary py-12 sm:py-20 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <h2 
              className={`font-display text-2xl sm:text-4xl md:text-5xl font-bold text-white transition-all duration-500 ${isVisible['features'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
            >
              TOUS CE QUE VOUS OBTENEZ AVEC LE <span className="text-wooplans-accent">CATALOGUE PREMIUM</span>
            </h2>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {[
              { icon: Home, title: 'Accès ILLIMITÉ', desc: 'Déjà +50 modèles villa et duplex que vous pouvez consulter immédiatement.', highlight: 'Trouvez l\'inspiration' },
              { icon: Clock, title: 'Accès À VIE', desc: 'Paiement Unique. Une fois que vous payez, vous gardez l\'accès pour toujours.', highlight: 'Consultez à VIE' },
              { icon: Gift, title: 'Nouveaux Plans GRATUITS', desc: 'Vous ne payez plus pour recevoir les nouveaux designs. Votre catalogue s\'agrandit constamment.', highlight: 'Mises à jour' },
              { icon: Layout, title: 'Plans de Distribution', desc: 'Voyez exactement comment chaque pièce est agencée. Un avantage pour personnaliser facilement après.', highlight: 'Préparer les modifications' },
              { icon: Calculator, title: 'Devis estimatif', desc: 'Voyez combien vous coûtera chaque étape de la construction.', highlight: 'Anticiper le budget' },
            ].map((feature, index) => (
              <div 
                key={index}
                className={`group bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl sm:rounded-2xl p-4 sm:p-6 hover:bg-white/10 hover:border-wooplans-accent/50 transition-all duration-300 ${isVisible['features'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-wooplans-accent/20 rounded-lg sm:rounded-xl flex items-center justify-center mb-3 sm:mb-4 group-hover:bg-wooplans-accent/30 group-hover:scale-110 transition-all">
                  <feature.icon className="w-5 h-5 sm:w-6 sm:h-6 text-wooplans-accent" />
                </div>
                <div className="text-wooplans-accent text-[10px] sm:text-xs font-medium uppercase tracking-wider mb-1 sm:mb-2">{feature.highlight}</div>
                <h3 className="font-display text-base sm:text-xl font-bold text-white mb-2 sm:mb-3">{feature.title}</h3>
                <p className="text-white/60 text-xs sm:text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Flash Offer Banner with CTA */}
      <section className="bg-wooplans-secondary py-4 sm:py-6 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <Zap className="w-6 h-6 sm:w-8 sm:h-8 text-white flex-shrink-0" />
            <div className="text-center sm:text-left">
              <span className="text-white font-bold text-base sm:text-xl block">OFFRE FLASH ! -50% DE RÉDUCTION</span>
              <p className="text-white/80 text-xs sm:text-sm">Economisez 30 000 FCFA aujourd'hui. Cette réduction est temporaire.</p>
            </div>
            <Button 
              className="bg-white text-wooplans-secondary hover:bg-white/90 px-4 sm:px-6 py-2 sm:py-3 h-auto rounded-lg font-bold text-sm sm:text-base flex items-center gap-2"
              onClick={() => window.open(checkoutUrl, '_blank')}
            >
              PROFITER MAINTENANT
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Guarantee Section */}
      <section 
        id="guarantee"
        ref={(el) => { sectionRefs.current['guarantee'] = el; }}
        className="bg-wooplans-background py-12 sm:py-20 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-3xl mx-auto text-center">
          <div 
            className={`relative bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 shadow-lg sm:shadow-xl transition-all duration-500 ${isVisible['guarantee'] ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
          >
            <div className="absolute -top-6 sm:-top-8 left-1/2 -translate-x-1/2 w-12 h-12 sm:w-16 sm:h-16 bg-wooplans-accent rounded-full flex items-center justify-center shadow-glow animate-pulse-glow">
              <Shield className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
            </div>
            
            <h2 className="font-display text-lg sm:text-2xl md:text-3xl font-bold text-wooplans-neutral mt-4 sm:mt-6 mb-3 sm:mb-4">
              Garantie 30 Jours
            </h2>
            <p className="text-wooplans-small mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base">
              Nous sommes tellement sûrs que le Catalogue Premium va sécuriser votre budget et vous faire gagner des mois de stress que nous prenons tous les risques.
            </p>
            <p className="text-wooplans-small mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base">
              Accédez au catalogue, explorez les plans. Si vous ne trouvez pas que cela vaut le prix payé (29 900 FCFA), envoyez-nous un simple email dans les 30 jours et nous vous rembourserons intégralement.
            </p>
            <div className="text-wooplans-accent font-semibold text-sm sm:text-base">
              Aucune question posée. Le risque est entièrement sur nous.
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section 
        id="faq"
        ref={(el) => { sectionRefs.current['faq'] = el; }}
        className="bg-white py-12 sm:py-20 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-3xl mx-auto">
          <h2 
            className={`font-display text-xl sm:text-3xl md:text-4xl font-bold text-wooplans-neutral text-center mb-3 sm:mb-4 transition-all duration-500 ${isVisible['faq'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
          >
            Vos Questions, Nos Réponses
          </h2>
          <p 
            className={`text-wooplans-small text-center mb-6 sm:mb-10 text-sm sm:text-base transition-all duration-500 delay-100 ${isVisible['faq'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
          >
            Obtenez des éclaircissements immédiats avant de prendre votre décision.
          </p>
          
          <Accordion type="single" collapsible className="space-y-3 sm:space-y-4">
            {faqItems.map((item, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className={`bg-wooplans-background rounded-lg sm:rounded-xl border-none shadow-md overflow-hidden transition-all duration-500 ${isVisible['faq'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
                style={{ transitionDelay: `${index * 100 + 200}ms` }}
              >
                <AccordionTrigger className="px-4 sm:px-6 py-3 sm:py-4 text-left font-display font-semibold text-wooplans-neutral hover:no-underline hover:text-wooplans-accent transition-colors text-sm sm:text-base [&[data-state=open]>svg]:rotate-45">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="px-4 sm:px-6 pb-3 sm:pb-4 text-wooplans-small text-sm sm:text-base">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Final CTA */}
      <section 
        id="final-cta"
        ref={(el) => { sectionRefs.current['final-cta'] = el; }}
        className="bg-wooplans-primary py-12 sm:py-20 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-3xl mx-auto text-center">
          <h2 
            className={`font-display text-xl sm:text-3xl md:text-4xl font-bold text-white mb-4 sm:mb-6 px-2 sm:px-0 transition-all duration-500 ${isVisible['final-cta'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
          >
            Vous avez toutes les cartes en main pour réussir votre projet sans stress ni surcoût
          </h2>
          <p 
            className={`text-white/70 mb-6 sm:mb-8 text-sm sm:text-base transition-all duration-500 delay-100 ${isVisible['final-cta'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
          >
            <strong className="text-wooplans-accent">L'incertitude vous coûte des millions.</strong> Le catalogue Premium est la seule assurance abordable contre l'échec de votre chantier.
          </p>
          <Button 
            size="lg"
            className={`w-full sm:w-auto bg-wooplans-accent hover:bg-wooplans-accent/90 text-white text-base sm:text-xl px-6 sm:px-10 py-5 sm:py-7 h-auto rounded-lg sm:rounded-xl font-bold shadow-glow-lg sheen-effect transition-all duration-500 delay-200 ${isVisible['final-cta'] ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
            onClick={() => window.open(checkoutUrl, '_blank')}
          >
            Je veux ce Catalogue
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-wooplans-primary border-t border-white/10 py-6 sm:py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
            <div className="text-white/60 text-xs sm:text-sm">
              © 2026 WooPlans. Tous droits réservés.
            </div>
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
              <a href="#" className="text-white/60 hover:text-wooplans-accent text-xs sm:text-sm transition-colors">Conditions Générales</a>
              <a href="#" className="text-white/60 hover:text-wooplans-accent text-xs sm:text-sm transition-colors">Politique de Confidentialité</a>
              <a href="#" className="text-white/60 hover:text-wooplans-accent text-xs sm:text-sm transition-colors">Support</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Social Proof Popup */}
      <div 
        className={`fixed bottom-3 sm:bottom-4 left-3 sm:left-4 z-50 transition-all duration-500 ${showPopup ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-full'}`}
      >
        <div className="bg-white rounded-lg sm:rounded-xl shadow-2xl p-3 sm:p-4 flex items-center gap-2 sm:gap-3 max-w-[280px] sm:max-w-xs">
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
            <Check className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
          </div>
          <div className="text-xs sm:text-sm">
            <span className="font-semibold text-wooplans-neutral">{popupMessage}</span>
          </div>
          <button 
            onClick={() => setShowPopup(false)}
            className="text-gray-400 hover:text-gray-600 p-1"
          >
            <X className="w-3 h-3 sm:w-4 sm:h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
