const description = "A EmCasa é uma imobiliária digital feita para simplificar a compra e venda de imóveis. Encontre Imóveis, Casas e Apartamentos à Venda no Rio de Janeiro em Ipanema, Leblon, Copacabana, Botafogo, Flamengo, Lagoa e toda Zona Sul ou São Paulo em Perdizes com o sistema exclusivo de Tour Virtual 3D do Emcasa."

const logo = [
  {
    "@context": "http://schema.org",
    "@type": "ImageObject",
    "url": "https://s3.amazonaws.com/emcasa-ui/logo/logo.svg?v=2.0",
    "fileFormat": "image/svg+xml",
    "datePublished": "2018-12-31",
    "description": "Logo da EmCasa",
    "name": "EmCasa Logo"
  }
]

const address = {
  "@type": "PostalAddress",
  "addressCountry": "Brasil"
}

const sameAs = [
  "https://www.facebook.com/EmCasa",
  "https://www.instagram.com/emcasaimoveis/",
  "https://twitter.com/EmCasaTech",
  "https://www.linkedin.com/company/emcasa/"
]

const photo = [
  {
    "@context": "http://schema.org",
    "@type": "ImageObject",
    "url": "https://res.cloudinary.com/emcasa/image/upload/f_auto/v1513818385/buy",
    "name": "EmCasa - A nova forma de comprar imóveis"
  },
  {
    "@context": "http://schema.org",
    "@type": "ImageObject",
    "url": "https://res.cloudinary.com/emcasa/image/upload/f_auto/v1513818385/buy-rj.jpg",
    "name": "EmCasa - Compre seu imóvel no Rio de Janeiro"
  },
  {
    "@context": "http://schema.org",
    "@type": "ImageObject",
    "url": "https://res.cloudinary.com/emcasa/image/upload/f_auto/v1513818385/buy-sp.jpg",
    "name": "EmCasa - Compre seu imóvel em São Paulo"
  },
  {
    "@context": "http://schema.org",
    "@type": "ImageObject",
    "url": "https://res.cloudinary.com/emcasa/image/upload/f_auto/v1513818385/sell",
    "name": "EmCasa - A nova forma de vender imóveis"
  },
  {
    "@context": "http://schema.org",
    "@type": "ImageObject",
    "url": "https://res.cloudinary.com/emcasa/image/upload/f_auto/v1513818385/sell-rj.jpg",
    "name": "EmCasa - Anuncie e venda seu imóvel no Rio de Janeiro"
  },
  {
    "@context": "http://schema.org",
    "@type": "ImageObject",
    "url": "https://res.cloudinary.com/emcasa/image/upload/f_auto/v1513818385/sell-sp.jpg",
    "name": "EmCasa - Anuncie e venda seu imóvel em São Paulo"
  },
  {
    "@context": "http://schema.org",
    "@type": "ImageObject",
    "contentLocation": "São Paulo, SP, Brasil",
    "url": "https://instagram.fcgh10-1.fna.fbcdn.net/vp/bf50750fdf3cae566867bf2011940aa4/5D1C6138/t51.2885-15/e35/49933544_986041888263719_7495528786586903398_n.jpg?_nc_ht=instagram.fcgh10-1.fna.fbcdn.net",
    "datePublished": "2019-01-16",
    "description": "@emcasaimoveis Já virou tradição! Summit da EmCasa tem que ter esCape 60! Diferente da última vez hoje todos os grupos conseguiram sair! Parabéns, time! 🤘😍 #emcasa #teamemcasa #summit #saopaulo",
    "name": "EmCasa Summit 2019"
  }
]

