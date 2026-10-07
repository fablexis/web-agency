import type { L } from "../i18n";

export type Block = { h?: string; p?: string; widget?: true };
export type Article = { widget: "scope" | "vitals" | "feedback" | "stack" | "funnel" | "timer"; project: string; body: L<Block[]> };

/** Article bodies, keyed by the English slug. */
export const articles: Record<string, Article> = {
  "launch-an-mvp-in-30-days": {
    widget: "scope",
    project: "lyapp",
    body: {
      en: [
        { p: "Thirty days is enough to put a real product in front of real users if you decide early what the first version will leave out. Most MVPs that run late have a scope problem: they grow one reasonable feature at a time until the launch date moves." },
        { h: "Write the one job down", p: "Before any design, we write a single sentence about who the product is for and the one job it does for them. For Lyapp it was logging a baby's sleep and feeds with one hand at 3 a.m. Every feature request gets checked against that sentence." },
        { h: "Split the list in two", p: "List everything the product could do, then sort it into launch and later. Launch holds only what the one job needs. Accounts, settings screens and admin panels usually end up in later, and nobody misses them on day one. Try it with a typical first app:" },
        { widget: true },
        { h: "Ship, then improve", p: "Lyapp's first version reached the App Store on August 29. Version 1.1 followed on September 21 with support for several babies, temperature logging and a timer you can pause. A small first release leaves room to plan the second one around how people actually use the app." },
      ],
      es: [
        { p: "Treinta días alcanzan para poner un producto real frente a usuarios reales si decides pronto qué va a quedar fuera de la primera versión. Casi todos los MVP que se atrasan tienen un problema de alcance: crecen una funcionalidad razonable a la vez hasta que la fecha de lanzamiento se mueve." },
        { h: "Escribe el trabajo principal", p: "Antes de diseñar escribimos una sola frase: para quién es el producto y qué trabajo hace por esa persona. En Lyapp fue registrar el sueño y las tomas de un bebé con una mano a las 3 de la mañana. Cada funcionalidad nueva se compara con esa frase." },
        { h: "Divide la lista en dos", p: "Anota todo lo que el producto podría hacer y sepáralo en lanzamiento y después. En lanzamiento queda solo lo que necesita el trabajo principal. Las cuentas, las pantallas de ajustes y los paneles de administración suelen terminar en después, y nadie los extraña el primer día. Pruébalo con una primera app típica:" },
        { widget: true },
        { h: "Lanza y luego mejora", p: "La primera versión de Lyapp llegó a la App Store el 29 de agosto. La versión 1.1 salió el 21 de septiembre con soporte para varios bebés, registro de temperatura y un temporizador que se puede pausar. Una primera versión pequeña deja espacio para planear la segunda según cómo la gente usa la app de verdad." },
      ],
    },
  },
  "technical-seo-in-2026": {
    widget: "vitals",
    project: "simply-andy",
    body: {
      en: [
        { p: "Most technical SEO comes down to whether search engines can crawl and understand a page, and whether that page feels fast to the people who open it." },
        { h: "Core Web Vitals in numbers", p: "Google measures three metrics on real visits and looks at the 75th percentile, so a slow minority of visits still counts. A page is in the good range when Largest Contentful Paint is 2.5 seconds or less, Interaction to Next Paint is 200 milliseconds or less and Cumulative Layout Shift is 0.1 or less. INP replaced First Input Delay as a Core Web Vital in March 2024. Move the sliders to see where a page lands:" },
        { widget: true },
        { h: "Structured data and clean signals", p: "Search engines and AI assistants both read structured data. We add Schema.org JSON-LD for the organization, services, FAQs and articles, a sitemap that lists every language version, and hreflang tags so the English and Spanish pages point to each other." },
        { h: "Put the answer first", p: "Answer engines like ChatGPT and Perplexity quote short passages. A section that answers its question in the first two sentences is easier to quote, so we write the answer first and the detail after it." },
      ],
      es: [
        { p: "Casi todo el SEO técnico se resume en si los buscadores pueden rastrear y entender una página, y en si esa página se siente rápida para quien la abre." },
        { h: "Core Web Vitals en números", p: "Google mide tres métricas en visitas reales y mira el percentil 75, así que una minoría de visitas lentas también cuenta. Una página está en el rango bueno cuando el Largest Contentful Paint es de 2,5 segundos o menos, el Interaction to Next Paint es de 200 milisegundos o menos y el Cumulative Layout Shift es de 0,1 o menos. INP reemplazó a First Input Delay como Core Web Vital en marzo de 2024. Mueve los controles para ver dónde queda una página:" },
        { widget: true },
        { h: "Datos estructurados y señales limpias", p: "Los buscadores y los asistentes de IA leen datos estructurados. Agregamos JSON-LD de Schema.org para la organización, los servicios, las preguntas frecuentes y los artículos, un sitemap con cada versión de idioma y etiquetas hreflang para que las páginas en español e inglés se enlacen entre sí." },
        { h: "La respuesta primero", p: "Motores de respuesta como ChatGPT y Perplexity citan pasajes cortos. Una sección que responde su pregunta en las dos primeras oraciones es más fácil de citar, por eso escribimos primero la respuesta y después el detalle." },
      ],
    },
  },
  "micro-interactions-that-sell": {
    widget: "feedback",
    project: "simply-andy",
    body: {
      en: [
        { p: "A button that doesn't react to a tap makes people tap again. That second tap is how you get duplicate orders and forms sent twice, along with a small loss of trust." },
        { h: "Every action gets an answer", p: "When someone presses something, the interface should show that it heard the press, that it's working, and that it finished. Try both buttons:" },
        { widget: true },
        { h: "Motion that explains", p: "Good motion shows where something came from or what changed. In the brand kit we built for Simply Andy, changing a color in the signature generator updates the preview at once, so Andreina sees the result before she copies it into Gmail." },
        { h: "Keep it short", p: "Feedback should arrive fast enough to feel connected to the tap. Long decorative animations in the middle of a task get in the way, so we save them for moments like a first launch or a finished order." },
      ],
      es: [
        { p: "Un botón que no reacciona a un toque hace que la gente toque otra vez. Ese segundo toque es el que produce pedidos duplicados y formularios enviados dos veces, además de una pequeña pérdida de confianza." },
        { h: "Cada acción recibe una respuesta", p: "Cuando alguien presiona algo, la interfaz debería mostrar que recibió el toque, que está trabajando y que terminó. Prueba los dos botones:" },
        { widget: true },
        { h: "Movimiento que explica", p: "Un buen movimiento muestra de dónde salió algo o qué cambió. En el brand kit que hicimos para Simply Andy, cambiar un color en el generador de firma actualiza la vista previa al instante, así Andreina ve el resultado antes de copiarlo en Gmail." },
        { h: "Que dure poco", p: "La respuesta tiene que llegar lo bastante rápido para sentirse unida al toque. Las animaciones largas y decorativas en medio de una tarea estorban, así que las guardamos para momentos como la primera apertura o un pedido terminado." },
      ],
    },
  },
  "modern-stack-for-startups": {
    widget: "stack",
    project: "your-english-buddy",
    body: {
      en: [
        { p: "We pick tools a small team can still maintain a year from now. That usually rules out whatever launched last month." },
        { h: "Our defaults", p: "For marketing sites we use Astro, which ships pages as static HTML and loads JavaScript only for the interactive parts. This site is built that way. For mobile apps we use React Native, so one codebase reaches iOS and Android. For data and sign-in, Supabase gives us a Postgres database without running our own servers. Pick a project type to see what we'd start with:" },
        { widget: true },
        { h: "When to break the rule", p: "Defaults are a starting point. A product that relies on the camera, background audio or heavy offline sync may need native code for part of the app. If that's the case, we say so in the proposal, before you pay for anything." },
      ],
      es: [
        { p: "Elegimos herramientas que un equipo pequeño pueda seguir manteniendo dentro de un año. Eso casi siempre deja fuera lo que salió el mes pasado." },
        { h: "Lo que usamos por defecto", p: "Para sitios de marketing usamos Astro, que entrega las páginas como HTML estático y carga JavaScript solo en las partes interactivas. Este sitio está hecho así. Para apps móviles usamos React Native, con una sola base de código para iOS y Android. Para datos e inicio de sesión, Supabase nos da una base de datos Postgres sin mantener servidores propios. Elige un tipo de proyecto para ver con qué empezaríamos:" },
        { widget: true },
        { h: "Cuándo romper la regla", p: "Lo de por defecto es un punto de partida. Un producto que depende de la cámara, del audio en segundo plano o de mucha sincronización sin conexión puede necesitar código nativo en una parte de la app. Si es tu caso, lo decimos en la propuesta, antes de que pagues nada." },
      ],
    },
  },
  "from-visits-to-customers": {
    widget: "funnel",
    project: "your-english-buddy",
    body: {
      en: [
        { p: "A funnel is the path from a first visit to a paying customer. Small leaks at each step multiply, which is why the fix is often on a page you weren't looking at." },
        { h: "Do the math first", p: "If 2,000 people visit in a month, 4% leave their details and 25% of those buy, you get 20 customers. Raise the first step to 6% and you get 30 without spending more on ads. Play with the numbers:" },
        { widget: true },
        { h: "One next step per page", p: "Each page should make one action obvious. On the Your English Buddy site every section leads to the same place, a personalized diagnostic class, with WhatsApp for anyone who wants to ask first." },
        { h: "Measure every step", p: "Track each transition on its own, from visit to lead and from lead to sale. When one number drops, you know which page or message to look at." },
      ],
      es: [
        { p: "Un embudo es el camino desde la primera visita hasta un cliente que paga. Las pequeñas fugas en cada paso se multiplican, y por eso el arreglo suele estar en una página que nadie estaba mirando." },
        { h: "Primero, las cuentas", p: "Si 2.000 personas visitan tu sitio en un mes, el 4% deja sus datos y el 25% de ellos compra, tienes 20 clientes. Sube el primer paso al 6% y tienes 30 sin gastar más en anuncios. Juega con los números:" },
        { widget: true },
        { h: "Un siguiente paso por página", p: "Cada página debería dejar clara una sola acción. En el sitio de Your English Buddy todas las secciones llevan al mismo lugar, una clase diagnóstica personalizada, con WhatsApp para quien prefiera preguntar antes." },
        { h: "Mide cada paso", p: "Sigue cada transición por separado, de visita a contacto y de contacto a venta. Cuando un número baja, sabes qué página o mensaje revisar." },
      ],
    },
  },
  "apps-that-feel-alive": {
    widget: "timer",
    project: "lyapp",
    body: {
      en: [
        { p: "People decide whether an app feels good within the first few taps. Most of that feeling comes from small details that behave the same way every time." },
        { h: "Big targets for one hand", p: "Apple recommends tap targets of at least 44 by 44 points, and Material Design uses 48 by 48 dp. In Lyapp the main action, starting the sleep timer, is a wide button that's easy to hit with a thumb while the other arm holds a baby." },
        { h: "State that follows you", p: "A running timer shouldn't disappear when the app closes. Lyapp keeps it on the Lock Screen and in the Dynamic Island through Live Activities, so parents can check it without opening the app. Start the timer and lock the phone:" },
        { widget: true },
        { h: "Same answer, every time", p: "When the start button always looks and responds the same way, people stop thinking about it. That consistency matters more than any single animation." },
      ],
      es: [
        { p: "La gente decide si una app se siente bien en los primeros toques. Casi toda esa sensación sale de detalles pequeños que se comportan igual cada vez." },
        { h: "Objetivos grandes para una mano", p: "Apple recomienda áreas táctiles de al menos 44 por 44 puntos y Material Design usa 48 por 48 dp. En Lyapp la acción principal, iniciar el temporizador de sueño, es un botón ancho que se alcanza con el pulgar mientras el otro brazo sostiene al bebé." },
        { h: "Un estado que te acompaña", p: "Un temporizador en marcha no debería desaparecer al cerrar la app. Lyapp lo mantiene en la pantalla de bloqueo y en la Dynamic Island con Live Activities, así se puede revisar sin abrir la app. Inicia el temporizador y bloquea el teléfono:" },
        { widget: true },
        { h: "La misma respuesta siempre", p: "Cuando el botón de inicio se ve y responde igual cada vez, la gente deja de pensar en él. Esa consistencia pesa más que cualquier animación." },
      ],
    },
  },
};

/** Reading time from the real article length (~200 words per minute, widget counts as one minute). */
export const readTime = (slug: string, lang: "en" | "es") => {
  const a = articles[slug];
  if (!a) return "1 min";
  const words = a.body[lang].map((b) => `${b.h ?? ""} ${b.p ?? ""}`).join(" ").split(/\s+/).filter(Boolean).length;
  return `${Math.max(2, Math.round(words / 200) + 1)} min`;
};
