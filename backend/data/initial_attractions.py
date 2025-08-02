from datetime import datetime
import uuid

def get_initial_attractions():
    """Return initial attractions data for database population"""
    
    attractions = [
        {
            "id": "gruta-lago-azul",
            "name": "Gruta do Lago Azul",
            "image": "https://images.unsplash.com/photo-1534447677712-7e5b1a9d9b4f",
            "photos": [
                "https://images.unsplash.com/photo-1534447677712-7e5b1a9d9b4f",
                "https://images.unsplash.com/photo-1574607383476-f517f260d30b",
                "https://images.unsplash.com/photo-1557750255-c76072a7aad1"
            ],
            "duration": "1h 30min",
            "activities": ["Caminhada", "Contemplação", "Fotografia"],
            "difficulty": "Fácil",
            "rating": 4.8,
            "description": "Uma das grutas mais famosas do Brasil, com um lago subterrâneo de águas azuis cristalinas.",
            "distance": "20 km",
            "coordinates": "-21.1167, -56.4833",
            "full_description": "A Gruta do Lago Azul é um dos cartões-postais de Bonito. A caverna calcária abriga um lago subterrâneo de águas cristalinas e coloração azul intensa, que varia conforme a incidência da luz solar. A descida até o lago é feita por uma trilha com degraus naturais e artificiais.",
            "curiosities": [
                "O lago tem 87 metros de profundidade",
                "A cor azul é causada pela absorção da luz solar",
                "Foram encontrados fósseis de preguiça gigante no local",
                "A gruta mantém temperatura constante de 18°C"
            ],
            "tips": [
                "Melhor horário para visitação: 7h às 9h",
                "Não é permitido tocar na água",
                "Use calçados antiderrapantes",
                "Leve agasalho, a temperatura é baixa"
            ],
            "category": "Gruta",
            "price": "R$ 75,00",
            "created_at": datetime.utcnow(),
            "updated_at": datetime.utcnow(),
            "is_active": True
        },
        {
            "id": "rio-da-prata",
            "name": "Rio da Prata",
            "image": "https://images.unsplash.com/photo-1573160813453-0df4a4792090",
            "photos": [
                "https://images.unsplash.com/photo-1573160813453-0df4a4792090",
                "https://images.unsplash.com/photo-1580267604631-e2d3b4f5d6e4",
                "https://images.unsplash.com/photo-1571770095285-40a32c9ee95d"
            ],
            "duration": "4h",
            "activities": ["Flutuação", "Snorkeling", "Trilha Ecológica", "Observação da Fauna"],
            "difficulty": "Fácil",
            "rating": 4.9,
            "description": "Rio de águas cristalinas perfeito para flutuação, com rica vida aquática e vegetação exuberante.",
            "distance": "15 km",
            "coordinates": "-21.0833, -56.5167",
            "full_description": "O Rio da Prata oferece uma das experiências de flutuação mais incríveis do mundo. Com águas cristalinas e temperatura constante, permite observar dezenas de espécies de peixes, plantas aquáticas e a rica biodiversidade do Pantanal. A atividade inclui trilha interpretativa pela mata ciliar.",
            "curiosities": [
                "Visibilidade da água chega a 50 metros",
                "Temperatura da água é constante: 22°C",
                "Abriga mais de 30 espécies de peixes",
                "As nascentes filtram a água através do calcário"
            ],
            "tips": [
                "Não use protetor solar ou repelente",
                "É obrigatório o uso de colete salva-vidas",
                "Não alimente os peixes",
                "Respeite a velocidade da correnteza"
            ],
            "category": "Rio",
            "price": "R$ 388,00",
            "created_at": datetime.utcnow(),
            "updated_at": datetime.utcnow(),
            "is_active": True
        },
        {
            "id": "abismo-anhumas",
            "name": "Abismo Anhumas",
            "image": "https://images.unsplash.com/photo-1519904981063-b0cf448d479e",
            "photos": [
                "https://images.unsplash.com/photo-1519904981063-b0cf448d479e",
                "https://images.unsplash.com/photo-1580267747235-d0a40f1b8a58",
                "https://images.unsplash.com/photo-1574607383476-f517f260d30b"
            ],
            "duration": "4h",
            "activities": ["Rapel", "Mergulho", "Flutuação", "Espeleologia"],
            "difficulty": "Difícil",
            "rating": 4.7,
            "description": "Caverna acessada por rapel de 72 metros, com lago subterrâneo cristalino e espeleotemas únicos.",
            "distance": "23 km",
            "coordinates": "-21.1500, -56.4667",
            "full_description": "O Abismo Anhumas é uma das experiências mais emocionantes de Bonito. O acesso se dá através de um rapel de 72 metros por uma dolina circular. No interior, um lago de águas cristalinas permite mergulho e flutuação entre impressionantes formações calcárias.",
            "curiosities": [
                "A dolina tem 162 metros de diâmetro na superfície",
                "O lago subterrâneo tem 80 metros de profundidade",
                "As estalactites levaram milhares de anos para se formar",
                "É o único local no Brasil para mergulho em caverna"
            ],
            "tips": [
                "Necessário agendamento antecipado",
                "Idade mínima: 12 anos",
                "Peso máximo: 120kg para rapel",
                "Leve máscara de mergulho própria"
            ],
            "category": "Aventura",
            "price": "R$ 850,00",
            "created_at": datetime.utcnow(),
            "updated_at": datetime.utcnow(),
            "is_active": True
        },
        {
            "id": "rio-sucuri",
            "name": "Rio Sucuri",
            "image": "https://images.unsplash.com/photo-1571770095285-40a32c9ee95d",
            "photos": [
                "https://images.unsplash.com/photo-1571770095285-40a32c9ee95d",
                "https://images.unsplash.com/photo-1573160813453-0df4a4792090",
                "https://images.unsplash.com/photo-1580267604631-e2d3b4f5d6e4"
            ],
            "duration": "3h",
            "activities": ["Flutuação", "Observação da Fauna", "Trilha", "Fotografia"],
            "difficulty": "Fácil",
            "rating": 4.6,
            "description": "Rio com águas transparentes, ideal para flutuação tranquila e observação da vida aquática.",
            "distance": "18 km",
            "coordinates": "-21.0667, -56.5333",
            "full_description": "O Rio Sucuri é conhecido por suas águas extremamente transparentes e flutuação tranquila. Com nascentes que brotam do calcário, oferece uma experiência única de contato com a natureza, onde é possível observar peixes, plantas aquáticas e a mata ciliar preservada.",
            "curiosities": [
                "O nome Sucuri vem da cobra que habita a região",
                "A água tem pH alcalino devido ao calcário",
                "Flutuação de 1,8 km rio abaixo",
                "Temperatura constante de 24°C"
            ],
            "tips": [
                "Ideal para iniciantes na flutuação",
                "Não é permitido usar nadadeiras",
                "Respeite a fauna aquática",
                "Siga sempre o guia credenciado"
            ],
            "category": "Rio",
            "price": "R$ 298,00",
            "created_at": datetime.utcnow(),
            "updated_at": datetime.utcnow(),
            "is_active": True
        },
        {
            "id": "buraco-das-araras",
            "name": "Buraco das Araras",
            "image": "https://images.unsplash.com/photo-1591280063332-45a3a15bcf47",
            "photos": [
                "https://images.unsplash.com/photo-1591280063332-45a3a15bcf47",
                "https://images.unsplash.com/photo-1571728480887-7e6c60b3ee1f",
                "https://images.unsplash.com/photo-1568459750992-6db4ac31c75c"
            ],
            "duration": "2h",
            "activities": ["Observação de Aves", "Trilha", "Fotografia", "Contemplação"],
            "difficulty": "Fácil",
            "rating": 4.5,
            "description": "Dolina gigante que abriga centenas de araras-vermelhas, oferecendo um espetáculo natural único.",
            "distance": "25 km",
            "coordinates": "-21.2167, -56.5000",
            "full_description": "O Buraco das Araras é uma dolina de 124 metros de diâmetro e 160 metros de profundidade, formada pelo desabamento do teto de uma antiga caverna. É o lar de centenas de araras-vermelhas e outras espécies da fauna do Cerrado.",
            "curiosities": [
                "Abriga mais de 150 araras-vermelhas",
                "A dolina se formou há milhares de anos",
                "É possível ver 5 espécies de araras diferentes",
                "As araras saem ao amanhecer e retornam ao entardecer"
            ],
            "tips": [
                "Melhor horário: 6h30 ou 17h30",
                "Leve binóculos para melhor observação",
                "Faça silêncio para não assustar as aves",
                "Use roupas de cores neutras"
            ],
            "category": "Ecoturismo",
            "price": "R$ 78,00",
            "created_at": datetime.utcnow(),
            "updated_at": datetime.utcnow(),
            "is_active": True
        },
        {
            "id": "boca-da-onca",
            "name": "Boca da Onça",
            "image": "https://images.unsplash.com/photo-1641823070017-bb8a52a5fd59?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Nzd8MHwxfHNlYXJjaHwxfHxib25pdG8lMjB3YXRlcmZhbGxzfGVufDB8fHx8MTc1Mzk5MTgyMXww&ixlib=rb-4.1.0&q=85",
            "photos": [
                "https://images.unsplash.com/photo-1641823070017-bb8a52a5fd59?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Nzd8MHwxfHNlYXJjaHwxfHxib25pdG8lMjB3YXRlcmZhbGxzfGVufDB8fHx8MTc1Mzk5MTgyMXww&ixlib=rb-4.1.0&q=85",
                "https://images.unsplash.com/photo-1543881131-20e6b1e7c81a?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Nzd8MHwxfHNlYXJjaHwzfHxib25pdG8lMjB3YXRlcmZhbGxzfGVufDB8fHx8MTc1Mzk5MTgyMXww&ixlib=rb-4.1.0&q=85",
                "https://images.unsplash.com/photo-1535392244477-7cb534eece28?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Nzd8MHwxfHNlYXJjaHw0fHxib25pdG8lMjB3YXRlcmZhbGxzfGVufDB8fHx8MTc1Mzk5MTgyMXww&ixlib=rb-4.1.0&q=85"
            ],
            "duration": "6h",
            "activities": ["Trilha", "Rapel", "Cachoeiras", "Observação da Fauna"],
            "difficulty": "Moderado",
            "rating": 4.6,
            "description": "Maior cachoeira de Mato Grosso do Sul com trilhas ecológicas e atividades radicais.",
            "distance": "45 km",
            "coordinates": "-21.3000, -56.6000",
            "full_description": "O complexo Boca da Onça abriga a maior cachoeira de MS com 156 metros de altura. Oferece trilhas ecológicas, rapel na cachoeira e várias quedas d'água para banho. É um dos destinos mais completos para ecoturismo na região.",
            "curiosities": [
                "Maior cachoeira de Mato Grosso do Sul",
                "Queda principal de 156 metros",
                "Mais de 4 trilhas diferentes",
                "Rica fauna e flora do Cerrado"
            ],
            "tips": [
                "Use calçados apropriados para trilha",
                "Leve bastante água",
                "Protetor solar biodegradável",
                "Reserve dia inteiro"
            ],
            "category": "Cachoeira",
            "price": "R$ 178,00",
            "created_at": datetime.utcnow(),
            "updated_at": datetime.utcnow(),
            "is_active": True
        }
    ]
    
    return attractions