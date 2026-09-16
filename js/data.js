// Dados gerados automaticamente: personagens, animações e cenário
const GAME_DATA = {
  "characters": {
    "ryu": {
      "id": "ryu",
      "name": "Ryu",
      "color": "#e0501c",
      "bio": "Um lutador disciplinado que treina há anos em busca do título mundial.",
      "portrait": "game/assets/sprites/ryu/portrait.png",
      "sfx": { "pitch": 1.0, "tone": "sawtooth" },
      "animScale": {
        "idle": 1.0345,
        "walk": 1.0,
        "crouch": 1.1915,
        "block": 1.2542,
        "ko": 1.2632,
        "hit_horizontal": 1.0251,
        "hit_vertical": 1.0325,
        "jump": 1.1715,
        "punch_horizontal": 1.021,
        "punch_vertical": 1.0214
      },
      "anims": {
        "idle": {
          "file": "game/assets/sprites/ryu/idle.png",
          "frameWidth": 280,
          "frameHeight": 360,
          "frameCount": 2,
          "durations": [
            100,
            100
          ]
        },
        "walk": {
          "file": "game/assets/sprites/ryu/walk.png",
          "frameWidth": 299,
          "frameHeight": 360,
          "frameCount": 10,
          "durations": [
            70,
            70,
            70,
            70,
            70,
            70,
            70,
            70,
            70,
            70
          ]
        },
        "crouch": {
          "file": "game/assets/sprites/ryu/crouch.png",
          "frameWidth": 317,
          "frameHeight": 360,
          "frameCount": 7,
          "durations": [
            100,
            100,
            100,
            100,
            100,
            100,
            100
          ]
        },
        "block": {
          "file": "game/assets/sprites/ryu/block.png",
          "frameWidth": 299,
          "frameHeight": 360,
          "frameCount": 6,
          "durations": [
            100,
            100,
            100,
            100,
            100,
            100
          ]
        },
        "ko": {
          "file": "game/assets/sprites/ryu/ko.png",
          "frameWidth": 303,
          "frameHeight": 360,
          "frameCount": 7,
          "durations": [
            100,
            100,
            100,
            100,
            100,
            100,
            100
          ]
        },
        "hit_horizontal": {
          "file": "game/assets/sprites/ryu/hit_horizontal.png",
          "frameWidth": 317,
          "frameHeight": 360,
          "frameCount": 2,
          "durations": [
            100,
            100
          ]
        },
        "hit_vertical": {
          "file": "game/assets/sprites/ryu/hit_vertical.png",
          "frameWidth": 331,
          "frameHeight": 360,
          "frameCount": 2,
          "durations": [
            100,
            100
          ]
        },
        "jump": {
          "file": "game/assets/sprites/ryu/jump.png",
          "frameWidth": 307,
          "frameHeight": 360,
          "frameCount": 11,
          "durations": [
            100,
            100,
            100,
            100,
            100,
            100,
            100,
            100,
            100,
            100,
            100
          ]
        },
        "punch_horizontal": {
          "file": "game/assets/sprites/ryu/punch_horizontal.png",
          "frameWidth": 407,
          "frameHeight": 360,
          "frameCount": 5,
          "durations": [
            100,
            100,
            100,
            100,
            100
          ]
        },
        "punch_vertical": {
          "file": "game/assets/sprites/ryu/punch_vertical.png",
          "frameWidth": 479,
          "frameHeight": 360,
          "frameCount": 5,
          "durations": [
            100,
            100,
            100,
            100,
            100
          ]
        }
      },
      "story": {
        "subtitle": "O homem que luta para não se tornar aquilo que odeia",
        "intro": "Ryu cresceu na costa do Japão, filho do pescador Kenji Takamura e da professora Aiko. Aprendeu a lutar não por orgulho, mas para proteger quem ama — sua irmã Hana e a memória de um pai que escondia um passado obscuro.",
        "sequence": [
          {
            "opponent": "thunder",
            "chapter": "Capítulo 1 — Cinzas do porto",
            "text": "Aos 15 anos, um incêndio no porto quase destruiu sua família; seu pai saiu com o braço mutilado ao salvá-lo. Culpando-se por não ser forte o bastante, Ryu abandonou a escola e passou a treinar como um obcecado — e ouviu, pela primeira vez, o nome de um lutador americano chamado Thunder, ligado à mesma sombra que perseguia seu pai."
          },
          {
            "opponent": "ivan",
            "chapter": "Capítulo 2 — O primeiro ringue",
            "text": "Aos 17 anos, Ryu venceu seus primeiros torneios clandestinos e passou a sustentar a família. Quando se recusou a perder uma luta combinada, foi brutalmente espancado — e aprendeu, com seu mestre Daichi, que a força só tem valor quando se sabe a hora de recuar."
          },
          {
            "opponent": "luna",
            "chapter": "Capítulo 3 — O homem da cicatriz",
            "text": "Um lutador misterioso chamado Kurogane reconheceu, no estilo de Ryu, técnicas que Daichi jamais havia ensinado. A descoberta abriu uma fissura: seu pai escondia um passado de lutas organizadas pela Ordem da Coroa — e de jovens usados como cobaias."
          },
          {
            "opponent": "eltoro",
            "chapter": "Capítulo 4 — A Ordem da Coroa",
            "text": "Kenji finalmente confessou: décadas atrás, abandonara aquele mundo ao ver o que faziam com lutadores como ele. Ryu descobriu que o torneio internacional era, na verdade, uma armadilha da Ordem para reunir seis nomes — o dele entre eles."
          },
          {
            "opponent": "leonie",
            "chapter": "Capítulo 5 — A força que escolhi",
            "text": "Diante de um inimigo enviado pela Ordem, Ryu teve a chance de encerrar tudo com um golpe fatal. Não o fez. Finalmente entendeu o que o pai tentara lhe ensinar desde criança: força não existe para destruir — existe para que ninguém mais precise ser destruído."
          }
        ],
        "ending": "Ryu venceu o torneio e recusou a proposta da Ordem da Coroa para descobrir toda a verdade sobre seu passado. Voltou para casa, para o porto, para a família. Sua jornada não terminou — apenas começou a fazer sentido."
      }
    },
    "thunder": {
      "id": "thunder",
      "name": "Thunder",
      "color": "#2255dd",
      "bio": "Rápido como um raio, golpeia antes que o adversário perceba.",
      "portrait": "game/assets/sprites/thunder/portrait.png",
      "sfx": { "pitch": 1.28, "tone": "square" },
      "animScale": {
        "idle": 1.015,
        "walk": 1.0879,
        "crouch": 1.0687,
        "block": 1.17,
        "ko": 1.1594,
        "hit_horizontal": 1.0142,
        "hit_vertical": 1.0142,
        "jump": 1.0566,
        "punch_horizontal": 1.0,
        "punch_vertical": 1.0142
      },
      "anims": {
        "idle": {
          "file": "game/assets/sprites/thunder/idle.png",
          "frameWidth": 423,
          "frameHeight": 360,
          "frameCount": 2,
          "durations": [
            100,
            100
          ]
        },
        "walk": {
          "file": "game/assets/sprites/thunder/walk.png",
          "frameWidth": 305,
          "frameHeight": 360,
          "frameCount": 10,
          "durations": [
            70,
            70,
            70,
            70,
            70,
            70,
            70,
            70,
            70,
            70
          ]
        },
        "crouch": {
          "file": "game/assets/sprites/thunder/crouch.png",
          "frameWidth": 395,
          "frameHeight": 360,
          "frameCount": 7,
          "durations": [
            100,
            100,
            100,
            100,
            100,
            100,
            100
          ]
        },
        "block": {
          "file": "game/assets/sprites/thunder/block.png",
          "frameWidth": 255,
          "frameHeight": 360,
          "frameCount": 6,
          "durations": [
            100,
            100,
            100,
            100,
            100,
            100
          ]
        },
        "ko": {
          "file": "game/assets/sprites/thunder/ko.png",
          "frameWidth": 273,
          "frameHeight": 360,
          "frameCount": 7,
          "durations": [
            100,
            100,
            100,
            100,
            100,
            100,
            100
          ]
        },
        "hit_horizontal": {
          "file": "game/assets/sprites/thunder/hit_horizontal.png",
          "frameWidth": 239,
          "frameHeight": 360,
          "frameCount": 2,
          "durations": [
            100,
            100
          ]
        },
        "hit_vertical": {
          "file": "game/assets/sprites/thunder/hit_vertical.png",
          "frameWidth": 385,
          "frameHeight": 360,
          "frameCount": 2,
          "durations": [
            100,
            100
          ]
        },
        "jump": {
          "file": "game/assets/sprites/thunder/jump.png",
          "frameWidth": 313,
          "frameHeight": 360,
          "frameCount": 11,
          "durations": [
            100,
            100,
            100,
            100,
            100,
            100,
            100,
            100,
            100,
            100,
            100
          ]
        },
        "punch_horizontal": {
          "file": "game/assets/sprites/thunder/punch_horizontal.png",
          "frameWidth": 425,
          "frameHeight": 360,
          "frameCount": 6,
          "durations": [
            100,
            100,
            100,
            100,
            100,
            100
          ]
        },
        "punch_vertical": {
          "file": "game/assets/sprites/thunder/punch_vertical.png",
          "frameWidth": 295,
          "frameHeight": 360,
          "frameCount": 5,
          "durations": [
            100,
            100,
            100,
            100,
            100
          ]
        }
      },
      "story": {
        "subtitle": "O homem que aprendeu que força não significa invulnerabilidade",
        "intro": "Marcus \"Thunder\" Washington cresceu num bairro difícil de Detroit, filho do policial James Washington e da enfermeira Maria. Impulsivo desde pequeno, descobriu no boxe um jeito de transformar raiva em propósito.",
        "sequence": [
          {
            "opponent": "luna",
            "chapter": "Capítulo 1 — Acusação",
            "text": "James foi acusado injustamente de corrupção. Recusando-se a acreditar, Thunder começou a investigar por conta própria — e encontrou o rastro de uma empresa que financiava torneios clandestinos, ligada a uma organização chamada Ordem da Coroa."
          },
          {
            "opponent": "ryu",
            "chapter": "Capítulo 2 — O gigante",
            "text": "Perder pela primeira vez, contra um adversário muito maior, ensinou Thunder a lutar com estratégia — não apenas com força. Foi o momento em que deixou de ser apenas forte para se tornar, de fato, um lutador."
          },
          {
            "opponent": "ivan",
            "chapter": "Capítulo 3 — O infiltrado",
            "text": "A verdade sobre James veio à tona: ele trabalhava disfarçado dentro da Ordem, tentando destruí-la por dentro. Pouco depois, desapareceu sem deixar rastro — e Thunder passou anos convencido de que o haviam matado."
          },
          {
            "opponent": "eltoro",
            "chapter": "Capítulo 4 — O arquivo",
            "text": "Em um arquivo roubado da Ordem, Thunder encontrou uma lista de seis nomes. Dois deles chamaram sua atenção: Luna Ferreira, do Brasil, e Leonie Adler, da Alemanha. Ele não era o único alvo daquela organização."
          },
          {
            "opponent": "leonie",
            "chapter": "Capítulo 5 — Não sou meu pai",
            "text": "A Ordem ofereceu a Thunder revelar o paradeiro de James em troca de sua lealdade. Ele quase aceitou — até perceber que estava prestes a se tornar exatamente aquilo que sempre odiara."
          }
        ],
        "ending": "Thunder descobriu, por fim, que o pai estava vivo e escondido. A mensagem que James deixou foi simples: só se luta de verdade quando se luta por algo maior que a própria raiva. Thunder seguiu em frente — não apenas por James, mas por todos que a Ordem já destruiu."
      }
    },
    "ivan": {
      "id": "ivan",
      "name": "Ivan",
      "color": "#7fb3c7",
      "bio": "Frio e calculista, um verdadeiro bloco de gelo dentro do ringue.",
      "portrait": "game/assets/sprites/ivan/portrait.png",
      "sfx": { "pitch": 0.72, "tone": "sawtooth" },
      "animScale": {
        "idle": 1.0,
        "walk": 1.0788,
        "crouch": 1.0,
        "block": 1.0534,
        "ko": 1.0084,
        "hit_horizontal": 1.0,
        "hit_vertical": 1.0,
        "jump": 1.0,
        "punch_horizontal": 1.021,
        "punch_vertical": 1.0
      },
      "anims": {
        "idle": {
          "file": "game/assets/sprites/ivan/idle.png",
          "frameWidth": 351,
          "frameHeight": 360,
          "frameCount": 2,
          "durations": [
            100,
            100
          ]
        },
        "walk": {
          "file": "game/assets/sprites/ivan/walk.png",
          "frameWidth": 369,
          "frameHeight": 360,
          "frameCount": 10,
          "durations": [
            70,
            70,
            70,
            70,
            70,
            70,
            70,
            70,
            70,
            70
          ]
        },
        "crouch": {
          "file": "game/assets/sprites/ivan/crouch.png",
          "frameWidth": 307,
          "frameHeight": 360,
          "frameCount": 7,
          "durations": [
            100,
            100,
            100,
            100,
            100,
            100,
            100
          ]
        },
        "block": {
          "file": "game/assets/sprites/ivan/block.png",
          "frameWidth": 281,
          "frameHeight": 360,
          "frameCount": 6,
          "durations": [
            100,
            100,
            100,
            100,
            100,
            100
          ]
        },
        "ko": {
          "file": "game/assets/sprites/ivan/ko.png",
          "frameWidth": 319,
          "frameHeight": 360,
          "frameCount": 7,
          "durations": [
            100,
            100,
            100,
            100,
            100,
            100,
            100
          ]
        },
        "hit_horizontal": {
          "file": "game/assets/sprites/ivan/hit_horizontal.png",
          "frameWidth": 487,
          "frameHeight": 360,
          "frameCount": 2,
          "durations": [
            100,
            100
          ]
        },
        "hit_vertical": {
          "file": "game/assets/sprites/ivan/hit_vertical.png",
          "frameWidth": 523,
          "frameHeight": 360,
          "frameCount": 2,
          "durations": [
            100,
            100
          ]
        },
        "jump": {
          "file": "game/assets/sprites/ivan/jump.png",
          "frameWidth": 411,
          "frameHeight": 360,
          "frameCount": 11,
          "durations": [
            100,
            100,
            100,
            100,
            100,
            100,
            100,
            100,
            100,
            100,
            100
          ]
        },
        "punch_horizontal": {
          "file": "game/assets/sprites/ivan/punch_horizontal.png",
          "frameWidth": 417,
          "frameHeight": 360,
          "frameCount": 5,
          "durations": [
            100,
            100,
            100,
            100,
            100
          ]
        },
        "punch_vertical": {
          "file": "game/assets/sprites/ivan/punch_vertical.png",
          "frameWidth": 473,
          "frameHeight": 360,
          "frameCount": 6,
          "durations": [
            100,
            100,
            100,
            100,
            100,
            100
          ]
        }
      },
      "story": {
        "subtitle": "O homem que queria provar que não era uma arma",
        "intro": "Ivan Petrov nasceu numa pequena cidade russa, filho de dois ex-atletas que faziam da vitória uma obrigação. Só a irmã, Katya, o via como algo além de um troféu.",
        "sequence": [
          {
            "opponent": "eltoro",
            "chapter": "Capítulo 1 — A primeira rachadura",
            "text": "Depois de humilhado por perder uma competição infantil, Ivan viu, pela primeira vez, alguém enfrentar seu pai: a própria Katya. Foi o início de uma fenda na autoridade de Sergei."
          },
          {
            "opponent": "ryu",
            "chapter": "Capítulo 2 — Projeto Ímpeto",
            "text": "Sergei aceitou dinheiro de uma organização para submeter o filho a um treinamento experimental. A força de Ivan cresceu de forma anormal — e sua saúde começou a pagar o preço."
          },
          {
            "opponent": "thunder",
            "chapter": "Capítulo 3 — O Martelo Russo",
            "text": "Katya ajudou Ivan a fugir de casa. Ele se tornou lutador profissional e ganhou um apelido que odiava: o Martelo Russo. Não queria ser uma arma — queria apenas ser deixado em paz."
          },
          {
            "opponent": "luna",
            "chapter": "Capítulo 4 — O diário",
            "text": "Katya morreu em um acidente que Ivan sempre suspeitou não ter sido acidente. No diário que ela deixou, encontrou provas de que investigava a mesma organização — e de que outros cinco lutadores estavam na mira dela."
          },
          {
            "opponent": "leonie",
            "chapter": "Capítulo 5 — Pai e filho",
            "text": "Ivan finalmente enfrentou o próprio pai, que dizia ter criado o lutador perfeito. A resposta de Ivan foi definitiva: \"Você criou um filho. Só esqueceu de tratá-lo como filho.\""
          }
        ],
        "ending": "Ivan derrotou Sergei sem matá-lo, entendendo enfim o que Katya sempre quis para ele: liberdade. Ele entrou no torneio não para provar que era forte — mas para provar que nenhuma organização decide quem ele deve ser."
      }
    },
    "luna": {
      "id": "luna",
      "name": "Luna",
      "color": "#a020c0",
      "bio": "Guiada pela intuição, luta sob a luz da lua com precisão letal.",
      "portrait": "game/assets/sprites/luna/portrait.png",
      "sfx": { "pitch": 1.18, "tone": "triangle" },
      "animScale": {
        "idle": 1.0305,
        "walk": 1.0359,
        "crouch": 1.0332,
        "block": 1.1562,
        "ko": 1.0619,
        "hit_horizontal": 1.04,
        "hit_vertical": 1.04,
        "jump": 1.0332,
        "punch_horizontal": 1.0104,
        "punch_vertical": 1.04
      },
      "anims": {
        "idle": {
          "file": "game/assets/sprites/luna/idle.png",
          "frameWidth": 385,
          "frameHeight": 360,
          "frameCount": 2,
          "durations": [
            100,
            100
          ]
        },
        "walk": {
          "file": "game/assets/sprites/luna/walk.png",
          "frameWidth": 352,
          "frameHeight": 360,
          "frameCount": 10,
          "durations": [
            70,
            70,
            70,
            70,
            70,
            70,
            70,
            70,
            70,
            70
          ]
        },
        "crouch": {
          "file": "game/assets/sprites/luna/crouch.png",
          "frameWidth": 365,
          "frameHeight": 360,
          "frameCount": 7,
          "durations": [
            100,
            100,
            100,
            100,
            100,
            100,
            100
          ]
        },
        "block": {
          "file": "game/assets/sprites/luna/block.png",
          "frameWidth": 367,
          "frameHeight": 360,
          "frameCount": 6,
          "durations": [
            100,
            100,
            100,
            100,
            100,
            100
          ]
        },
        "ko": {
          "file": "game/assets/sprites/luna/ko.png",
          "frameWidth": 370,
          "frameHeight": 360,
          "frameCount": 7,
          "durations": [
            100,
            100,
            100,
            100,
            100,
            100,
            100
          ]
        },
        "hit_horizontal": {
          "file": "game/assets/sprites/luna/hit_horizontal.png",
          "frameWidth": 323,
          "frameHeight": 360,
          "frameCount": 2,
          "durations": [
            100,
            100
          ]
        },
        "hit_vertical": {
          "file": "game/assets/sprites/luna/hit_vertical.png",
          "frameWidth": 323,
          "frameHeight": 360,
          "frameCount": 2,
          "durations": [
            100,
            100
          ]
        },
        "jump": {
          "file": "game/assets/sprites/luna/jump.png",
          "frameWidth": 463,
          "frameHeight": 360,
          "frameCount": 11,
          "durations": [
            100,
            100,
            100,
            100,
            100,
            100,
            100,
            100,
            100,
            100,
            100
          ]
        },
        "punch_horizontal": {
          "file": "game/assets/sprites/luna/punch_horizontal.png",
          "frameWidth": 417,
          "frameHeight": 360,
          "frameCount": 5,
          "durations": [
            100,
            100,
            100,
            100,
            100
          ]
        },
        "punch_vertical": {
          "file": "game/assets/sprites/luna/punch_vertical.png",
          "frameWidth": 369,
          "frameHeight": 360,
          "frameCount": 5,
          "durations": [
            100,
            100,
            100,
            100,
            100
          ]
        }
      },
      "story": {
        "subtitle": "A garota que transformou a dor em esperança",
        "intro": "Luna Ferreira cresceu dentro da academia de boxe do pai, no Rio de Janeiro, sonhando em lutar como a irmã mais velha, Bia. O que parecia rivalidade saudável escondia um destino perigoso.",
        "sequence": [
          {
            "opponent": "leonie",
            "chapter": "Capítulo 1 — O incêndio",
            "text": "Um incêndio destruiu a academia da família e deixou o pai, Rafael, gravemente ferido. Luna carregou a culpa por anos — até descobrir que o fogo não foi acidente."
          },
          {
            "opponent": "ryu",
            "chapter": "Capítulo 2 — A verdade",
            "text": "Rafael havia recusado o dinheiro de uma empresa suspeita e descoberto informações sobre uma organização chamada Ordem da Coroa. O incêndio foi a resposta deles."
          },
          {
            "opponent": "thunder",
            "chapter": "Capítulo 3 — Bia desaparece",
            "text": "Bia desapareceu em busca de respostas sozinha. Luna passou a ter duas missões: encontrar a irmã e descobrir quem destruiu sua família — e encontrou, no caminho, um aliado inesperado chamado Thunder."
          },
          {
            "opponent": "ivan",
            "chapter": "Capítulo 4 — As duas irmãs",
            "text": "Ao reencontrar Bia, Luna fez uma descoberta dolorosa: a irmã trabalhava para a própria Ordem, acreditando que a organização podia devolver tudo o que a família perdera."
          },
          {
            "opponent": "eltoro",
            "chapter": "Capítulo 5 — Reconstruir",
            "text": "Diante do representante máximo da Ordem, Luna entendeu que não lutava mais só por vingança — lutava para construir algo novo a partir dos escombros."
          }
        ],
        "ending": "Depois da vitória, Luna reconstruiu a academia da família ao lado de Bia. Na parede, escreveu uma frase que resume tudo o que aprendeu: \"Ninguém nasce forte. A gente aprende a levantar.\""
      }
    },
    "eltoro": {
      "id": "eltoro",
      "name": "El Toro",
      "color": "#d0a020",
      "bio": "Força bruta e resistência: El Toro avança sem parar.",
      "portrait": "game/assets/sprites/eltoro/portrait.png",
      "sfx": { "pitch": 0.62, "tone": "sawtooth" },
      "animScale": {
        "idle": 1.0037,
        "walk": 1.0569,
        "crouch": 1.0332,
        "block": 1.0,
        "ko": 1.0213,
        "hit_horizontal": 1.0,
        "hit_vertical": 1.0,
        "jump": 1.0332,
        "punch_horizontal": 1.021,
        "punch_vertical": 1.0
      },
      "anims": {
        "idle": {
          "file": "game/assets/sprites/eltoro/idle.png",
          "frameWidth": 313,
          "frameHeight": 360,
          "frameCount": 2,
          "durations": [
            100,
            100
          ]
        },
        "walk": {
          "file": "game/assets/sprites/eltoro/walk.png",
          "frameWidth": 443,
          "frameHeight": 360,
          "frameCount": 10,
          "durations": [
            70,
            70,
            70,
            70,
            70,
            70,
            70,
            70,
            70,
            70
          ]
        },
        "crouch": {
          "file": "game/assets/sprites/eltoro/crouch.png",
          "frameWidth": 429,
          "frameHeight": 360,
          "frameCount": 7,
          "durations": [
            100,
            100,
            100,
            100,
            100,
            100,
            100
          ]
        },
        "block": {
          "file": "game/assets/sprites/eltoro/block.png",
          "frameWidth": 259,
          "frameHeight": 360,
          "frameCount": 6,
          "durations": [
            100,
            100,
            100,
            100,
            100,
            100
          ]
        },
        "ko": {
          "file": "game/assets/sprites/eltoro/ko.png",
          "frameWidth": 283,
          "frameHeight": 360,
          "frameCount": 7,
          "durations": [
            100,
            100,
            100,
            100,
            100,
            100,
            100
          ]
        },
        "hit_horizontal": {
          "file": "game/assets/sprites/eltoro/hit_horizontal.png",
          "frameWidth": 333,
          "frameHeight": 360,
          "frameCount": 2,
          "durations": [
            100,
            100
          ]
        },
        "hit_vertical": {
          "file": "game/assets/sprites/eltoro/hit_vertical.png",
          "frameWidth": 369,
          "frameHeight": 360,
          "frameCount": 2,
          "durations": [
            100,
            100
          ]
        },
        "jump": {
          "file": "game/assets/sprites/eltoro/jump.png",
          "frameWidth": 415,
          "frameHeight": 360,
          "frameCount": 11,
          "durations": [
            100,
            100,
            100,
            100,
            100,
            100,
            100,
            100,
            100,
            100,
            100
          ]
        },
        "punch_horizontal": {
          "file": "game/assets/sprites/eltoro/punch_horizontal.png",
          "frameWidth": 401,
          "frameHeight": 360,
          "frameCount": 5,
          "durations": [
            100,
            100,
            100,
            100,
            100
          ]
        },
        "punch_vertical": {
          "file": "game/assets/sprites/eltoro/punch_vertical.png",
          "frameWidth": 307,
          "frameHeight": 360,
          "frameCount": 5,
          "durations": [
            100,
            100,
            100,
            100,
            100
          ]
        }
      },
      "story": {
        "subtitle": "O homem que colocou uma máscara para esconder seu coração",
        "intro": "Alejandro \"El Toro\" Morales cresceu idolatrando o pai, Miguel Morales — o lutador mascarado conhecido como El Toro Original — até o dia em que Miguel desapareceu sem explicações.",
        "sequence": [
          {
            "opponent": "ryu",
            "chapter": "Capítulo 1 — A máscara nas ruas",
            "text": "Sozinho e sem respostas, Alejandro começou a lutar em arenas clandestinas usando a máscara que o pai lhe deixara. As ruas o batizaram com o mesmo nome: El Toro."
          },
          {
            "opponent": "thunder",
            "chapter": "Capítulo 2 — Fugir para proteger",
            "text": "A verdade veio aos poucos: Miguel não havia abandonado a família. Ele investigava uma organização secreta e fugiu justamente para proteger os seus de uma vingança."
          },
          {
            "opponent": "ivan",
            "chapter": "Capítulo 3 — A mãe que sabia",
            "text": "Sua mãe, Rosa, admitiu que sabia de tudo desde o início. Escondera a verdade para proteger o filho — e isso fez Alejandro se sentir traído por ambos os pais, mesmo entendendo o motivo."
          },
          {
            "opponent": "luna",
            "chapter": "Capítulo 4 — O legado",
            "text": "Alejandro finalmente reencontrou Miguel, agora velho e doente. O pai revelou o real significado da máscara: nunca foi símbolo de força, e sim de responsabilidade."
          },
          {
            "opponent": "leonie",
            "chapter": "Capítulo 5 — El Toro contra o passado",
            "text": "Frente a frente com o homem responsável pela queda do pai, Alejandro teve a chance de se vingar. Escolheu, em vez disso, lutar pelo que aquele legado ainda podia se tornar."
          }
        ],
        "ending": "Depois da vitória, El Toro tirou a máscara diante do público — e a recolocou. Entendeu, enfim, que El Toro nunca foi o homem por trás da máscara: é o legado que ele escolheu carregar."
      }
    },
    "leonie": {
      "id": "leonie",
      "name": "Leonie",
      "color": "#e0308a",
      "bio": "Elegante e imprevisível, transforma cada round em um espetáculo.",
      "portrait": "game/assets/sprites/leonie/portrait.png",
      "sfx": { "pitch": 1.1, "tone": "triangle" },
      "animScale": {
        "idle": 1.0345,
        "walk": 1.0744,
        "crouch": 1.0646,
        "block": 1.0534,
        "ko": 1.0,
        "hit_horizontal": 1.0325,
        "hit_vertical": 1.0325,
        "jump": 1.0646,
        "punch_horizontal": 1.0139,
        "punch_vertical": 1.0325
      },
      "anims": {
        "idle": {
          "file": "game/assets/sprites/leonie/idle.png",
          "frameWidth": 339,
          "frameHeight": 360,
          "frameCount": 2,
          "durations": [
            100,
            100
          ]
        },
        "walk": {
          "file": "game/assets/sprites/leonie/walk.png",
          "frameWidth": 319,
          "frameHeight": 360,
          "frameCount": 10,
          "durations": [
            70,
            70,
            70,
            70,
            70,
            70,
            70,
            70,
            70,
            70
          ]
        },
        "crouch": {
          "file": "game/assets/sprites/leonie/crouch.png",
          "frameWidth": 339,
          "frameHeight": 360,
          "frameCount": 7,
          "durations": [
            100,
            100,
            100,
            100,
            100,
            100,
            100
          ]
        },
        "block": {
          "file": "game/assets/sprites/leonie/block.png",
          "frameWidth": 289,
          "frameHeight": 360,
          "frameCount": 6,
          "durations": [
            100,
            100,
            100,
            100,
            100,
            100
          ]
        },
        "ko": {
          "file": "game/assets/sprites/leonie/ko.png",
          "frameWidth": 351,
          "frameHeight": 360,
          "frameCount": 7,
          "durations": [
            100,
            100,
            100,
            100,
            100,
            100,
            100
          ]
        },
        "hit_horizontal": {
          "file": "game/assets/sprites/leonie/hit_horizontal.png",
          "frameWidth": 291,
          "frameHeight": 360,
          "frameCount": 2,
          "durations": [
            100,
            100
          ]
        },
        "hit_vertical": {
          "file": "game/assets/sprites/leonie/hit_vertical.png",
          "frameWidth": 337,
          "frameHeight": 360,
          "frameCount": 2,
          "durations": [
            100,
            100
          ]
        },
        "jump": {
          "file": "game/assets/sprites/leonie/jump.png",
          "frameWidth": 497,
          "frameHeight": 360,
          "frameCount": 11,
          "durations": [
            100,
            100,
            100,
            100,
            100,
            100,
            100,
            100,
            100,
            100,
            100
          ]
        },
        "punch_horizontal": {
          "file": "game/assets/sprites/leonie/punch_horizontal.png",
          "frameWidth": 353,
          "frameHeight": 360,
          "frameCount": 6,
          "durations": [
            100,
            100,
            100,
            100,
            100,
            100
          ]
        },
        "punch_vertical": {
          "file": "game/assets/sprites/leonie/punch_vertical.png",
          "frameWidth": 319,
          "frameHeight": 360,
          "frameCount": 5,
          "durations": [
            100,
            100,
            100,
            100,
            100
          ]
        }
      },
      "story": {
        "subtitle": "A campeã que nunca teve permissão para perder",
        "intro": "Leonie Adler cresceu em Berlim sob o comando do pai, o treinador olímpico Klaus Adler, para quem o amor parecia depender sempre da próxima vitória.",
        "sequence": [
          {
            "opponent": "ivan",
            "chapter": "Capítulo 1 — Emil",
            "text": "Seu irmão Emil, que nunca fora atleta, era tratado por Klaus como uma decepção. Um dia, Emil desapareceu, deixando apenas um bilhete: \"Não quero passar a vida tentando ser alguém que você inventou.\""
          },
          {
            "opponent": "ryu",
            "chapter": "Capítulo 2 — O laboratório",
            "text": "A mãe de Leonie, Eva, descobriu que Klaus colaborava secretamente com pesquisadores ligados a uma organização chamada Ordem da Coroa — e que parte do treinamento de Leonie não era treinamento comum."
          },
          {
            "opponent": "thunder",
            "chapter": "Capítulo 3 — A campeã artificial",
            "text": "Leonie descobriu que, quando adolescente, recebera tratamentos experimentais. Parte de seu talento não era só dela. A descoberta despedaçou sua identidade: \"Se tirarem tudo que colocaram em mim, quem sou eu?\""
          },
          {
            "opponent": "luna",
            "chapter": "Capítulo 4 — Recomeço",
            "text": "Ela abandonou as competições por anos, sendo chamada de covarde pelo próprio pai. Quando finalmente voltou ao boxe, foi por vontade própria — perdendo várias vezes, mas feliz pela primeira vez."
          },
          {
            "opponent": "eltoro",
            "chapter": "Capítulo 5 — Klaus Adler",
            "text": "Leonie enfrentou Klaus dentro do ringue. Quando ele insistiu que, sem ele, ela não seria ninguém, Leonie respondeu: \"Foi você que me ensinou a vencer. Eu precisei aprender sozinha a viver.\""
          }
        ],
        "ending": "Leonie venceu — mas seu verdadeiro triunfo veio depois, ao descobrir que os outros cinco lutadores do torneio também tinham ligação com a mesma organização. Decidiu ficar. Não para vencer o campeonato, mas para acabar com quem transforma pessoas em experimentos."
      }
    }
  },
  "stage": {
    "frames": [
      "game/assets/backgrounds/stage_0.png",
      "game/assets/backgrounds/stage_1.png"
    ],
    "width": 1536,
    "height": 1024,
    "durations": [
      100,
      100
    ]
  }
};
