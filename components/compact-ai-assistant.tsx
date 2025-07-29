import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Sparkles, 
  X, 
  Send, 
  Bot, 
  User, 
  Loader2,
  TrendingUp,
  BarChart3,
  Users,
  DollarSign,
  Target,
  MessageCircle,
  Minimize2,
  Maximize2
} from 'lucide-react';

interface DashboardData {
  revenue: number;
  users: number;
  conversions: number;
  growthRate: number;
}

interface Message {
  id: number;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
}

interface CompactAIAssistantProps {
  dashboardData: DashboardData;
}

export function CompactAIAssistant({ dashboardData }: CompactAIAssistantProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isMinimized, setIsMinimized] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      type: 'bot',
      content: "👋 Hi! I'm your AI assistant. Ask me about your analytics!",
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = (): void => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Smart AI responses based on dashboard context
  const generateAIResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    
    if (message.includes('revenue') || message.includes('sales')) {
      return `📈 Revenue is up 20% to $${dashboardData.revenue.toLocaleString()}! Main drivers: improved conversion rates and higher AOV. Organic search (45%) and social media (30%) are your top performers.`;
    }
    
    if (message.includes('users') || message.includes('traffic')) {
      return `👥 Active users grew 180% to ${dashboardData.users.toLocaleString()}! Growth is mainly from organic search. Average session: 4m 32s with 32% bounce rate - very healthy!`;
    }
    
    if (message.includes('conversion') || message.includes('optimize')) {
      return `🎯 Conversions: ${dashboardData.conversions.toLocaleString()} (conversion rate: 2.5%, above 2% target!). Focus on 'Prospects → Customers' funnel stage to improve that 25% conversion rate further.`;
    }
    
    if (message.includes('recommendation') || message.includes('suggest')) {
      return "💡 Top recommendations: 1) Invest more in organic search 2) Optimize mobile experience 3) Create retargeting campaigns for unconverted prospects.";
    }
    
    if (message.includes('performance') || message.includes('kpi')) {
      return "✅ All KPIs are green! Page load: 1.2s, Bounce: 32%, Session: 4m 32s, Conversion: 2.5%. You're exceeding all targets!";
    }
    
    if (message.includes('budget') || message.includes('spend')) {
      return `💰 Growth rate: $${dashboardData.growthRate} (+201%/hour). Recommendation: Maintain current spend but shift 15% from direct traffic to organic search optimization.`;
    }
    
    return "🤖 I can help with revenue trends, traffic analysis, conversion tips, KPI summaries, and budget advice. What interests you?";
  };

  const handleSendMessage = async (): Promise<void> => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      const aiResponse: Message = {
        id: messages.length + 2,
        type: 'bot',
        content: generateAIResponse(inputMessage),
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiResponse]);
      setIsLoading(false);
    }, 800 + Math.random() * 700);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const handleQuickQuestion = (question: string): void => {
    setInputMessage(question);
    setTimeout(() => handleSendMessage(), 100);
  };

  const quickQuestions: string[] = [
    "Revenue analysis",
    "Traffic insights", 
    "Conversion tips",
    "Performance summary"
  ];

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <style jsx>{`
          @keyframes gentle-glow {
            0%, 100% { 
              box-shadow: 0 0 20px rgba(251, 146, 60, 0.3);
              transform: scale(1);
            }
            50% { 
              box-shadow: 0 0 30px rgba(251, 146, 60, 0.5);
              transform: scale(1.02);
            }
          }
          .gentle-pulse {
            animation: gentle-glow 4s ease-in-out infinite;
          }
        `}</style>
        
        <Button
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 rounded-full bg-gradient-to-r from-orange-400 to-orange-600 hover:from-orange-500 hover:to-orange-700 shadow-lg transition-all duration-300 hover:scale-110 gentle-pulse"
        >
          <Sparkles className="w-6 h-6 text-white" />
        </Button>
        
        {/* Slower pulsing indicator */}
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full" style={{
          animation: 'ping 3s cubic-bezier(0, 0, 0.2, 1) infinite'
        }}></div>
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full"></div>
        
        {/* Quick tooltip */}
        <div className="absolute bottom-full right-0 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 hover:opacity-100 transition-opacity whitespace-nowrap">
          AI Assistant
        </div>
      </div>
    );
  }

  return (
    <Card 
      className={`fixed bottom-6 right-6 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-0 shadow-2xl transition-all duration-300 ${
        isMinimized ? 'w-80 h-16' : 'w-96 h-[500px]'
      }`}
    >
      {/* Header */}
      <CardHeader className="p-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-t-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
              <Bot className="w-4 h-4" />
            </div>
            <div>
              <CardTitle className="text-sm font-medium">AI Assistant</CardTitle>
              {!isMinimized && (
                <p className="text-xs text-orange-100">Analytics Helper</p>
              )}
            </div>
          </div>
          
          <div className="flex items-center space-x-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMinimized(!isMinimized)}
              className="w-6 h-6 text-white hover:bg-white/20"
            >
              {isMinimized ? <Maximize2 className="w-3 h-3" /> : <Minimize2 className="w-3 h-3" />}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="w-6 h-6 text-white hover:bg-white/20"
            >
              <X className="w-3 h-3" />
            </Button>
          </div>
        </div>
      </CardHeader>

      {/* Content - only show when not minimized */}
      {!isMinimized && (
        <CardContent className="flex flex-col h-full p-0">
          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-3 space-y-3 max-h-64">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-lg px-3 py-2 text-sm ${
                    message.type === 'user'
                      ? 'bg-orange-500 text-white rounded-br-sm'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-bl-sm'
                  }`}
                >
                  <p>{message.content}</p>
                  <p className={`text-xs mt-1 ${
                    message.type === 'user' ? 'text-orange-100' : 'text-gray-500'
                  }`}>
                    {message.timestamp.toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 dark:bg-gray-800 rounded-lg px-3 py-2 rounded-bl-sm">
                  <div className="flex items-center space-x-2">
                    <Loader2 className="w-3 h-3 animate-spin text-orange-500" />
                    <span className="text-xs text-gray-600 dark:text-gray-400">
                      Thinking...
                    </span>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Questions */}
          <div className="border-t p-3 bg-gray-50/50 dark:bg-gray-800/30">
            <div className="flex flex-wrap gap-1">
              {quickQuestions.map((question, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className="cursor-pointer hover:bg-orange-50 hover:border-orange-200 text-xs py-1 px-2 transition-all duration-200"
                  onClick={() => handleQuickQuestion(question)}
                >
                  {question}
                </Badge>
              ))}
            </div>
          </div>

          {/* Input Area */}
          <div className="border-t p-3">
            <div className="flex space-x-2">
              <Input
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Ask about your data..."
                onKeyPress={handleKeyPress}
                className="flex-1 text-sm h-8"
                disabled={isLoading}
              />
              <Button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim() || isLoading}
                size="sm"
                className="bg-orange-500 hover:bg-orange-600 h-8 w-8 p-0"
              >
                <Send className="w-3 h-3" />
              </Button>
            </div>
          </div>
        </CardContent>
      )}
    </Card>
  );
}