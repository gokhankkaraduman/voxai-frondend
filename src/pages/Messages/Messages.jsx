import React, { useState, useRef, useEffect } from 'react';
import { useUser } from '../../contexts/UserContext';
import { FaSearch, FaEllipsisV, FaPaperPlane, FaUser, FaCircle, FaTrash, FaTimes, FaCheck } from 'react-icons/fa';
import style from './Messages.module.css';

const Messages = () => {
  const { user } = useUser();
  const [selectedContact, setSelectedContact] = useState(null);
  const [newMessage, setNewMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMessages, setSelectedMessages] = useState([]);
  const [isSelectMode, setIsSelectMode] = useState(false);
  const [contactToDelete, setContactToDelete] = useState(null);
  const messagesEndRef = useRef(null);

  // Socket.io hazırlığı için state'ler
  const [isOnline, setIsOnline] = useState(false);
  const [typingUsers, setTypingUsers] = useState([]);
  const [connectionStatus, setConnectionStatus] = useState('disconnected');

  // Mock contacts data
  const [contacts] = useState([
    {
      id: 1,
      name: 'Alice Johnson',
      username: 'alice_j',
      avatar: null,
      lastMessage: 'Hey! How are you?',
      lastMessageTime: '2 min ago',
      unreadCount: 2,
      isOnline: true,
      messages: [
        { id: 1, text: 'Hi there!', sender: 'them', timestamp: '10:30' },
        { id: 2, text: 'Hey! How are you?', sender: 'them', timestamp: '10:32' },
        { id: 3, text: 'Good! Just reading some books', sender: 'me', timestamp: '10:35' },
        { id: 4, text: 'Nice! Which one?', sender: 'them', timestamp: '10:36' },
      ]
    },
    {
      id: 2,
      name: 'Bob Wilson',
      username: 'bob_w',
      avatar: null,
      lastMessage: 'Thanks for the book recommendation!',
      lastMessageTime: '1 hour ago',
      unreadCount: 0,
      isOnline: false,
      messages: [
        { id: 1, text: 'Have you read "Atomic Habits"?', sender: 'me', timestamp: 'Yesterday' },
        { id: 2, text: 'Yes! It\'s amazing', sender: 'them', timestamp: 'Yesterday' },
        { id: 3, text: 'Thanks for the book recommendation!', sender: 'them', timestamp: '1 hour ago' },
      ]
    },
    {
      id: 3,
      name: 'Carol Smith',
      username: 'carol_s',
      avatar: null,
      lastMessage: 'Let\'s discuss the book club meeting',
      lastMessageTime: '3 hours ago',
      unreadCount: 1,
      isOnline: true,
      messages: [
        { id: 1, text: 'Are you coming to book club?', sender: 'them', timestamp: '3 hours ago' },
        { id: 2, text: 'Let\'s discuss the book club meeting', sender: 'them', timestamp: '3 hours ago' },
      ]
    },
    {
      id: 4,
      name: 'David Brown',
      username: 'david_b',
      avatar: null,
      lastMessage: 'The audiobook was fantastic!',
      lastMessageTime: '1 day ago',
      unreadCount: 0,
      isOnline: false,
      messages: [
        { id: 1, text: 'Just finished "Sapiens"', sender: 'them', timestamp: '1 day ago' },
        { id: 2, text: 'The audiobook was fantastic!', sender: 'them', timestamp: '1 day ago' },
      ]
    }
  ]);

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (selectedContact && selectedContact.messages.length > 0) {
      // Only scroll when there are new messages, not on contact selection
      const lastMessage = selectedContact.messages[selectedContact.messages.length - 1];
      if (lastMessage && lastMessage.sender === 'me') {
        setTimeout(() => {
          scrollToBottom();
        }, 100);
      }
    }
  }, [selectedContact?.messages?.length]); // Only trigger on message count change

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedContact) return;

    const message = {
      id: Date.now(),
      text: newMessage,
      sender: 'me',
      timestamp: new Date().toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: false 
      }),
      status: 'sent' // sent, delivered, read
    };

    // Update the contact's messages locally (in real app this would be managed by backend/state)
    selectedContact.messages.push(message);
    setNewMessage('');
    scrollToBottom();

    // Socket.io ile mesaj gönderme hazırlığı:
    // socket.emit('send_message', {
    //   to: selectedContact.id,
    //   message: message.text,
    //   timestamp: message.timestamp
    // });
  };

  const handleDeleteMessages = () => {
    if (selectedMessages.length === 0) return;
    
    // Socket.io ile mesaj silme hazırlığı:
    // socket.emit('delete_messages', {
    //   contactId: selectedContact.id,
    //   messageIds: selectedMessages
    // });

    // Local olarak mesajları sil
    selectedContact.messages = selectedContact.messages.filter(
      msg => !selectedMessages.includes(msg.id)
    );
    
    // Eğer tüm mesajlar silindiyse, placeholder mesaj ekle
    if (selectedContact.messages.length === 0) {
      selectedContact.messages.push({
        id: 'deleted-placeholder',
        text: 'All messages have been deleted',
        sender: 'system',
        timestamp: new Date().toLocaleTimeString('en-US', { 
          hour: '2-digit', 
          minute: '2-digit',
          hour12: false 
        }),
        isDeleted: true
      });
      
      // Sol taraftaki son mesajı da güncelle
      selectedContact.lastMessage = 'All messages deleted';
      selectedContact.lastMessageTime = 'now';
    } else {
      // Son mesajı güncelle
      const lastMsg = selectedContact.messages[selectedContact.messages.length - 1];
      selectedContact.lastMessage = lastMsg.text;
      selectedContact.lastMessageTime = lastMsg.timestamp;
    }
    
    setSelectedMessages([]);
    setIsSelectMode(false);
  };

  const handleDeleteContact = (contactId) => {
    // Socket.io ile konuşmayı silme hazırlığı:
    // socket.emit('delete_conversation', { contactId });

    // Local olarak contact'ı sil
    const contactIndex = contacts.findIndex(c => c.id === contactId);
    if (contactIndex !== -1) {
      contacts.splice(contactIndex, 1);
      if (selectedContact?.id === contactId) {
        setSelectedContact(null);
      }
    }
    setContactToDelete(null);
  };

  const toggleMessageSelection = (messageId) => {
    if (selectedMessages.includes(messageId)) {
      setSelectedMessages(prev => prev.filter(id => id !== messageId));
    } else {
      setSelectedMessages(prev => [...prev, messageId]);
    }
  };

  return (
    <div className={style.container}>
      <div className={style.backgroundEnhancer}></div>
      <div className={style.content}>
        {/* Contacts Sidebar */}
        <div className={style.sidebar}>
          <div className={style.sidebarHeader}>
            <h2>Messages</h2>
            <div className={style.headerActions}>
              <span className={`${style.connectionStatus} ${style[connectionStatus]}`}>
                {connectionStatus === 'connected' ? 'Online' : 'Offline'}
              </span>
              <button className={style.optionsButton}>
                <FaEllipsisV />
              </button>
            </div>
          </div>

          <div className={style.searchContainer}>
            <div className={style.searchBox}>
              <FaSearch className={style.searchIcon} />
              <input
                type="text"
                placeholder="Search conversations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={style.searchInput}
              />
            </div>
          </div>

          <div className={style.contactsList}>
            {filteredContacts.map((contact) => (
              <div
                key={contact.id}
                className={`${style.contactItem} ${
                  selectedContact?.id === contact.id ? style.active : ''
                }`}
                onClick={() => setSelectedContact(contact)}
              >
                <div className={style.contactAvatar}>
                  <FaUser />
                  {contact.isOnline && (
                    <div className={style.onlineIndicator}>
                      <FaCircle />
                    </div>
                  )}
                </div>
                <div className={style.contactInfo}>
                  <div className={style.contactHeader}>
                    <h4 className={style.contactName}>{contact.name}</h4>
                    <span className={style.messageTime}>{contact.lastMessageTime}</span>
                  </div>
                  <div className={style.contactPreview}>
                    <p className={style.lastMessage}>{contact.lastMessage}</p>
                    <div className={style.contactActions}>
                      {contact.unreadCount > 0 && (
                        <span className={style.unreadBadge}>{contact.unreadCount}</span>
                      )}
                      <button 
                        className={style.deleteContactBtn}
                        onClick={(e) => {
                          e.stopPropagation();
                          setContactToDelete(contact.id);
                        }}
                      >
                        <FaTimes />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className={style.chatArea}>
          {selectedContact ? (
            <>
              {/* Chat Header */}
              <div className={style.chatHeader}>
                <div className={style.chatHeaderInfo}>
                  <div className={style.chatAvatar}>
                    <FaUser />
                    {selectedContact.isOnline && (
                      <div className={style.onlineIndicator}>
                        <FaCircle />
                      </div>
                    )}
                  </div>
                  <div className={style.chatHeaderText}>
                    <h3>{selectedContact.name}</h3>
                    <span className={style.onlineStatus}>
                      {selectedContact.isOnline ? 'Online' : 'Offline'}
                    </span>
                  </div>
                </div>
                <div className={style.chatHeaderActions}>
                  {isSelectMode && (
                    <>
                      <button 
                        className={style.deleteSelectedBtn}
                        onClick={handleDeleteMessages}
                        disabled={selectedMessages.length === 0}
                      >
                        <FaTrash />
                      </button>
                      <button 
                        className={style.cancelSelectBtn}
                        onClick={() => {
                          setIsSelectMode(false);
                          setSelectedMessages([]);
                        }}
                      >
                        <FaTimes />
                      </button>
                    </>
                  )}
                  <button 
                    className={style.chatOptions}
                    onClick={() => setIsSelectMode(!isSelectMode)}
                  >
                    {isSelectMode ? <FaCheck /> : <FaEllipsisV />}
                  </button>
                </div>
              </div>

              {/* Messages */}
              <div className={style.messagesContainer}>
                {selectedContact.messages.map((message) => (
                  <div
                    key={message.id}
                    className={`${style.message} ${
                      message.sender === 'me' ? style.myMessage : 
                      message.sender === 'system' ? style.systemMessage : style.theirMessage
                    } ${selectedMessages.includes(message.id) ? style.selected : ''}`}
                    onClick={() => {
                      if (isSelectMode && message.sender !== 'system') {
                        toggleMessageSelection(message.id);
                      }
                    }}
                  >
                    {isSelectMode && message.sender !== 'system' && (
                      <div className={style.messageCheckbox}>
                        <input
                          type="checkbox"
                          checked={selectedMessages.includes(message.id)}
                          onChange={() => toggleMessageSelection(message.id)}
                        />
                      </div>
                    )}
                    <div className={style.messageContent}>
                      <p className={style.messageText}>{message.text}</p>
                      <span className={style.messageTime}>{message.timestamp}</span>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Message Input */}
              <form className={style.messageForm} onSubmit={handleSendMessage}>
                <div className={style.inputContainer}>
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder={`Message ${selectedContact.name}...`}
                    className={style.messageInput}
                  />
                  <button 
                    type="submit" 
                    className={style.sendButton}
                    disabled={!newMessage.trim()}
                  >
                    <FaPaperPlane />
                  </button>
                </div>
              </form>
            </>
          ) : (
            <div className={style.noSelection}>
              <div className={style.noSelectionContent}>
                <h3>Select a conversation</h3>
                <p>Choose a contact to start messaging</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Contact Delete Confirmation */}
      {contactToDelete && (
        <div className={style.modal}>
          <div className={style.modalContent}>
            <h3>Delete Conversation</h3>
            <p>Are you sure you want to delete this conversation? This action cannot be undone.</p>
            <div className={style.modalActions}>
              <button 
                className={style.cancelBtn}
                onClick={() => setContactToDelete(null)}
              >
                Cancel
              </button>
              <button 
                className={style.deleteBtn}
                onClick={() => handleDeleteContact(contactToDelete)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Messages; 