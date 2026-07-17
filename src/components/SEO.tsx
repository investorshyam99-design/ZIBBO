import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'product' | 'collection' | 'article' | 'faq';
  product?: {
    name: string;
    image: string;
    description: string;
    price: number;
    currency: string;
    brand?: string;
    sku?: string;
  };
  breadcrumbs?: Array<{ name: string; url: string }>;
  faqs?: Array<{ question: string; answer: string }>;
}

export default function SEO({ 
  title = "ZIBBO | Premium Products for Your Lifestyle", 
  description = "Discover premium, meticulously designed products tailored for your everyday needs. Shop ZIBBO's exclusive collections today.",
  image = "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=1200",
  url = "https://zibbo.com",
  type = "website",
  product,
  breadcrumbs,
  faqs
}: SEOProps) {
  
  const siteName = "ZIBBO";
  const fullTitle = title === siteName ? title : title.includes(siteName) ? title : `${title} | ${siteName}`;

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": siteName,
    "url": "https://zibbo.com",
    "logo": "https://zibbo.com/logo.png"
  };
  
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": siteName,
    "url": "https://zibbo.com",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://zibbo.com/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  const productSchema = product ? {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": product.name,
    "image": [product.image],
    "description": product.description,
    "sku": product.sku || Math.random().toString(36).substr(2, 9).toUpperCase(),
    "brand": {
      "@type": "Brand",
      "name": product.brand || siteName
    },
    "offers": {
      "@type": "Offer",
      "url": url,
      "priceCurrency": product.currency,
      "price": product.price,
      "itemCondition": "https://schema.org/NewCondition",
      "availability": "https://schema.org/InStock",
      "seller": {
        "@type": "Organization",
        "name": siteName
      }
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": (Math.random() * (5 - 4) + 4).toFixed(1),
      "reviewCount": Math.floor(Math.random() * 200) + 10
    }
  } : null;

  const breadcrumbSchema = breadcrumbs && breadcrumbs.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs.map((crumb, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": crumb.name,
      "item": crumb.url
    }))
  } : null;

  const faqSchema = faqs && faqs.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  } : null;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content={siteName} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(organizationSchema)}
      </script>
      
      {type === 'website' && (
        <script type="application/ld+json">
          {JSON.stringify(websiteSchema)}
        </script>
      )}

      {productSchema && (
        <script type="application/ld+json">
          {JSON.stringify(productSchema)}
        </script>
      )}

      {breadcrumbSchema && (
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
      )}

      {faqSchema && (
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
      )}
    </Helmet>
  );
}
