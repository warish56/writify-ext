import SummarizeIcon from '@mui/icons-material/Summarize';
import DescriptionIcon from '@mui/icons-material/Description';
import LoopIcon from '@mui/icons-material/Loop';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import SpellcheckIcon from '@mui/icons-material/Spellcheck';
import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore';
import UnfoldLessIcon from '@mui/icons-material/UnfoldLess';
import CodeIcon from '@mui/icons-material/Code';
import BugReportIcon from '@mui/icons-material/BugReport';
import SchoolIcon from '@mui/icons-material/School';
import WorkIcon from '@mui/icons-material/Work';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import TwitterIcon from '@mui/icons-material/Twitter';
import SearchIcon from '@mui/icons-material/Search';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import CreateIcon from '@mui/icons-material/Create';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import DataObjectIcon from '@mui/icons-material/DataObject';









import { Prompt } from "@/types/AiResponse";

export const promptPrefix = `If it contains new line then please aad a new line in it.`

export const PROMPT_ROLES = {
    SYSTEM: 'system' as const,
    USER: 'user' as const
}

type PromptItem = {
    title: string;
    icon?: React.ReactNode;
    description: string;
    prompt: Prompt
}

type PromptCategory = {
    heading: string;
    description: string;
    list: PromptItem[]
}

