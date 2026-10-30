# MJ Franco Imóveis — Landing Page de Alta Conversão

Landing page institucional e de captação de clientes para **MJ Franco Imóveis (Maria Julia Franco Micheletti — CRECI/SP 283950-F)**.

Desenvolvida com **HTML5, CSS3 puro e Vanilla JavaScript**, utilizando os ícones modernos da **Lucide Icons** e arquitetura inspirada no estilo *Quiet Luxury* imobiliário.

---

## 🚀 Como Subir no GitHub e Cloudflare Pages

### 1. Criar o repositório no GitHub
```bash
git init
git add .
git commit -m "feat: landing page completa mj franco imoveis"
git branch -M main
git remote add origin https://github.com/SEU_USUARIO/mj-franco.git
git push -u origin main
```

### 2. Conectar e Publicar no Cloudflare Pages (100% Grátis)
1. Acesse o painel da [Cloudflare](https://dash.cloudflare.com/)
2. Vá em **Workers & Pages** > **Create application** > **Pages** > **Connect to Git**
3. Selecione o repositório `mj-franco`
4. Na tela de configuração de build:
   - **Framework preset:** `None`
   - **Build command:** *(deixe em branco)*
   - **Build output directory:** `/` *(raiz do projeto)*
5. Clique em **Save and Deploy**. Em menos de 1 minuto seu site estará online com SSL grátis, CDN global ultra-rápida e uptime máximo!

---

## 📁 Estrutura de Arquivos

```
mj-franco/
├── index.html            # Estrutura semântica, SEO, Schema JSON-LD e seções
├── favicon.png           # Ícone do site para navegadores
├── css/
│   └── style.css         # Design system, paleta quiet luxury, responsividade e animações
├── js/
│   └── main.js           # Filtros de imóveis, drawer mobile, funil duplo com WhatsApp
└── assets/
    └── images/           # Logo vetorizada/transparente, fotos tratadas e otimizadas
```

---

## 💎 Funcionalidades Incluídas
- **Funil Duplo:**
  - *Compradores:* Simulador de perfil de busca + financiamento direto no WhatsApp.
  - *Proprietários:* Formulário de captação e avaliação de imóvel com segurança jurídica.
- **Vitrine Dinâmica com Filtros:** Casas em Condomínio, Apartamentos e Terrenos com botão "Tenho Interesse" pré-formatado com o código do imóvel.
- **Autoridade & Prova Social:** Avaliação 5,0 no Google (18 avaliações), selo CRECI/SP 283950-F e conexão com o Instagram `@mjfrancocorretora`.
- **Botão Flutuante de WhatsApp:** Pulsante e com tooltip para contato imediato.
- **Totalmente Responsivo:** Adaptado com precisão para celulares, tablets e computadores.
