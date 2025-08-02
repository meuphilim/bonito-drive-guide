from datetime import datetime
import uuid

def get_initial_attractions():
    """Return initial attractions data for database population"""
    
    attractions = [
        {
            "id": "nascente-azul",
            "name": "Nascente Azul",
            "image": "https://images.unsplash.com/photo-1573160813453-0df4a4792090",
            "photos": [
                "https://images.unsplash.com/photo-1573160813453-0df4a4792090",
                "https://images.unsplash.com/photo-1580267604631-e2d3b4f5d6e4",
                "https://images.unsplash.com/photo-1571770095285-40a32c9ee95d"
            ],
            "duration": "4h",
            "activities": ["Flutuação", "Trilha", "Tirolesa", "Caiaque"],
            "difficulty": "Fácil",
            "rating": 4.7,
            "description": "Fonte do Rio Bonito com infraestrutura completa: trilha curta seguida de flutuação em águas azuis-turquesa.",
            "distance": "30 km",
            "coordinates": "-21.1000, -56.5500",
            "full_description": "A Nascente Azul é a fonte do Rio Bonito, oferecendo uma experiência completa com trilha leve seguida de flutuação em águas cristalinas azuis-turquesa. O local conta com tirolesa, caiaque e restaurante, sendo ideal para todas as idades.",
            "curiosities": [
                "É a nascente do Rio Bonito",
                "Águas azuis-turquesa naturais",
                "Infraestrutura completa para famílias",
                "Atividades diversas disponíveis"
            ],
            "tips": [
                "Ideal para todas as idades",
                "Levar roupa de banho e toalha",
                "Máquina à prova d'água recomendada",
                "Infraestrutura completa disponível"
            ],
            "category": "Balneário",
            "price": "R$ 198,00",
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
            "activities": ["Flutuação", "Observação da Fauna", "Trilha"],
            "difficulty": "Fácil",
            "rating": 4.9,
            "description": "Fazenda São Geraldo: caminhada sobre passarela seguida de flutuação por 1,8 km em um dos rios mais cristalinos do mundo.",
            "distance": "19 km",
            "coordinates": "-21.0667, -56.5333",
            "full_description": "O Rio Sucuri oferece uma das experiências de flutuação mais incríveis, com águas ultra transparentes. A atividade inclui caminhada sobre passarela e flutuação de 1,8 km observando rica fauna e flora subaquáticas.",
            "curiosities": [
                "Um dos rios mais cristalinos do mundo",
                "Flutuação de 1,8 km",
                "Atendimento bilíngue disponível",
                "Rica biodiversidade aquática"
            ],
            "tips": [
                "Crianças a partir de 6 anos",
                "Usar protetor solar",
                "Sapato para água obrigatório",
                "Levar câmera subaquática"
            ],
            "category": "Rio",
            "price": "R$ 298,00",
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
            "duration": "5h",
            "activities": ["Flutuação", "Almoço Pantaneiro", "Observação da Fauna"],
            "difficulty": "Fácil",
            "rating": 4.9,
            "description": "Longa descida de flutuação que inclui almoço pantaneiro, rica biodiversidade e receptivo com redário e restaurante.",
            "distance": "55 km",
            "coordinates": "-21.0833, -56.5167",
            "full_description": "O Rio da Prata oferece uma experiência completa de flutuação com almoço pantaneiro incluso. A rica biodiversidade permite observar grande variedade de peixes em plena imersão aquática.",
            "curiosities": [
                "Almoço pantaneiro incluso",
                "Grande variedade de peixes",
                "Receptivo com redário",
                "Rica biodiversidade aquática"
            ],
            "tips": [
                "Levar câmera subaquática",
                "Protetor solar obrigatório",
                "Experiência de dia inteiro",
                "Almoço incluso no passeio"
            ],
            "category": "Rio",
            "price": "R$ 388,00",
            "created_at": datetime.utcnow(),
            "updated_at": datetime.utcnow(),
            "is_active": True
        },
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
            "description": "Paisagem de cartão-postal: câmara subterrânea com lago azul intenso e fósseis de megafauna do Pleistoceno.",
            "distance": "10 km",
            "coordinates": "-21.1167, -56.4833",
            "full_description": "A Gruta do Lago Azul é um dos cartões-postais de Bonito. A caverna calcária abriga um lago subterrâneo de águas cristalinas e coloração azul intensa, com fósseis pré-históricos da megafauna do Pleistoceno.",
            "curiosities": [
                "Lago azul intenso único",
                "Fósseis de megafauna do Pleistoceno",
                "Descida guiada segura",
                "Temperatura constante de 18°C"
            ],
            "tips": [
                "Calçado fechado obrigatório",
                "Passeio não permite banho",
                "Melhor horário: manhã",
                "Leve agasalho para temperatura baixa"
            ],
            "category": "Gruta",
            "price": "R$ 75,00",
            "created_at": datetime.utcnow(),
            "updated_at": datetime.utcnow(),
            "is_active": True
        },
        {
            "id": "gruta-sao-miguel",
            "name": "Gruta de São Miguel",
            "image": "https://images.unsplash.com/photo-1574607383476-f517f260d30b",
            "photos": [
                "https://images.unsplash.com/photo-1574607383476-f517f260d30b",
                "https://images.unsplash.com/photo-1534447677712-7e5b1a9d9b4f",
                "https://images.unsplash.com/photo-1557750255-c76072a7aad1"
            ],
            "duration": "1h 30min",
            "activities": ["Trilha Suspensa", "Contemplação", "Interpretação Ambiental"],
            "difficulty": "Fácil",
            "rating": 4.6,
            "description": "Passeio interpretativo em trilha suspensa, com formações calcárias e explicação sobre o ecossistema e espeleotemas.",
            "distance": "10 km",
            "coordinates": "-21.1200, -56.4800",
            "full_description": "A Gruta de São Miguel oferece um passeio interpretativo único em passarela elevada, permitindo observar estalactites, estalagmites e compreender o ecossistema subterrâneo.",
            "curiosities": [
                "Passarela elevada para proteção",
                "Estalactites e estalagmites impressionantes",
                "Passeio interpretativo educativo",
                "Formações calcárias milenares"
            ],
            "tips": [
                "Recomendado para todas as idades",
                "Ótima opção em dias de chuva",
                "Trilha acessível",
                "Experiência educativa"
            ],
            "category": "Gruta",
            "price": "R$ 65,00",
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
            "activities": ["Observação de Aves", "Trilha", "Fotografia"],
            "difficulty": "Fácil",
            "rating": 4.5,
            "description": "Dolina de ~100 m de profundidade, habitat de araras-vermelhas e aves tropicais em trilha com mirantes.",
            "distance": "54 km",
            "coordinates": "-21.2167, -56.5000",
            "full_description": "O Buraco das Araras é uma dolina natural que serve de habitat para araras-vermelhas e diversas aves tropicais. A trilha leve leva a mirantes com vista panorâmica espetacular.",
            "curiosities": [
                "Dolina natural de 100m de profundidade",
                "Habitat natural de araras-vermelhas",
                "Mirantes com vista panorâmica",
                "Diversas espécies de aves tropicais"
            ],
            "tips": [
                "Leve binóculos para melhor observação",
                "Visite ao amanhecer ou fim de tarde",
                "Trilha leve e acessível",
                "Silêncio para não assustar as aves"
            ],
            "category": "Ecoturismo",
            "price": "R$ 78,00",
            "created_at": datetime.utcnow(),
            "updated_at": datetime.utcnow(),
            "is_active": True
        },
        {
            "id": "estancia-mimosa",
            "name": "Estância Mimosa",
            "image": "https://images.unsplash.com/photo-1641823070017-bb8a52a5fd59",
            "photos": [
                "https://images.unsplash.com/photo-1641823070017-bb8a52a5fd59",
                "https://images.unsplash.com/photo-1543881131-20e6b1e7c81a",
                "https://images.unsplash.com/photo-1535392244477-7cb534eece28"
            ],
            "duration": "4h",
            "activities": ["Cachoeiras", "Trilha", "Banho", "Almoço Regional"],
            "difficulty": "Fácil",
            "rating": 4.6,
            "description": "Fazenda com trilhas que passam por cachoeiras de até 15 m, piscinas naturais e restaurante rústico.",
            "distance": "24 km",
            "coordinates": "-21.1500, -56.5200",
            "full_description": "A Estância Mimosa oferece trilhas seguras que passam por diversas cachoeiras com até 15 metros de altura, piscinas naturais para banho e restaurante com almoço regional.",
            "curiosities": [
                "Cachoeiras de até 15 metros",
                "Piscinas naturais para banho",
                "Trilhas seguras e bem sinalizadas",
                "Restaurante rústico com comida regional"
            ],
            "tips": [
                "Levar óculos de mergulho",
                "Tênis extra recomendado",
                "Trilhas seguras para famílias",
                "Almoço regional disponível"
            ],
            "category": "Cachoeira",
            "price": "R$ 178,00",
            "created_at": datetime.utcnow(),
            "updated_at": datetime.utcnow(),
            "is_active": True
        },
        {
            "id": "boca-da-onca",
            "name": "Boca da Onça Ecotour",
            "image": "https://images.unsplash.com/photo-1641823070017-bb8a52a5fd59",
            "photos": [
                "https://images.unsplash.com/photo-1641823070017-bb8a52a5fd59",
                "https://images.unsplash.com/photo-1543881131-20e6b1e7c81a",
                "https://images.unsplash.com/photo-1535392244477-7cb534eece28"
            ],
            "duration": "6h",
            "activities": ["Rapel", "Cachoeiras", "Trilha", "Contemplação"],
            "difficulty": "Moderado",
            "rating": 4.7,
            "description": "Complexo com 12 cachoeiras e rapel em plataforma de 90 m, incluindo a maior cachoeira do MS (156 m).",
            "distance": "60 km",
            "coordinates": "-21.3000, -56.6000",
            "full_description": "O complexo Boca da Onça oferece 12 cachoeiras diferentes, incluindo a maior cachoeira de MS com 156 metros. O rapel opcional em plataforma de 90m proporciona vista espetacular do cânion.",
            "curiosities": [
                "Maior cachoeira de MS (156m)",
                "Complexo com 12 cachoeiras",
                "Rapel opcional de 90m",
                "Vista espetacular do cânion"
            ],
            "tips": [
                "Rapel com restrição de peso/idade",
                "Calçado fechado indispensável",
                "Reserve dia inteiro",
                "Preparo físico recomendado"
            ],
            "category": "Aventura",
            "price": "R$ 850,00",
            "created_at": datetime.utcnow(),
            "updated_at": datetime.utcnow(),
            "is_active": True
        },
        {
            "id": "aquario-natural",
            "name": "Aquário Natural",
            "image": "https://images.unsplash.com/photo-1573160813453-0df4a4792090",
            "photos": [
                "https://images.unsplash.com/photo-1573160813453-0df4a4792090",
                "https://images.unsplash.com/photo-1580267604631-e2d3b4f5d6e4",
                "https://images.unsplash.com/photo-1571770095285-40a32c9ee95d"
            ],
            "duration": "2h 30min",
            "activities": ["Flutuação", "Trilha Suspensa", "Observação da Fauna"],
            "difficulty": "Fácil",
            "rating": 4.5,
            "description": "Flutuação em trecho de rio com fauna abundante após trilha suspensa, ideal para iniciantes e famílias.",
            "distance": "7 km",
            "coordinates": "-21.0500, -56.4700",
            "full_description": "O Aquário Natural oferece flutuação leve em trecho de rio com fauna abundante, precedida por trilha suspensa. Ideal para iniciantes e famílias, com fauna visível e atividades recreativas.",
            "curiosities": [
                "Ideal para iniciantes",
                "Fauna abundante e visível",
                "Trilha suspensa educativa",
                "Atividades recreativas"
            ],
            "tips": [
                "Ótimo para crianças",
                "Colete e neoprene fornecidos",
                "Flutuação orientada",
                "Equipamentos inclusos"
            ],
            "category": "Rio",
            "price": "R$ 188,00",
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
            "activities": ["Rapel", "Mergulho", "Passeio de Bote"],
            "difficulty": "Difícil",
            "rating": 4.8,
            "description": "Rapel de 72 m por abertura estreita até caverna submersa, com passeio de bote e mergulho em águas cristalinas.",
            "distance": "25 km",
            "coordinates": "-21.1500, -56.4667",
            "full_description": "O Abismo Anhumas oferece experiência única com rapel técnico de 72 metros por abertura estreita até caverna submersa. Inclui passeio de bote e mergulho com cilindro em águas cristalinas.",
            "curiosities": [
                "Rapel técnico de 72 metros",
                "Caverna submersa única",
                "Mergulho com cilindro",
                "Abertura estreita desafiadora"
            ],
            "tips": [
                "Pré-agendamento obrigatório",
                "Preparo físico recomendável",
                "Idade mínima: 12 anos",
                "Peso máximo: 120kg"
            ],
            "category": "Aventura",
            "price": "R$ 950,00",
            "created_at": datetime.utcnow(),
            "updated_at": datetime.utcnow(),
            "is_active": True
        }
    ]
    
    return attractions