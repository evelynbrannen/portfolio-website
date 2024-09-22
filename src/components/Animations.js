const debounce = (func, delay) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), delay);
  };
};


export const slideInImageOnScroll = (imageRef, setVisible) => {
  let lastScrollPosition = 0; 
  let isVisible = false;

  const handleScroll = () => {
    const currentScrollPosition = window.scrollY + window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollDirection = window.scrollY - lastScrollPosition;

    if (scrollDirection > 0 && currentScrollPosition >= documentHeight - 1000) {
      if (!isVisible) {
        setVisible(true);
        isVisible = true;
      }
    } 
    
    else if (scrollDirection < 0 && lastScrollPosition - window.scrollY > 250) {
      if (isVisible) {
        setVisible(false); 
        isVisible = false;
      }
    }

    lastScrollPosition = window.scrollY;
  };

  const debouncedHandleScroll = debounce(handleScroll, 50); // 50ms debounce

  window.addEventListener('scroll', debouncedHandleScroll);

  return () => {
    window.removeEventListener('scroll', debouncedHandleScroll);
  };
};
