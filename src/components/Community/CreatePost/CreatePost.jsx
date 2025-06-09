import React, { useState, useRef } from 'react';
import { MdImage, MdLocalOffer, MdAttachFile, MdEmojiEmotions, MdClose, MdSend } from 'react-icons/md';
import EmojiPicker from 'emoji-picker-react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import style from './CreatePost.module.css';

const CreatePost = ({ onCreatePost }) => {
  const [postContent, setPostContent] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [taggedBook, setTaggedBook] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const fileInputRef = useRef(null);
  const textareaRef = useRef(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEmojiClick = (emojiData) => {
    const textarea = textareaRef.current;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const newContent = postContent.slice(0, start) + emojiData.emoji + postContent.slice(end);
    
    setPostContent(newContent);
    setShowEmojiPicker(false);
    
    // Focus back to textarea and set cursor position
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + emojiData.emoji.length, start + emojiData.emoji.length);
    }, 0);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!postContent.trim()) {
      toast.error('Please write something before posting!', {
        duration: 3000,
        position: 'top-right',
      });
      return;
    }

    const newPost = {
      id: Date.now(),
      content: postContent,
      image: selectedImage,
      taggedBook: taggedBook,
      author: {
        name: "John Doe",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
        username: "@johndoe"
      },
      timestamp: Date.now(),
      likes: 0,
      comments: 0,
      shares: 0,
      isLiked: false
    };

    onCreatePost(newPost);
    
    // Reset form
    setPostContent('');
    setSelectedImage(null);
    setTaggedBook('');
    
    // Success toast
    toast.success('✨ Post created successfully!', {
      duration: 3000,
      position: 'top-right',
      style: {
        background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
        color: 'white',
        fontWeight: '600',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        borderRadius: '12px',
        backdropFilter: 'blur(10px)',
      },
    });
  };

  return (
    <motion.div 
      className={style.createPost}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className={style.postHeader}>
        <div className={style.userInfo}>
          <img 
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face" 
            alt="User Avatar" 
            className={style.userAvatar}
        />
          <div className={style.userDetails}>
            <h4 className={style.userName}>John Doe</h4>
            <span className={style.userHandle}>@johndoe</span>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className={style.postForm}>
        <div className={style.textAreaContainer}>
          <textarea
            ref={textareaRef}
            value={postContent}
            onChange={(e) => setPostContent(e.target.value)}
            placeholder="What's on your reading mind today?"
            className={style.postTextarea}
            rows="4"
          />
                </div>

        {selectedImage && (
          <motion.div 
            className={style.imagePreview}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <img src={selectedImage} alt="Preview" className={style.previewImage} />
              <button
              type="button"
              onClick={() => setSelectedImage(null)}
              className={style.removeImageBtn}
              aria-label="Remove image"
              >
              <MdClose />
              </button>
          </motion.div>
          )}

        <div className={style.bookTagging}>
              <input
                type="text"
            value={taggedBook}
            onChange={(e) => setTaggedBook(e.target.value)}
            placeholder="Tag a book (optional)"
            className={style.bookInput}
          />
            </div>

        <div className={style.postActions}>
          <div className={style.actionButtons}>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
              className={style.actionBtn}
              aria-label="Add image"
              >
              <MdImage />
              </button>

            <div className={style.emojiSection}>
              <button
                type="button"
                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                className={`${style.actionBtn} ${showEmojiPicker ? style.active : ''}`}
                aria-label="Add emoji"
              >
                <MdEmojiEmotions />
              </button>

              <AnimatePresence>
                {showEmojiPicker && (
                  <motion.div 
                    className={style.emojiPickerContainer}
                    initial={{ opacity: 0, scale: 0.8, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.8, y: 10 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                  >
                    <div className={style.emojiPickerHeader}>
                      <span className={style.emojiPickerTitle}>Choose an emoji</span>
              <button
                type="button"
                        onClick={() => setShowEmojiPicker(false)}
                        className={style.emojiPickerClose}
                        aria-label="Close emoji picker"
              >
                        <MdClose />
              </button>
                    </div>
                    <EmojiPicker
                      onEmojiClick={handleEmojiClick}
                      theme="dark"
                      width={270}
                      height={250}
                      searchDisabled={true}
                      skinTonePickerLocation="NONE"
                      previewConfig={{
                        showPreview: false
                      }}
                      emojiStyle="native"
                      categories={[
                        'smileys_people',
                        'animals_nature', 
                        'food_drink',
                        'activities',
                        'objects',
                        'symbols'
                      ]}
                      lazyLoadEmojis={true}
                      autoFocusSearch={false}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

              <button
                type="button"
              className={style.actionBtn}
              aria-label="Add attachment"
              >
              <MdAttachFile />
              </button>

              <button
              type="button"
              className={style.actionBtn}
              aria-label="Add tag"
              >
              <MdLocalOffer />
              </button>
          </div>

          <button type="submit" className={style.submitBtn}>
            <MdSend className={style.submitIcon} />
            Share Post
          </button>
        </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        style={{ display: 'none' }}
      />
      </form>
    </motion.div>
  );
};

export default CreatePost; 