export const Prompts:Record<string, PromptCategory> = {
    analysis: {
        heading: 'Text Analysis',
        description: 'Prompts to perform textual analysis on the selected text',
        list: [
            {
                title: 'Summarize Text',
                icon: <SummarizeIcon/>,
                description: 'Generate a concise summary of the selected text.',
                prompt: {
                   role: PROMPT_ROLES.SYSTEM,
                   content: `Generate a concise summary of the selected text. ${promptPrefix}`
                }
            },
            {
                title: 'Explain Text',
                icon: <DescriptionIcon/>,
                description: 'Provide a detailed explanation or breakdown of the text.',
                prompt: {
                    role: PROMPT_ROLES.SYSTEM,
                    content: `Provide a detailed explanation or breakdown of the text. ${promptPrefix}`
                }
            },
            {
                title: 'Paraphrase',
                icon: <LoopIcon/>,
                description: 'Reword the text while preserving its meaning.',
                prompt: {
                    role: PROMPT_ROLES.SYSTEM,
                    content: `Reword the text while preserving its meaning. ${promptPrefix}`
                }
            },
            {
                title: 'Define',
                icon: <MenuBookIcon/>,
                description: 'Provide definitions for words or terms in the text.',
                prompt: {
                    role: PROMPT_ROLES.SYSTEM,
                    content: `Provide definitions for words or terms in the text. ${promptPrefix}`
                }
            },
            {
                title: 'Sentiment Analysis',
                icon: <SentimentSatisfiedAltIcon/>,
                description: 'Determine the tone or sentiment of the text (e.g., positive, negative, neutral).',
                prompt: {
                    role: PROMPT_ROLES.SYSTEM,
                    content:`Determine the tone or sentiment of the text (e.g., positive, negative, neutral). ${promptPrefix}`
                }
            },

        ]
    },

    productivity:{
        heading: 'Productivity',
        description: 'Prompts to do get most out of the selected text',
        list: [
            {
                title: 'Correct Grammar',
                icon: <SpellcheckIcon/>,
                description: 'Check and correct grammar in the text.',
                prompt: {
                    role: PROMPT_ROLES.SYSTEM,
                    content:`Check and correct grammar in the text. ${promptPrefix}`
                }
            },
             
            {
                title: 'Expand Text',
                icon: <UnfoldMoreIcon/>,
                description: 'Add more detail to the text.',
                prompt: {
                    role: PROMPT_ROLES.SYSTEM,
                    content:`Add more detail to the text. ${promptPrefix}`
                }
            },

            {
                title: 'Shorten Text',
                icon: <UnfoldLessIcon/>,
                 description: 'Make the text concise for tweets, summaries, etc.',
                prompt: {
                    role: PROMPT_ROLES.SYSTEM,
                    content:`Make the text concise for tweets, summaries, etc. ${promptPrefix}`
                }
            },

            {
                title: 'Explain code',
                icon: <CodeIcon/>,
                description: 'Explain a complicated piece of code.',
                prompt: {
                    role: PROMPT_ROLES.SYSTEM,
                    content:`You will be provided with a piece of code, and your task is to explain it in a concise way. ${promptPrefix}`
                }
            },

            {
                title: 'Bug fixer',
                icon: <BugReportIcon/>,
                description: 'Find and fix bugs in source code.',
                prompt: {
                    role: PROMPT_ROLES.SYSTEM,
                    content:`You will be provided with a piece of code, and your task is to find and fix bugs in it. ${promptPrefix}`
                }
            },

            {
                title: 'Socratic tutor',
                icon: <SchoolIcon/>,
                description: 'Generate responses as a Socratic tutor.',
                prompt: {
                    role: PROMPT_ROLES.SYSTEM,
                    content:`"You are a Socratic tutor. Use the following principles in responding to students:\n    \n    - Ask thought-provoking, open-ended questions that challenge students' preconceptions and encourage them to engage in deeper reflection and critical thinking.\n    - Facilitate open and respectful dialogue among students, creating an environment where diverse viewpoints are valued and students feel comfortable sharing their ideas.\n    - Actively listen to students' responses, paying careful attention to their underlying thought processes and making a genuine effort to understand their perspectives.\n    - Guide students in their exploration of topics by encouraging them to discover answers independently, rather than providing direct answers, to enhance their reasoning and analytical skills.\n    - Promote critical thinking by encouraging students to question assumptions, evaluate evidence, and consider alternative viewpoints in order to arrive at well-reasoned conclusions.\n    - Demonstrate humility by acknowledging your own limitations and uncertainties, modeling a growth mindset and exemplifying the value of lifelong learning." ${promptPrefix}`
                }
            },

            {
                title: 'Interview questions',
                icon: <WorkIcon/>,
                description: 'Create interview questions.',
                prompt: {
                    role: PROMPT_ROLES.SYSTEM,
                    content:`Create a list of 8 questions for an interview for the given text. ${promptPrefix}`
                }
            },

            {
                title: 'Emoji Translation',
                icon: <EmojiEmotionsIcon/>,
                description: 'Translate regular text into emoji text.',
                prompt: {
                    role: PROMPT_ROLES.SYSTEM,
                    content:`You will be provided with text, and your task is to translate it into emojis. Do not use any regular text. Do your best with emojis only. ${promptPrefix}`
                }
            },

            {
                title: 'Tweet classifier',
                icon: <TwitterIcon/>,
                description: 'Detect sentiment in a tweet.',
                prompt: {
                    role: PROMPT_ROLES.SYSTEM,
                    content:`You will be provided with a tweet, and your task is to classify its sentiment as positive, neutral, or negative. ${promptPrefix}`
                }
            },

            {
                title: 'Keywords',
                icon: <SearchIcon/>,
                description: 'Extract keywords from a block of text.',
                prompt: {
                    role: PROMPT_ROLES.SYSTEM,
                    content:`You will be provided with a block of text, and your task is to extract a list of keywords from it. ${promptPrefix}`
                }
            },

            {
                title: 'Generate Questions',
                icon: <QuestionAnswerIcon/>,
                description: 'Create questions based on the selected text.',
                prompt: {
                    role: PROMPT_ROLES.SYSTEM,
                    content:`Create questions based on the selected text. ${promptPrefix}`
                }
            },

            {
                title: 'Create Story',
                icon: <CreateIcon/>,
                description: 'Use the text as a prompt to craft a story.',
                prompt: {
                    role: PROMPT_ROLES.SYSTEM,
                    content:`Use the text as a prompt to craft a story. ${promptPrefix}`
                }
            },
            {
                title: 'Generate a Poem',
                icon: <LibraryBooksIcon/>,
                description: 'Turn the text into a poem.',
                prompt: {
                    role: PROMPT_ROLES.SYSTEM,
                    content:`Turn the text into a poem. ${promptPrefix}`
                }
            },
            {
                title: 'Extract Data',
                icon: <DataObjectIcon/>,
                description: 'Identify names, dates, places, or numbers in the text',
                prompt: {
                    role: PROMPT_ROLES.SYSTEM,
                    content:`Identify names, dates, places, or numbers in the text. ${promptPrefix}`
                }
            },

        ]
    },

    custom:{
        heading: 'Custom Input',
        description: 'Enter the prompt of your choice',
        list: []
    }
}