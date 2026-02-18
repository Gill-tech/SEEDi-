import { useState, useEffect } from 'react';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { Sprout, Target, BarChart3, FileText, Database, CheckCircle, ArrowRight, Leaf, TrendingUp, Menu, X } from 'lucide-react';
import logo from '../../assets/1f89025c34d366be1fbcc0673e4d4ee160287f2b.png';

export default function LandingPage() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % 4);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const workflowSteps = [
    {
      step: 1,
      title: 'Define',
      subtitle: 'Your Context',
      description: 'Tell us about your farm, region, and goals',
      icon: Target,
    },
    {
      step: 2,
      title: 'Explore',
      subtitle: 'Solutions',
      description: 'Browse innovations ranked for your needs',
      icon: Sprout,
    },
    {
      step: 3,
      title: 'Analyze',
      subtitle: 'Impact',
      description: 'See projected results and benefits',
      icon: BarChart3,
    },
    {
      step: 4,
      title: 'Act',
      subtitle: 'With Confidence',
      description: 'Get your personalized action plan',
      icon: FileText,
    },
  ];

  const stats = [
    { value: '25,000+', label: 'Agricultural Solutions' },
    { value: '150+', label: 'Countries Covered' },
    { value: '98%', label: 'Decision Confidence' },
    { value: '5M+', label: 'Farmers Reached' },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 left-0 right-0 z-50 bg-white border-b"
      >
        <div className="container mx-auto px-4 sm:px-6 py-4 sm:py-6 flex items-center justify-between">
          <motion.div
            className="flex items-center gap-2 sm:gap-4"
            whileHover={{ scale: 1.02 }}
          >
            <img src={logo} alt="SEEDi Logo" className="h-12 sm:h-16 md:h-20" />
            <div className="hidden sm:block">
              <div className="text-xs sm:text-sm text-gray-500 uppercase tracking-wider">SEEDi</div>
              <div className="text-xs text-gray-600 font-medium">
                Sustainable Evidence for Emerging Decisions
              </div>
            </div>
          </motion.div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex gap-3">
            <Button
              variant="ghost"
              onClick={() => navigate('/signup')}
              className="text-gray-700"
            >
              Sign In
            </Button>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                onClick={() => navigate('/signup')}
                className="bg-gray-900 text-white hover:bg-gray-800"
              >
                Get Started
              </Button>
            </motion.div>
          </div>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-700"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden border-t bg-white"
          >
            <div className="container mx-auto px-4 py-4 flex flex-col gap-3">
              <Button
                variant="ghost"
                onClick={() => {
                  navigate('/signup');
                  setMobileMenuOpen(false);
                }}
                className="w-full text-gray-700 justify-start"
              >
                Sign In
              </Button>
              <Button
                onClick={() => {
                  navigate('/signup');
                  setMobileMenuOpen(false);
                }}
                className="w-full bg-gray-900 text-white hover:bg-gray-800"
              >
                Get Started
              </Button>
            </div>
          </motion.div>
        )}
      </motion.header>

      {/* Hero Section */}
      <section className="pt-32 sm:pt-40 pb-16 sm:pb-24 bg-white relative overflow-hidden min-h-[500px] sm:min-h-[600px]">
        {/* Background Image with Transparency */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-white/90 z-10"></div>
          <img
            src="https://images.unsplash.com/photo-1769142782556-658794b48f5d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmVlbiUyMGZhcm0lMjBmaWVsZHMlMjBjcm9wcyUyMGFlcmlhbCUyMHZpZXd8ZW58MXx8fHwxNzcxMzU4Mzc1fDA&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Agricultural Fields"
            className="w-full h-full object-cover opacity-40"
          />
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 relative z-20">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight"
            >
              Make Smarter Farm Decisions Based on Evidence
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg sm:text-xl md:text-2xl text-gray-600 mb-8 sm:mb-12 max-w-3xl mx-auto leading-relaxed px-4"
            >
              SEEDi helps farmers, policymakers, and investors find the right agricultural
              innovations for their unique situation backed by sustainable evidence.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center px-4"
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full sm:w-auto">
                <Button
                  size="lg"
                  onClick={() => navigate('/signup')}
                  className="w-full sm:w-auto bg-gray-900 text-white hover:bg-gray-800 text-base sm:text-lg px-8 sm:px-10 py-6 sm:py-7"
                >
                  Get Started
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full sm:w-auto">
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => navigate('/dashboard')}
                  className="w-full sm:w-auto border-2 border-gray-300 text-gray-700 hover:bg-gray-50 text-base sm:text-lg px-8 sm:px-10 py-6 sm:py-7"
                >
                  Explore Demo
                </Button>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mt-8 sm:mt-12 flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-gray-500 text-xs sm:text-sm px-4"
            >
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-gray-900" />
                <span>Free to Use</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-gray-900" />
                <span>Evidence Based</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-gray-900" />
                <span>Easy to Navigate</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Hero Image */}
      <section className="py-8 sm:py-12 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-5xl mx-auto rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl"
          >
            <img
              src="https://images.unsplash.com/photo-1769259047014-83149b3c9ca7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmVlbiUyMHN1c3RhaW5hYmxlJTIwZmFybWluZyUyMGFlcmlhbHxlbnwxfHx8fDE3NzEzNTc2NTZ8MA&ixlib=rb-4.1.0&q=80&w=1080"
              alt="Sustainable Farming"
              className="w-full h-[250px] sm:h-[400px] md:h-[500px] object-cover"
            />
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 max-w-5xl mx-auto">
            {stats.map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-2">
                  {stat.value}
                </div>
                <div className="text-sm sm:text-base text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 sm:py-24 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 text-gray-900 px-4">How SEEDi Works</h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto px-4">
              From your first question to your final decision in four simple steps
            </p>
          </motion.div>

          <div className="max-w-6xl mx-auto">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              {workflowSteps.map((step, idx) => {
                const Icon = step.icon;
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -5 }}
                  >
                    <Card className="p-6 sm:p-8 h-full border-2 hover:shadow-xl transition-all">
                      <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gray-900 rounded-xl flex items-center justify-center mb-4 sm:mb-6">
                        <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                      </div>
                      <div className="text-xs sm:text-sm text-gray-500 mb-2">Step {step.step}</div>
                      <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
                        {step.title}
                      </h3>
                      <div className="text-base sm:text-lg text-gray-700 mb-2 sm:mb-3">{step.subtitle}</div>
                      <p className="text-sm sm:text-base text-gray-600">{step.description}</p>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Real Impact Stories */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 text-gray-900 px-4">Real Results from Real Farmers</h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto px-4">
              See how SEEDi is helping farmers make better decisions
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
            {[
              {
                image: 'https://images.unsplash.com/photo-1741940365182-bc0ffdc1262d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXJtZXIlMjBzbWlsaW5nJTIwcG9ydHJhaXQlMjBhZnJpY2F8ZW58MXx8fHwxNzcxMzU3NjU5fDA&ixlib=rb-4.1.0&q=80&w=1080',
                name: 'Amina K.',
                location: 'Kenya',
                impact: '+65% Yield',
                quote: 'SEEDi helped me find the right irrigation system. My harvest doubled.',
              },
              {
                image: 'https://images.unsplash.com/photo-1668149941577-7473eb4ac060?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXBweSUyMGZhcm1lcnMlMjBoYXJ2ZXN0JTIwc3VjY2Vzc3xlbnwxfHx8fDE3NzEzNTc2NTZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
                name: 'Rajesh M.',
                location: 'India',
                impact: '-80% Losses',
                quote: 'Post harvest storage solutions saved my crops from going to waste.',
              },
              {
                image: 'https://images.unsplash.com/photo-1759240024123-ee62f23244fb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZ3JpY3VsdHVyZSUyMHNlZWRsaW5nJTIwcGxhbnQlMjBncm93dGh8ZW58MXx8fHwxNzcxMzU3NjYwfDA&ixlib=rb-4.1.0&q=80&w=1080',
                name: 'Maria S.',
                location: 'Brazil',
                impact: '+$2,400/year',
                quote: 'Better soil health means better income. SEEDi showed me how.',
              },
            ].map((story, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
              >
                <Card className="overflow-hidden hover:shadow-xl transition-shadow border-2">
                  <div className="h-64 overflow-hidden">
                    <img
                      src={story.image}
                      alt={story.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <div className="font-semibold text-lg text-gray-900">{story.name}</div>
                        <div className="text-sm text-gray-600">{story.location}</div>
                      </div>
                      <div className="px-3 py-1 bg-gray-900 rounded-full">
                        <span className="text-white font-bold text-sm">{story.impact}</span>
                      </div>
                    </div>
                    <p className="text-gray-700 italic">"{story.quote}"</p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Who It's For */}
      <section className="py-16 sm:py-24 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 text-gray-900 px-4">Built for Everyone in Agriculture</h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto px-4">
              Whether you grow food or support those who do, SEEDi is for you
            </p>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6 max-w-6xl mx-auto">
            {[
              { emoji: '🌾', title: 'Farmers', desc: 'Find solutions that work for your farm' },
              { emoji: '🏛️', title: 'Policymakers', desc: 'Design better agricultural policies' },
              { emoji: '🏢', title: 'SMEs', desc: 'Discover market opportunities' },
              { emoji: '🔬', title: 'Researchers', desc: 'Access adoption insights' },
              { emoji: '💰', title: 'Investors', desc: 'Evaluate innovation potential' },
            ].map((user, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
              >
                <Card className="p-6 sm:p-8 text-center hover:shadow-xl transition-all h-full border-2">
                  <div className="text-4xl sm:text-5xl mb-3 sm:mb-4">{user.emoji}</div>
                  <h3 className="font-bold text-base sm:text-lg mb-2 text-gray-900">{user.title}</h3>
                  <p className="text-xs sm:text-sm text-gray-600">{user.desc}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Sustainable Evidence Section */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Database className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 sm:mb-6 text-gray-900" />
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 text-gray-900 px-4">
                Backed by Sustainable Evidence
              </h2>
              <p className="text-lg sm:text-xl mb-8 sm:mb-12 text-gray-600 leading-relaxed px-4">
                Every recommendation in SEEDi comes from verified, evidence based research.
                We combine data from trusted global sources to give you reliable insights
                for emerging agricultural decisions.
              </p>
            </motion.div>

            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
              {[
                { icon: Leaf, title: 'ATIO Knowledge Base', desc: '25,000+ innovations' },
                { icon: TrendingUp, title: 'FAOSTAT Data', desc: 'Production and sustainability' },
                { icon: CheckCircle, title: 'SDG Aligned', desc: 'Global impact tracking' },
              ].map((source, idx) => {
                const Icon = source.icon;
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <Card className="p-6 sm:p-8 border-2 hover:shadow-xl transition-all">
                      <Icon className="w-10 h-10 sm:w-12 sm:h-12 mb-3 sm:mb-4 mx-auto text-gray-900" />
                      <h3 className="font-semibold text-base sm:text-lg mb-2 text-gray-900">{source.title}</h3>
                      <p className="text-xs sm:text-sm text-gray-600">{source.desc}</p>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-24 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <Card className="p-8 sm:p-12 text-center border-2">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 text-gray-900">
                Ready to Make Better Decisions?
              </h2>
              <p className="text-lg sm:text-xl text-gray-600 mb-6 sm:mb-8 max-w-2xl mx-auto">
                Join thousands of farmers, researchers, and policymakers using SEEDi to find
                evidence based agricultural solutions.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full sm:w-auto">
                  <Button
                    size="lg"
                    onClick={() => navigate('/signup')}
                    className="w-full sm:w-auto bg-gray-900 text-white hover:bg-gray-800 text-base sm:text-lg px-8 sm:px-10 py-6 sm:py-7"
                  >
                    Get Started
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full sm:w-auto">
                  <Button
                    size="lg"
                    variant="outline"
                    onClick={() => navigate('/dashboard')}
                    className="w-full sm:w-auto text-base sm:text-lg px-8 sm:px-10 py-6 sm:py-7 border-2"
                  >
                    See How It Works
                  </Button>
                </motion.div>
              </div>
              <div className="mt-6 sm:mt-8 text-xs sm:text-sm text-gray-500">
                No credit card required • Free forever • Get started in 2 minutes
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t py-8 sm:py-12">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 mb-6 sm:mb-8">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                <img src={logo} alt="SEEDi Logo" className="h-8 sm:h-10" />
                <div>
                  <div className="text-sm font-semibold text-gray-900">SEEDi</div>
                  <div className="text-xs text-gray-500">
                    Sustainable Evidence for Emerging Decisions
                  </div>
                </div>
              </div>
              <p className="text-gray-600 text-xs sm:text-sm">
                Making agricultural innovation accessible to everyone.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base text-gray-900">Product</h4>
              <ul className="space-y-1 sm:space-y-2 text-xs sm:text-sm text-gray-600">
                <li><a href="#" className="hover:text-gray-900">Features</a></li>
                <li><a href="#" className="hover:text-gray-900">How It Works</a></li>
                <li><a href="#" className="hover:text-gray-900">Data Sources</a></li>
                <li><a href="#" className="hover:text-gray-900">Pricing</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base text-gray-900">Resources</h4>
              <ul className="space-y-1 sm:space-y-2 text-xs sm:text-sm text-gray-600">
                <li><a href="#" className="hover:text-gray-900">Documentation</a></li>
                <li><a href="#" className="hover:text-gray-900">Support</a></li>
                <li><a href="#" className="hover:text-gray-900">API Access</a></li>
                <li><a href="#" className="hover:text-gray-900">Case Studies</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base text-gray-900">Legal</h4>
              <ul className="space-y-1 sm:space-y-2 text-xs sm:text-sm text-gray-600">
                <li><a href="#" className="hover:text-gray-900">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-gray-900">Terms of Service</a></li>
                <li><a href="#" className="hover:text-gray-900">Accessibility</a></li>
                <li><a href="#" className="hover:text-gray-900">Contact Us</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t pt-6 sm:pt-8 text-center text-xs sm:text-sm text-gray-500">
            <p>© 2026 SEEDi Platform. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}