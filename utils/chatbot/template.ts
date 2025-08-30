export default [
  {
    name: "Instagram Post Generator",
    desc: "An AI tool that generates catchy and viral-worthy Instagram posts based on given keywords.",
    icon: "https://cdn-icons-png.flaticon.com/128/15713/15713420.png",
    category: "Blog",
    slug: "ai-instagram-post-generator",
    aiPrompt:
      "Generate 3 Instagram posts based on the given keywords and output them.",
    form: [
      {
        label: "Enter keywords for your post",
        field: "input",
        name: "keywords",
        required: true,
      },
    ],
  },
  {
    name: "Instagram Hashtag Generator",
    desc: "An AI tool that generates 15 Instagram hashtags based on the given keywords.",
    icon: "https://cdn-icons-png.flaticon.com/128/7045/7045432.png",
    category: "Blog",
    slug: "ai-instagram-hash-tag-generator",
    aiPrompt:
      "Generate 15 Instagram hashtags based on the given keywords and output them.",
    form: [
      {
        label: "Enter keywords for your Instagram hashtags",
        field: "input",
        name: "keywords",
        required: true,
      },
    ],
  },
  {
    name: "Instagram Post/Reel Idea",
    desc: "An AI tool that generates new and trending Instagram post or reel ideas based on your niche.",
    icon: "https://cdn-icons-png.flaticon.com/128/1029/1029183.png",
    category: "Instagram",
    slug: "ai-instagram-post-idea-generator",
    aiPrompt:
      "Generate 5-10 Instagram ideas based on your niche and the latest trends, and output them.",
    form: [
      {
        label: "Enter keywords/niche for your Instagram idea",
        field: "input",
        name: "keywords",
        required: true,
      },
    ],
  },
  {
    name: "Write Code",
    desc: "AI model to generate programming code in any language.",
    icon: "https://cdn-icons-png.flaticon.com/128/7069/7069896.png",
    category: "Coding",
    slug: "ai-write-code",
    aiPrompt:
      "Based on the user code description, write a code and provide the output inside a code block.",
    form: [
      {
        label:
          "Enter the description of the code you want along with the programming language",
        field: "textarea",
        name: "codeDescription",
        required: true,
      },
    ],
  },
  {
    name: "Explain Code",
    desc: "AI model to explain programming code in any language.",
    icon: "https://cdn-icons-png.flaticon.com/128/8488/8488751.png",
    category: "Coding",
    slug: "ai-explain-code",
    aiPrompt:
      "Based on the user code description, explain the code line by line and provide the output inside a code block.",
    form: [
      {
        label: "Enter the code you want to understand",
        field: "textarea",
        name: "codeDescription",
        required: true,
      },
    ],
  },
  {
    name: "Code Bug Detector",
    desc: "This tool analyzes your input, such as error messages and code snippets, to pinpoint and fix bugs, offering detailed solutions in a user-friendly way.",
    icon: "https://cdn-icons-png.flaticon.com/128/921/921564.png",
    category: "Code Bug Detector",
    slug: "ai-code-bug-detector",
    aiPrompt:
      "Based on the user code input, find bugs in the code and provide a solution inside a code block.",
    form: [
      {
        label: "Enter the code to test for bugs",
        field: "textarea",
        name: "codeInput",
        required: true,
      },
    ],
  },

  {
    name: "Word Document Generator",
    desc: "An AI tool that generates a complete, professional Word document based on the topic or content you provide.",
    category: "Document Generation",
    icon: "https://cdn-icons-png.flaticon.com/128/4725/4725970.png",
    slug: "ai-word-document-generator",
    aiPrompt:
      "Generate a professional document based on the following topic/content: ",
    form: [
      {
        label: "Enter your topic or content",
        field: "textarea",
        name: "documentContent",
        required: true,
      },
    ],
  },
  {
    name: "Email Reply",
    desc: "An AI tool that serves as your personal assistant to write professional email replies in seconds.",
    category: "Email",
    icon: "https://cdn-icons-png.flaticon.com/128/944/944948.png",
    slug: "ai-email",
    aiPrompt: "How to reply to this email: ",
    form: [
      {
        label: "Enter the email you want to respond to",
        field: "textarea",
        name: "emailContent",
        required: true,
      },
    ],
  },
  {
    name: "Food Research",
    desc: "An AI tool that serves as your personal dietitian, generating healthy and delicious recipes based on your preferences.",
    category: "Food",
    icon: "https://cdn-icons-png.flaticon.com/128/706/706164.png",
    slug: "ai-food",
    aiPrompt:
      "Research and help me understand the health benefits of this food: ",
    form: [
      {
        label: "Enter the food name",
        field: "input",
        name: "topic",
        required: true,
      },
    ],
  },
  {
    name: "Chef AI",
    desc: "An AI tool that serves as your personal chef, generating healthy and delicious recipes based on your preferences.",
    category: "Recipes",
    icon: "https://cdn-icons-png.flaticon.com/128/1830/1830839.png",
    slug: "ai-chef",
    aiPrompt: "Generate an easy and healthy recipe for: ",
    form: [
      {
        label: "Enter the recipe title or ingredients",
        field: "input",
        name: "title",
        required: true,
      },
    ],
  },
  {
    name: "Rewrite Article",
    desc: "Use this tool to rewrite an existing article or blog post to bypass AI detectors and make it plagiarism-free.",
    icon: "https://cdn-icons-png.flaticon.com/128/3131/3131607.png",
    category: "Rewriting Tool",
    slug: "ai-rewrite-article",
    aiPrompt: "Rewrite the given article without any plagiarism.",
    form: [
      {
        label:
          "Provide your article/blog post or any other content to rewrite.",
        field: "textarea",
        name: "article",
        required: true,
      },
    ],
  },
  {
    name: "Word Counter",
    desc: "This handy tool counts the number of words in your text, helping you stay within the word limit for your essays, articles, and more.",
    icon: "https://cdn-icons-png.flaticon.com/128/1686/1686815.png",
    category: "Writing",
    slug: "ai-word-counter",
    aiPrompt:
      "Count the number of words in the given text and show me how many times each word repeats.",
    form: [
      {
        label: "Enter the text to count the words for",
        field: "textarea",
        name: "word-counter",
        required: true,
      },
    ],
  },
  {
    name: "Add Emojis to Text",
    desc: "An AI tool that adds emojis to your text based on its outline and rewrites.",
    icon: "https://cdn-icons-png.flaticon.com/128/2584/2584606.png",
    category: "Blog",
    slug: "ai-emoji-to-text",
    aiPrompt: "Add emojis to the outlined text and rewrite it.",
    form: [
      {
        label: "Enter your text to add emojis",
        field: "textarea",
        name: "outline",
        required: true,
      },
    ],
  },

  {
    name: "English Grammar Check",
    desc: "AI model to correct your English grammar by providing the text.",
    icon: "https://cdn-icons-png.flaticon.com/128/12596/12596700.png",
    category: "English",
    slug: "ai-english-grammar-checker",
    aiPrompt:
      "Rewrite the input text by correcting the grammar and provide the output.",
    form: [
      {
        label: "Enter the text to correct the grammar",
        field: "input",
        name: "inputText",
        required: true,
      },
    ],
  },
  {
    name: "Blog Ideas",
    desc: "An AI tool that generates blog ideas based on the topic you provide.",
    category: "Blog",
    icon: "https://cdn-icons-png.flaticon.com/128/3959/3959542.png",
    aiPrompt: "Give me 5 blog topic ideas in bullet points for: ",
    slug: "ai-blog-title",
    form: [
      {
        label: "Enter your blog topic",
        field: "input",
        name: "niche",
        required: true,
      },
    ],
  },
  {
    name: "Blog Content",
    desc: "An AI tool that serves as your personal blog writer, generating high-quality, SEO-ready blog posts in seconds.",
    category: "Blog",
    icon: "https://cdn-icons-png.flaticon.com/128/12884/12884596.png",
    slug: "ai-blog-content",
    aiPrompt: "Generate blog content for the title: ",
    form: [
      {
        label: "Enter your blog title",
        field: "input",
        name: "topic",
        required: true,
      },
    ],
  },
  {
    name: "API Endpoint Generator",
    desc: "Instantly generate clean, RESTful API endpoint documentation with example requests and responses.",
    icon: "https://cdn-icons-png.flaticon.com/128/4825/4825279.png",
    category: "Technical",
    slug: "api-endpoint-generator",
    aiPrompt:
      "Based on the user input for API purpose and fields, generate a well-structured RESTful API documentation, including endpoint, method, parameters, example request, and response.",
    form: [
      {
        label: "API Purpose",
        field: "textarea",
        name: "apiPurpose",
        required: true,
      },
      {
        label: "Fields (name and type)",
        field: "textarea",
        name: "apiFields",
        required: true,
      },
    ],
  },
  {
    name: "Regex Pattern Helper",
    desc: "Create powerful regular expressions with clear, beginner-friendly explanations.",
    icon: "https://cdn-icons-png.flaticon.com/128/2535/2535490.png",
    category: "Technical",
    slug: "regex-pattern-helper",
    aiPrompt:
      "Generate a regex pattern based on user needs, followed by a detailed explanation of each part with code blocks.",
    form: [
      {
        label: "What do you want the regex to match?",
        field: "textarea",
        name: "regexUseCase",
        required: true,
      },
    ],
  },
];
