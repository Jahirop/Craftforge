import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, Bot, User, X, Loader2, Image as ImageIcon, Sparkles, Maximize2 } from 'lucide-react';
import { streamChat, generateImage } from '../services/ai';
import ReactMarkdown from 'react-markdown';

export const AITools = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'chat' | 'image'>('chat');
  
  // Chat state
  const [chatInput, setChatInput] = useState('');
  const [messages, setMessages] = useState<{ role: 'user' | 'bot'; content: string }[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Image state
  const [imagePrompt, setImagePrompt] = useState('');
  const [imageSize, setImageSize] = useState<'1K' | '2K' | '4K'>('1K');
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim() || isTyping) return;

    const userMessage = chatInput.trim();
    setChatInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsTyping(true);

    try {
      let botResponse = '';
      setMessages(prev => [...prev, { role: 'bot', content: '' }]);
      
      const history = messages.map(m => ({
        role: m.role === 'user' ? 'user' : 'model',
        parts: [{ text: m.content }]
      }));

      for await (const chunk of streamChat(userMessage, history)) {
        botResponse += chunk;
        setMessages(prev => {
          const newMessages = [...prev];
          newMessages[newMessages.length - 1].content = botResponse;
          return newMessages;
        });
      }
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'bot', content: 'Sorry, I encountered an error. Please try again.' }]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleGenerateImage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!imagePrompt.trim() || isGenerating) return;

    setIsGenerating(true);
    setGeneratedImage(null);

    try {
      const url = await generateImage(imagePrompt, imageSize);
      setGeneratedImage(url);
    } catch (error) {
      console.error(error);
      alert('Failed to generate image. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-8 z-50 w-16 h-16 rounded-full bg-gradient-to-r from-primary-container to-secondary-container text-white shadow-2xl shadow-primary/20 flex items-center justify-center hover:scale-110 transition-transform active:scale-95 group"
      >
        <Sparkles className="w-8 h-8 group-hover:rotate-12 transition-transform" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-28 right-8 z-50 w-[400px] h-[600px] glass-panel rounded-3xl overflow-hidden flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="p-4 border-b border-white/10 flex items-center justify-between bg-surface-container-high/50">
              <div className="flex gap-2">
                <button
                  onClick={() => setActiveTab('chat')}
                  className={`px-4 py-2 rounded-xl text-sm font-bold transition-colors ${activeTab === 'chat' ? 'bg-primary text-on-primary' : 'text-on-surface-variant hover:bg-white/5'}`}
                >
                  AI Chat
                </button>
                <button
                  onClick={() => setActiveTab('image')}
                  className={`px-4 py-2 rounded-xl text-sm font-bold transition-colors ${activeTab === 'image' ? 'bg-secondary text-on-secondary' : 'text-on-surface-variant hover:bg-white/5'}`}
                >
                  Image Gen
                </button>
              </div>
              <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                <X className="w-5 h-5 text-on-surface-variant" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-4 no-scrollbar">
              {activeTab === 'chat' ? (
                <div className="space-y-4">
                  {messages.length === 0 && (
                    <div className="text-center py-12 space-y-4">
                      <Bot className="w-12 h-12 text-primary mx-auto opacity-50" />
                      <p className="text-on-surface-variant text-sm">How can I help you forge your vision today?</p>
                    </div>
                  )}
                  {messages.map((m, i) => (
                    <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[85%] p-3 rounded-2xl text-sm ${m.role === 'user' ? 'bg-primary-container text-white rounded-tr-none' : 'bg-surface-container-highest text-on-surface rounded-tl-none'}`}>
                        <div className="prose prose-invert prose-sm max-w-none">
                          <ReactMarkdown>
                            {m.content}
                          </ReactMarkdown>
                        </div>
                      </div>
                    </div>
                  ))}
                  {isTyping && messages[messages.length - 1]?.content === '' && (
                    <div className="flex justify-start">
                      <div className="bg-surface-container-highest p-3 rounded-2xl rounded-tl-none">
                        <Loader2 className="w-4 h-4 animate-spin text-primary" />
                      </div>
                    </div>
                  )}
                  <div ref={chatEndRef} />
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="text-center space-y-2">
                    <ImageIcon className="w-12 h-12 text-secondary mx-auto opacity-50" />
                    <h3 className="text-white font-bold">Nano Banana Pro</h3>
                    <p className="text-on-surface-variant text-xs">Generate high-fidelity visuals for your brand.</p>
                  </div>

                  {generatedImage && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="relative rounded-2xl overflow-hidden border border-white/10"
                    >
                      <img src={generatedImage} alt="Generated" className="w-full h-auto" />
                      <a
                        href={generatedImage}
                        download="generated-image.png"
                        className="absolute bottom-2 right-2 p-2 bg-black/50 backdrop-blur-md rounded-lg text-white hover:bg-black/70 transition-colors"
                      >
                        <Maximize2 className="w-4 h-4" />
                      </a>
                    </motion.div>
                  )}

                  {isGenerating && (
                    <div className="aspect-square rounded-2xl bg-surface-container-highest flex flex-col items-center justify-center space-y-4 border border-white/5">
                      <Loader2 className="w-8 h-8 animate-spin text-secondary" />
                      <p className="text-xs text-on-surface-variant animate-pulse">Forging pixels...</p>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Footer Input */}
            <div className="p-4 bg-surface-container-high/50 border-t border-white/10">
              {activeTab === 'chat' ? (
                <form onSubmit={handleSendMessage} className="relative">
                  <input
                    type="text"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    placeholder="Ask anything..."
                    className="w-full bg-surface-container-highest border-none rounded-xl px-4 py-3 pr-12 text-sm text-white focus:ring-2 focus:ring-primary/40 placeholder:text-on-surface-variant/40"
                  />
                  <button
                    type="submit"
                    disabled={!chatInput.trim() || isTyping}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-primary hover:scale-110 transition-transform disabled:opacity-50"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </form>
              ) : (
                <form onSubmit={handleGenerateImage} className="space-y-4">
                  <div className="flex gap-2">
                    {(['1K', '2K', '4K'] as const).map((size) => (
                      <button
                        key={size}
                        type="button"
                        onClick={() => setImageSize(size)}
                        className={`flex-1 py-1.5 rounded-lg text-[10px] font-black tracking-widest transition-all ${imageSize === size ? 'bg-secondary text-on-secondary shadow-lg shadow-secondary/20' : 'bg-surface-container-highest text-on-surface-variant hover:bg-white/5'}`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                  <div className="relative">
                    <input
                      type="text"
                      value={imagePrompt}
                      onChange={(e) => setImagePrompt(e.target.value)}
                      placeholder="Describe your vision..."
                      className="w-full bg-surface-container-highest border-none rounded-xl px-4 py-3 pr-12 text-sm text-white focus:ring-2 focus:ring-secondary/40 placeholder:text-on-surface-variant/40"
                    />
                    <button
                      type="submit"
                      disabled={!imagePrompt.trim() || isGenerating}
                      className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-secondary hover:scale-110 transition-transform disabled:opacity-50"
                    >
                      <Sparkles className="w-5 h-5" />
                    </button>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
