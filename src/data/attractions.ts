import grutaLagoAzul from "@/assets/gruta-lago-azul.jpg";
import rioDaPrata from "@/assets/rio-da-prata.jpg";
import abismoAnhumas from "@/assets/abismo-anhumas.jpg";
import rioSucuri from "@/assets/rio-sucuri.jpg";
import buracoAraras from "@/assets/buraco-das-araras.jpg";
import estanciaMimosa from "@/assets/estancia-mimosa.jpg";
import aquarioNatural from "@/assets/aquario-natural.jpg";
import lagoaMisteriosa from "@/assets/lagoa-misteriosa.jpg";

export interface Attraction {
  id: string;
  name: string;
  image: string;
  photos: string[];
  duration: string;
  activities: string[];
  difficulty: "Fácil" | "Moderado" | "Difícil";
  rating: number;
  description: string;
  distance: string;
  coordinates: string;
  fullDescription: string;
  curiosities: string[];
  tips: string[];
  category: "Gruta" | "Rio" | "Cachoeira" | "Ecoturismo" | "Aventura" | "Balneário" | "Mergulho";
  price: string;
}

export const attractions: Attraction[] = [
  {
    id: "gruta-lago-azul",
    name: "Gruta do Lago Azul",
    image: grutaLagoAzul,
    photos: [grutaLagoAzul, grutaLagoAzul, grutaLagoAzul], // Placeholder - would have multiple real photos
    duration: "1h 30min",
    activities: ["Caminhada", "Contemplação", "Fotografia"],
    difficulty: "Fácil",
    rating: 4.8,
    description: "Uma das grutas mais famosas do Brasil, com um lago subterrâneo de águas azuis cristalinas.",
    distance: "20 km",
    coordinates: "-21.1167, -56.4833",
    fullDescription: "A Gruta do Lago Azul é um dos cartões-postais de Bonito. A caverna calcária abriga um lago subterrâneo de águas cristalinas e coloração azul intensa, que varia conforme a incidência da luz solar. A descida até o lago é feita por uma trilha com degraus naturais e artificiais.",
    curiosities: [
      "O lago tem 87 metros de profundidade",
      "A cor azul é causada pela absorção da luz solar",
      "Foram encontrados fósseis de preguiça gigante no local",
      "A gruta mantém temperatura constante de 18°C"
    ],
    tips: [
      "Melhor horário para visitação: 7h às 9h",
      "Não é permitido tocar na água",
      "Use calçados antiderrapantes",
      "Leve agasalho, a temperatura é baixa"
    ],
    category: "Gruta",
    price: "R$ 75,00"
  },
  {
    id: "rio-da-prata",
    name: "Rio da Prata",
    image: rioDaPrata,
    photos: [rioDaPrata, rioDaPrata, rioDaPrata],
    duration: "4h",
    activities: ["Flutuação", "Snorkeling", "Trilha Ecológica", "Observação da Fauna"],
    difficulty: "Fácil",
    rating: 4.9,
    description: "Rio de águas cristalinas perfeito para flutuação, com rica vida aquática e vegetação exuberante.",
    distance: "15 km",
    coordinates: "-21.0833, -56.5167",
    fullDescription: "O Rio da Prata oferece uma das experiências de flutuação mais incríveis do mundo. Com águas cristalinas e temperatura constante, permite observar dezenas de espécies de peixes, plantas aquáticas e a rica biodiversidade do Pantanal. A atividade inclui trilha interpretativa pela mata ciliar.",
    curiosities: [
      "Visibilidade da água chega a 50 metros",
      "Temperatura da água é constante: 22°C",
      "Abriga mais de 30 espécies de peixes",
      "As nascentes filtram a água através do calcário"
    ],
    tips: [
      "Não use protetor solar ou repelente",
      "É obrigatório o uso de colete salva-vidas",
      "Não alimente os peixes",
      "Respeite a velocidade da correnteza"
    ],
    category: "Rio",
    price: "R$ 388,00"
  },
  {
    id: "abismo-anhumas",
    name: "Abismo Anhumas",
    image: abismoAnhumas,
    photos: [abismoAnhumas, abismoAnhumas, abismoAnhumas],
    duration: "4h",
    activities: ["Rapel", "Mergulho", "Flutuação", "Espeleologia"],
    difficulty: "Difícil",
    rating: 4.7,
    description: "Caverna acessada por rapel de 72 metros, com lago subterrâneo cristalino e espeleotemas únicos.",
    distance: "23 km",
    coordinates: "-21.1500, -56.4667",
    fullDescription: "O Abismo Anhumas é uma das experiências mais emocionantes de Bonito. O acesso se dá através de um rapel de 72 metros por uma dolina circular. No interior, um lago de águas cristalinas permite mergulho e flutuação entre impressionantes formações calcárias.",
    curiosities: [
      "A dolina tem 162 metros de diâmetro na superfície",
      "O lago subterrâneo tem 80 metros de profundidade",
      "As estalactites levaram milhares de anos para se formar",
      "É o único local no Brasil para mergulho em caverna"
    ],
    tips: [
      "Necessário agendamento antecipado",
      "Idade mínima: 12 anos",
      "Peso máximo: 120kg para rapel",
      "Leve máscara de mergulho própria"
    ],
    category: "Aventura",
    price: "R$ 850,00"
  },
  {
    id: "rio-sucuri",
    name: "Rio Sucuri",
    image: rioSucuri,
    photos: [rioSucuri, rioSucuri, rioSucuri],
    duration: "3h",
    activities: ["Flutuação", "Observação da Fauna", "Trilha", "Fotografia"],
    difficulty: "Fácil",
    rating: 4.6,
    description: "Rio com águas transparentes, ideal para flutuação tranquila e observação da vida aquática.",
    distance: "18 km",
    coordinates: "-21.0667, -56.5333",
    fullDescription: "O Rio Sucuri é conhecido por suas águas extremamente transparentes e flutuação tranquila. Com nascentes que brotam do calcário, oferece uma experiência única de contato com a natureza, onde é possível observar peixes, plantas aquáticas e a mata ciliar preservada.",
    curiosities: [
      "O nome Sucuri vem da cobra que habita a região",
      "A água tem pH alcalino devido ao calcário",
      "Flutuação de 1,8 km rio abaixo",
      "Temperatura constante de 24°C"
    ],
    tips: [
      "Ideal para iniciantes na flutuação",
      "Não é permitido usar nadadeiras",
      "Respeite a fauna aquática",
      "Siga sempre o guia credenciado"
    ],
    category: "Rio",
    price: "R$ 298,00"
  },
  {
    id: "buraco-das-araras",
    name: "Buraco das Araras",
    image: buracoAraras,
    photos: [buracoAraras, buracoAraras, buracoAraras],
    duration: "2h",
    activities: ["Observação de Aves", "Trilha", "Fotografia", "Contemplação"],
    difficulty: "Fácil",
    rating: 4.5,
    description: "Dolina gigante que abriga centenas de araras-vermelhas, oferecendo um espetáculo natural único.",
    distance: "25 km",
    coordinates: "-21.2167, -56.5000",
    fullDescription: "O Buraco das Araras é uma dolina de 124 metros de diâmetro e 160 metros de profundidade, formada pelo desabamento do teto de uma antiga caverna. É o lar de centenas de araras-vermelhas e outras espécies da fauna do Cerrado.",
    curiosities: [
      "Abriga mais de 150 araras-vermelhas",
      "A dolina se formou há milhares de anos",
      "É possível ver 5 espécies de araras diferentes",
      "As araras saem ao amanhecer e retornam ao entardecer"
    ],
    tips: [
      "Melhor horário: 6h30 ou 17h30",
      "Leve binóculos para melhor observação",
      "Faça silêncio para não assustar as aves",
      "Use roupas de cores neutras"
    ],
    category: "Ecoturismo",
    price: "R$ 78,00"
  },
  {
    id: "estancia-mimosa",
    name: "Estância Mimosa",
    image: estanciaMimosa,
    photos: [estanciaMimosa, estanciaMimosa, estanciaMimosa],
    duration: "5h",
    activities: ["Trilha", "Banho de Cachoeira", "Observação da Fauna", "Turismo Rural"],
    difficulty: "Moderado",
    rating: 4.4,
    description: "Ecoturismo em fazenda preservada com trilhas, cachoeiras e rica biodiversidade do Cerrado.",
    distance: "35 km",
    coordinates: "-21.2833, -56.6167",
    fullDescription: "A Estância Mimosa é uma propriedade rural voltada ao ecoturismo sustentável. Oferece trilhas interpretativas pela mata nativa, banhos em cachoeiras naturais e a oportunidade de conhecer o manejo sustentável da propriedade.",
    curiosities: [
      "Possui 8 cachoeiras em sequência",
      "Área de preservação de 300 hectares",
      "Mais de 200 espécies de aves catalogadas",
      "Exemplo de turismo rural sustentável"
    ],
    tips: [
      "Use tênis de trekking",
      "Leve roupa de banho",
      "Protetor solar biodegradável",
      "Hidrate-se constantemente"
    ],
    category: "Ecoturismo",
    price: "R$ 168,00"
  },
  {
    id: "aquario-natural",
    name: "Aquário Natural",
    image: aquarioNatural,
    photos: [aquarioNatural, aquarioNatural, aquarioNatural],
    duration: "3h",
    activities: ["Flutuação", "Tirolesa", "Trilha", "Observação da Fauna"],
    difficulty: "Fácil",
    rating: 4.7,
    description: "Nascente cristalina do Rio Formoso, perfeita para flutuação e contemplação da vida aquática.",
    distance: "12 km",
    coordinates: "-21.0500, -56.5000",
    fullDescription: "O Aquário Natural é uma das nascentes mais bonitas do Rio Formoso. Suas águas cristalinas abrigam grande diversidade de peixes e plantas aquáticas, proporcionando uma experiência única de flutuação em ambiente natural preservado.",
    curiosities: [
      "Nascente principal do Rio Formoso",
      "Mais de 20 espécies de peixes catalogadas",
      "Água mantém temperatura de 26°C o ano todo",
      "Permite visualização subaquática de até 30 metros"
    ],
    tips: [
      "Ideal para famílias com crianças",
      "Combine com visita ao Eco Park",
      "Evite usar produtos químicos",
      "Melhor período: manhã"
    ],
    category: "Rio",
    price: "R$ 158,00"
  },
  {
    id: "lagoa-misteriosa",
    name: "Lagoa Misteriosa",
    image: lagoaMisteriosa,
    photos: [lagoaMisteriosa, lagoaMisteriosa, lagoaMisteriosa],
    duration: "3h",
    activities: ["Mergulho", "Flutuação", "Contemplação"],
    difficulty: "Moderado",
    rating: 4.3,
    description: "Lagoa de águas azul-turquesa com profundidade ainda não totalmente explorada.",
    distance: "28 km",
    coordinates: "-21.2000, -56.5500",
    fullDescription: "A Lagoa Misteriosa é uma das atrações mais enigmáticas de Bonito. Suas águas azul-turquesa escondem uma profundidade que já foi explorada até 220 metros, mas ainda não se conhece o fundo real. É possível fazer flutuação e mergulho credenciado.",
    curiosities: [
      "Profundidade conhecida: mais de 220 metros",
      "Águas com coloração azul-turquesa única",
      "Temperatura constante de 22°C",
      "Formação geológica ainda em estudo"
    ],
    tips: [
      "Necessário certificação para mergulho",
      "Flutuação disponível para todos",
      "Reserve com antecedência",
      "Combine com outros atrativos da região"
    ],
    category: "Mergulho",
    price: "R$ 245,00"
  },
  {
    id: "balneario-municipal",
    name: "Balneário Municipal",
    image: rioDaPrata, // Usando imagem similar
    photos: [rioDaPrata, rioDaPrata, rioDaPrata],
    duration: "Livre",
    activities: ["Banho", "Relaxamento", "Observação de Peixes", "Recreação"],
    difficulty: "Fácil",
    rating: 4.2,
    description: "Área de lazer pública às margens do Rio Formoso, ideal para famílias.",
    distance: "5 km",
    coordinates: "-21.1333, -56.4833",
    fullDescription: "O Balneário Municipal é uma área pública de lazer localizada às margens do Rio Formoso. Oferece infraestrutura básica para banho e recreação, sendo uma opção econômica para famílias conhecerem as águas cristalinas de Bonito.",
    curiosities: [
      "Única atração pública gratuita da cidade",
      "Águas do Rio Formoso",
      "Frequentado por famílias locais",
      "Infraestrutura simples mas funcional"
    ],
    tips: [
      "Leve lanches e bebidas",
      "Melhor horário: início da manhã",
      "Evite finais de semana lotados",
      "Combine com centro histórico"
    ],
    category: "Balneário",
    price: "Gratuito"
  },
  {
    id: "boca-da-onca",
    name: "Boca da Onça",
    image: estanciaMimosa, // Usando imagem similar de cachoeira
    photos: [estanciaMimosa, estanciaMimosa, estanciaMimosa],
    duration: "6h",
    activities: ["Trilha", "Rapel", "Cachoeiras", "Observação da Fauna"],
    difficulty: "Moderado",
    rating: 4.6,
    description: "Maior cachoeira de Mato Grosso do Sul com trilhas ecológicas e atividades radicais.",
    distance: "45 km",
    coordinates: "-21.3000, -56.6000",
    fullDescription: "O complexo Boca da Onça abriga a maior cachoeira de MS com 156 metros de altura. Oferece trilhas ecológicas, rapel na cachoeira e várias quedas d'água para banho. É um dos destinos mais completos para ecoturismo na região.",
    curiosities: [
      "Maior cachoeira de Mato Grosso do Sul",
      "Queda principal de 156 metros",
      "Mais de 4 trilhas diferentes",
      "Rica fauna e flora do Cerrado"
    ],
    tips: [
      "Use calçados apropriados para trilha",
      "Leve bastante água",
      "Protetor solar biodegradável",
      "Reserve dia inteiro"
    ],
    category: "Cachoeira",
    price: "R$ 178,00"
  }
];

export const getAttractionById = (id: string): Attraction | undefined => {
  return attractions.find(attraction => attraction.id === id);
};

export const getAttractionsByCategory = (category: string): Attraction[] => {
  return attractions.filter(attraction => attraction.category === category);
};

export const getFeaturedAttractions = (): Attraction[] => {
  return attractions.filter(attraction => attraction.rating >= 4.7);
};