const image = [
  {
    "@context": "http://schema.org",
    "@type": "ImageObject",
    "url": "https://res.cloudinary.com/emcasa/image/upload/f_auto/v1513818385/buy",
    "name": "EmCasa - A nova forma de comprar imóveis"
  },
  {
    "@context": "http://schema.org",
    "@type": "ImageObject",
    "url": "https://res.cloudinary.com/emcasa/image/upload/f_auto/v1513818385/buy-rj.jpg",
    "name": "EmCasa - Compre seu imóvel no Rio de Janeiro"
  },
  {
    "@context": "http://schema.org",
    "@type": "ImageObject",
    "url": "https://res.cloudinary.com/emcasa/image/upload/f_auto/v1513818385/buy-sp.jpg",
    "name": "EmCasa - Compre seu imóvel em São Paulo"
  },
  {
    "@context": "http://schema.org",
    "@type": "ImageObject",
    "url": "https://res.cloudinary.com/emcasa/image/upload/f_auto/v1513818385/sell",
    "name": "EmCasa - A nova forma de vender imóveis"
  },
  {
    "@context": "http://schema.org",
    "@type": "ImageObject",
    "url": "https://res.cloudinary.com/emcasa/image/upload/f_auto/v1513818385/sell-rj.jpg",
    "name": "EmCasa - Anuncie e venda seu imóvel no Rio de Janeiro"
  },
  {
    "@context": "http://schema.org",
    "@type": "ImageObject",
    "url": "https://res.cloudinary.com/emcasa/image/upload/f_auto/v1513818385/sell-sp.jpg",
    "name": "EmCasa - Anuncie e venda seu imóvel em São Paulo"
  }
]

const SchemaBreadcrumbList = {
  "@context": "http://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "item": {
        "@id": "http://www.emcasa.com",
        "name": "Página Inicial"
      }
    },
    {
      "@type": "ListItem",
      "position": 2,
      "item": {
        "@id": "http://www.emcasa.com/imoveis",
        "name": "Compre"
      }
    },
    {
      "@type": "ListItem",
      "position": 3,
      "item": {
        "@id": "http://www.emcasa.com/vender",
        "name": "Venda"
      }
    },
    {
      "@type": "ListItem",
      "position": 4,
      "item": {
        "@id": "http://blog.emcasa.com",
        "name": "Blog"
      }
    },
    {
      "@type": "ListItem",
      "position": 4,
      "item": {
        "@id": "https://jobs.emcasa.com",
        "name": "Trabalhe Conosco"
      }
    }
  ]
}

const SchemaWebSite = {
  "@context": "https://schema.org",
  "@id": "https://www.emcasa.com/#website",
  "@type": "WebSite",
  "name": "EmCasa",
  "description": description,
  "url": "https://www.emcasa.com",
  "sameAs": sameAs
}

const SchemaWebPage = {
  "@context": "http://schema.org",
  "@id": "https://www.emcasa.com/#webpage",
  "@type": "WebPage",
  "name": "EmCasa",
  "description": description,
  "breadcrumb": SchemaBreadcrumbList,
  "sameAs": sameAs
}

const SchemaRealEstateAgent = {
  "@context": "http://schema.org",
  "@id": "https://www.emcasa.com/#realestateagent",
  "@type": "RealEstateAgent",
    "name": "EmCasa",
    "description": description,
    "telephone": "55 (21) 99477-1868",
    "email": "mailto:contato@emcasa.com",
    "url": "https://www.emcasa.com",
    "photo": photo,
    "image": image,
    "logo": logo,
    "address": address,
    "sameAs": sameAs,
    "priceRange": "R$250.000 - R$2.000.000"
}

const SchemaOrganization = {
  "@context": "http://schema.org",
  "@id": "https://www.emcasa.com/#organization",
  "@type": "Organization",
  "name": "EmCasa",
  "description": description,
  "telephone": "55 (21) 99477-1868",
  "email": "mailto:contato@emcasa.com",
  "url": "https://www.emcasa.com",
  "logo": logo,
  "image": image,
  "address": address,
  "sameAs": sameAs
}

export {
  SchemaBreadcrumbList,
  SchemaWebSite,
  SchemaWebPage,
  SchemaRealEstateAgent,
  SchemaOrganization
}