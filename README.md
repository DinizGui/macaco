# Pergunte ao Macaco 🐒

Não consegue decidir? Digita duas opções e deixa o macaco escolher por você.

## Stack

- Next.js 15 (App Router) + TypeScript
- Tailwind CSS v4
- lottie-react (animação opcional do macaco)
- Framer Motion (transições)

## Rodando localmente

```bash
npm install
npm run dev
```

Abra http://localhost:3000.

## Animação Lottie (opcional)

O fallback é um macaco em SVG com olhos que seguem o cursor. Se quiser trocar pelo Lottie, baixe um JSON do [LottieFiles](https://lottiefiles.com) e salve em:

```
public/animations/monkey.json
```

## Estrutura

```
src/
├── app/                      # layout, page, globals
├── components/
│   ├── MonkeyAnimation.tsx   # SVG/Lottie do macaco
│   ├── MonkeyAsker.tsx       # orquestra inputs + resultado
│   ├── OptionInput.tsx
│   └── ResultCard.tsx        # card animado com Framer Motion
└── hooks/
    └── useMonkeyDecision.ts  # estado idle/thinking/decided
```
