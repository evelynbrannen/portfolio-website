export const slideInImageOnScroll = (imageRef, setVisible) => {
    let lastScrollPosition = 0;
  
    const handleScroll = () => {
      const currentScrollPosition = window.scrollY + window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
  
      if (currentScrollPosition > lastScrollPosition && currentScrollPosition >= documentHeight - 1500) {
        setVisible(true);
      } else if (currentScrollPosition < lastScrollPosition) {
        setVisible(false);
      }
  
      lastScrollPosition = currentScrollPosition;
    };
  
    window.addEventListener('scroll', handleScroll);
  
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  };
  