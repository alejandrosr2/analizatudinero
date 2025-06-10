import React, { useEffect } from 'react';

const SEO = ({ title, description, canonicalUrl, image }) => {
  useEffect(() => {
    // Set page title
    document.title = title;

    // Meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', description);

    // Open Graph tags
    const ogTags = [
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { property: 'og:url', content: canonicalUrl || window.location.href },
      { property: 'og:image', content: image || 'https://placehold.co/1200x630'  },
      { name: 'twitter:card', content: 'summary_large_image' }
    ];

    ogTags.forEach(tag => {
      let element = document.querySelector(`meta[property="${tag.property}"], meta[name="${tag.name}"]`);
      if (!element) {
        element = document.createElement('meta');
        if (tag.property) element.setAttribute('property', tag.property);
        if (tag.name) element.setAttribute('name', tag.name);
        document.head.appendChild(element);
      }
      element.setAttribute('content', tag.content);
    });

    return () => {
      // Cleanup not needed as we reuse the same elements
    };
  }, [title, description, canonicalUrl, image]);

  return null;
};

export default SEO;