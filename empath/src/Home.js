import './home.css';
import {useState, useEffect, useRef, use} from 'react';
import LightMode from './lightmode.png'
import DarkMode from './darkmode.png'
import logo from './logo_op2.png';
import { SendHorizonal, AlignRight , Copy, ThumbsUp, ThumbsDown, Volume2,  Plus,
  Search, SquarePen, HeartHandshake  } from 'lucide-react'

function HomePage({ theme, toggleTheme }) {

    // Each conversation is an object: { user: string, bot: string }
    const [conversations, setConversations] = useState([]);
    const [typing, setTyping] = useState(false);
    const [input, setInput] = useState('');
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const [conversationsList, setConversationsList] = useState([]);
    const [currentChatId, setCurrentChatId] = useState(null);
    
    // Ref for the chat window container
    const chatWindowRef = useRef(null);
    // Ref for the latest conversation block
    const latestConvRef = useRef(null);


    const sendMessage = () => {
        if (input.trim()) {
          // Create a new conversation with the user prompt and an empty bot response.
          const newConv = { user: input, bot: '' };
          setConversations((prev) => [...prev, newConv]);
          setInput('');
    
          // Scroll to the new conversation block.
          setTimeout(() => {
            if (latestConvRef.current) {
              latestConvRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
          }, 0);
    
          // Simulate bot typing and response after a short delay.
          setTyping(true);
          setTimeout(() => {
            setTyping(false);
            // Update the last conversation object's bot response.
            setConversations((prev) => {
              const updated = [...prev];
              updated[updated.length - 1].bot =
                "Thank you for sharing that with me. You’re not alone — I’m here to help.";
              return updated;
            });
            // Scroll again so the updated conversation (if long) is visible.
            setTimeout(() => {
              if (latestConvRef.current) {
                latestConvRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }
            }, 0);
          }, 1500);
        }
      };

      const handleOverlayClick = () => {
        setSidebarOpen(false);
      };
    
      
      const startNewChat = () => {
        const newChat = {
          id: Date.now(), // Unique ID for the chat
          messages: []
        };
      
        setConversationsList([...conversationsList, newChat]);
        setCurrentChatId(newChat.id);
      };

      const clearChat = () => {
        const updatedList = conversationsList.map(chat => {
          if (chat.id === currentChatId) {
            return { ...chat, messages: [] };
          }
          return chat;
        });
        setConversationsList(updatedList);
      };
    


    return (
      <div className={`home-container ${theme}`}>
                 <div className="logo-name">
                        <AlignRight  className="sidebar-icon" size={30} onClick={() => setSidebarOpen(!sidebarOpen)} />
                        <SquarePen className="sidebar-icon" size={30} onClick={() => startNewChat()} />
                        <HeartHandshake className="sidebar-icon" size={30} />
                      
                    </div>

                    {sidebarOpen && (
                        <>
                          <div className="sidebar-overlay" onClick={handleOverlayClick}></div>
                          <div className={`sidebar ${theme}`}>
                            <div className='sidebar-header'>
                            <div>
                                <AlignRight  className="sidebar-icon" size={30} onClick={() => setSidebarOpen(!sidebarOpen)} />
                            </div>
                            <div>
                              <SquarePen className="sidebar-icon" size={30} onClick={() => startNewChat()} />
                              <Search className="sidebar-icon" size={30} />
                            </div>
                            </div>
                            
                            <hr />
                            <div className="sidebar-content">
                                <ul>
                                  {conversations.map((conv, index) => (
                                    <li key={index}>{conv.user}</li>
                                  ))}
                                </ul>
                            </div>
                            <div  className="sidebar-footer">
                            <button onClick={() => clearChat()} className="sidebar-button">Clear Chat</button>
                            </div>   
                          </div>
                        </>
                      )}
                            
                    <div className="page_header">
                        <div className="switch-wrapper" onClick={toggleTheme}>
                        <div className={`switch-track ${theme}`}>
                            <div className={`switch-thumb ${theme}`}>
                            <img
                                src={theme === 'dark' ? DarkMode : LightMode}
                                alt="Theme icon"
                                className="theme-icon"
                            />
                            </div>
                        </div>
                        </div>
                 </div>
                        {/* Main Chat Area */}
                        <div className="page_body">
                                <div className="chatbot-container">
                                <div className="chatbot-wrapper">
                                    {/* Chat window where each conversation block is rendered */}
                                    <div className="chat-window" ref={chatWindowRef}>
                                    {conversations.map((conv, i) => (
                                        <div
                                        key={i}
                                        className="conversation"
                                        // Attach ref to the latest conversation block.
                                        ref={i === conversations.length - 1 ? latestConvRef : null}
                                        >
                                        <div className="chat-msg user">
                                            <div className="msg-bubble">{conv.user}</div>
                                        </div>
                                        {conv.bot && (
                                            <div className="chat-msg ai">
                                            <div className="msg-bubble">{conv.bot}</div>
                                            <div className="response-icons">
                                                  <button className="icon-button"><Copy size={16} className="icon" /></button> 
                                                  <button className="icon-button"><ThumbsUp size={16} className="icon" /></button>
                                                  <button className="icon-button"><ThumbsDown size={16} className="icon" /></button>
                                                  <button className="icon-button"><Volume2 size={16} className="icon" /></button>
                                                </div>
                                            </div>
                                        )}
                                          {typing && (
                                              <div className="chat-msg ai">
                                              <div className="msg-bubble typing">
                                                  <span className="dot"></span>
                                                  <span className="dot"></span>
                                                  <span className="dot"></span>
                                              </div>
                                              </div>
                                          )}
                                        </div>
                                    ))}
                            
                            </div>
                            {/* Chat input bar remains fixed at the bottom */}
                            <div className="chat-input-wrapper">
                            <div className="chat-input">
                                <input
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Ask me anything... I'm here to help."
                                />
                                <button onClick={sendMessage}>
                            <SendHorizonal size={18} />
                        </button>
                    </div>
                    </div>
                </div>
                </div>
            </div>
        <footer className={`footer-message ${theme}`}>
        <p>
          <strong>Your privacy matters.</strong> Everything you say to SafeSpaceAI is anonymous and
          confidential. We’re here to listen without judgment.
        </p>
        <p className="copyright">© {new Date().getFullYear()} SafeSpaceAI. All rights reserved.</p>
         </footer>
      </div>
    );
  }

    export default HomePage; // Export the HomePage component
